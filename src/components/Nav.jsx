import { Link, useLocation } from "react-router-dom";
import '../css/Nav.css';

function Nav() {
  const location = useLocation();

  return (
    <nav className="nav">
        <Link to="/" className={`nav__box nav__box__home ${location.pathname === "/" ? "active" : ""}`}>
            <div className="nav__img-wrapper hidden__desktop">
                <img src="../home.svg" alt="" />
            </div>
            <img className={`hidden__mobile ${location.pathname === "/" ? "" : "hidden"} heya__logo`} src="../heya-white.svg" alt="" />
            <img className={`hidden__mobile ${location.pathname === "/" ? "hidden" : ""} heya__logo`} src="../heya-blue.svg" alt="" />
            <span className="hidden__desktop">Home</span>
        </Link>
        <Link to="/rooms" className={`nav__box nav__box__rooms ${location.pathname === "/rooms" ? "active" : ""}`}>
            <div className="nav__img-wrapper hidden__desktop">
                <img src="../rooms.svg" alt="" />
            </div>
            <span>Rooms</span>
        </Link>
        <Link to="/calendar" className={`nav__box nav__box__calendar ${location.pathname === "/calendar" ? "active" : ""}`}>
            <div className="nav__img-wrapper hidden__desktop">
                <img src="../calendar.svg" alt="" />
            </div>
            <span>Calendar</span>
        </Link>
        <Link to="/chat" className={`nav__box nav__box__chat ${location.pathname === "/chat" ? "active" : ""}`}>
            <div className="nav__img-wrapper hidden__desktop">
                <img src="../chat.svg" alt="" />
            </div>
            <span>Chat</span>
        </Link>
        <Link to="/profile" className={`nav__box nav__box__profile ${location.pathname === "/profile" ? "active" : ""}`}>
            <div className="nav__img-wrapper">
                <img className="hidden__desktop" src="../profile.svg" alt="" />
                <img className={`hidden__mobile ${location.pathname === "/profile" ? "hidden" : ""} heya__logo`} src="../profile-blue.svg" alt="" />
                <img className={`hidden__mobile ${location.pathname === "/profile" ? "" : "hidden"} heya__logo`} src="../profile-beige.svg" alt="" />
            </div>
            <span className="hidden__desktop">Profile</span>
        </Link>
    </nav>
  );
}

export default Nav;
