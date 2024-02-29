import { Link, useLocation } from "react-router-dom";
import '../css/Nav.css';

function Nav() {
  const location = useLocation();

  return (
    <nav className="nav">
        <Link to="/home" className={`nav__box nav__box__home ${location.pathname === "/home" ? "active" : ""}`}>
            <div className="nav__img-wrapper hidden__desktop">
                <img className= {`do-not-show-on-desktop ${location.pathname === "/home" ? "hidden" : ""}`} src="../nav/home.svg" alt="" />
                <img className= {`do-not-show-on-desktop ${location.pathname === "/home" ? "" : "hidden"}`} src="../nav/home-blue.svg" alt="" />
            </div>
            <img className={`hidden__mobile ${location.pathname === "/home" ? "" : "hidden"} heya__logo`} src="../heya-white.svg" alt="" />
            <img className={`hidden__mobile ${location.pathname === "/home" ? "hidden" : ""} heya__logo`} src="../heya-blue.svg" alt="" />
            <span className="hidden__desktop">Home</span>
        </Link>
        <Link to="/rooms" className={`nav__box nav__box__rooms ${location.pathname === "/rooms" ? "active" : ""}`}>
            <div className="nav__img-wrapper hidden__desktop">
                <img className= {`do-not-show-on-desktop ${location.pathname === "/rooms" ? "hidden" : ""}`} src="../nav/rooms.svg" alt="" />
                <img className= {`do-not-show-on-desktop ${location.pathname === "/rooms" ? "" : "hidden"}`} src="../nav/rooms-blue.svg" alt="" />
            </div>
            <span>Rooms</span>
        </Link>
        <Link to="/calendar" className={`nav__box nav__box__calendar ${location.pathname === "/calendar" ? "active" : ""}`}>
            <div className="nav__img-wrapper hidden__desktop">
                <img className= {`do-not-show-on-desktop ${location.pathname === "/calendar" ? "hidden" : ""}`} src="../nav/calendar.svg" alt="" />
                <img className= {`do-not-show-on-desktop ${location.pathname === "/calendar" ? "" : "hidden"}`} src="../nav/calendar-blue.svg" alt="" />
            </div>
            <span>Calendar</span>
        </Link>
        <Link to="/chat" className={`nav__box nav__box__chat ${location.pathname === "/chat" ? "active" : ""}`}>
            <div className="nav__img-wrapper hidden__desktop">
                <img className= {`do-not-show-on-desktop ${location.pathname === "/chat" ? "hidden" : ""}`} src="../nav/chat.svg" alt="" />
                <img className= {`do-not-show-on-desktop ${location.pathname === "/chat" ? "" : "hidden"}`} src="../nav/chat-blue.svg" alt="" />
            </div>
            <span>Chat</span>
        </Link>
        <Link to="/profile" className={`nav__box nav__box__profile ${location.pathname === "/profile" ? "active" : ""}`}>
            <div className="nav__img-wrapper">
                <img className= {`do-not-show-on-desktop ${location.pathname === "/profile" ? "hidden" : ""}`} src="../nav/profile-mobile.svg" alt="" />
                <img className= {`do-not-show-on-desktop ${location.pathname === "/profile" ? "" : "hidden"}`} src="../nav/profile-mobile-blue.svg" alt="" />
                <img className={`hidden__mobile ${location.pathname === "/profile" ? "hidden" : ""} heya__logo`} src="../nav/profile-blue.svg" alt="" />
                <img className={`hidden__mobile ${location.pathname === "/profile" ? "" : "hidden"} heya__logo`} src="../nav/profile-beige.svg" alt="" />
            </div>
            <span className="hidden__desktop">Profile</span>
        </Link>
    </nav>
  );
}

export default Nav;
