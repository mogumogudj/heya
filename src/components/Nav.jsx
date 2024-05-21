import { Link, useLocation } from "react-router-dom";
import '../css/nav.css';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function Nav() {
  const location = useLocation();

  return (
    <nav className="nav">
      <Link to="/home" className="nav__box nav__box__home no-hover hidden__mobile">
        <img className="hidden__mobile heya__logo nav__box__logo" src="../heya-blue-round.svg" alt="heya logo" />
        <span className="hidden__desktop">Home</span>
      </Link>

      <Link to="/blogs" className={`nav__box nav__box__faq ${location.pathname === "/blogs" ? "active" : ""} hidden__mobile`}>
          <span>Blogs</span>
      </Link>

      <Link to="/about" className={`nav__box nav__box__about ${location.pathname === "/about" ? "active" : ""} hidden__mobile`}>
          <span>About Us</span>
      </Link>

      <Link to="/faq" className={`nav__box nav__box__faq ${location.pathname === "/faq" ? "active" : ""} hidden__mobile`}>
          <span>FAQ</span>
      </Link>

      <Link to="/contact" className={`nav__box nav__box__faq ${location.pathname === "/contact" ? "active" : ""} hidden__mobile`}>
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