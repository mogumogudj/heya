import React, { useEffect, useState } from 'react';
import '../../shared/css/app.css';

function PersonCard({ userType, name, userId, imageUrl }) {
    const [isStudent, setIsStudent] = useState(false);
    const [isHouseowner, setIsHouseowner] = useState(false);

    useEffect(() => {
        if (userType === 'student') {
            setIsStudent(true);
        } else if (userType === 'houseowner') {
            setIsHouseowner(true);
        }
    }, [userType]);

    const chatWithThisPerson = () => {
        window.location.href = `/chat/${userId}`;
    };

    const viewProfile = () => {
        window.location.href = `/profile/${userId}`;
    };

    return (
        <div
            className={
                isHouseowner
                    ? 'room__person person__card owner'
                    : isStudent
                      ? 'room__person person__card student'
                      : 'room__person person__card'
            }
        >
            <img className="owner__image profile__image person__card--image" src={imageUrl} alt={name} />
            <div className="person__card--info">
                <p className="person__card--name no__padding">{name}</p>
                <p className="person__card--basics no__padding">
                    {isHouseowner ? 'Houseowner' : isStudent ? 'Student' : 'User'} <br />
                    Leuven
                </p>
                <div
                    className={
                        isHouseowner
                            ? 'person--tag tag default no__padding'
                            : isStudent
                              ? 'person--tag tag new no__padding'
                              : 'person--tag tag new no__padding'
                    }
                >
                    <p>{isHouseowner ? 'Houseowner' : isStudent ? 'Renting' : 'New'}</p>
                </div>
            </div>
            <div className="person__card--links">
                <div className="person__card--chat" onClick={chatWithThisPerson}>
                    <img src="../nav/chat.svg" alt="chat" />
                    <p className="no__padding person__card--chat__text">Chat now</p>
                </div>
                <button onClick={viewProfile} className="blue__button person__card--button">
                    View
                </button>
            </div>
        </div>
    );
}

export default PersonCard;
