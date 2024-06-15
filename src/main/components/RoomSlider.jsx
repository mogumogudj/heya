import React, { useRef, useState, useEffect } from 'react';
import '../../shared/css/roomSlider.css';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

function RoomSlider({ title }) {
    const roomCardContainerRef = useRef(null);
    const [rooms, setRooms] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    let isDown = false;
    let startX;
    let scrollLeft;

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
                    <div key={room._id} className="room-card" onClick={() => openRoom(room._id)}>
                        <img src={room.images[0]} alt={`Room in ${room.city}`} className="room-image" />
                        <p className="room-label">{room.label}</p>
                        <FavoriteBorderIcon className="room-favorite-icon" />
                        <div className="room-details">
                            <h6 className="room-price">€{room.pricing[0]?.rent}</h6>
                            <p className="room-city bold">{room.city}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RoomSlider;
