import React from 'react'

const Loader = () => {
    return (

        <div className="max-w-sm rounded-lg shadow-lg overflow-hidden bg-white animate-pulse w-[100%]">
  <div className="w-full h-56 bg-gray-300"></div>
  <div className="p-4">
    <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
    <div className="h-4 bg-gray-300 rounded w-full mb-4"></div>
    <div className="flex items-center">
      <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
      <div className="h-4 bg-gray-300 rounded w-1/4 ml-2"></div>
      <div className="h-6 bg-gray-300 rounded w-1/3 ml-3"></div>
    </div>
  </div>
</div>


    )
}

export default Loader
