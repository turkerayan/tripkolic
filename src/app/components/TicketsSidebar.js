"use client";

import { useState } from "react";

// Etiket tipindeki veriler için örnek
const themeTags = ["Island Tour", "Land Tour", "Safari"];
const activityTags = ["Swimming", "Running", "Elephant care", "Snorkeling"];
const vehicleTags = ["Yacht", "Speedboat", "Safari", "Catamaran", "Speedcatamaran"];
const featureTags = ["Transfer", "Halal Food", "Vegetarian Food"];

export default function FilterSidebar({ isOpen, onClose, onSearch }) {
    if (!isOpen) return null;
  const [location, setLocation] = useState("");
  
  // Çoklu seçim için seçili etiketleri state olarak tutuyoruz
  const [selectedThemes, setSelectedThemes] = useState([]);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [selectedVehicles, setSelectedVehicles] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  // Slider’lar
  // Fiyat aralığı [0...12500], buraya isterseniz min-max şeklinde iki slider ekleyebilirsiniz
  const [price, setPrice] = useState(12500);
  
  // Başlangıç saati [0...24], örnekte 0 -> 00:00, 24 -> 23:59 vb. yaklaşımlar
  const [startTime, setStartTime] = useState(17);
  
  // Grup boyutu [0...100], burayı 40 varsaydık
  const [groupSize, setGroupSize] = useState(40);

  // Herhangi bir etiket (tag) tıklandığında seçili olmasını sağlamak
  const handleTagClick = (tag, selected, setSelected) => {
    if (selected.includes(tag)) {
      // Zaten seçiliyse çıkar
      setSelected(selected.filter((t) => t !== tag));
    } else {
      // Seçili değilse ekle
      setSelected([...selected, tag]);
    }
  };

  // Filtreleri sıfırlama
  const handleReset = () => {
    setLocation("");
    setSelectedThemes([]);
    setSelectedActivities([]);
    setPrice(12500);
    setStartTime(0);
    setGroupSize(40);
    setSelectedVehicles([]);
    setSelectedFeatures([]);
  };

  // Filtreleri uygula (onSearch) - Yukarıdaki verileri parent'a veya global state'e taşıyabilirsiniz
  const handleSearch = () => {
    const filters = {
      location,
      themes: selectedThemes,
      activities: selectedActivities,
      price,
      startTime,
      groupSize,
      vehicles: selectedVehicles,
      features: selectedFeatures,
    };
    console.log("Applied filters =>", filters);
    if (onSearch) onSearch(filters);
    onClose(); // Filtre popup’ını kapatma
  };

  // Yardımcı fonksiyon (saat formatı)
  const formatTime = (value) => {
    // Örnek: 0 -> 00:00, 17 -> 17:00
    const hour = Math.floor(value);
    return hour.toString().padStart(2, "0") + ":00";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Arkaplan karartısı */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      
      {/* Filtre kutusu */}
      <div className="relative bg-white w-[95%] max-w-lg max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl p-5">
        {/* Kapatma butonu */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-primary-500"
        >
          ✕
        </button>

        {/* Başlık */}
        <div className="mt-8 mb-3">
          <h2 className="text-xl font-bold text-primary-500">Tickets</h2>
          <p className="text-xl text-center text-gray-500">Filter</p>
        </div>

        {/* Location */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">
            Location
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Where you wanna visit? (Phi Phi Island, ...)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        {/* Theme (çoklu etiket) */}
        <div className="mb-4">
          <h3 className="font-semibold text-gray-700 mb-2">Theme</h3>
          <div className="flex flex-wrap gap-2">
            {themeTags.map((tag) => (
              <button
                key={tag}
                onClick={() =>
                  handleTagClick(tag, selectedThemes, setSelectedThemes)
                }
                className={`px-3 py-1 rounded-full border text-sm transition
                  ${
                    selectedThemes.includes(tag)
                      ? "bg-primary-500 text-white border-primary-500"
                      : "bg-gray-100 text-gray-700 border-gray-200"
                  }
                `}
              >
                {tag} (43)
              </button>
            ))}
          </div>
        </div>

        {/* Activity (çoklu etiket) */}
        <div className="mb-4">
          <h3 className="font-semibold text-gray-700 mb-2">
            Activity Select List 
            <span className="text-xs text-red-400 ml-1">(Multiple)</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {activityTags.map((tag) => (
              <button
                key={tag}
                onClick={() =>
                  handleTagClick(tag, selectedActivities, setSelectedActivities)
                }
                className={`px-3 py-1 rounded-full border text-sm transition
                  ${
                    selectedActivities.includes(tag)
                      ? "bg-primary-500 text-white border-primary-500"
                      : "bg-gray-100 text-gray-700 border-gray-200"
                  }
                `}
              >
                {tag} (43)
              </button>
            ))}
          </div>
        </div>

        {/* Price Slider */}
        <div className="mb-4">
          <h3 className="font-semibold text-gray-700 mb-1">Price</h3>
          <input
            type="range"
            min="0"
            max="12500"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full"
          />
          <div className="text-right text-gray-700 font-semibold">
            {price}
          </div>
        </div>

        {/* Start Time Slider */}
        <div className="mb-4">
          <h3 className="font-semibold text-gray-700 mb-1">Start Time</h3>
          <input
            type="range"
            min="0"
            max="24"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-600 mt-1">
            <span>{formatTime(0)}</span>
            <span>{formatTime(24)}</span>
            <span className="font-semibold text-black">{formatTime(startTime)}</span>
          </div>
        </div>

        {/* Group Size Slider */}
        <div className="mb-4">
          <h3 className="font-semibold text-gray-700 mb-1">Group Size</h3>
          <input
            type="range"
            min="1"
            max="100"
            value={groupSize}
            onChange={(e) => setGroupSize(e.target.value)}
            className="w-full"
          />
          <div className="text-right text-gray-700 font-semibold">
            {groupSize}
          </div>
        </div>

        {/* Vehicle Tags */}
        <div className="mb-4">
          <h3 className="font-semibold text-gray-700 mb-2">Vehicle</h3>
          <div className="flex flex-wrap gap-2">
            {vehicleTags.map((tag) => (
              <button
                key={tag}
                onClick={() =>
                  handleTagClick(tag, selectedVehicles, setSelectedVehicles)
                }
                className={`px-3 py-1 rounded-full border text-sm transition
                  ${
                    selectedVehicles.includes(tag)
                      ? "bg-primary-500 text-white border-primary-500"
                      : "bg-gray-100 text-gray-700 border-gray-200"
                  }
                `}
              >
                {tag} (43)
              </button>
            ))}
          </div>
        </div>

        {/* Features Tags */}
        <div className="mb-4">
          <h3 className="font-semibold text-gray-700 mb-2">Features</h3>
          <div className="flex flex-wrap gap-2">
            {featureTags.map((tag) => (
              <button
                key={tag}
                onClick={() =>
                  handleTagClick(tag, selectedFeatures, setSelectedFeatures)
                }
                className={`px-3 py-1 rounded-full border text-sm transition
                  ${
                    selectedFeatures.includes(tag)
                      ? "bg-primary-500 text-white border-primary-500"
                      : "bg-gray-100 text-gray-700 border-gray-200"
                  }
                `}
              >
                {tag} (43)
              </button>
            ))}
          </div>
        </div>

        {/* Reset & Search Butonları */}
        <div className="mt-auto flex gap-2">
          <button
            onClick={handleReset}
            className="flex-1 bg-white border border-primary-500 text-primary-500 py-2 rounded font-semibold"
          >
            RESET
          </button>
          <button
            onClick={handleSearch}
            className="flex-1 bg-primary-500 text-white py-2 rounded font-semibold hover:bg-primary-600"
          >
            SEARCH
          </button>
        </div>
      </div>
    </div>
  );
}
