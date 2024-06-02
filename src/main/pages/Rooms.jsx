import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import NavApp from '../components/NavApp.jsx';
import Footer from '../../shared/components/Footer.jsx';
import PersonCard from '../components/PersonCard.jsx';
import '../css/rooms.css';
import '../../shared/css/app.css';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SwapHorizontalCircleRoundedIcon from '@mui/icons-material/SwapHorizontalCircleRounded';
import MapsHomeWorkRoundedIcon from '@mui/icons-material/MapsHomeWorkRounded';
import FitnessCenterRoundedIcon from '@mui/icons-material/FitnessCenterRounded';
import TvRoundedIcon from '@mui/icons-material/TvRounded';
import DirectionsBikeRoundedIcon from '@mui/icons-material/DirectionsBikeRounded';
import WifiRoundedIcon from '@mui/icons-material/WifiRounded';
import RadioRoundedIcon from '@mui/icons-material/RadioRounded';
import HotelRoundedIcon from '@mui/icons-material/HotelRounded';
import ChairRoundedIcon from '@mui/icons-material/ChairRounded';
import CottageRoundedIcon from '@mui/icons-material/CottageRounded';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import HandshakeRoundedIcon from '@mui/icons-material/HandshakeRounded';
import CountertopsRoundedIcon from '@mui/icons-material/CountertopsRounded';
import ShowerRoundedIcon from '@mui/icons-material/ShowerRounded';

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

    const stopRentingRoom = () => {
        //moet de room stoppen met huren
        //nu tijdelijk console.log
        console.log('Room is stopped renting');
    };

    const reportProblem = () => {
        //moet naar de report problem pagina gaan
        //nu tijdelijk contact
        window.location.href = '/contact';
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
                                    <div className="room__people--main">
                                        <div className='room__person--full text__container'>
                                            <h4 className='room__person__type text__container__title'>Owner</h4>
                                            <PersonCard userType="houseowner" name="Tjerk Symens" /> 
                                        </div> 
                                        <div className='room__person--full text__container'>
                                            <h4 className='room__person__type text__container__title'>Student</h4>
                                            <PersonCard userType="student" name="Wolf Ver Elst" />
                                        </div>
                                    </div>
                                    <div className='divider divider--room'></div>
                                    <div className='room__transactions'>
                                        <h2 className='room__transactions__title'>Transactions</h2>
                                        <div className='transactions__list'>
                                            <div className='transaction__item'>
                                                <div className='transaction__main'>
                                                    <img
                                                        className="owner__image profile__image person__card--image"
                                                        src="../tjerk.webp"
                                                        alt="Tjerk Symens"
                                                    />
                                                    <div className='transaction__info'>
                                                        <h4 className='transaction__name no__padding'>Tjerk Symens</h4>
                                                        <p className='transaction__date no__padding'>June 2024</p>
                                                    </div>
                                                </div>
                                                <div className='transaction__price'>
                                                    <h3 className='transaction__price__value no__padding'>€34,50</h3>
                                                    <p className='transaction__time no__padding'>2:42 PM</p>
                                                </div>
                                            </div>
                                            <div className='transaction__item'>
                                                <div className='transaction__main'>
                                                    <img
                                                        className="owner__image profile__image person__card--image"
                                                        src="../wolf.webp"
                                                        alt="Wolf Ver Elst"
                                                    />
                                                    <div className='transaction__info'>
                                                        <h4 className='transaction__name no__padding'>Wolf Ver Elst</h4>
                                                        <p className='transaction__date no__padding'>June 2024</p>
                                                    </div>
                                                </div>
                                                <div className='transaction__price'>
                                                    <h3 className='transaction__price__value no__padding'>€34,50</h3>
                                                    <p className='transaction__time no__padding'>2:42 PM</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='room__more-info'>
                                            <h2 className='room__transactions__title no__padding'>More information</h2>
                                            <div className="room__info--usage">
                                                <div className="room__info--shared text__container">
                                                    <h3 className="room__info--shared__title text__container__title">For shared use</h3>
                                                    <ul className="room__info--shared__list">
                                                        <li className="room__info--shared__item">Shared kitchen</li>
                                                        <li className="room__info--shared__item">Shared washing machine</li>
                                                    </ul>
                                                </div>
                                                <div className="room__info--private text__container">
                                                    <h3 className="room__info--private__title text__container__title">
                                                        For private use of tenant
                                                    </h3>
                                                    <ul className="room__info--private__list">
                                                        <li className="room__info--private__item">Private toilet</li>
                                                        <li className="room__info--private__item">Private bathroom</li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className='divider divider--room'></div>
                                            <div className="room__info--safety">
                                                <div className="room__info--security text__container">
                                                    <h3 className="room__info--security__title text__container__title">
                                                        Safety & Security items
                                                    </h3>
                                                    <div className="room__info--security__basics">
                                                        <div className="security__basics--box">
                                                            <HotelRoundedIcon fontSize="small" />
                                                            <p className="security__basics--text no__padding">Fire extinguisher</p>
                                                        </div>
                                                        <div className="security__basics--box">
                                                            <SwapHorizontalCircleRoundedIcon fontSize="small" />
                                                            <p className="security__basics--text no__padding">
                                                                Security Camera's around the house
                                                            </p>
                                                        </div>
                                                        <div className="security__basics--box">
                                                            <ChairRoundedIcon fontSize="small" />
                                                            <p className="security__basics--text no__padding">Covered bicycle shed</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="room__info--rules text__container">
                                                    <h3 className="room__info--rules__title text__container__title">Rules</h3>
                                                    <div className="room__info--rules__basics">
                                                        <div className="rules__basics--box">
                                                            <HotelRoundedIcon fontSize="small" />
                                                            <p className="rules__basics--text no__padding">
                                                                Please don't come home after midnight
                                                            </p>
                                                        </div>
                                                        <div className="rules__basics--box">
                                                            <SwapHorizontalCircleRoundedIcon fontSize="small" />
                                                            <p className="rules__basics--text no__padding">No loud music</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='room__info__side-content'>
                                    <div className='side-content--overview'>
                                        <div className="room__description--overview text__container">
                                            <h4 className="room__description--overview__title text__container__title">Overview</h4>
                                            <div className="room__description--overview__basics">
                                                <div className="overview__basics--box">
                                                    <HotelRoundedIcon fontSize="small" />
                                                    <p className="overview__basics--text no__padding">Room, 1 person</p>
                                                </div>
                                                <div className="overview__basics--box">
                                                    <SwapHorizontalCircleRoundedIcon fontSize="small" />
                                                    <p className="overview__basics--text no__padding">12m² Personal space</p>
                                                </div>
                                                <div className="overview__basics--box">
                                                    <ChairRoundedIcon fontSize="small" />
                                                    <p className="overview__basics--text no__padding">Non-furnished</p>
                                                </div>
                                                <div className="overview__basics--box">
                                                    <CottageRoundedIcon fontSize="small" />
                                                    <p className="overview__basics--text no__padding">150m² Entire house</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="room--icons--edit">
                                            <div className="room--icon">
                                                <FitnessCenterRoundedIcon />
                                                <p className="room--icon__description">Fitness</p>
                                            </div>
                                            <div className="room--icon">
                                                <TvRoundedIcon />
                                                <p className="room--icon__description">TV</p>
                                            </div>
                                            <div className="room--icon">
                                                <DirectionsBikeRoundedIcon />
                                                <p className="room--icon__description">Bike</p>
                                            </div>
                                            <div className="room--icon">
                                                <WifiRoundedIcon />
                                                <p className="room--icon__description">Wi-Fi</p>
                                            </div>
                                            <div className="room--icon">
                                                <RadioRoundedIcon />
                                                <p className="room--icon__description">Radio</p>
                                            </div>
                                            <div className="remaining--icons">
                                                <h6 className="remaining--icons__amount">+8</h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='side-content--description'>
                                        <div className="room__description--description text__container">
                                            <h4 className="room__description--description__title text__container__title">
                                                Description
                                            </h4>
                                            <p className="room__description--description__text no__padding">
                                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                                                Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                                                unknown printer
                                            </p>
                                        </div>
                                    </div>
                                    <div className="rent__buttons">
                                        <button onClick={stopRentingRoom} className="red__button">
                                            Stop Renting this room
                                        </button>
                                        <button onClick={reportProblem} className="white__button">
                                            Report a problem
                                        </button>
                                        <a href="/contact" className='underline'>I need help</a>
                                    </div>
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
