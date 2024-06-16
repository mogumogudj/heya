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
    const { userData, isLoading } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId && userData) {
            setRoomsInUse(userData.room || []);
        }
    }, [userData]);

    const moveToBlogs = () => {
        window.location.href = '/blogs';
    };

    const moveToHome = () => {
        window.location.href = '/home';
    };

    const addRoom = () => {
        navigate('/accommodation-type-homeowner');
    };

    const isLoggedIn = !!localStorage.getItem('userId');
    const isStudent = userData?.role === 'student';
    const isHouseowner = userData?.role === 'houseowner';
    const rentsRoom = userData?.rentsRoom === true;
    const rentsRoomId = userData?.rentsRoomId;

    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }

    if (isStudent) {
        if (rentsRoom) {
            return (
                <div className="page__container">
                    <NavApp />
                    <UserWithRoom roomId={rentsRoomId} />
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
                                Do you need some help? Don’t worry we surely have the right room for you. Try reading
                                some of our blogs on how to find the perfect room to stay.
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
    }

    if (isHouseowner) {
        return (
            <div className="page__container">
                <NavApp />
                <div className="content student__with-room">
                    <div className="room-selector">
                        <h2 className="room-selector__title no__padding">Your rooms</h2>
                        <div className="room-selector--rooms">
                            <div className="houseowner__looped__rooms">
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
    }

    return (
        <div className="page__container">
            <NavApp />
            <div className="content">
                <h1>Error: No student or Houseowner</h1>
                <p>
                    We seem to have an account error. <br />
                    Please make sure your account is set up correctly on your{' '}
                    <a className="underline" href="profile">
                        profile page
                    </a>
                    . <br />
                    If the error still persists,{' '}
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

export default Rooms;
