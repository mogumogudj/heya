import React, { useContext } from 'react';
import '../css/profile.css';
import Footer from '../../shared/components/Footer.jsx';
import NavApp from '../components/NavApp.jsx';
import { UserContext } from '../../shared/contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import LocationCityOutlinedIcon from '@mui/icons-material/LocationCityOutlined';

function Profile() {
    const { userData, isLoading } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/logout');
    };

    const handleEdit = () => {
        navigate('/about-yourself');
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
            </div>
            <Footer />
        </div>
    );
}

export default Profile;
