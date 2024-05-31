import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom'; 
import NavApp from '../components/NavApp.jsx';
import Footer from '../../shared/components/Footer.jsx';
import '../css/rooms.css';

function Rooms() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            setIsLoggedIn(true);
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
    
    if (isLoggedIn) {
        //als de user ingelogd is gaan we kijken of die student is of houseowner
        //dit moet dus geslecteerd worden van het user profile of die student is of houseowner
        const [Student, setStudent] = useState(true);
        const [Houseowner, setHouseowner] = useState(false);

        if (Student) {
            const [RoomRented, setRoomRented] = useState(false);
            if (RoomRented) {
                return (
                    <div className="page__container">
                        <NavApp />
                        <div className="content">
                            <h1>Your room</h1>
                            <p>dit moet nog uitgewerkt worden</p>
                        </div>
                        <Footer />
                    </div>
                );
            } else {  
                return (
                    <div className="page__container">
                        <NavApp />
                        <div className="content student__no-room">
                            <div className='student__no-room__text'>
                                <h3>It seems you haven't found the right room yet</h3>
                                <p>
                                    Do you need some help?  Don’t worry we surely have the right room for you. 
                                    Try reading some of our blogs on how to find the perfect room to stay.
                                </p>
                                <div className='no-room__buttons'>
                                    <button onClick={moveToBlogs} className="blue__button">
                                        Our Blogs
                                    </button>
                                    <button onClick={moveToHome} className="white__button">
                                        Our Rooms
                                    </button>
                                </div>
                            </div>
                            <div  className='student__no-room__image'>
                                <img src="../desktop.webp" alt="Heya will help you out" />
                                <a className='underline' href="/contact">Don't see your room?</a>
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
                    <div className="content">
                        <h1>Your rooms</h1>
                        <p>dit moet nog uitgewerkt worden</p>
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
                        <p>dit moet een error weergeven</p>
                    </div>
                    <Footer />
                </div>
            );
        }
    } else {
        //er is niet ingelogd dus moet redirecten naar login
        return <Navigate to="/login" />;
    }
}

export default Rooms;
