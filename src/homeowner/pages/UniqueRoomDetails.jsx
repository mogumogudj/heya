import React, { useState } from 'react';

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import TextBoxWithMaxInput from '../../shared/components/TextBoxWithMaxInput.jsx';
import { useNavigate } from 'react-router-dom';
import Footer from '../../shared/components/Footer.jsx';
import NavLogin from '../../shared/components/NavLogin.jsx';

function UniqueRoomDetails() {
    const navigate = useNavigate();

    const [selectedOptions, setSelectedOptions] = useState({
        activities: [],
        experiences: [],
    });

    const isChecked = (category, option) => selectedOptions[category].includes(option);

    const handleClick = (category, option) => {
        setSelectedOptions((prevState) => {
            const isSelected = prevState[category].includes(option);
            return {
                ...prevState,
                [category]: isSelected
                    ? prevState[category].filter((item) => item !== option)
                    : [...prevState[category], option],
            };
        });
    };

    function handleNextStep() {
        navigate('/next-step');
    }

    return (
        <div className="page__container">
            <NavLogin />
            <div className="content">
                <div className="center-container-always">
                    <div className="accommodation__type__page">
                        <h1>Tell us about your Room</h1>
                        <h2>What makes your place unique?</h2>
                        
                        <div className="">
                        <p>Room Amentities</p>
                        <div className="forGrid grid">
                        {['Quiet', 'City Center', 'Near Public Transport', 'Spacious', 'Cozy', 'Eco-friendly', 'Animal friendly', 'Close to Nature', 'High-speed WIFI', 'Washing Machine', 'Shared Tools', 'Other (please specify in textbox)'].map((option) => (
                            <div
                                key={option}
                                className={isChecked('activities', option) ? 'checked' : ''}
                                onClick={() => handleClick('activities', option)}
                            >
                                <span>{option}</span>
                            </div>
                        ))}
                    </div>
                    </div>

                    <div className="about__yourself__inputs">
                                    <div className="form__group">
                                        <p>Extra information</p>
                                        <InfoOutlinedIcon />
                                        <TextBoxWithMaxInput value="" onChange={() => {}} className="input__field" />
                                    </div>
                                </div>


                                <div className="">
                        <p>Additional Amentities</p>
                        <div className="forGrid grid">
                        {['Available Bike', 'Dishwasher', 'Available Car to Use'].map((option) => (
                            <div
                                key={option}
                                className={isChecked('activities', option) ? 'checked' : ''}
                                onClick={() => handleClick('activities', option)}
                            >
                                <span>{option}</span>
                            </div>
                        ))}
                    </div>
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

export default UniqueRoomDetails;