import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import NavApp from '../components/NavApp.jsx';
import Footer from '../../shared/components/Footer.jsx';
import PersonCard from '../components/PersonCard.jsx';
import '../css/rooms.css';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';

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
            const [RoomRented, setRoomRented] = useState(true);
            if (RoomRented) {
                return (
                    <div className="page__container">
                        <NavApp />
                        <div className="content student__with-room">
                            <div className="room__basic-info">
                                <div className="room__basic-info__text">
                                    <h1 className='no__padding'>Your room</h1>
                                    <div className="in-use">
                                        <div className="in-use__circle"></div>
                                        <p className="in-use__text">in use</p>
                                    </div>
                                </div>
                                <div className="room__basic-info__cards">
                                    <div className='basic-info__card basic-info__card--rating'>
                                        <AutoAwesomeRoundedIcon sx={{ fontSize: 72 }} className='basic-info__card__icon rating__icon' />
                                        <p className='basic-info__card__text rating__title'>Rate your room</p>
                                    </div>
                                    <div className='basic-info__card basic-info__card--unpaid'>
                                        <p className='basic-info__card__text unpaid__title'>Unpaid rent: June</p>
                                        <p className='basic-info__card__text unpaid__value'>€340</p>
                                    </div>
                                </div>
                            </div>
                            <div className="room__image__container">
                                <div className="ellipse--image ellipse--room"></div>
                                <div className="room--location--tag">
                                    <div className="room--tag tag featured">
                                        <p>Featured</p>
                                    </div>
                                    <p className="room--location">Lange Noordstraat 66</p>
                                </div>
                            </div>
                            <div className='room__info'>
                                <div className='room__info__main-content'>
                                    <div className="room__people">
                                        <PersonCard userType="houseowner" name="Tjerk Symens" />  
                                        <PersonCard userType="student" name="Wolf Ver Elst" />
                                    </div>
                                </div>
                                <div className='room__info__side-content'>

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
                        <div className="content student__no-room">
                            <div className="student__no-room__text">
                                <h3>It seems you haven't found the right room yet</h3>
                                <p>
                                    Do you need some help? Don’t worry we surely have the right room for you. Try
                                    reading some of our blogs on how to find the perfect room to stay.
                                </p>
                                <div className="no-room__buttons">
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
