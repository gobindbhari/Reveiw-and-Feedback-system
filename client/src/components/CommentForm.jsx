import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const CommentForm = () => {

    const navigate = useNavigate()
    const {id} = useParams()
  const [formData, setFormData] = useState({
    userName: "",
    post_id: id,
    comment: "",
    rating: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    try {        
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    await axios.post(`${import.meta.env.VITE_BACKEND_URL}/feedback/create`,formData)
    alert('Feedback submitted successfully!');
    navigate('/')
    } catch (error) {
        console.error('Error submitting form data:', error);
        alert('Please try again later')
    }
};

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg mt-10 shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] ">
      <h2 className="text-2xl font-bold mb-4 text-center">Add a Comment</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Username Field */}
        <div>
          <label htmlFor="userName" className="block text-sm font-medium">
            Username
          </label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter your username"
            required
          />
        </div>

        {/* Comment Field */}
        <div>
          <label htmlFor="comment" className="block text-sm font-medium">
            Comment
          </label>
          <textarea
            id="comment"
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Write your comment here"
            rows="4"
            required
          ></textarea>
        </div>

        {/* Rating Field */}
        <div>
          <label htmlFor="rating" className="block text-sm font-medium">
            Rating
          </label>
          <select
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            required
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num} Star{num > 1 ? "s" : ""}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
