import React, { useEffect, useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import NavApp from '../components/NavApp.jsx';
import Footer from '../../shared/components/Footer.jsx';
import RoomCard from '../components/RoomCard.jsx';
import UserWithRoom from '../../users/components/UserWithRoom.jsx';
import { UserContext } from '../../shared/contexts/UserContext';
import '../css/rooms.css';
import '../../shared/css/app.css';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

function Rooms() {
    const [roomsInUse, setRoomsInUse] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const { userData, isLoading } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            setIsLoggedIn(true);
            setRoomsInUse(userData?.room);
            console.log(userData);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const moveToBlogs = () => {
        window.location.href = '/blogs';
    };

    const moveToHome = () => {
        window.location.href = '/home';
    };

    const addRoom = () => {
        navigate('/accommodation-type-homeowner');
    };

    //als de user ingelogd is gaan we kijken of die student is of houseowner
    //dit moet dus geslecteerd worden van het user profile of die student is of houseowner
    //ophalen uit de DB ipv state mee te geven
    const [Student, setStudent] = useState(false);
    const [Houseowner, setHouseowner] = useState(true);

    if (isLoggedIn) {
        if (Student) {
            const [RoomRented, setRoomRented] = useState(false);
            if (RoomRented) {
                return (
                    <div className="page__container">
                        <NavApp />
                        <UserWithRoom />
                        <Footer />
                    </div>
                );
            } else {
                return (
                    <div className="page__container">
                        <NavApp />
                        <div className="content student__no-room">
                            <div className="student__no-room__text">
                                <h3>It seems you haven't found the right room yet</h3>
                                <p>
                                    Do you need some help? Don’t worry we surely have the right room for you. Try
                                    reading some of our blogs on how to find the perfect room to stay.
                                </p>
                                <div className="room__buttons">
                                    <button onClick={moveToBlogs} className="blue__button">
                                        Our Blogs
                                    </button>
                                    <button onClick={moveToHome} className="white__button">
                                        Our Rooms
                                    </button>
                                </div>
                            </div>
                            <div className="student__no-room__image">
                                <img src="../desktop.webp" alt="Heya will help you out" />
                                <a className="underline" href="/contact">
                                    Don't see your room?
                                </a>
                            </div>
                        </div>
                        <Footer />
                    </div>
                );
            }
        } else if (Houseowner) {
            return (
                <div className="page__container">
                <NavApp />
                <div className="content student__with-room">
                    <div className="room-selector">
                        <h2 className="room-selector__title no__padding">Your rooms</h2>
                        <div className="room-selector--rooms">
                            <div className='houseowner__looped__rooms'>
                                {roomsInUse.length === 0 ? (
                                    <div>No rooms in use.</div>
                                ) : (
                                    roomsInUse.map((room) => <RoomCard key={room} roomId={room} size="big" />)
                                )}
                                <div className="add-room__button" onClick={addRoom}>
                                    <AddIcon sx={{ fontSize: 72 }} />
                                    <h6 className="h6__strong add-room__title">Add room</h6>
                                </div>
                            </div>
                        </div>
                        <div className="room-not-found__button">
                            <a className="underline" href="#">
                                Don't see your room?
                            </a>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
            );
        } else {
            return (
                <div className="page__container">
                    <NavApp />
                    <div className="content">
                        <h1>Error: No student or Houseowner</h1>
                        <p>
                            We seem to have an account error. <br />
                            Please make sure your account is setup correctly on your{' '}
                            <a className="underline" href="profile">
                                profile page
                            </a>{' '}
                            <br />
                            If the error still proceeds{' '}
                            <a className="underline" href="contact">
                                contact us
                            </a>
                            .
                        </p>
                    </div>
                    <Footer />
                </div>
            );
        }
    } else {
        return <Navigate to="/login" />;
    }
}

export default Rooms;