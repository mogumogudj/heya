import React, { useState } from 'react';
import '../../main/css/roomcard.css';

function RoomCard({ location, houseowner }) {
    //in use or not ophalen van de database
    const [isInUse, setIsInUse] = useState(false);

    const getRoomInfoByOwner = (houseowner, location) => {
        //fetch room info by houseowner and location
        //dit moet wel veilig gebeuren dus misschien met login of id check
    };

    const viewRoom = () => {
        //moet deze pagina herladen met de juiste kamer
        //nu tijdelijk console.log
        console.log('View room');
    };

    return (
        <div className='your-room room__card'>
            <img className='your-room--image' src="../room.webp" alt="Lange Noordstraat" />
            <div className='your-room--info'>
                <p className='your-room--location no__padding'>{location}</p>
                <p className='your-room--info__text no__padding'>
                    <span className='your-room--attendants'>1 Student</span> <br />
                    Antwerp <br />
                    Houseowner: <br />
                    <span className='your-room--owner'>{houseowner}</span>
                </p>
            </div>
            <div className='your-room--status'>
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

export default RoomCard;