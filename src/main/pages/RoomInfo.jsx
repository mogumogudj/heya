import React, { useEffect, useState } from 'react';
import NavApp from '../components/NavApp.jsx';
import Nav from '../../heya-web/components/Nav.jsx';
import Footer from '../../shared/components/Footer.jsx';
import PersonCard from '../components/PersonCard.jsx';
import '../css/room-info.css';
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

function RoomInfo() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const BookThisRoom = () => {
        //moet deze room booken en dan naar calendar gaan
        //nu tijdelijk console log
        console.log('Room booked');
    };

    const moveToChat = () => {
        window.location.href = '/chat';
        //moet later ineens naar de juiste chat gaan
    };

    const goBack = () => {
        window.history.back();
    };

   //if the window size is bigger than mobile (800px) return this
   if (window.innerWidth > 800) {
        return (
            <div className="page__container">
                {isLoggedIn ? <NavApp /> : <Nav />}
                <div className="content">
                    <a className="underline back-button" href="#" onClick={goBack}>
                        Back
                    </a>
                    <div className="room__main-content">
                        <div className="room__images">
                            <div className="room__images-all">
                                <img
                                    className="room__image room__image1 active"
                                    src="../Rodestraat1.webp"
                                    alt="Rodestraat 52, image1"
                                />
                                <img
                                    className="room__image room__image2"
                                    src="../Rodestraat2.webp"
                                    alt="Rodestraat 52, image2"
                                />
                                <img
                                    className="room__image room__image3"
                                    src="../Rodestraat3.webp"
                                    alt="Rodestraat 52, image3"
                                />
                                <img
                                    className="room__image room__image4"
                                    src="../Rodestraat4.webp"
                                    alt="Rodestraat 52, image4"
                                />
                                <img
                                    className="room__image room__image5"
                                    src="../Rodestraat5.webp"
                                    alt="Rodestraat 52, image5"
                                />
                                <img
                                    className="room__image room__image6"
                                    src="../Rodestraat6.webp"
                                    alt="Rodestraat 52, image6"
                                />
                            </div>
                            <div className="room__images-main">
                                <img src="../Rodestraat1.webp" alt="Rodestraat 52, imageX" />
                            </div>
                        </div>
                        <div className="room__overview">
                            <div className="room__tags">
                                <div className="room--tag tag featured">
                                    <p>Featured</p>
                                </div>
                                <div className="room--tag tag opening">
                                    <p>Opening 12/6</p>
                                </div>
                            </div>
                            <h1 className="room__location">Rodestraat 52</h1>
                            <div className="room--details">
                                <div className="room--basics">
                                    <div className="room--basics--location room--basics__item">
                                        <LocationOnIcon />
                                        <div className="room--basics__item__text">
                                            <p className="room--basics__item__name no__padding">Location</p>
                                            <span className="room--basics__item__value">Leuven</span>
                                        </div>
                                    </div>
                                    <div className="room--basics--space room--basics__item">
                                        <SwapHorizontalCircleRoundedIcon />
                                        <div className="room--basics__item__text">
                                            <p className="room--basics__item__name no__padding">Space</p>
                                            <span className="room--basics__item__value">12m²</span>
                                        </div>
                                    </div>
                                    <div className="room--basics--type room--basics__item">
                                        <MapsHomeWorkRoundedIcon />
                                        <div className="room--basics__item__text">
                                            <p className="room--basics__item__name no__padding">Type</p>
                                            <span className="room--basics__item__value">Townhouse</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="room--icons">
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
                            <div className="room__description">
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
                            <div className="room__buttons">
                                <button onClick={BookThisRoom} className="blue__button">
                                    Book this room
                                </button>
                                <button onClick={moveToChat} className="white__button">
                                    Contact the owner
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="room__secondary-content">
                        <div className="room__info">
                            <div className="room__info--text">
                                <div className="room__info--usage">
                                    <div className="room__info--shared text__container">
                                        <h4 className="room__info--shared__title text__container__title">For shared use</h4>
                                        <ul className="room__info--shared__list">
                                            <li className="room__info--shared__item">Shared kitchen</li>
                                            <li className="room__info--shared__item">Shared washing machine</li>
                                        </ul>
                                    </div>
                                    <div className="room__info--private text__container">
                                        <h4 className="room__info--private__title text__container__title">
                                            For private use of tenant
                                        </h4>
                                        <ul className="room__info--private__list">
                                            <li className="room__info--private__item">Private toilet</li>
                                            <li className="room__info--private__item">Private bathroom</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="room__info--safety">
                                    <div className="room__info--security text__container">
                                        <h4 className="room__info--security__title text__container__title">
                                            Safety & Security items
                                        </h4>
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
                                        <h4 className="room__info--rules__title text__container__title">Rules</h4>
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
                            <div className="room__info--people">
                                <div className="room__people">
                                    <PersonCard userType="houseowner" name="Tjerk Symens" userId="664b5987cb1cbc49eec04488" />  
                                    <PersonCard userType="student" name="Wolf Ver Elst" userId="666880c8ff0ca0a7fef48a67" />
                                </div>
                                <p className="no__padding">
                                    Something wrong? Please{' '}
                                    <a className="underline" href="/contact">
                                        Contact us
                                    </a>
                                </p>
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
                {isLoggedIn ? <NavApp /> : <Nav />}
                <div className="room__content">
                    <div className='room__intro'>
                        <div className="room__images-main">
                            <img src="../Rodestraat1.webp" alt="Rodestraat 52, imageX" />
                        </div>
                        <a className="back-button" href="#" onClick={goBack}>
                            <ArrowBackIosNewRoundedIcon />
                        </a>
                        <div className='room__location--info'>
                            <p className='room__amount'>1 Room</p>
                            <h1 className="room__location">Rodestraat 52</h1>
                        </div>
                        <div className='room__pricing'>
                            <p className='room__price'>€350</p>
                            <p className='room__price__timespan'>/month</p>
                        </div>
                        <div className="room--basics">
                            <div className="room--basics--location room--basics__item">
                                <LocationOnIcon />
                                <div className="room--basics__item__text">
                                    <p className="room--basics__item__name no__padding">Location</p>
                                    <span className="room--basics__item__value">Leuven</span>
                                </div>
                            </div>
                            <div className="room--basics--space room--basics__item">
                                <SwapHorizontalCircleRoundedIcon />
                                <div className="room--basics__item__text">
                                    <p className="room--basics__item__name no__padding">Space</p>
                                    <span className="room--basics__item__value">12m²</span>
                                </div>
                            </div>
                            <div className="room--basics--type room--basics__item">
                                <MapsHomeWorkRoundedIcon />
                                <div className="room--basics__item__text">
                                    <p className="room--basics__item__name no__padding">Type</p>
                                    <span className="room--basics__item__value">Townhouse</span>
                                </div>
                            </div>
                        </div>
                        <div className="room__images-all">
                            <img
                                className="room__image room__image1 active"
                                src="../Rodestraat1.webp"
                                alt="Rodestraat 52, image1"
                            />
                            <img
                                className="room__image room__image2"
                                src="../Rodestraat2.webp"
                                alt="Rodestraat 52, image2"
                            />
                            <img
                                className="room__image room__image3"
                                src="../Rodestraat3.webp"
                                alt="Rodestraat 52, image3"
                            />
                            <img
                                className="room__image room__image4"
                                src="../Rodestraat4.webp"
                                alt="Rodestraat 52, image4"
                            />
                            <img
                                className="room__image room__image5"
                                src="../Rodestraat5.webp"
                                alt="Rodestraat 52, image5"
                            />
                            <img
                                className="room__image room__image6"
                                src="../Rodestraat6.webp"
                                alt="Rodestraat 52, image6"
                            />
                        </div>
                    </div>
                    <div className='room__statistics'>
                        <div className='room__statistics--marker'></div>
                        <div className='information__button information__button--room'>
                            <InfoOutlinedIcon fontSize="small" />
                        </div>
                        <div className='room__overall'>
                            <div className='room__amenities'>
                                <div className='room__amenity__icon room__amenity--bike'>
                                    <DirectionsBikeRoundedIcon fontSize="20px" />
                                </div>
                                <div className='room__amenity__icon room__amenity--sink'>
                                    <CountertopsRoundedIcon fontSize="20px" />
                                </div>
                                <div className='room__amenity__icon room__amenity--shower'>
                                    <ShowerRoundedIcon fontSize="20px" />
                                </div>
                            </div>
                            <div className='room__help--amount'>
                                <div className='room__help--text'>
                                    <HandshakeRoundedIcon fontSize="small" />
                                    <p className='no__padding'>Help needed:</p>
                                </div>
                                <div className="help--tag tag featured no__padding">
                                    <p>Average</p>
                                </div>
                            </div>
                        </div>
                        <div className="room__description--overview text__container">
                            <h3 className="room__description--overview__title text__container__title">Overview</h3>
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
                        <div className="room__description--description text__container">
                            <h3 className="room__description--description__title text__container__title">
                                Description
                            </h3>
                            <p className="room__description--description__text no__padding">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                                Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                                unknown printer
                            </p>
                        </div>
                        <div className="room--icons">
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
                                <h4 className="remaining--icons__amount">+8</h4>
                            </div>
                        </div>
                        <div className='divider divider--room'></div>
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
                            <div className='divider divider--room'></div>
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
                        <div className='divider divider--room'></div>
                        <div className="room__info--people">
                            <div className="room__people">
                                <div className="room__person person__card owner">
                                    <img
                                        className="owner__image profile__image person__card--image"
                                        src="../tjerk.webp"
                                        alt="Tjerk Symens"
                                    />
                                    <div className="person__card--info">
                                        <p className="person__card--name no__padding">Tjerk Symens</p>
                                        <p className="person__card--basics no__padding">
                                            Houseowner <br />
                                            Leuven
                                        </p>
                                        <div className="person--tag tag default no__padding">
                                            <p>Owner</p>
                                        </div>
                                    </div>
                                    <div className="person__card--links">
                                        <div className="person__card--chat" onClick={chatWithThisPerson}>
                                            <img src="../nav/chat.svg" alt="chat" />
                                            <p className="no__padding person__card--chat__text">Chat now</p>
                                        </div>
                                        <button onClick={ViewProfile} className="blue__button person__card--button">
                                            View
                                        </button>
                                    </div>
                                </div>
                                <div className="room__person person__card student">
                                    <img
                                        className="owner__image profile__image person__card--image"
                                        src="../wolf.webp"
                                        alt="Wolf Ver Elst"
                                    />
                                    <div className="person__card--info">
                                        <p className="person__card--name no__padding">Wolf Ver Elst</p>
                                        <p className="person__card--basics no__padding">
                                            Student <br />
                                            Leuven
                                        </p>
                                        <div className="person--tag tag new no__padding">
                                            <p>Renting</p>
                                        </div>
                                    </div>
                                    <div className="person__card--links">
                                        <div className="person__card--chat" onClick={chatWithThisPerson}>
                                            <img src="../nav/chat.svg" alt="chat" />
                                            <p className="no__padding person__card--chat__text">Chat now</p>
                                        </div>
                                        <button onClick={ViewProfile} className="blue__button person__card--button">
                                            View
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <p className="no__padding">
                                Something wrong? Please{' '}
                                <a className="underline" href="/contact">
                                    Contact us
                                </a>
                            </p>
                        </div>
                        <div className="room__buttons">
                            <button onClick={BookThisRoom} className="blue__button">
                                Book this room
                            </button>
                            <button onClick={moveToChat} className="white__button">
                                Contact the owner
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
   }
}

export default RoomInfo;
