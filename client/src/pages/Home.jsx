import React, { useEffect, useState } from 'react'
import FoodCard from '../components/FoodCard'
import axios from 'axios'
import Loader from '../components/Loader';

const Home = () => {
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
  
    useEffect(() => {
      const fetchFoods = async () => {
        try {
          console.log("Jelooooooo")
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
  
    if (loading) return <div className="min-h-screen bg-gray-100 p-10">
    <h1 className="text-3xl font-bold text-center mb-10">Food Menu</h1>
    <div className="flex flex-wrap justify-center  gap-6 w-full">
      <Loader/><Loader/>
      <Loader/><Loader/>
      <Loader/><Loader/>
    </div>
  </div>

    if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  
    return (
      <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold text-center mb-10">Food Menu</h1>
      <div className="flex flex-wrap justify-center gap-6 w-full">
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
