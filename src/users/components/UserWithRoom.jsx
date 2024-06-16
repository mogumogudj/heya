import React, { useState, useEffect } from 'react';
import PersonCard from '../../main/components/PersonCard.jsx';
import TransactionCard from '../../main/components/TransactionCard.jsx';
import '../../main/css/rooms.css';
import '../../shared/css/app.css';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import SwapHorizontalCircleRoundedIcon from '@mui/icons-material/SwapHorizontalCircleRounded';
import HotelRoundedIcon from '@mui/icons-material/HotelRounded';
import ChairRoundedIcon from '@mui/icons-material/ChairRounded';
import CottageRoundedIcon from '@mui/icons-material/CottageRounded';

function UserWithRoom({ roomId }) {
    const userId = localStorage.getItem('userId');
    const [room, setRoom] = useState(null);
    const [owner, setOwner] = useState(null);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchRoom = async () => {
            try {
                const roomResponse = await fetch(`${import.meta.env.VITE_API_URL}/rooms/${roomId}`);
                if (!roomResponse.ok) {
                    throw new Error('Failed to fetch room data');
                }
                const roomData = await roomResponse.json();
                setRoom(roomData);
                const ownerResponse = await fetch(`${import.meta.env.VITE_API_URL}/users/${roomData.owner}`);
                if (!ownerResponse.ok) {
                    throw new Error('Failed to fetch owner data');
                }
                const ownerData = await ownerResponse.json();
                setOwner(ownerData);
                const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                const userData = await response.json();
                setUser(userData);
            } catch (error) {
                console.error('Error fetching room data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchRoom();
    }, [roomId]);

    const stopRentingRoom = async () => {
        try {
            console.log('Room is stopped renting');
            const updateUserResponse = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    rentsRoom: false,
                    rentsRoomId: '',
                }),
            });
            if (!updateUserResponse.ok) {
                throw new Error('Failed to update user data');
            }
            console.log('User data updated successfully');
            window.location.href = '/home';
        } catch (error) {
            console.error('Error stopping renting room:', error);
        }
    };

    const reportProblem = () => {
        window.location.href = '/contact';
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const ownerFullName = `${owner?.firstName || ''} ${owner?.lastName || ''}`;
    const userFullName = `${user?.firstName || ''} ${user?.lastName || ''}`;

    return (
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
                        <AutoAwesomeRoundedIcon sx={{ fontSize: 72 }} className="basic-info__card__icon rating__icon" />
                        <p className="basic-info__card__text rating__title">Rate your room</p>
                    </div>
                    <div className="basic-info__card basic-info__card--unpaid">
                        <p className="basic-info__card__text unpaid__title">Unpaid rent: June</p>
                        <p className="basic-info__card__text unpaid__value">{room?.pricing[0]?.rent}</p>
                    </div>
                </div>
            </div>
            <div className="room__image__container">
                <div className="ellipse--image ellipse--room"></div>
                <div className="room--location--tag">
                    <div className="room--tag tag featured">
                        <p>Featured</p>
                    </div>
                    <p className="room--location">
                        {room?.streetName} {room?.houseNumber}
                    </p>
                </div>
            </div>
            <div className="room__info">
                <div className="room__info__main-content">
                    <div className="room__people--main">
                        <div className="room__person--full text__container">
                            <h4 className="room__person__type text__container__title">Owner</h4>
                            <PersonCard
                                userType="houseowner"
                                name={ownerFullName}
                                userId={owner?._id}
                                imageUrl={owner?.imageLink}
                            />
                        </div>
                        <div className="room__person--full text__container">
                            <h4 className="room__person__type text__container__title">Student</h4>
                            <PersonCard
                                userType="student"
                                name={userFullName}
                                userId={user?._id}
                                imageUrl={user?.imageLink}
                            />
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
                                        {room?.idealAttendant[0]?.preferredCharacteristics.map((character, index) => (
                                            <li key={index} className="room__info--private__item">
                                                {character}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="divider divider--room"></div>
                            <div className="room__info--safety">
                                <div className="room__info--security text__container">
                                    <h3 className="room__info--security__title text__container__title">Ideal tenant</h3>
                                    <ul className="room__info--private__list">
                                        {room?.idealAttendant[0]?.preferredCharacteristics.map((character, index) => (
                                            <li key={index} className="room__info--private__item">
                                                {character}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
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
                        </div>
                    </div>
                </div>
                <div className="room__info__side-content">
                    <div className="side-content--overview">
                        <div className="room__description--overview text__container">
                            <h4 className="room__description--overview__title text__container__title">Overview</h4>
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
                    </div>
                    <div className="side-content--description">
                        <div className="room__description--description text__container">
                            <h4 className="room__description--description__title text__container__title">
                                Description
                            </h4>
                            <p className="room__description--description__text no__padding">{room?.otherInfo}</p>
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
    );
}

export default UserWithRoom;
