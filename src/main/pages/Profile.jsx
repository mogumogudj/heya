import React, { useContext } from 'react';
import '../css/profile.css';
import Footer from '../../shared/components/Footer.jsx';
import NavApp from '../components/NavApp.jsx';
import UserReview from '../../main/components/UserReview.jsx';
import { UserContext } from '../../shared/contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import LocationCityOutlinedIcon from '@mui/icons-material/LocationCityOutlined';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';

function Profile() {
    const { userData, isLoading } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/logout');
    };

    const handleEdit = () => {
        navigate('/about-yourself');
    };

    const loadNextReviews = () => {
        console.log('Load next reviews');
    };

    const loadPreviousReviews = () => {
        console.log('Load previous reviews');
    };

    const spinnerStyle = {
        border: '4px solid rgba(0, 0, 0, 0.1)',
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        borderLeftColor: '#09f',
        animation: 'spin 1s linear infinite',
    };

    const containerStyle = {
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 'calc(100vh - 200px)',
    };

    const keyframesStyle = `
        @keyframes spin {
            to {
                transform: rotate(360deg);
            }
        }
    `;

    if (isLoading) {
        return (
            <div className="page__container">
                <NavApp />
                <div className="content">
                    <div className="loading__container" style={containerStyle}>
                        <div className="loading__spinner" style={spinnerStyle}></div>
                        <p>Loading...</p>
                    </div>
                </div>
                <Footer />
                <style>{keyframesStyle}</style>
            </div>
        );
    }

    return (
        <div className="page__container">
            <NavApp />
            <div className="content content--profile">
                <h1>My Profile</h1>
                <div className="threeGrid">
                    <div>
                        <img
                            className="profile__image profile"
                            src={userData?.imageLink || '../nav/default-profile.svg'}
                            alt="profile picture"
                        />
                        <button onClick={handleLogout} className="white__button profile hidden__mobile">
                            Logout
                        </button>
                    </div>
                    <div>
                        <h2>{`${userData?.firstName} ${userData?.lastName}`}</h2>
                        <h3>Student</h3>
                        <div className="profile__info">
                            <p>
                                <SchoolOutlinedIcon style={{ verticalAlign: 'middle', marginRight: '8px' }} />
                                {userData?.userStayInfo[0]?.study}
                            </p>
                            <p>
                                <LocationCityOutlinedIcon style={{ verticalAlign: 'middle', marginRight: '8px' }} />
                                {userData?.userStayInfo[0]?.city}
                            </p>
                        </div>
                    </div>
                    <div>
                        <button onClick={handleEdit} className="white__button profile">
                            Edit
                        </button>
                    </div>
                </div>
                <div className="twoGrid grid profile">
                    <div>
                        <h4>About</h4>
                        <p>{userData?.userInfo[0]?.shortDescription}</p>
                    </div>
                    <div>
                        <h4>My confirmed information</h4>
                        <p>✔️ Identity</p>
                        <p>✔️ Email address</p>
                        <p>✔️ Phone number</p>
                    </div>
                </div>
                <button onClick={handleLogout} className="white__button profile hidden__desktop">
                    Logout
                </button>
                <div className='person__reviews'>
                    <div className='reviews__head'>
                        <h4 className='no__padding'>My reviews</h4>
                        <div className='review__navigation'>
                            <div className='review__navigation__icon' onClick={loadNextReviews} >
                                <ArrowBackIosNewRoundedIcon sx={{ fontSize: 20 }} />
                            </div>
                            <div className='review__navigation__icon' onClick={loadPreviousReviews} >
                            <ArrowForwardIosRoundedIcon sx={{ fontSize: 20 }} />
                            </div>
                        </div>
                    </div>
                    <div className='reviews__box'>
                        <UserReview 
                            reviewName='Tjerk Symens' 
                            reviewImage='../tjerk.webp' 
                            reviewText="After a really successful year living with Wolf, I can't help but reflect on the warmth and happiness I've experienced. Despite my initial thoughts on sharing space, Wolf made me feel like a happy man again. Meals together, shared laughter, and ..."
                            reviewDate='January 2024' 
                        />
                        <UserReview 
                            reviewName='Wolf Ver Elst' 
                            reviewImage='../wolf.webp' 
                            reviewText="He might be one of those youngsters we boomers are wrong about. He is never lazy and helps out where needed. The occasional loud music you can expect from a dj is a problem I gladly accept. And he will notify us when he will do so."
                            reviewDate='May 2024' 
                        />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Profile;
