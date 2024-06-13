import React, { useState } from 'react';

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import TextBoxWithMaxInput from '../../shared/components/TextBoxWithMaxInput.jsx';
import { useNavigate } from 'react-router-dom';
import Footer from '../../shared/components/Footer.jsx';
import NavLogin from '../../shared/components/NavLogin.jsx';


function SharedSpaces() {
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
        navigate('/room-details-homeowner');
    }

    return (
        <div className="page__container">
            <NavLogin />
            <div className="content">
                <div className="center-container-always">
                    <div className="shared__spaces__page">
                        <div className='homeowner__register__header'>
                        <h1>Tell us something more about</h1>
                        <h2>Your Shared Spaces</h2>
                        </div>
                        <div className="form__group">
                        <p>What shared spaces are available?</p>
                        <div className="forGrid grid">
                            {[
                                'Bathroom',
                                'Kitchen',
                                'Toilet',
                                'Basement',
                                'Living Room',
                                'Dining Room',
                                'Study/Office Room',
                                'Laundry Room',
                                'Gym/Fitness Area',
                                'Common Outdoor Area',
                                'Play Area for Children',
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
                                        <p>Additional information about the animal(s)</p>
                                        <InfoOutlinedIcon className='TextBoxWithMaxInput__flex__icon' style={{marginTop:'24px', fontSize:'20', marginRight:'16px' }}/>
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

export default SharedSpaces;
