"use client";
import React, { useState } from "react";
import { FaBars, FaHeart } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { TbWorld } from "react-icons/tb";
import { MdAccountCircle } from "react-icons/md";
import FilterSidebar from "./FilterSidebar";



const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
 
      <nav as="nav" className="flex items-center justify-between px-6 py-4  w-full">
        {/* Sol Taraf - Menü İkonu */}
        <button
          onClick={handleToggleSidebar}
          className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <FaBars size={24} />
        </button>

        {/* Sağ Taraf - Diğer İkonlar */}
        <div className="navbar-right flex">
          <button className="p-2 text-gray-600 hover:text-gray-800 transition-colors">
            <TbWorld size={24} />
          </button>
          <button className="p-2 text-gray-600 hover:text-gray-800 transition-colors">
            <FaHeart size={24} className="text-red-500" />
          </button>
          <button className="p-2 text-gray-600 hover:text-gray-800 transition-colors">
            <IoCartOutline size={24} />
          </button>
          <button className="p-2 text-gray-600 hover:text-gray-800 transition-colors">
            <MdAccountCircle size={24} />
          </button>
        </div>
      </nav>

      <FilterSidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default Navbar;