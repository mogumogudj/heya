import '../css/footer.css';
import logo from '/heya-blue-round.svg';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';

const Footer = () => {
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = () => {
        setSubscribed(true);
    };

    return (
        <footer className="footer">
            <div className="footer-left">
                <img src={logo} alt="Logo" className="footer-logo" />
                <div className="footer-contact">
                    <div className="footer-email">
                        <EmailIcon className="footer-icon" />
                        <span>info@heya.me</span>
                    </div>
                    <div className="footer-phone">
                        <PhoneIcon className="footer-icon" />
                        <span>+123 456 7890</span>
                    </div>
                </div>
            </div>
            <div className="footer-nav">
                <nav>
                    <ul>
                        <li className="footer-nav-big">
                            <a href="rooms">Find a room</a>
                        </li>
                        <li className="footer-nav-big">
                            <a href="register">Become a host</a>
                        </li>
                        <li className="footer-nav-big">
                            <a href="about">About us</a>
                        </li>
                        <li className="footer-nav-big">
                            <a href="contact">Contact</a>
                        </li>
                        <li className="footer-nav-small">
                            <a href="faq">FAQ</a>
                        </li>
                        <li className="footer-nav-small">
                            <a href="blog">Blog</a>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="footer-subscribe">
                <h2>Want to keep yourself up to date?</h2>
                <h4>Subscribe to our newsletter and receive regular updates.</h4>
                <p>Email</p>
                <input type="email" placeholder="Your email address" className="footer-input" />
                <div className="footer-checkbox">
                    <input type="checkbox" id="privacy" />
                    <label htmlFor="privacy">
                        I declare that I have read and approved the <span>privacy policy.</span>
                    </label>
                </div>
                <button className={`footer-button ${subscribed ? 'subscribed' : ''}`} onClick={handleSubscribe}>
                    {subscribed ? 'Thanks!' : 'Subscribe'}
                </button>

                <div className="footer-social">
                    <h4>or follow us on</h4>
                    <IconButton href="https://www.facebook.com" aria-label="Facebook">
                        <FacebookIcon />
                    </IconButton>
                    <IconButton href="https://www.instagram.com" aria-label="Instagram">
                        <InstagramIcon />
                    </IconButton>
                    <IconButton href="https://www.linkedin.com" aria-label="LinkedIn">
                        <LinkedInIcon />
                    </IconButton>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
