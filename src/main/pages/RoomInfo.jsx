import React, { useEffect, useState } from 'react';
import NavApp from '../components/NavApp.jsx';
import Nav from '../../heya-web/components/Nav.jsx';
import Footer from '../../shared/components/Footer.jsx';
import PersonCard from '../components/PersonCard.jsx';
import '../css/room-info.css';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SwapHorizontalCircleRoundedIcon from '@mui/icons-material/SwapHorizontalCircleRounded';
import MapsHomeWorkRoundedIcon from '@mui/icons-material/MapsHomeWorkRounded';
import DirectionsBikeRoundedIcon from '@mui/icons-material/DirectionsBikeRounded';
import HotelRoundedIcon from '@mui/icons-material/HotelRounded';
import ChairRoundedIcon from '@mui/icons-material/ChairRounded';
import CottageRoundedIcon from '@mui/icons-material/CottageRounded';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import HandshakeRoundedIcon from '@mui/icons-material/HandshakeRounded';
import CountertopsRoundedIcon from '@mui/icons-material/CountertopsRounded';
import ShowerRoundedIcon from '@mui/icons-material/ShowerRounded';
import { useParams } from 'react-router-dom';

function RoomInfo() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const roomId = useParams().id;
    const [room, setRoom] = useState(null);
    const [owner, setOwner] = useState(null);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchRoomAndOwner = async () => {
            try {
                if (userId) {
                    setIsLoggedIn(true);
                } else {
                    setIsLoggedIn(false);
                }

                const roomResponse = await fetch(`${import.meta.env.VITE_API_URL}/rooms/${roomId}`);
                if (!roomResponse.ok) {
                    throw new Error('Network response was not ok');
                }
                const roomData = await roomResponse.json();
                setRoom(roomData);

                if (roomData.owner) {
                    const ownerResponse = await fetch(`${import.meta.env.VITE_API_URL}/users/${roomData.owner}`);
                    if (!ownerResponse.ok) {
                        throw new Error('Failed to fetch owner data');
                    }
                    const ownerData = await ownerResponse.json();
                    setOwner(ownerData);
                }

                const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                const userData = await response.json();
                setUser(userData);

                if (roomData.images && roomData.images.length > 0) {
                    setSelectedImage(roomData.images[0]);
                }
            } catch (error) {
                console.error('Error fetching room and owner:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchRoomAndOwner();
    }, [roomId]);

    const BookThisRoom = async () => {
        try {
            console.log('Room booked');
            const updateUserResponse = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    rentsRoom: true,
                    rentsRoomId: roomId,
                }),
            });
            if (!updateUserResponse.ok) {
                throw new Error('Failed to update user data');
            }
            console.log('User data updated successfully');
            window.location.href = '/rooms';
        } catch (error) {
            console.error('Error booking room:', error);
        }
    };

    const moveToChat = () => {
        window.location.href = `/chat/${room.owner}`;
    };

    const goBack = () => {
        window.history.back();
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!room) {
        return <div>Room not found</div>;
    }

    const handleImageClick = (index) => {
        setSelectedImage(room.images[index]);
    };

    const handleCloseModal = () => {
        setSelectedImage(null);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const month = date.toLocaleString('default', { month: 'long' });
        const day = date.getDate();
        return `${month} ${day}`;
    };

    const fullName = `${owner?.firstName || ''} ${owner?.lastName || ''}`;

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
                                {room.images &&
                                    room.images.map((image, index) => (
                                        <img
                                            key={`image-${index}`}
                                            className={`room__image ${selectedImage === image ? 'active' : ''}`}
                                            src={image}
                                            alt={`image ${index + 1}`}
                                            onClick={() => handleImageClick(index)}
                                        />
                                    ))}
                            </div>
                            {selectedImage && (
                                <div className="room__modal" onClick={handleCloseModal}>
                                    <img src={selectedImage} alt="Selected Room Image" />
                                </div>
                            )}
                        </div>
                        <div className="room__overview">
                            <div className="room__tags">
                                <div className="room--tag tag featured">
                                    <p>Featured</p>
                                </div>
                                <div className="room--tag tag opening">
                                    <p>Opens {room ? formatDate(room.startDateAvailable) : ''}</p>
                                </div>
                            </div>
                            <h1 className="room__location">
                                {room?.streetName} {room?.houseNumber}
                            </h1>
                            <div className="room--details">
                                <div className="room--basics">
                                    <div className="room--basics--location room--basics__item">
                                        <LocationOnIcon />
                                        <div className="room--basics__item__text">
                                            <p className="room--basics__item__name no__padding">Location</p>
                                            <span className="room--basics__item__value">{room?.city}</span>
                                        </div>
                                    </div>
                                    <div className="room--basics--space room--basics__item">
                                        <SwapHorizontalCircleRoundedIcon />
                                        <div className="room--basics__item__text">
                                            <p className="room--basics__item__name no__padding">Space</p>
                                            <span className="room--basics__item__value">
                                                {room?.roomDetails[0]?.size}m²
                                            </span>
                                        </div>
                                    </div>
                                    <div className="room--basics--type room--basics__item">
                                        <MapsHomeWorkRoundedIcon />
                                        <div className="room--basics__item__text">
                                            <p className="room--basics__item__name no__padding">Type</p>
                                            <span className="room--basics__item__value">{room?.type}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="room__description">
                                <div className="room__description--overview text__container">
                                    <h4 className="room__description--overview__title text__container__title">
                                        Overview
                                    </h4>
                                    <div className="room__description--overview__basics">
                                        <div className="overview__basics--box">
                                            <HotelRoundedIcon fontSize="small" />
                                            <p className="overview__basics--text no__padding">
                                                {room?.type}, {room?.propertyDetails[0]?.totalRooms} person(s)
                                            </p>
                                        </div>
                                        <div className="overview__basics--box">
                                            <SwapHorizontalCircleRoundedIcon fontSize="small" />
                                            <p className="overview__basics--text no__padding">
                                                {room?.roomDetails[0]?.size}m² Personal space
                                            </p>
                                        </div>
                                        <div className="overview__basics--box">
                                            <ChairRoundedIcon fontSize="small" />
                                            <p className="overview__basics--text no__padding">
                                                {room?.roomDetails[0]?.furnishing}
                                            </p>
                                        </div>
                                        <div className="overview__basics--box">
                                            <CottageRoundedIcon fontSize="small" />
                                            <p className="overview__basics--text no__padding">
                                                {room?.propertyDetails[0]?.surfaceArea}m² Entire house
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="room__description--description text__container">
                                    <h4 className="room__description--description__title text__container__title">
                                        Description
                                    </h4>
                                    <p className="room__description--description__text no__padding">
                                        {room?.otherInfo}
                                    </p>
                                </div>
                            </div>
                            <div className="room__buttons">
                                {user.role === 'student' && (
                                    <button onClick={BookThisRoom} className="blue__button">
                                        Book this room
                                    </button>
                                )}
                                <button onClick={moveToChat} className="white__button" style={{ marginTop: '16px' }}>
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
                                        <h4 className="room__info--shared__title text__container__title">
                                            For shared use
                                        </h4>
                                        <ul className="room__info--shared__list">
                                            {room?.sharedSpaces[0]?.sharedSpaces.map((space, index) => (
                                                <li key={index} className="room__info--shared__item">
                                                    {space}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="room__info--private text__container">
                                        <h4 className="room__info--private__title text__container__title">
                                            For private use of tenant
                                        </h4>
                                        <ul className="room__info--private__list">
                                            {room?.personalRoomDetails[0]?.amentities.map((amentity, index) => (
                                                <li key={index} className="room__info--private__item">
                                                    {amentity}
                                                </li>
                                            ))}
                                            <li>{room?.personalRoomDetails[0]?.additionalAmenities}</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="room__info--safety">
                                    <div className="room__info--private text__container">
                                        <h4 className="room__info--private__title text__container__title">
                                            Ideal tenant characteristics
                                        </h4>
                                        <ul className="room__info--private__list">
                                            {room?.idealAttendant[0]?.preferredCharacteristics.map(
                                                (character, index) => (
                                                    <li key={index} className="room__info--private__item">
                                                        {character}
                                                    </li>
                                                ),
                                            )}
                                            <li>{room?.personalRoomDetails[0]?.additionalAmenities}</li>
                                        </ul>
                                    </div>
                                    <div className="room__info--rules text__container">
                                        <h4 className="room__info--rules__title text__container__title">Pricing</h4>
                                        <div className="room__info--rules__basics">
                                            <div className="rules__basics--box">
                                                <span className="rules__basics--text no__padding">
                                                    Rent: <b>€{room?.pricing[0]?.rent}</b>
                                                </span>
                                            </div>
                                            <div className="rules__basics--box">
                                                <span>
                                                    {' '}
                                                    AdditionalCosts: <b>€{room?.pricing[0]?.additionalCosts}</b>
                                                </span>
                                            </div>
                                            <div className="rules__basics--box">
                                                <span>
                                                    ServiceCost: <b>€{room?.pricing[0]?.serviceCost}</b>
                                                </span>
                                            </div>
                                            <div className="rules__basics--box">
                                                <span>
                                                    Deposit: <b>€{room?.pricing[0]?.deposit}</b>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="room__info--people">
                                <div className="room__people">
                                    <PersonCard
                                        userType="houseowner"
                                        name={fullName?.trim() || 'N/A'}
                                        userId={owner?._id}
                                        imageUrl={owner?.imageLink}
                                    />
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
                    <div className="room__intro">
                        {selectedImage && (
                            <div className="room__modal" onClick={handleCloseModal}>
                                <img src={selectedImage} alt="Selected Room Image" />
                            </div>
                        )}
                        <a className="back-button" href="#" onClick={goBack}>
                            <ArrowBackIosNewRoundedIcon />
                        </a>
                        <div className="room__location--info">
                            <p className="room__amount">1 Room</p>
                            <h1 className="room__location">
                                {room?.streetName} {room?.houseNumber}
                            </h1>
                        </div>
                        <div className="room__pricing">
                            <p className="room__price">€{room?.pricing[0]?.rent}</p>
                            <p className="room__price__timespan">/month</p>
                        </div>
                        <div className="room--basics">
                            <div className="room--basics--location room--basics__item">
                                <LocationOnIcon />
                                <div className="room--basics__item__text">
                                    <p className="room--basics__item__name no__padding">Location</p>
                                    <span className="room--basics__item__value">{room?.city}</span>
                                </div>
                            </div>
                            <div className="room--basics--space room--basics__item">
                                <SwapHorizontalCircleRoundedIcon />
                                <div className="room--basics__item__text">
                                    <p className="room--basics__item__name no__padding">Space</p>
                                    <span className="room--basics__item__value">{room?.roomDetails[0]?.size}m²</span>
                                </div>
                            </div>
                            <div className="room--basics--type room--basics__item">
                                <MapsHomeWorkRoundedIcon />
                                <div className="room--basics__item__text">
                                    <p className="room--basics__item__name no__padding">Type</p>
                                    <span className="room--basics__item__value">{room?.type}</span>
                                </div>
                            </div>
                        </div>
                        <div className="room__images-all">
                            {room.images &&
                                room.images.map((image, index) => (
                                    <img
                                        key={`image-${index}`}
                                        className={`room__image ${selectedImage === image ? 'active' : ''}`}
                                        src={image}
                                        alt={`image ${index + 1}`}
                                        onClick={() => handleImageClick(index)}
                                    />
                                ))}
                        </div>
                    </div>
                    <div className="room__statistics">
                        <div className="room__statistics--marker"></div>
                        <div className="information__button information__button--room">
                            <InfoOutlinedIcon fontSize="small" />
                        </div>
                        <div className="room__overall">
                            <div className="room__amenities">
                                <div className="room__amenity__icon room__amenity--bike">
                                    <DirectionsBikeRoundedIcon fontSize="20px" />
                                </div>
                                <div className="room__amenity__icon room__amenity--sink">
                                    <CountertopsRoundedIcon fontSize="20px" />
                                </div>
                                <div className="room__amenity__icon room__amenity--shower">
                                    <ShowerRoundedIcon fontSize="20px" />
                                </div>
                            </div>
                            <div className="room__help--amount">
                                <div className="room__help--text">
                                    <HandshakeRoundedIcon fontSize="small" />
                                    <p className="no__padding">Help needed:</p>
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
                                    <p className="overview__basics--text no__padding">
                                        {room?.type}, {room?.propertyDetails[0]?.totalRooms} person(s)
                                    </p>
                                </div>
                                <div className="overview__basics--box">
                                    <SwapHorizontalCircleRoundedIcon fontSize="small" />
                                    <p className="overview__basics--text no__padding">
                                        {' '}
                                        {room?.roomDetails[0]?.size}m² Personal space
                                    </p>
                                </div>
                                <div className="overview__basics--box">
                                    <ChairRoundedIcon fontSize="small" />
                                    <p className="overview__basics--text no__padding">
                                        {room?.roomDetails[0]?.furnishing}
                                    </p>
                                </div>
                                <div className="overview__basics--box">
                                    <CottageRoundedIcon fontSize="small" />
                                    <p className="overview__basics--text no__padding">
                                        {room?.propertyDetails[0]?.surfaceArea}m² Entire house
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="room__description--description text__container">
                            <h3 className="room__description--description__title text__container__title">
                                Description
                            </h3>
                            <p className="room__description--description__text no__padding">{room?.otherInfo}</p>
                        </div>
                        <div className="divider divider--room"></div>
                        <div className="room__info--usage">
                            <div className="room__info--shared text__container">
                                <h3 className="room__info--shared__title text__container__title">For shared use</h3>
                                <ul className="room__info--shared__list">
                                    {room?.sharedSpaces[0]?.sharedSpaces.map((space, index) => (
                                        <li key={index} className="room__info--shared__item">
                                            {space}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="room__info--private text__container">
                                <h3 className="room__info--private__title text__container__title">
                                    For private use of tenant
                                </h3>
                                <ul className="room__info--private__list">
                                    {room?.personalRoomDetails[0]?.amentities.map((amentity, index) => (
                                        <li key={index} className="room__info--private__item">
                                            {amentity}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="divider divider--room"></div>
                        <div className="room__info--safety">
                            <div className="room__info--security text__container">
                                <h3 className="room__info--security__title text__container__title">
                                    Ideal tenant characteristics
                                </h3>
                                <ul className="room__info--private__list">
                                    {room?.idealAttendant[0]?.preferredCharacteristics.map((character, index) => (
                                        <li key={index} className="room__info--private__item">
                                            {character}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="divider divider--room"></div>
                            <div className="room__info--rules text__container">
                                <h3 className="room__info--rules__title text__container__title">Pricing</h3>
                                <div className="room__info--rules__basics">
                                    <div className="rules__basics--box">
                                        <span className="rules__basics--text no__padding">
                                            Rent: <b>{room?.pricing[0]?.rent}</b>
                                        </span>
                                    </div>
                                    <div className="rules__basics--box">
                                        <span>
                                            {' '}
                                            AdditionalCosts: <b>{room?.pricing[0]?.additionalCosts}</b>
                                        </span>
                                    </div>
                                    <div className="rules__basics--box">
                                        <span>
                                            ServiceCost: <b>{room?.pricing[0]?.serviceCost}</b>
                                        </span>
                                    </div>
                                    <div className="rules__basics--box">
                                        <span>
                                            Deposit: <b>{room?.pricing[0]?.deposit}</b>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="divider divider--room"></div>
                        <div className="room__info--people">
                            <div className="room__people">
                                <PersonCard
                                    userType="houseowner"
                                    name={fullName?.trim() || 'N/A'}
                                    userId={owner?._id}
                                    imageUrl={owner?.imageLink}
                                />
                            </div>
                            <p className="no__padding">
                                Something wrong? Please{' '}
                                <a className="underline" href="/contact">
                                    Contact us
                                </a>
                            </p>
                        </div>
                        <div className="room__buttons">
                            {user.role === 'student' && (
                                <button onClick={BookThisRoom} className="blue__button">
                                    Book this room
                                </button>
                            )}
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
