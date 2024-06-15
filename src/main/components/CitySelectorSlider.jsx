import React, { useRef } from "react";
import "../css/city-selector-slider.css";

const cities = [
  { id: 1, name: "Antwerp", image: "../antwerpen.webp" },
  { id: 2, name: "Leuven", image: "../leuven.webp" },
  { id: 3, name: "Ghent", image: "../gent.webp" },
  { id: 4, name: "Brussels", image: "../brussel.webp" },
  { id: 5, name: "Kortrijk", image: "../kortrijk.webp" },
  { id: 6, name: "Hasselt", image: "../hasselt.webp" },
];

const CitySelector = ({ title }) => {
  const cityCardContainerRef = useRef(null);
  let isDown = false;
  let startX;
  let scrollLeft;

  const handleMouseDown = (event) => {
    isDown = true;
    startX = event.pageX - cityCardContainerRef.current.offsetLeft;
    scrollLeft = cityCardContainerRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDown = false;
  };

  const handleMouseUp = () => {
    isDown = false;
  };

  const handleMouseMove = (event) => {
    if (!isDown) return;
    event.preventDefault();
    const x = event.pageX - cityCardContainerRef.current.offsetLeft;
    const walk = (x - startX) * 3;
    cityCardContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="city-slider">
      <h3>{title}</h3>
      <div
        className="city-card-container"
        ref={cityCardContainerRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {cities.map((city) => (
          <div key={city.id} className="city-card">
            <img src={city.image} alt={city.name} className="city-image" />
            <h4 className="city-name bold">{city.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CitySelector;
