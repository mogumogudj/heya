import { Link } from 'react-router-dom';
import '../css/nav.css';

function NavLogin() {
    return (
        <nav className="nav">
            <Link to="/home" className="nav__box nav__box__home no-hover">
                <div className="nav__img-wrapper hidden__desktop">
                    <img className="home-icon" src="../nav/home.svg" alt="Home icon" />
                </div>

                <img
                    className="hidden__mobile heya__logo nav__box__logo"
                    src="../heya-blue-round.svg"
                    alt="heya logo"
                />
                <span className="hidden__desktop">Home</span>
            </Link>
        </nav>
    );
}

export default NavLogin;
