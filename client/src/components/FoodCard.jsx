import React from 'react';
import { useNavigate } from 'react-router-dom';

const FoodCard = ({ title, description, avgRating, image, id}) => {

  const navigate = useNavigate()
  const commentHandler = (e)=>{
    navigate(`/form/${e}`)
  }
  return (
    <div className="max-w-sm  rounded-lg shadow-lg overflow-hidden bg-white hover:scale-105 transition-transform duration-300">
      <img
        className="w-full h-56 object-cover"
        src={image}
        alt={title}
      />
      <div className="p-4">
        <h2 className="text-lg font-bold text-gray-800">{title}</h2>
        <p className="text-sm text-gray-600 mt-2">{description}</p>
        <div className="mt-4 flex items-center">
          <span className="text-yellow-500 text-xl">&#9733;</span>
          <span className="ml-2 text-gray-700 font-medium">{avgRating}/5</span>
          <button className='bg-slate-200 hover:bg-slate-300 rounded-2xl px-3 py-a ml-3 my-auto' onClick={()=>commentHandler(id)} >  Comment - </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
