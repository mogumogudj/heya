import React from 'react';
import "../../shared/css/pinterestRoomGrid.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const rooms = [
    {
        id: 1,
        image: "../../public/kortrijk.webp",
        label: "Featured",
        price: "€1200",
        city: "Leuven",
    },
    {
        id: 2,
        image: "../../public/kortrijk.webp",
        label: "New",
        price: "€950",
        city: "Antwerp",
    },
    {
        id: 3,
        image: "../../public/kortrijk.webp",
        label: "Featured",
        price: "€800",
        city: "Gent",
    },
    {
        id: 4,
        image: "../../public/kortrijk.webp",
        label: "New",
        price: "€1100",
        city: "Brussels",
    },
    {
        id: 5,
        image: "../../public/kortrijk.webp",
        label: "Featured",
        price: "€900",
        city: "Bruges",
    },
    {
        id: 6,
        image: "../../public/kortrijk.webp",
        label: "New",
        price: "€1000",
        city: "Ostend",
    },
    {
        id: 7,
        image: "../../public/kortrijk.webp",
        label: "Featured",
        price: "€850",
        city: "Mechelen",
    },
    {
        id: 8,
        image: "../../public/kortrijk.webp",
        label: "New",
        price: "€950",
        city: "Hasselt",
    },
    {
        id: 9,
        image: "../../public/kortrijk.webp",
        label: "Featured",
        price: "€1200",
        city: "Namur",
    },
    {
        id: 10,
        image: "../../public/kortrijk.webp",
        label: "New",
        price: "€800",
        city: "Liege",
    },
    {
        id: 11,
        image: "../../public/kortrijk.webp",
        label: "Featured",
        price: "€900",
        city: "Mons",
    },
    {
        id: 12,
        image: "../../public/kortrijk.webp",
        label: "New",
        price: "€1000",
        city: "Charleroi",
    }
];

function PinterestRoomGrid({ title }) {
  return (
    <div>
       <h3>{title}</h3>
    <div className="pinterest-room-grid">
      {rooms.map((room) => (
        <div key={room.id} className="pinterest-room-card">
          <img
            src={room.image}
            alt={`Room in ${room.city}`}
            className="pinterest-room-image"
          />
          <p className="pinterest-room-label">{room.label}</p>
          <FavoriteBorderIcon className="pinterest-room-favorite-icon" />
          <div className="pinterest-room-details">
            <h6 className="pinterest-room-price">{room.price}</h6>
            <p className="pinterest-room-city p__strong">{room.city}</p>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
}

export default PinterestRoomGrid;
