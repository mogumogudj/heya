import React, { useState } from 'react';

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import TextBoxWithMaxInput from '../../shared/components/TextBoxWithMaxInput.jsx';
import { useNavigate } from 'react-router-dom';
import Footer from '../../shared/components/Footer.jsx';
import NavLogin from '../../shared/components/NavLogin.jsx';

function PersonalRoomDetails() {
    const navigate = useNavigate();
    const [otherInfo, setOtherInfo] = useState('');
    const handleOtherInfoChange = (e) => setOtherInfo(e.target.value);

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
        navigate('/unique-room-details-homeowner');
    }

    return (
        <div className="page__container">
            <NavLogin />
            <div className="content" style={{ minHeight: '128vh' }}>
                <div className="center-container">
                    <div className="personal__room__details__page">
                        <div className="homeowner__register__header">
                        <h1>Tell us about your Room</h1>
                        <h2>Your Personal Room Details</h2>
                        </div>
                        <div className="form__group">
                            <p>Room Amentities</p>
                            <div className="forGrid grid">
                                {[
                                    'Private Bathroom',
                                    'Toilet Available',
                                    'Garage',
                                    'Indoor Parking For Bike',
                                    'Outdoor Parking For Bike',
                                    'Parking for Car',
                                    'Basement',
                                    'Attic',
                                    'Laundry Machine',
                                    'Washing Machine',
                                    'Dryer',
                                    'Other (please specify in textbox)',
                                ].map((option) => (
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

                        <div className='TextBoxWithMaxInput'>
                            <div className="TextBoxWithMaxInput__flex">
                                <p>Extra information of the available Amentities</p>
                                <InfoOutlinedIcon className='TextBoxWithMaxInput__flex__icon' style={{ marginTop: '24px', fontSize: '20', marginRight: '16px' }} />
                            </div>
                            <TextBoxWithMaxInput value={otherInfo} onChange={handleOtherInfoChange} />
                        </div>

                        <div className="form__group">
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

export default PersonalRoomDetails;
