import React, { useState } from 'react';
import '../css/welcome.css';
import Nav from "../components/Nav";

function Welcome() {
    const [isLeftActive, setIsLeftActive] = useState(true);

    return (
        <div>
            <Nav />
            <div className="page__container">
                <div className="content__wrapper">
                    <div className="content__container">
                        <h1>{isLeftActive ? 'Find your ideal room with Heya' : 'List your room with Heya today'}</h1>

                        <div className="switch__container">
                            <button 
                                className={`switch__button ${isLeftActive ? 'active' : ''}`} 
                                onClick={() => setIsLeftActive(true)}
                            >
                                For Students
                            </button>
                            <button 
                                className={`switch__button ${!isLeftActive ? 'active' : ''}`} 
                                onClick={() => setIsLeftActive(false)}
                            >
                                For Hosts
                            </button>
                        </div>
                        <h4 className="description">
                            {isLeftActive 
                                ? 'Experience the future of student housing. Connect with trusted hosts.' 
                                : 'Reach reliable student tenants. Fill your space quickly. Enjoy a seamless listing process.'
                            }
                        </h4>
                        <div className="button__container">
                            <button type="submit" className="blue__button medium">Get started</button>
                            <button type="submit" className="white__button medium">Login</button>
                        </div>
                    </div>
                    <img 
                        src={isLeftActive ? '../public/SleepingRoom.webp' : '../public/CozyLivingRoom.webp'} 
                        alt={isLeftActive ? 'Sleeping Room' : 'Cozy Living Room'} 
                        className="rotated__image" 
                    />
                </div>
            </div>
        </div>
    );
}

export default Welcome;
