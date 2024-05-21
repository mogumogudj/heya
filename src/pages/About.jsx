import Nav from "../components/Nav"
import Footer from "../components/Footer"
import '../css/about.css';

function About() {
    return (
        <div>
            <Nav />
            <div className="about__container">
                <div className="content">
                    <header className="title__center normal__header">
                        <h6>Heya</h6>
                        <h1>About us</h1>
                        <h4>Our Mission and Vision for a Better Living Experience</h4>
                    </header>
                    <div className="about__content">
                        <div className="about__intro">
                            <div className="about__intro-text">
                                <h1>Are you looking for a trendy student room?</h1>
                                <h4>At Heya, we promise more than just finding a room. We provide a vibrant community where students can thrive and enjoy every aspect of student life worry-free.</h4>
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
                                        <div className="team-member__socials-Linkedin"></div>
                                        <div className="team-member__socials-Mail"></div>
                                    </div>
                                </div>
                                <div className="team-member Tjerk">
                                    <div className="team-member__image team-member__image--Tjerk"></div>
                                    <div className="team-member__name">Tjerk Symens</div>
                                    <div className="team-member__role">Owner</div>
                                    <div className="team-member__socials">
                                        <div className="team-member__socials-Linkedin"></div>
                                        <div className="team-member__socials-Mail"></div>
                                    </div>
                                </div>
                                <div className="team-member Wolf">
                                    <div className="team-member__image team-member__image--Wolf"></div>
                                    <div className="team-member__name">Wolf Ver Elst</div>
                                    <div className="team-member__role">Owner</div>
                                    <div className="team-member__socials">
                                        <div className="team-member__socials-Linkedin"></div>
                                        <div className="team-member__socials-Mail"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="about__mission">
                            
                        </div>
                        <div className="about__ideal__room">
                            
                        </div>
                        <div className="about__slogan">
                            <h3>
                                At Heya, we're more than just a housing platform. We're your partner in creating unforgettable experiences 
                                during your student journey. From seamless room management to thoughtful surprises, we're here to make every 
                                moment in your student accommodation special.
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default About