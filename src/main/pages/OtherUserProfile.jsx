import React, { useState, useEffect, useContext } from 'react';
import '../css/profile.css';
import Footer from '../../shared/components/Footer.jsx';
import NavApp from '../components/NavApp.jsx';
import { UserContext } from '../../shared/contexts/UserContext';
import { useParams, useNavigate } from 'react-router-dom';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import LocationCityOutlinedIcon from '@mui/icons-material/LocationCityOutlined';

function OtherUserProfile() {
    const { userData, isLoading } = useContext(UserContext);
    const { otherUserId: urlOtherUserId } = useParams();
    const userId = localStorage.getItem('userId');
    const navigate = useNavigate();

    const [otherUserInfo, setOtherUserInfo] = useState(null);
    const [userImage, setUserImage] = useState(null);

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

    useEffect(() => {
        const fetchUserInfo = async (id) => {
            try {
                const userInfoResponse = await fetch(`${import.meta.env.VITE_API_URL}/users/${id}`);
                const userInfoData = await userInfoResponse.json();
                setOtherUserInfo(userInfoData);
            } catch (error) {
                console.error('Failed to fetch user info:', error);
            }
        };

        const fetchUserImage = async () => {
            try {
                const userInfoResponse = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}`);
                const userInfoData = await userInfoResponse.json();
                setUserImage(userInfoData.imageLink);
            } catch (error) {
                console.error('Failed to fetch current user info:', error);
            }
        };

        fetchUserImage();

        if (urlOtherUserId) {
            fetchUserInfo(urlOtherUserId);
        }
    }, [userId, urlOtherUserId]);

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
                <h1>{otherUserInfo ? `${otherUserInfo.firstName} ${otherUserInfo.lastName}` : 'Profile'}</h1>
                <div className="threeGrid">
                    <div>
                        <img
                            className="profile__image profile"
                            src={otherUserInfo?.imageLink || userImage || '../nav/default-profile.svg'}
                            alt="profile picture"
                        />
                    </div>
                    <div>
                        <h2>{`${otherUserInfo?.firstName || ''} ${otherUserInfo?.lastName || ''}`}</h2>
                        <h3>Student</h3>
                        <div className="profile__info">
                            <p>
                                <SchoolOutlinedIcon style={{ verticalAlign: 'middle', marginRight: '8px' }} />
                                {otherUserInfo?.userStayInfo?.[0]?.study}
                            </p>
                            <p>
                                <LocationCityOutlinedIcon style={{ verticalAlign: 'middle', marginRight: '8px' }} />
                                {otherUserInfo?.userStayInfo?.[0]?.city}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="twoGrid grid profile">
                    <div>
                        <h4>About</h4>
                        <p>{otherUserInfo?.userInfo?.[0]?.shortDescription}</p>
                    </div>
                    <div>
                        <h4>My confirmed information</h4>
                        <p>✔️ Identity</p>
                        <p>✔️ Email address</p>
                        <p>✔️ Phone number</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default OtherUserProfile;