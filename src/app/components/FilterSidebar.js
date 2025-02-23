"use client";

import { useState } from "react";

// Etiket verileri
const themeTags = ["Island Tour", "Land Tour", "Safari"];
const activityTags = ["Swimming", "Running", "Elephant care", "Snorkeling"];
const vehicleTags = ["Yacht", "Speedboat", "Safari", "Catamaran", "Speedcatamaran"];
const featureTags = ["Transfer", "Halal Food", "Vegetarian Food"];
const categoryOptions = ["Tours", "Tickets", "Rent", "Transfer"];

export default function FilterSidebar({ isOpen, onClose, onSearch }) {
  if (!isOpen) return null;

  // State'ler
  const [location, setLocation] = useState("");
  const [selectedThemes, setSelectedThemes] = useState([]);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [selectedVehicles, setSelectedVehicles] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [price, setPrice] = useState(12500);
  const [startTime, setStartTime] = useState(17);
  const [groupSize, setGroupSize] = useState(40);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  // Etiket seçim fonksiyonu
  const handleTagClick = (tag, selected, setSelected) => {
    selected.includes(tag)
      ? setSelected(selected.filter(t => t !== tag))
      : setSelected([...selected, tag]);
  };

  // Kategori seçimi
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setShowCategoryDropdown(false);
  };

  // Sıfırlama
  const handleReset = () => {
    setLocation("");
    setSelectedThemes([]);
    setSelectedActivities([]);
    setPrice(12500);
    setStartTime(0);
    setGroupSize(40);
    setSelectedVehicles([]);
    setSelectedFeatures([]);
    setSelectedCategory("");
  };

  // Arama
  const handleSearch = () => {
    onSearch?.({
      location,
      themes: selectedThemes,
      activities: selectedActivities,
      price,
      startTime,
      groupSize,
      vehicles: selectedVehicles,
      features: selectedFeatures,
      category: selectedCategory
    });
    onClose();
  };

  // Saat formatlama
  const formatTime = (value) => 
    `${Math.floor(value).toString().padStart(2, "0")}:00`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative bg-white w-[95%] max-w-lg max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl p-5">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-primary-500 text-2xl"
        >
          &times;
        </button>

        {/* Kategori Seçimi */}
        <div className="mt-8 mb-3 relative">
          <button
            onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
            className="absolute left-1 bg-primary-500 text-white hover:bg-primary-600 font-semibold flex items-center gap-1 border-2 border-primary-500 hover:border-primary-600 font-bold py-2 px-4 rounded-lg transition-colors"
          >
            {selectedCategory || "Tours"}
            
          </button>

          {showCategoryDropdown && (
            <div className="absolute right-4 top-12 bg-white shadow-lg rounded-lg p-2 min-w-[120px] z-10 border">
              {categoryOptions.map(category => (
                <button
                  key={category}
                  onClick={() => handleCategorySelect(category)}
                  className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-sm transition-colors"
                >
                  {category}
                </button>
              ))}
            </div>
          )}

          <p className="text-xl text-center text-gray-500">Filter</p>
        </div>

        {/* Konum */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">
            Location
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:outline-none"
            placeholder="Where you wanna visit?"
            value={location}
            onChange={e => setLocation(e.target.value)}
          />
        </div>

        {/* Temalar */}
        <div className="mb-4">
          <h3 className="font-semibold text-gray-700 mb-2">Theme</h3>
          <div className="flex flex-wrap gap-2">
            {themeTags.map(tag => (
              <TagButton
                key={tag}
                tag={tag}
                selected={selectedThemes}
                onClick={() => handleTagClick(tag, selectedThemes, setSelectedThemes)}
              />
            ))}
          </div>
        </div>

        {/* Aktiviteler */}
        <div className="mb-4">
          <h3 className="font-semibold text-gray-700 mb-2">
            Activity Select List
            <span className="text-xs text-red-400 ml-1">(Multiple)</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {activityTags.map(tag => (
              <TagButton
                key={tag}
                tag={tag}
                selected={selectedActivities}
                onClick={() => handleTagClick(tag, selectedActivities, setSelectedActivities)}
              />
            ))}
          </div>
        </div>

        {/* Fiyat */}
        <div className="mb-4">
          <h3 className="font-semibold text-gray-700 mb-1">Price</h3>
          <input
            type="range"
            min="0"
            max="12500"
            value={price}
            onChange={e => setPrice(Number(e.target.value))}
            className="w-full range-slider"
          />
          <div className="text-right font-semibold text-primary-600">
            ${price.toLocaleString()}
          </div>
        </div>

        {/* Başlangıç Saati */}
        <div className="mb-4">
          <h3 className="font-semibold text-gray-700 mb-1">Start Time</h3>
          <input
            type="range"
            min="0"
            max="24"
            value={startTime}
            onChange={e => setStartTime(Number(e.target.value))}
            className="w-full range-slider"
          />
          <div className="flex justify-between text-sm text-gray-600 mt-1">
            <span>{formatTime(0)}</span>
            <span>{formatTime(24)}</span>
            <span className="font-semibold text-primary-600">
              {formatTime(startTime)}
            </span>
          </div>
        </div>

        {/* Grup Boyutu */}
        <div className="mb-4">
          <h3 className="font-semibold text-gray-700 mb-1">Group Size</h3>
          <input
            type="range"
            min="1"
            max="100"
            value={groupSize}
            onChange={e => setGroupSize(Number(e.target.value))}
            className="w-full range-slider"
          />
          <div className="text-right font-semibold text-primary-600">
            {groupSize} People
          </div>
        </div>

        {/* Araçlar */}
        <div className="mb-4">
          <h3 className="font-semibold text-gray-700 mb-2">Vehicle</h3>
          <div className="flex flex-wrap gap-2">
            {vehicleTags.map(tag => (
              <TagButton
                key={tag}
                tag={tag}
                selected={selectedVehicles}
                onClick={() => handleTagClick(tag, selectedVehicles, setSelectedVehicles)}
              />
            ))}
          </div>
        </div>

        {/* Özellikler */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-700 mb-2">Features</h3>
          <div className="flex flex-wrap gap-2">
            {featureTags.map(tag => (
              <TagButton
                key={tag}
                tag={tag}
                selected={selectedFeatures}
                onClick={() => handleTagClick(tag, selectedFeatures, setSelectedFeatures)}
              />
            ))}
          </div>
        </div>

        {/* Butonlar */}
        <div className="flex gap-2 mt-4">
          <button
            onClick={handleReset}
            className="flex-1 bg-white border-2 border-primary-500 text-primary-500 py-2 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
          >
            RESET
          </button>
          <button
            onClick={handleSearch}
            className="flex-1 bg-primary-500 text-white py-2 rounded-lg font-semibold hover:bg-primary-600 transition-colors"
          >
            SEARCH
          </button>
        </div>
      </div>
    </div>
  );
}

// Yardımcı Tag bileşeni
const TagButton = ({ tag, selected, onClick }) => (
  <button
    onClick={onClick}
    className={`px-3 py-1 rounded-full border text-sm transition-colors ${
      selected.includes(tag)
        ? "bg-primary-500 text-white border-primary-500"
        : "bg-gray-100 text-gray-700 border-gray-300 hover:border-primary-300"
    }`}
  >
    {tag} (43)
  </button>
);