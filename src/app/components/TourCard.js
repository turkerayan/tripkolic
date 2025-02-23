// components/TourCard.js
"use client";

import Image from "next/image";
import { FaStar, FaClock, FaUsers } from "react-icons/fa";

const TourCard = ({ tour }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-48">
        <Image
          src={tour.image}
          alt={tour.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-2 right-2 bg-primary-500 text-white px-3 py-1 rounded-full text-sm">
          {tour.discount || "Popular"}
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{tour.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{tour.description}</p>

        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <FaStar className="text-yellow-400 mr-1" />
            {tour.rating} ({tour.reviews} reviews)
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <FaClock className="text-primary-500 mr-1" />
            {tour.duration}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary-500">${tour.price}</span>
            <span className="text-gray-400 line-through">${tour.originalPrice}</span>
          </div>
          <button className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default TourCard;