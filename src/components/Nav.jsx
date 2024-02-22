import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav className="nav">
        <div className="nav__box">
            <Link to="/">Home</Link>
        </div>
        <div className="nav__box">
            <Link to="/rooms">Rooms</Link>
        </div>
        <div className="nav__box">
            <Link to="/calendar">Calendar</Link>
        </div>
        <div className="nav__box">
            <Link to="/chat">Chat</Link>
        </div>
        <div className="nav__box">
            <Link to="/profile">Profile</Link>
        </div>
    </nav>
  );
}

export default Nav;