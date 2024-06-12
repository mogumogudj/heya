import React from 'react';
import HotelIcon from '@mui/icons-material/Hotel';
import CountertopsIcon from '@mui/icons-material/Countertops';
import ApartmentIcon from '@mui/icons-material/ApartmentRounded';
import { useNavigate } from 'react-router-dom';
import Footer from '../../shared/components/Footer.jsx';
import NavLogin from '../../shared/components/NavLogin.jsx';

function AccommodationType() {
    const navigate = useNavigate();

    function handleNextStep() {
        navigate('/accommodation-information-homeowner');
    }

    return (
        <div className="page__container">
            <NavLogin />
            <div className="content">
                <div className="center-container">
                    <div className="accommodation__type__page">
                        <div className="homeowner__register__header">
                            <h1>What do you offer?</h1>
                            <h2>Type of accommodation</h2>
                        </div>
                        <div className="select__accommodation">
                            <div className="accommodation__option">
                                <HotelIcon style={{ width: 80, height: 80 }} />
                                <h2>Room</h2>
                            </div>
                            <div className="accommodation__option">
                                <CountertopsIcon style={{ width: 80, height: 80 }} />
                                <h2>Studio</h2>
                            </div>
                            <div className="accommodation__option">
                                <ApartmentIcon style={{ width: 80, height: 80 }} />
                                <h2>Apartment</h2>
                            </div>
                        </div>
                        <div className="contact__us">
                            <p>
                                Not seeing your option? <span className="contact__us__span bold">Contact us</span>
                            </p>
                        </div>
                        <div className="next__help">
                            <button className="blue__button medium" type="button" onClick={handleNextStep}>
                                Next step
                            </button>
                            <span className="help">I need help</span>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default AccommodationType;
