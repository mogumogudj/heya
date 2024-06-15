import React from 'react';
import '../css/profile.css';

function UserReview({ reviewName, reviewImage, reviewText, reviewDate }) {
    return (
        <div className='user__review'>
            <p className='user__review__text'>
                {reviewText}
            </p>
            <div className='user__review__person'>
                <img className='user__review__image' src={reviewImage} alt={reviewName} />
                <div className='user__review__person--info'>
                    <p className='user__review__name'>{reviewName}</p>
                    <p className='user__review__date'>{reviewDate}</p>
                </div>
            </div>
        </div>
    );
}

export default UserReview;