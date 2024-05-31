import React, { useEffect, useState } from 'react';
import NavApp from '../components/NavApp.jsx';
import Nav from '../../heya-web/components/Nav.jsx';
import Footer from '../../shared/components/Footer.jsx';
import '../css/room-info.css';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SwapHorizontalCircleRoundedIcon from '@mui/icons-material/SwapHorizontalCircleRounded';
import MapsHomeWorkRoundedIcon from '@mui/icons-material/MapsHomeWorkRounded';

function RoomInfo() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);
    
    return (
        <div className="page__container">
            {isLoggedIn ? <NavApp /> : <Nav />}
            <div className="content">
                <a className='underline back-button' href="#" onclick="goBack()">Back</a>
                <div className='room__main-content'>
                    <div className='room__images'>
                        <div className='room__images-all'>
                            <img className='room__image room__image1 active' src="../Rodestraat1.webp" alt="Rodestraat 52, image1" />
                            <img className='room__image room__image2' src="../Rodestraat2.webp" alt="Rodestraat 52, image2" />
                            <img className='room__image room__image3' src="../Rodestraat3.webp" alt="Rodestraat 52, image3" />
                            <img className='room__image room__image4' src="../Rodestraat4.webp" alt="Rodestraat 52, image4" />
                            <img className='room__image room__image5' src="../Rodestraat5.webp" alt="Rodestraat 52, image5" />
                            <img className='room__image room__image6' src="../Rodestraat6.webp" alt="Rodestraat 52, image6" />
                        </div>
                        <div className='room__images-main'>
                            <img src="../Rodestraat1.webp" alt="Rodestraat 52, imageX" />
                        </div>
                    </div>
                    <div className='room__overview'>
                        <div className='room__tags'>
                            <div className='room--tag tag featured'><p>Featured</p></div>
                            <div className='room--tag tag opening'><p>Opening 12/6</p></div>
                        </div>
                        <h1 className='room__location'>Rodestraat 52</h1>
                        <div className='room--details'>
                            <div className='room--basics'>
                                <div className='room--basics--location room--basics__item'>
                                    <LocationOnIcon />
                                    <div className='room--basics__item__text'>    
                                        <p>Location</p>
                                        <span>Leuven</span>
                                    </div>
                                </div>
                                <div className='room--basics--space room--basics__item'>
                                    <SwapHorizontalCircleRoundedIcon />
                                    <div className='room--basics__item__text'>
                                        <p>Space</p>
                                        <span>12m²</span>
                                    </div>
                                </div>
                                <div className='room--basics--type room--basics__item'>
                                    <MapsHomeWorkRoundedIcon />
                                    <div className='room--basics__item__text'>
                                        <p>Type</p>
                                        <span>Townhouse</span>
                                    </div>
                                </div>
                            </div>
                            <div className='room--icons'>

                            </div>
                        </div>
                    </div>
                </div>
                <div className='room__secondary-content'>
                    <div className='room__info'>

                    </div>
                    <div className='room__people'>

                        <p>Something wrong? Please <a className='underline' href="/contact">Contact us</a></p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default RoomInfo;