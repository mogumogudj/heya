import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import TextBoxWithMaxInput from '../../shared/components/TextBoxWithMaxInput.jsx';
import { useNavigate } from 'react-router-dom';
import Footer from '../../shared/components/Footer.jsx';
import NavLogin from '../../shared/components/NavLogin.jsx';

function Privacy() {
    const navigate = useNavigate();
    const methods = useForm();
    const { handleSubmit, control } = methods;

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
                        <h1>Your Privacy</h1>
                        <h2>Level of Privacy and Independance</h2>

                        <div>
                    <p>How much time do you want to spend together?</p>
                    <div className="forGrid grid">
                        {['Daily', 'Weekly', 'Monthly', 'Just sometimes','Never'].map((option) => (
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

                                <div>
                    <p>How much help do you want from your attendant?</p>
                    <div className="forGrid grid">
                        {['Daily', 'Weekly', 'Monthly', 'Just sometimes','Never'].map((option) => (
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
                                        <p>Tell us something about your Privacy Values</p>
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

export default Privacy;