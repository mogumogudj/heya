import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../main/css/roomcard.css';
import { is } from 'date-fns/locale';
import { set } from 'date-fns';

function RoomCard({ location, houseowner, size }) {
    //in use or not ophalen van de database
    const [isInUse, setIsInUse] = useState(false);
    const [RoomId, setRoomId] = useState(false);
    const navigate = useNavigate();

    const getRoomInfoByOwner = (houseowner, location) => {
        //fetch room info by houseowner and location
        //dit moet wel veilig gebeuren dus misschien met login of id check
        console.log(houseowner, location);
    };


    const viewRoom = () => {
        //moet browsen naar rooms/:id als de current user de owner is
        //anders naar room-info/:id
        navigate('/room-info');
    };

    if (size === 'big') {
        return (
            <div className='your-room room__card room__card--big'>
                <div className='room__card--big__banner'>
                    <img className='your-room--image--big' src="../room.webp" alt="Lange Noordstraat" />
                    <div className="room--tag tag featured room__card__tag">
                        <p>Featured</p>
                    </div>
                </div>
                <div className='room__card--big__status'>
                    <div className='your-room--info'>
                        <h6 className='your-room--location no__padding h6__strong'>{location} 66</h6>
                        <p className='your-room--info__text no__padding'>
                            Antwerp <br />
                            1 Student <br />
                        </p>
                    </div>
                    <div className="in-use">
                        <div className="in-use__circle"></div>
                        <p className="in-use__text no__padding">in use</p>
                    </div>
                </div>
                <div className='your-room--status status--big'>
                    <div className='room__card--big__owner'>
                        <p className='no__padding bold'>Houseowner</p>
                        <div className='owner--visual'>
                            <img className='houseowner__image' src="../tjerk.webp" alt="Houseowner" />
                            <p className='no__padding'>{houseowner}</p>
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
}

export default RoomCard;