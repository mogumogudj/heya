import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../main/css/roomcard.css';

function RoomCard({ roomId, size }) {
    const [roomData, setRoomData] = useState(null);
    const [ownerData, setOwnerData] = useState(null); // State to store owner data
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRoomData = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/rooms/${roomId}`);
                const data = await response.json();
                setRoomData(data);

                const ownerResponse = await fetch(`${import.meta.env.VITE_API_URL}/users/${data.owner}`);
                const ownerData = await ownerResponse.json();
                setOwnerData(ownerData);
            } catch (error) {
                console.error('Failed to fetch room or owner data:', error);
            }
        };

        fetchRoomData();
    }, [roomId]);

    const viewRoom = () => {
        navigate(`/room-info/${roomId}`);
    };

    if (!roomData || !ownerData) {
        return <div>Loading...</div>;
    }

    if (size === 'big') {
        return (
            <div className="your-room room__card room__card--big">
                <div className="room__card--big__banner">
                    <img className="your-room--image--big" src="../room.webp" alt={roomData.city} />
                    <div className="room--tag tag featured room__card__tag">
                        <p>Featured</p>
                    </div>
                </div>
                <div className="room__card--big__status">
                    <div className="your-room--info">
                        <h6 className="your-room--location no__padding h6__strong">
                            {roomData.streetName} {roomData.houseNumber}
                        </h6>
                        <p className="your-room--info__text no__padding">
                            {roomData.city} <br />
                            {roomData?.propertyDetails[0]?.totalRooms} Student(s) <br />
                        </p>
                    </div>
                    <div className="in-use">
                        <div className="in-use__circle"></div>
                        <p className="in-use__text no__padding">in use</p>
                    </div>
                </div>
                <div className="your-room--status status--big">
                    <div className="room__card--big__owner">
                        <p className="no__padding bold">Houseowner</p>
                        <div className="owner--visual">
                            <img className="houseowner__image" src="../tjerk.webp" alt="Houseowner" />
                            <p className="no__padding">{ownerData.firstName}</p>
                        </div>
                    </div>
                    <button onClick={viewRoom} className="blue__button card__button--big">
                        View room
                    </button>
                </div>
            </div>
        );
    } else {
        return (
            <div className="your-room room__card">
                <img className="your-room--image" src={roomData?.images[0]} alt={roomData?.city} />
                <div className="your-room--info">
                    <p className="your-room--location no__padding">{roomData?.city}</p>
                    <p className="your-room--info__text no__padding">
                        <span className="your-room--attendants">1 Student</span> <br />
                        Antwerp <br />
                        Houseowner: <br />
                        <span className="your-room--owner">{ownerData.firstName}</span>
                    </p>
                </div>
                <div className="your-room--status">
                    <div className="in-use">
                        <div className="in-use__circle"></div>
                        <p className="in-use__text no__padding">in use</p>
                    </div>
                    <button onClick={viewRoom} className="blue__button">
                        View
                    </button>
                </div>
            </div>
        );
    }
}

export default RoomCard;
