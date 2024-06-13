import React, { useState } from 'react';

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import TextBoxWithMaxInput from '../../shared/components/TextBoxWithMaxInput.jsx';
import { useNavigate } from 'react-router-dom';
import Footer from '../../shared/components/Footer.jsx';
import NavLogin from '../../shared/components/NavLogin.jsx';

function RoomDetails() {
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
        navigate('/personal-room-details-homeowner');
    }

    return (
        <div className="page__container">
            <NavLogin />
            <div className="content" style={{ minHeight: '128vh' }}>
                <div className="center-container">
                    <div className="room__details__page">
                    <div className="homeowner__register__header">
                        <h1>Tell us about your Room</h1>
                        <h2>Your Room Details</h2>
                    </div>
                        <div className="form__group">
                            <p>Furnishing</p>
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

                        <div className="about__yourself__inputs">
                            <div className="form__group">
                                <p>Size of the Room</p>
                                <div className="input-container">
                                    <input
                                        type="text"
                                        placeholder="240"
                                        className="input__field"
                                        style={{ paddingRight: '30px' }}
                                    />
                                    <span className="input-unit" style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}>m²</span>
                                </div>
                            </div>
                        </div>

                        <div className='form__group'>
                            <p>Amentities already available in the Room</p>
                            <div className="forGrid grid">
                                {[
                                    'Bed',
                                    'Sofa',
                                    'Desk',
                                    'Chair',
                                    'Wardrobe',
                                    'Bookhelf',
                                    'Nighstand',
                                    'TV',
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
                                <p>Extra information</p>
                                <InfoOutlinedIcon className='TextBoxWithMaxInput__flex__icon' style={{ marginTop: '24px', fontSize: '20', marginRight: '16px' }} />
                            </div>
                            <TextBoxWithMaxInput value={otherInfo} onChange={handleOtherInfoChange} />
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
