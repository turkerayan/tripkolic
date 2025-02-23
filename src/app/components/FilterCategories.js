"use client";

import { useState, useEffect } from "react";
import FilterSidebar from "./FilterSidebar";

export const FilterCategories = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentFilters, setCurrentFilters] = useState({});

  return (
    <>
      <button onClick={() => setIsSidebarOpen(true)}>Open Filters</button>
      <FilterSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onSearch={(filters) => setCurrentFilters(filters)}
        selectedCategory="Tours"
        initialFilters={currentFilters}
      />
      
    </>
  )
}
