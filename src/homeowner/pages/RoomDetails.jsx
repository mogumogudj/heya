import React, { useState } from 'react';

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import TextBoxWithMaxInput from '../../shared/components/TextBoxWithMaxInput.jsx';
import { useNavigate } from 'react-router-dom';
import Footer from '../../shared/components/Footer.jsx';
import NavLogin from '../../shared/components/NavLogin.jsx';

function RoomDetails() {
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
        navigate('/personal-room-details-homeowner');
    }

    return (
        <div className="page__container">
            <NavLogin />
            <div className="content">
                <div className="center-container-always">
                    <div className="accommodation__type__page">
                        <h1>Tell us about your Room</h1>
                        <h2>Your Room Details</h2>

                        <div className="">
                            <p>Size of the Room in m²</p>
                            <div className="forGrid grid">
                                {['Furnished', 'Not Furnished'].map((option) => (
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

                        <div className="flex">
                            <p>Size of the Room in m²</p>
                            <div className="inputWrapper">
                                <input type="text" maxLength="4" placeholder="20" className={'input__field'} />
                            </div>
                        </div>

                        <div>
                            <p>Size of the Room in m²</p>
                            <div className="forGrid grid">
                                {[
                                    'Bed',
                                    'Sofa',
                                    'Desk',
                                    'Chair',
                                    'Wardrobe',
                                    'Bookhelf',
                                    'Nighstand',
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

                        <div className="about__yourself__inputs">
                            <div className="form__group">
                                <p>Extra information</p>
                                <InfoOutlinedIcon />
                                <TextBoxWithMaxInput value="" onChange={() => {}} className="input__field" />
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

export default RoomDetails;
