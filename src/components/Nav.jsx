import { Link, useLocation } from "react-router-dom";
import '../css/Nav.css';

function Nav() {
  const location = useLocation();

  return (
    <nav className="nav">
        <Link to="/" className={`nav__box nav__box__home ${location.pathname === "/" ? "active" : ""}`}>
            <div className="nav__img-wrapper">
                <img src="../home.svg" alt="" />
            </div>
            <span>Home</span>
        </Link>
        <Link to="/rooms" className={`nav__box nav__box__rooms ${location.pathname === "/rooms" ? "active" : ""}`}>
            <div className="nav__img-wrapper">
                <img src="../rooms.svg" alt="" />
            </div>
            <span>Rooms</span>
        </Link>
        <Link to="/calendar" className={`nav__box nav__box__calendar ${location.pathname === "/calendar" ? "active" : ""}`}>
            <div className="nav__img-wrapper">
                <img src="../calendar.svg" alt="" />
            </div>
            <span>Calendar</span>
        </Link>
        <Link to="/chat" className={`nav__box nav__box__chat ${location.pathname === "/chat" ? "active" : ""}`}>
            <div className="nav__img-wrapper">
                <img src="../chat.svg" alt="" />
            </div>
            <span>Chat</span>
        </Link>
        <Link to="/profile" className={`nav__box nav__box__profile ${location.pathname === "/profile" ? "active" : ""}`}>
            <div className="nav__img-wrapper">
                <img src="../profile.svg" alt="" />
            </div>
            <span>Profile</span>
        </Link>
    </nav>
  );
}

export default Nav;
