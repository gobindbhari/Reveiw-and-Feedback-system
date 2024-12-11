import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import 'dotenv/config'

const ApproveFeedback = () => {
    const [feedback, setFeedback] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch the feedback from the server
    useEffect(() => {
        const fetchFeedback = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/feedback/get`);
                setFeedback(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching feedback:', error);
                setLoading(false);
            }
        };
        fetchFeedback();
    }, []);

    // Handle approving or rejecting feedback
    const handleApproval = async (id, approved) => {
        try {
            const response = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/feedback/approved/${id}`, { approved });
            setFeedback(prevFeedback =>
                prevFeedback.map(item =>
                    item._id === id ? { ...item, approved: response.data.feedback.approved } : item
                )
            );
            alert('Feedback is Approved')
        } catch (error) {
            console.error('Error updating approval status:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/feedback/delete/${id}`);
            // const response = await axios.delete(`http://localhost:5500/feedback/delete/${id}`);
            if (response.status === 200) {
                console.log('Feedback successfully deleted:', response.data);
                setFeedback((prevFeedback) => prevFeedback.filter((item) => item._id !== id));
                alert('Feedback deleted successfully!');
            }
        } catch (error) {
            console.error('Error updating approval status:', error);
        }
    }


    if (loading) return  <div className="w-screen text-center py-4">
    <h1 className="mx-auto mt-10 text-lg font-medium"><span className="loading loading-bars loading-xs"></span>
    </h1>
  </div>;
    if (feedback.length == 0) return  <div className="w-screen text-center py-4">
    <h1 className="mx-auto mt-10 text-lg font-medium">No Data</h1>
  </div>;

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Approve Feedback</h2>
            <div className="space-y-4">
                {feedback.map(item => (
                    <div key={item._id} className="border p-4 rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold">{item.userName}</h3>
                        <p>{item.comment}</p>
                        <p>Rating: {item.rating} / 5</p>
                        <div className="mt-4 flex space-x-4">
                            <button
                                onClick={() => handleApproval(item._id, true)}
                                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                            >
                                Approve
                            </button>
                            <button
                                onClick={() => handleDelete(item._id)}
                                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                        <p className={`mt-2 ${item.approved ? 'text-green-500' : 'text-red-500'}`}>
                            {item.approved ? 'Approved' : 'Pending Approval'}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ApproveFeedback;
