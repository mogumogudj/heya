import { Link, useLocation } from "react-router-dom";
import '../css/nav.css';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ContactSupportRoundedIcon from '@mui/icons-material/ContactSupportRounded';
import QuizRoundedIcon from '@mui/icons-material/QuizRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';

function Nav() {
  const location = useLocation();

  return (
    <nav className="nav">
      <Link to="/home" className={`nav__box nav__box__home no-hover ${location.pathname === "/home" ? "active" : ""}`}>
        <div className="nav__img-wrapper hidden__desktop">
          <img className={`do-not-show-on-desktop ${location.pathname === "/home" ? "hidden" : ""}`} src="../nav/home.svg" alt="home icon" />
          <img className={`do-not-show-on-desktop ${location.pathname === "/home" ? "" : "hidden"}`} src="../nav/home-blue.svg" alt="home icon blue" />
        </div>
        <img className="hidden__mobile heya__logo nav__box__logo" src="../heya-blue-round.svg" alt="heya logo" />
        <span className="hidden__desktop">Home</span>
      </Link>

      <Link to="/blogs" className={`nav__box nav__box__faq ${location.pathname === "/blogs" ? "active" : ""}`}>
        <div className="nav__img-wrapper hidden__desktop">
          <MenuBookRoundedIcon className={`do-not-show-on-desktop ${location.pathname === "/blogs" ? "active-icon" : ""}`} />
        </div>
        <span>Blogs</span>
      </Link>

      <Link to="/about" className={`nav__box nav__box__about ${location.pathname === "/about" ? "active" : ""}`}>
        <div className="nav__img-wrapper hidden__desktop">
          <InfoRoundedIcon className={`do-not-show-on-desktop ${location.pathname === "/about" ? "active-icon" : ""}`} />
        </div>
        <span>About Us</span>
      </Link>

      <Link to="/faq" className={`nav__box nav__box__faq ${location.pathname === "/faq" ? "active" : ""}`}>
        <div className="nav__img-wrapper hidden__desktop">
          <QuizRoundedIcon className={`do-not-show-on-desktop ${location.pathname === "/faq" ? "active-icon" : ""}`} />
        </div>
        <span>FAQ</span>
      </Link>

      <Link to="/contact" className={`nav__box nav__box__contact ${location.pathname === "/contact" ? "active" : ""}`}>
        <div className="nav__img-wrapper hidden__desktop">
          <ContactSupportRoundedIcon className={`do-not-show-on-desktop ${location.pathname === "/contact" ? "active-icon" : ""}`} />
        </div>
        <span>Contact</span>
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

export default Nav;
