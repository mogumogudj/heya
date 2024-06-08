import React, { useRef } from "react";
import "../../shared/css/roomSlider.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const rooms = [
  {
    id: 1,
    image: "../kortrijk.webp",
    label: "Featured",
    price: "€1200",
    city: "Leuven",
  },
  {
    id: 2,
    image: "../kortrijk.webp",
    label: "New",
    price: "€950",
    city: "Antwerp",
  },
  {
    id: 3,
    image: "../kortrijk.webp",
    label: "Featured",
    price: "€800",
    city: "Gent",
  },
  {
    id: 4,
    image: "../kortrijk.webp",
    label: "New",
    price: "€1100",
    city: "Brussels",
  },
  {
    id: 5,
    image: "../kortrijk.webp",
    label: "Featured",
    price: "€900",
    city: "Bruges",
  },
  {
    id: 6,
    image: "../kortrijk.webp",
    label: "New",
    price: "€1000",
    city: "Ostend",
  },
  {
    id: 7,
    image: "../kortrijk.webp",
    label: "Featured",
    price: "€850",
    city: "Mechelen",
  },
  {
    id: 8,
    image: "../kortrijk.webp",
    label: "New",
    price: "€950",
    city: "Hasselt",
  },
  {
    id: 9,
    image: "../kortrijk.webp",
    label: "Featured",
    price: "€1200",
    city: "Namur",
  },
  {
    id: 10,
    image: "../kortrijk.webp",
    label: "New",
    price: "€800",
    city: "Liege",
  },
  {
    id: 11,
    image: "../kortrijk.webp",
    label: "Featured",
    price: "€900",
    city: "Mons",
  },
  {
    id: 12,
    image: "../kortrijk.webp",
    label: "New",
    price: "€1000",
    city: "Charleroi",
  }
];

function RoomSlider({title}) {
  const roomCardContainerRef = useRef(null);
  let isDown = false;
  let startX;
  let scrollLeft;

  const handleMouseDown = (event) => {
    isDown = true;
    startX = event.pageX - roomCardContainerRef.current.offsetLeft;
    scrollLeft = roomCardContainerRef.current.scrollLeft;
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
    const x = event.pageX - roomCardContainerRef.current.offsetLeft;
    const walk = (x - startX) * 3; 
    roomCardContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="room-slider">
      <div className="flex-container mb-4">
        <h3>{title}</h3>
        <button className="more-rooms-button blue__button small">See more</button>
      </div>

      <div
        className="room-card-container"
        ref={roomCardContainerRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {rooms.map((room) => (
          <div key={room.id} className="room-card">
            <img
              src={room.image}
              alt={`Room in ${room.city}`}
              className="room-image"
            />
            <p className="room-label">{room.label}</p>
            <FavoriteBorderIcon className="room-favorite-icon" />
            <div className="room-details">
              <h6 className="room-price">{room.price}</h6>
              <p className="room-city bold">{room.city}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RoomSlider;
