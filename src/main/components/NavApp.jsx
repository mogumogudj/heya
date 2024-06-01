import { Link, useLocation } from 'react-router-dom';
import '../../shared/css/nav.css';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useContext } from 'react';
import { UserContext } from '../../shared/contexts/UserContext';

function NavApp() {
    const location = useLocation();
    const { userData, isLoading } = useContext(UserContext);

    return (
        <nav className="nav">
            <Link to="/home" className="nav__box nav__box__home no-hover">
                <div className="nav__img-wrapper hidden__desktop">
                    <img
                        className={`do-not-show-on-desktop ${location.pathname === '/home' ? 'hidden' : ''}`}
                        src="../nav/home.svg"
                        alt="home icon"
                    />
                    <img
                        className={`do-not-show-on-desktop ${location.pathname === '/home' ? '' : 'hidden'}`}
                        src="../nav/home-blue.svg"
                        alt="home icon blue"
                    />
                </div>
                <img
                    className="hidden__mobile heya__logo nav__box__logo"
                    src="../heya-blue-round.svg"
                    alt="heya logo"
                />
                <span className="hidden__desktop">Home</span>
            </Link>

            <Link to="/rooms" className={`nav__box nav__box__rooms ${location.pathname === '/rooms' ? 'active' : ''}`}>
                <div className="nav__img-wrapper hidden__desktop">
                    <img
                        className={`do-not-show-on-desktop ${location.pathname === '/rooms' ? 'hidden' : ''}`}
                        src="../nav/rooms.svg"
                        alt="rooms icon"
                    />
                    <img
                        className={`do-not-show-on-desktop ${location.pathname === '/rooms' ? '' : 'hidden'}`}
                        src="../nav/rooms-blue.svg"
                        alt="rooms icon blue"
                    />
                </div>
                <span>Rooms</span>
            </Link>

            <Link
                to="/calendar"
                className={`nav__box nav__box__calendar ${location.pathname === '/calendar' ? 'active' : ''}`}
            >
                <div className="nav__img-wrapper hidden__desktop">
                    <img
                        className={`do-not-show-on-desktop ${location.pathname === '/calendar' ? 'hidden' : ''}`}
                        src="../nav/calendar.svg"
                        alt="calendar icon"
                    />
                    <img
                        className={`do-not-show-on-desktop ${location.pathname === '/calendar' ? '' : 'hidden'}`}
                        src="../nav/calendar-blue.svg"
                        alt="calendar icon blue"
                    />
                </div>
                <span>Calendar</span>
            </Link>

            <Link to="/chat" className={`nav__box nav__box__chat ${location.pathname === '/chat' ? 'active' : ''}`}>
                <div className="nav__img-wrapper hidden__desktop">
                    <img
                        className={`do-not-show-on-desktop ${location.pathname === '/chat' ? 'hidden' : ''}`}
                        src="../nav/chat.svg"
                        alt="chat icon"
                    />
                    <img
                        className={`do-not-show-on-desktop ${location.pathname === '/chat' ? '' : 'hidden'}`}
                        src="../nav/chat-blue.svg"
                        alt="chat icon blue"
                    />
                </div>

                <span>Chat</span>
            </Link>

            <Link
                to="/profile"
                className={`nav__box nav__box__profile no-hover ${location.pathname === '/profile' ? 'active' : ''}`}
            >
                <div className="nav__img-wrapper nav__profile-wrapper">
                    <img
                        className={`do-not-show-on-desktop ${location.pathname === '/profile' ? 'hidden' : ''}`}
                        src="../nav/profile-mobile.svg"
                        alt="profile icon"
                    />
                    <img
                        className={`do-not-show-on-desktop ${location.pathname === '/profile' ? '' : 'hidden'}`}
                        src="../nav/profile-mobile-blue.svg"
                        alt="profile icon blue"
                    />
                    <img
                        className={`hidden__mobile heya__logo profile__picture`}
                        src={isLoading ? '../nav/default-profile.svg' : userData?.imageLink}
                        alt="profile icon"
                    />
                    <span className={`hidden__mobile nav__profile-name`}>
                        {isLoading ? 'Loading...' : `${userData?.firstName} ${userData?.lastName}`}
                    </span>
                </div>
                <span className="hidden__desktop">Profile</span>
            </Link>

            <div className="hidden__mobile nav__box nav__box__language no-hover">
                <div className="nav__img-wrapper">
                    <img className="language-icon" src="../nav/english-flag.webp" alt="Language icon" />
                </div>
                <span>EN</span>
                <ExpandMoreIcon className="dropdown-icon" />
            </div>
        </nav>
    );
}

export default NavApp;
