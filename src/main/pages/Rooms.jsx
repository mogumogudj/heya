import React, { useEffect, useState, useContext } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import NavApp from '../components/NavApp.jsx';
import Footer from '../../shared/components/Footer.jsx';
import PersonCard from '../components/PersonCard.jsx';
import RoomCard from '../components/RoomCard.jsx';
import TransactionCard from '../components/TransactionCard.jsx';
import RoomStatistics from '../components/RoomStatistics.jsx';
import OverallStatistics from '../components/OverallStatistics.jsx';
import { UserContext } from '../../shared/contexts/UserContext';
import '../css/rooms.css';
import '../../shared/css/app.css';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import SwapHorizontalCircleRoundedIcon from '@mui/icons-material/SwapHorizontalCircleRounded';
import FitnessCenterRoundedIcon from '@mui/icons-material/FitnessCenterRounded';
import TvRoundedIcon from '@mui/icons-material/TvRounded';
import DirectionsBikeRoundedIcon from '@mui/icons-material/DirectionsBikeRounded';
import WifiRoundedIcon from '@mui/icons-material/WifiRounded';
import RadioRoundedIcon from '@mui/icons-material/RadioRounded';
import HotelRoundedIcon from '@mui/icons-material/HotelRounded';
import ChairRoundedIcon from '@mui/icons-material/ChairRounded';
import CottageRoundedIcon from '@mui/icons-material/CottageRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import BarChartIcon from '@mui/icons-material/BarChart';
import PieChartIcon from '@mui/icons-material/PieChart';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

function Rooms() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const { userData, isLoading } = useContext(UserContext);
    const navigate = useNavigate();

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
        window.location.href = '/contact';
    };

    const changeThisRoom = () => {
        navigate('/accommodation-type-homeowner');
        //dit werkt niet, want maakt nieuwe room aan ipv huidige aan te passen
    };

    const allRooms = () => {
        //moet alle rooms laten zien
        //nu tijdelijk console.log
        console.log('All rooms');
    };

    const [activeCard, setActiveCard] = useState('occupancy');
    const [roomStatistics, setRoomStatistics] = useState('occupancy');

    const openOccupancy = () => {
        setRoomStatistics('occupancy');
        setActiveCard('occupancy');
    };

    const openEngage = () => {
        setRoomStatistics('engage');
        setActiveCard('engage');
    };

    const openIncome = () => {
        setRoomStatistics('income');
        setActiveCard('income');
    };

    const openSatisfaction = () => {
        setRoomStatistics('satisfaction');
        setActiveCard('satisfaction');
    };

    const { RoomId: urlRoomId } = useParams();
    const [RoomId, setRoomId] = useState(false);
    //dit moet nog de juiste info van de kamer ophalen en aangepast worden in houseowner(true) en RoomId(true)
    //nu tijdelijk een room id = true or false

    const addRoom = () => {
        navigate('/accommodation-type-homeowner');
    };

    if (isLoggedIn) {
        //als de user ingelogd is gaan we kijken of die student is of houseowner
        //dit moet dus geslecteerd worden van het user profile of die student is of houseowner
        //ophalen uit de DB ipv state mee te geven
        const [Student, setStudent] = useState(false);
        const [Houseowner, setHouseowner] = useState(false);
        console.log(userData?.room);


        if (Student) {
            const [RoomRented, setRoomRented] = useState(true);
            if (RoomRented) {
                return (
                    <div className="page__container">
                        <NavApp />
                        <div className="content student__with-room">
                            <div className="room__basic-info">
                                <div className="room__basic-info__text">
                                    <h1 className="no__padding">Your room</h1>
                                    <div className="in-use">
                                        <div className="in-use__circle"></div>
                                        <p className="in-use__text">in use</p>
                                    </div>
                                </div>
                                <div className="room__basic-info__cards">
                                    <div className="basic-info__card basic-info__card--rating">
                                        <AutoAwesomeRoundedIcon
                                            sx={{ fontSize: 72 }}
                                            className="basic-info__card__icon rating__icon"
                                        />
                                        <p className="basic-info__card__text rating__title">Rate your room</p>
                                    </div>
                                    <div className="basic-info__card basic-info__card--unpaid">
                                        <p className="basic-info__card__text unpaid__title">Unpaid rent: June</p>
                                        <p className="basic-info__card__text unpaid__value">€340</p>
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
                            <div className="room__info">
                                <div className="room__info__main-content">
                                    <div className="room__people--main">
                                        <div className="room__person--full text__container">
                                            <h4 className="room__person__type text__container__title">Owner</h4>
                                            <PersonCard userType="houseowner" name="Tjerk Symens" />
                                        </div>
                                        <div className="room__person--full text__container">
                                            <h4 className="room__person__type text__container__title">Student</h4>
                                            <PersonCard userType="student" name="Wolf Ver Elst" />
                                        </div>
                                    </div>
                                    <div className="divider divider--room"></div>
                                    <div className="room__transactions">
                                        <h2 className="room__transactions__title">Transactions</h2>
                                        <div className="transactions__list">
                                            <TransactionCard
                                                transactionAmount="€32,50"
                                                transactionDate="June 2024"
                                                transactionTime="2:42 PM"
                                                transactionUser="Tjerk Symens"
                                                cardType="big"
                                            />
                                            <TransactionCard
                                                transactionAmount="€34,50"
                                                transactionDate="May 2024"
                                                transactionTime="1:33 PM"
                                                transactionUser="Wolf Ver Elst"
                                                cardType="big"
                                            />
                                        </div>
                                        <div className="room__more-info">
                                            <h2 className="room__transactions__title no__padding">More information</h2>
                                            <div className="room__info--usage">
                                                <div className="room__info--shared text__container">
                                                    <h3 className="room__info--shared__title text__container__title">
                                                        For shared use
                                                    </h3>
                                                    <ul className="room__info--shared__list">
                                                        <li className="room__info--shared__item">Shared kitchen</li>
                                                        <li className="room__info--shared__item">
                                                            Shared washing machine
                                                        </li>
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
                                            <div className="divider divider--room"></div>
                                            <div className="room__info--safety">
                                                <div className="room__info--security text__container">
                                                    <h3 className="room__info--security__title text__container__title">
                                                        Safety & Security items
                                                    </h3>
                                                    <div className="room__info--security__basics">
                                                        <div className="security__basics--box">
                                                            <HotelRoundedIcon fontSize="small" />
                                                            <p className="security__basics--text no__padding">
                                                                Fire extinguisher
                                                            </p>
                                                        </div>
                                                        <div className="security__basics--box">
                                                            <SwapHorizontalCircleRoundedIcon fontSize="small" />
                                                            <p className="security__basics--text no__padding">
                                                                Security Camera's around the house
                                                            </p>
                                                        </div>
                                                        <div className="security__basics--box">
                                                            <ChairRoundedIcon fontSize="small" />
                                                            <p className="security__basics--text no__padding">
                                                                Covered bicycle shed
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="room__info--rules text__container">
                                                    <h3 className="room__info--rules__title text__container__title">
                                                        Rules
                                                    </h3>
                                                    <div className="room__info--rules__basics">
                                                        <div className="rules__basics--box">
                                                            <HotelRoundedIcon fontSize="small" />
                                                            <p className="rules__basics--text no__padding">
                                                                Please don't come home after midnight
                                                            </p>
                                                        </div>
                                                        <div className="rules__basics--box">
                                                            <SwapHorizontalCircleRoundedIcon fontSize="small" />
                                                            <p className="rules__basics--text no__padding">
                                                                No loud music
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="room__info__side-content">
                                    <div className="side-content--overview">
                                        <div className="room__description--overview text__container">
                                            <h4 className="room__description--overview__title text__container__title">
                                                Overview
                                            </h4>
                                            <div className="room__description--overview__basics">
                                                <div className="overview__basics--box">
                                                    <HotelRoundedIcon fontSize="small" />
                                                    <p className="overview__basics--text no__padding">Room, 1 person</p>
                                                </div>
                                                <div className="overview__basics--box">
                                                    <SwapHorizontalCircleRoundedIcon fontSize="small" />
                                                    <p className="overview__basics--text no__padding">
                                                        12m² Personal space
                                                    </p>
                                                </div>
                                                <div className="overview__basics--box">
                                                    <ChairRoundedIcon fontSize="small" />
                                                    <p className="overview__basics--text no__padding">Non-furnished</p>
                                                </div>
                                                <div className="overview__basics--box">
                                                    <CottageRoundedIcon fontSize="small" />
                                                    <p className="overview__basics--text no__padding">
                                                        150m² Entire house
                                                    </p>
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
                                    <div className="side-content--description">
                                        <div className="room__description--description text__container">
                                            <h4 className="room__description--description__title text__container__title">
                                                Description
                                            </h4>
                                            <p className="room__description--description__text no__padding">
                                                Lorem Ipsum is simply dummy text of the printing and typesetting
                                                industry. Lorem Ipsum has been the industry's standard dummy text ever
                                                since the 1500s, when an unknown printer
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
                                        <a href="/contact" className="underline">
                                            I need help
                                        </a>
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
            if (RoomId) {
                return (
                    <div className="page__container">
                        <NavApp />
                        <div className="content owner__with-room">
                            <div className="room__basic-info">
                                <div className="room__basic-info__text">
                                    <h1 className="no__padding">Your room</h1>
                                    <div className="in-use">
                                        <div className="in-use__circle"></div>
                                        <p className="in-use__text">in use</p>
                                    </div>
                                </div>
                                <div className="room__basic-info__cards owner">
                                    <div className="basic-info__cards--top">
                                        <div
                                            className={`basic-info__card basic-info__card--occupancy ${activeCard === 'occupancy' ? 'active' : ''}`}
                                            onClick={openOccupancy}
                                        >
                                            <BarChartIcon
                                                sx={{ fontSize: 100 }}
                                                className="basic-info__card__icon occupancy__icon"
                                            />
                                            <div>
                                                <p className="basic-info__card__text occupancy__title">
                                                    Occupancy & Rental
                                                </p>
                                                <h6 className="occupancy__text no__padding">On listing</h6>
                                            </div>
                                        </div>
                                        <div className="basic-info__cards--right">
                                            <div
                                                className={`basic-info__card basic-info__card--engage ${activeCard === 'engage' ? 'active' : ''}`}
                                                onClick={openEngage}
                                            >
                                                <PieChartIcon
                                                    sx={{ fontSize: 72 }}
                                                    className="basic-info__card__icon engage__icon"
                                                />
                                                <div>
                                                    <h5 className="engage__title no__padding">Engage Metrics</h5>
                                                    <p className="engage__value no__padding">€235,54</p>
                                                </div>
                                            </div>
                                            <div
                                                className={`basic-info__card basic-info__card--income ${activeCard === 'income' ? 'active' : ''}`}
                                                onClick={openIncome}
                                            >
                                                <DonutLargeIcon
                                                    sx={{ fontSize: 72 }}
                                                    className="basic-info__card__icon income__icon"
                                                />
                                                <div>
                                                    <h5 className="income__title no__padding">Income</h5>
                                                    <p className="income__value no__padding">€235,54</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className={`basic-info__card basic-info__card--satisfaction ${activeCard === 'satisfaction' ? 'active' : ''}`}
                                        onClick={openSatisfaction}
                                    >
                                        <AutoAwesomeRoundedIcon
                                            sx={{ fontSize: 72 }}
                                            className="basic-info__card__icon rating__icon"
                                        />
                                        <p className="basic-info__card__text rating__title">Tennant Satisfaction</p>
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
                            <div className="room__info">
                                <div className="room__info__main-content">
                                    <div className="divider divider--room"></div>
                                    <OverallStatistics />
                                    <RoomStatistics state={roomStatistics} />
                                </div>
                                <div className="room__info__side-content">
                                    <div className="side-content--your-rooms">
                                        <h2 className="side-content__title no__padding">Your rooms</h2>
                                        <RoomCard location="Lange Noordstraat" houseowner="Tjerk Symens" />
                                        <RoomCard location="Tolstraat" houseowner="Tjerk Symens" />
                                        <button onClick={allRooms} className="white__button">
                                            Open all rooms
                                        </button>
                                    </div>
                                    <div className="side-content--overview">
                                        <div className="room__description--overview text__container">
                                            <h4 className="room__description--overview__title text__container__title">
                                                Overview
                                            </h4>
                                            <div className="room__description--overview__basics">
                                                <div className="overview__basics--box">
                                                    <HotelRoundedIcon fontSize="small" />
                                                    <p className="overview__basics--text no__padding">Room, 1 person</p>
                                                </div>
                                                <div className="overview__basics--box">
                                                    <SwapHorizontalCircleRoundedIcon fontSize="small" />
                                                    <p className="overview__basics--text no__padding">
                                                        12m² Personal space
                                                    </p>
                                                </div>
                                                <div className="overview__basics--box">
                                                    <ChairRoundedIcon fontSize="small" />
                                                    <p className="overview__basics--text no__padding">Non-furnished</p>
                                                </div>
                                                <div className="overview__basics--box">
                                                    <CottageRoundedIcon fontSize="small" />
                                                    <p className="overview__basics--text no__padding">
                                                        150m² Entire house
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="room--icons--button">
                                            <button className="white__button">Edit Details</button>
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
                                    </div>
                                    <div className="side-content--description">
                                        <div className="room__description--description text__container">
                                            <h4 className="room__description--description__title text__container__title">
                                                Description
                                            </h4>
                                            <p className="room__description--description__text no__padding">
                                                Lorem Ipsum is simply dummy text of the printing and typesetting
                                                industry. Lorem Ipsum has been the industry's standard dummy text ever
                                                since the 1500s, when an unknown printer
                                            </p>
                                        </div>
                                    </div>
                                    <PersonCard userType="student" name="Wolf Ver Elst" />
                                    <div className="rent__buttons">
                                        <button onClick={changeThisRoom} className="blue__button">
                                            Make changes to this room
                                        </button>
                                        <button onClick={reportProblem} className="white__button">
                                            Report a problem
                                        </button>
                                        <a href="/contact" className="underline">
                                            I need help
                                        </a>
                                    </div>
                                    <div className="side-content--transactions text__container">
                                        <div className="transactions__title">
                                            <h4 className="side-content--transactions__title text__container__title">
                                                Transactions
                                            </h4>
                                            <SearchRoundedIcon />
                                        </div>
                                        <div className="transactions__list small">
                                            <TransactionCard
                                                transactionAmount="€32,50"
                                                transactionDate="June 2024"
                                                transactionTime="2:42 PM"
                                                transactionUser="Tjerk Symens"
                                                cardType="small"
                                            />
                                            <TransactionCard
                                                transactionAmount="€23,50"
                                                transactionDate="May 2024"
                                                transactionTime="1:33 PM"
                                                transactionUser="Wolf Ver Elst"
                                                cardType="small"
                                            />
                                            <TransactionCard
                                                transactionAmount="€44,50"
                                                transactionDate="May 2024"
                                                transactionTime="8:22 PM"
                                                transactionUser="Tjerk Symens"
                                                cardType="small"
                                            />
                                        </div>
                                        <a href="#" className="see-more">
                                            See more
                                        </a>
                                    </div>
                                    <div className="divider divider--room"></div>
                                    <div className="side-content--top-months text__container">
                                        <div className="transactions__title">
                                            <h4 className="side-content--transactions__title text__container__title">
                                                Top Rent Periods
                                            </h4>
                                            <a href="#" className="see-more">
                                                See all
                                            </a>
                                        </div>
                                        <div className="transactions__list small">
                                            <TransactionCard
                                                transactionAmount="€620"
                                                transactionDate="2024"
                                                transactionTime="11%"
                                                transactionUser="December"
                                                cardType="small"
                                            />
                                            <TransactionCard
                                                transactionAmount="€600"
                                                transactionDate="2024"
                                                transactionTime="10%"
                                                transactionUser="July"
                                                cardType="small"
                                            />
                                            <TransactionCard
                                                transactionAmount="€590"
                                                transactionDate="2024"
                                                transactionTime="10%"
                                                transactionUser="November"
                                                cardType="small"
                                            />
                                        </div>
                                        <a href="#" className="see-more">
                                            See more
                                        </a>
                                    </div>
                                    <div className="divider divider--room"></div>
                                    <div className="side-content--top-cities text__container">
                                        <div className="transactions__title">
                                            <h4 className="side-content--transactions__title text__container__title">
                                                Top Rent Cities
                                            </h4>
                                            <a href="#" className="see-more">
                                                See all
                                            </a>
                                        </div>
                                        <div className="transactions__list small">
                                            <TransactionCard
                                                transactionAmount="€520"
                                                transactionDate="2024"
                                                transactionTime="11%"
                                                transactionUser="Leuven"
                                                cardType="small"
                                            />
                                            <TransactionCard
                                                transactionAmount="€450"
                                                transactionDate="2024"
                                                transactionTime="10%"
                                                transactionUser="Antwerp"
                                                cardType="small"
                                            />
                                            <TransactionCard
                                                transactionAmount="€420"
                                                transactionDate="2024"
                                                transactionTime="10%"
                                                transactionUser="Brussels"
                                                cardType="small"
                                            />
                                        </div>
                                        <a href="#" className="see-more">
                                            See more
                                        </a>
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
                        <div className="content student__with-room">
                            <div className="room-selector">
                                <h2 className="room-selector__title no__padding">Your rooms</h2>
                                <div className="room-selector--rooms">
                                    <RoomCard location="Lange Noordstraat" houseowner="Tjerk Symens" size="big" />
                                    <RoomCard location="Tolstraat" houseowner="Tjerk Symens" size="big" />
                                    <div className="add-room__button" onClick={addRoom}>
                                        <AddIcon sx={{ fontSize: 72 }} />
                                        <h6 className="h6__strong add-room__title">Add room</h6>
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
