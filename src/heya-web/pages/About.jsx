import Nav from '../components/Nav.jsx';
import Footer from '../../shared/components/Footer.jsx';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import '../css/about.css';

function About() {
    return (
        <div className="page__container">
            <Nav />
            <div className="about__container">
                <div className="content__about">
                    <header className="title__center normal__header">
                        <h6>Heya</h6>
                        <h1>About us</h1>
                        <h4>Our Mission and Vision for a Better Living Experience</h4>
                    </header>
                    <div className="about__content">
                        <div className="about__intro">
                            <div className="about__intro-text">
                                <h1>Are you looking for a trendy student room?</h1>
                                <h4>
                                    At Heya, we promise more than just finding a room. We provide a vibrant community
                                    where students can thrive and enjoy every aspect of student life worry-free.
                                </h4>
                            </div>
                            <div className="about__intro-images">
                                <div className="about__intro-images-double">
                                    <div className="about__intro-image intro-image__1"></div>
                                    <div className="about__intro-image intro-image__2"></div>
                                </div>
                                <div className="about__intro-image intro-image__3"></div>
                            </div>
                        </div>
                        <div className="about__team">
                            <div className="about__team-description">
                                <h1>Meet our Team</h1>
                                <h4>Meet the passionate individuals behind Heya</h4>
                            </div>
                            <div className="about__team-members">
                                <div className="team-member Wouter">
                                    <div className="team-member__image team-member__image--Wouter"></div>
                                    <div className="team-member__name">Wouter Waumans</div>
                                    <div className="team-member__role">Owner</div>
                                    <div className="team-member__socials">
                                        <div className="team-member__socials-Linkedin team-member__socials-icon">
                                            <LinkedInIcon />
                                        </div>
                                        <div className="team-member__socials-Mail team-member__socials-icon">
                                            <EmailIcon />
                                        </div>
                                    </div>
                                </div>
                                <div className="team-member Tjerk">
                                    <div className="team-member__image team-member__image--Tjerk"></div>
                                    <div className="team-member__name">Tjerk Symens</div>
                                    <div className="team-member__role">Owner</div>
                                    <div className="team-member__socials">
                                        <div className="team-member__socials-Linkedin team-member__socials-icon">
                                            <LinkedInIcon />
                                        </div>
                                        <div className="team-member__socials-Mail team-member__socials-icon">
                                            <EmailIcon />
                                        </div>
                                    </div>
                                </div>
                                <div className="team-member Wolf">
                                    <div className="team-member__image team-member__image--Wolf"></div>
                                    <div className="team-member__name">Wolf Ver Elst</div>
                                    <div className="team-member__role">Owner</div>
                                    <div className="team-member__socials">
                                        <div className="team-member__socials-Linkedin team-member__socials-icon">
                                            <LinkedInIcon />
                                        </div>
                                        <div className="team-member__socials-Mail team-member__socials-icon">
                                            <EmailIcon />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="about__mission">
                            <div className="about__mission-image mission-image"></div>
                            <div className="about__mission-text">
                                <h1>Our mission</h1>
                                <h4>
                                    At Heya, our mission is to revolutionize student housing by connecting students with
                                    affordable, quality homes and supportive hosts. We champion the innovative concept
                                    of hospitawonen, ensuring every student finds a safe and enriching living
                                    experience.
                                </h4>
                            </div>
                        </div>
                        <div className="about__ideal-room">
                            <div className="about__ideal-room-text">
                                <h1>Your ideal room</h1>
                                <h4>
                                    At Heya, our mission is to revolutionize student housing by connecting students with
                                    affordable, quality homes and supportive hosts. We champion the innovative concept
                                    of hospitawonen, ensuring every student finds a safe and enriching living
                                    experience.
                                </h4>
                            </div>
                            <div className="about__ideal-room-image ideal-room-image"></div>
                        </div>
                        <div className="about__slogan">
                            <h3 className='about__slogan__text'>
                                At Heya, we're more than just a housing platform. We're your partner in creating
                                unforgettable experiences during your student journey. From seamless room management to
                                thoughtful surprises, we're here to make every moment in your student accommodation
                                special.
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default About;
