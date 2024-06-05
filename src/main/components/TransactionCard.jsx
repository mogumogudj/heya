import React from 'react';
import '../../shared/css/app.css';
import '../../main/css/rooms.css';

const imageMap = {
    "Tjerk Symens": "../tjerk.webp",
    "Wolf Ver Elst": "../wolf.webp",
    "Wouter Waumans": "../wouter.webp",
    "Leuven": "../leuven.webp",
    "Antwerp": "../antwerpen.webp",
    "Brussels": "../brussel.webp"
};

function TransactionCard ({ transactionAmount, transactionDate, transactionTime, transactionUser, cardType }) {
    const userImage = imageMap[transactionUser] || "../apartment.webp";

    if (cardType === "small") {
        return (
            <div className='transaction__item small'>
                <div className='transaction__main'>
                    <img
                        className="owner__image profile__image person__card--image--small"
                        src={userImage}
                        alt={transactionUser}
                    />
                    <div className='transaction__info'>
                        <p className='transaction__name--small no__padding'>{transactionUser}</p>
                        <p className='transaction__date--small no__padding'>{transactionDate}</p>
                    </div>
                </div>
                <div className='transaction__price'>
                    <h6 className='transaction__price__value--small no__padding'>{transactionAmount}</h6>
                    <p className='transaction__time--small no__padding'>{transactionTime}</p>
                </div>
            </div>
        );
    } else if (cardType === "big") {
        return (
            <div className='transaction__item'>
                <div className='transaction__main'>
                    <img
                        className="owner__image profile__image person__card--image"
                        src={userImage}
                        alt={transactionUser}
                    />
                    <div className='transaction__info'>
                        <h4 className='transaction__name no__padding'>{transactionUser}</h4>
                        <p className='transaction__date no__padding'>{transactionDate}</p>
                    </div>
                </div>
                <div className='transaction__price'>
                    <h3 className='transaction__price__value no__padding'>{transactionAmount}</h3>
                    <p className='transaction__time no__padding'>{transactionTime}</p>
                </div>
            </div>
        );
    }
}

export default TransactionCard;