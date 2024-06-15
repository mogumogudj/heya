import React, { useState, useEffect } from 'react';
import '../../shared/css/pinterestRoomGrid.css';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

function PinterestRoomGrid({ title }) {
    const [rooms, setRooms] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/rooms`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setRooms(data);
            } catch (error) {
                console.error('Error fetching rooms:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchRooms();
    }, []);

    const openRoom = (id) => {
        location.href = `/room-info/${id}`;
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!rooms.length) {
        return <div>No rooms available</div>;
    }

    return (
        <div className="pinterest-room-total">
            <div className="filters-title">
                <h4>
                    <span className="bold">{rooms.length}</span>
                    {title}
                    <span className="bold">bike</span>
                </h4>
            </div>
            <div className="pinterest-room-grid">
                {rooms.map((room) => (
                    <div key={room._id} className="pinterest-room-card" onClick={() => openRoom(room._id)}>
                        <img src={room?.images[0]} alt={`Room in ${room?.city}`} className="pinterest-room-image" />
                        <FavoriteBorderIcon className="pinterest-room-favorite-icon" />
                        <div className="pinterest-room-details">
                            <h6 className="pinterest-room-price">€{room?.pricing[0]?.rent}</h6>
                            <p className="pinterest-room-city p__strong">{room?.city}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PinterestRoomGrid;
