import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Gender } from '../../shared/enums/gender.js';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import TextBoxWithMaxInput from '../../shared/components/TextBoxWithMaxInput.jsx';
import { useNavigate } from 'react-router-dom';
import Footer from '../../shared/components/Footer.jsx';
import NavLogin from '../../shared/components/NavLogin.jsx';

function IdealAttendant() {
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
        navigate('/privacy-homeowner');
    }

    return (
        <div className="page__container">
            <NavLogin />
            <div className="content">
                <div className="center-container-always">
                    <div className="accommodation__type__page">
                        <h1>Perfect Attendant</h1>
                        <h2>Describe Your Ideal Attendant</h2>

                        <div className="about__yourself__inputs">
                            <div className="form__group">
                                <p>Preffered Age</p>
                                <div className="">
                                    <input
                                        type="number"
                                        placeholder="18"
                                        {...methods.register('age', { required: true })}
                                        className="input__field small bold"
                                    />
                                    <p className="bold">-</p>
                                    <input
                                        type="number"
                                        placeholder="64"
                                        {...methods.register('age', { required: true })}
                                        className="input__field small bold"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form__group">
                            <p>Gender</p>
                            <select {...methods.register('gender', { required: true })}>
                                {Object.values(Gender).map((genderOption) => (
                                    <option key={genderOption} value={genderOption}>
                                        {genderOption}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form__group">
                            <p>Language</p>
                            <select {...methods.register('language', { required: true })}>
                                <option value="English">English</option>
                                <option value="Spanish">Spanish</option>
                                <option value="French">French</option>
                                <option value="German">German</option>
                                <option value="Italian">Italian</option>
                                <option value="Portuguese">Portuguese</option>
                                <option value="Dutch">Dutch</option>
                                <option value="Russian">Russian</option>
                                <option value="Chinese">Chinese</option>
                            </select>
                        </div>

                        <div>
                            <p>Preferred Characteristics</p>
                            <div className="forGrid grid">
                                {[
                                    'Friendly',
                                    'Reliable',
                                    'Professional',
                                    'Adaptable',
                                    'Organized',
                                    'Patient',
                                    'Thrustworthy',
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

                        <div>
                            <p>Must bes</p>
                            <div className="forGrid grid">
                                {['Non Smoker', 'Vegetarian', 'Vegan', 'Other (please specify in textbox)'].map(
                                    (option) => (
                                        <div
                                            key={option}
                                            className={isChecked('activities', option) ? 'checked' : ''}
                                            onClick={() => handleClick('activities', option)}
                                        >
                                            <span>{option}</span>
                                        </div>
                                    ),
                                )}
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

export default IdealAttendant;
