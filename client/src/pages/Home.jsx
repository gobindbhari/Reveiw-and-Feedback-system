import React, { useEffect, useState } from 'react'
import FoodCard from '../components/FoodCard'
import axios from 'axios'
import Spinner from '../components/Spinner';
// import 'dotenv/config'

const Home = () => {
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
  
    useEffect(() => {
      const fetchFoods = async () => {
        try {
          console.log("Jelooooooo")
          // const response = await axios.get('http://localhost:5500/post');
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/post`);
          console.log(response.data)
          setFoods(response.data);
          setLoading(false);
        } catch (err) {
          console.error('Error fetching data:', err);
          setError('Failed to load food data.');
          setLoading(false);
        }
      };
  
      fetchFoods();
    }, []);
    console.log(foods)
  
    // if (loading) return <p className="text-center mt-10">Loading...</p>;
    if (loading) return <div className="text-center mt-10 flex justify-evenly w-[100%] px-[10%]">
      <Spinner/><Spinner/>
      </div>;
    if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  
    return (
      <div className="min-h-screen bg-gray-100 p-10">
        <h1 className="text-3xl font-bold text-center mb-10">Food Menu</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-[100%]">
          {foods.map((food) => (
            <FoodCard
              key={food._id}
              id={food._id}
              title={food.postName}
              description={food.description}
              avgRating={food.avgRating}
              image={food.image}
            />
          ))}
        </div>
      </div>
    );
}

export default Home
