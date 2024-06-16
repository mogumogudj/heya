import React, { useState } from 'react';
import '../css/userInfo.css';
import Footer from '../../shared/components/Footer.jsx';
import NavLogin from '../../shared/components/NavLogin.jsx';
import TextBoxWithMaxInput from '../../shared/components/TextBoxWithMaxInput.jsx';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Alert from '@mui/material/Alert';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles({
    customAlert: {
        borderRadius: '8px',
        width: '100%',
        margin: '16px 0 0 0',
    },
    errorInput: {
        border: '1px solid red',
    },
});

function CustomizeStay() {
    const [selectedOptions, setSelectedOptions] = useState({
        activities: [],
        experiences: [],
    });
    const [otherInfo, setOtherInfo] = useState('');
    const [study, setStudy] = useState('');
    const [city, setCity] = useState('');
    const [userId] = useState(localStorage.getItem('userId'));
    const [errors, setErrors] = useState({});
    const classes = useStyles();
    const navigate = useNavigate();

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

    const handleOtherInfoChange = (e) => setOtherInfo(e.target.value);
    const handleStudyChange = (e) => setStudy(e.target.value);
    const handleCityChange = (e) => setCity(e.target.value);

    const isChecked = (category, option) => selectedOptions[category].includes(option);

    const validateFields = () => {
        const newErrors = {};

        if (selectedOptions.activities.length === 0) newErrors.activities = 'Please select at least one activity.';
        if (selectedOptions.experiences.length === 0) newErrors.experiences = 'Please select at least one experience.';
        if (!study) newErrors.study = 'Please enter what you will study.';
        if (!city) newErrors.city = 'Please enter the city you will study in.';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateFields()) return;

        const data = {
            userStayInfo: {
                activities: selectedOptions.activities,
                experiences: selectedOptions.experiences,
                otherInfo: otherInfo,
                study: study,
                city: city,
            },
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                console.log('Data submitted successfully');
                navigate('/user-person-info');
            } else {
                console.error('Error submitting data');
            }
        } catch (error) {
            console.error('Network error', error);
        }
    };

    return (
        <div className="page__container">
            <NavLogin />
            <div className="content" style={{minHeight: '120vh'}}>
            <div className="center-container">
                <div className="customize__stay__page">
                <div className="user__register__header">
                <h1>Customize your stay</h1>
                <h2>Upload your profile picture</h2>
                </div>
                <div className="form__group">
                    <p>What will you do during your stay?</p>
                    <div className="forGrid grid">
                        {['Study', 'Work', 'Internship', 'Other'].map((option) => (
                            <div
                                key={option}
                                className={isChecked('activities', option) ? 'checked' : ''}
                                onClick={() => handleClick('activities', option)}
                            >
                                <span>{option}</span>
                            </div>
                        ))}
                    </div>
                    {errors.activities && (
                        <Alert className={classes.customAlert} severity="error">
                            {errors.activities}
                        </Alert>
                    )}
                    
                    <div className="study__flex">
                    <div className={'about__yourself__inputs'}>
                        <div className='form__group'>
                            <p>What do/will you study?</p>
                            <input
                                type="text"
                                maxLength="100"
                                placeholder="Bachelor/Master in..."
                                value={study}
                                onChange={handleStudyChange}
                                className="input__field"
                            />
                            {errors.study && (
                                <Alert className={classes.customAlert} severity="error">
                                    {errors.study}
                                </Alert>
                            )}
                        </div>
                        <div className='form__group'>
                            <p>In what city do/will you study?</p>
                            <input
                                type="text"
                                maxLength="100"
                                placeholder="Antwerp"
                                value={city}
                                onChange={handleCityChange}
                                className="input__field"
                            />
                            {errors.city && (
                                <Alert className={classes.customAlert} severity="error">
                                    {errors.city}
                                </Alert>
                            )}
                        </div>
                        </div>
                    </div>
                    <div style={{marginTop: '16px'}}>
                    <p>Have you ever...</p>
                    <div className="forGrid grid">
                        {[
                            'Lived with a Host',
                            'Lived Abroad',
                            'Lived on my own',
                            'Lived with a Guest Family',
                            'None of the above',
                        ].map((option) => (
                            <div
                                key={option}
                                className={isChecked('experiences', option) ? 'checked' : ''}
                                onClick={() => handleClick('experiences', option)}
                            >
                                <span>{option}</span>
                            </div>
                        ))}
                    </div>
                    </div>
                    {errors.experiences && (
                        <Alert className={classes.customAlert} severity="error">
                            {errors.experiences}
                        </Alert>
                    )}

                    <div className="form__group">
                                <div className="TextBoxWithMaxInput">
                                    <div className="TextBoxWithMaxInput__flex">
                                    <p>Extra information you would like us to know?</p>
                                        <InfoOutlinedIcon
                                            className="TextBoxWithMaxInput__flex__icon"
                                            style={{ marginTop: '24px', fontSize: '20px', marginRight: '16px' }}
                                        />
                                    </div>
                                    <TextBoxWithMaxInput value={otherInfo} onChange={handleOtherInfoChange} />
                                </div>
                            </div>

                    <div className="next__help">
                        <button className="blue__button medium" type="button" onClick={handleSubmit}>
                            Next step
                        </button>
                        <span className="help">I need help</span>
                    </div>
                </div>
                </div>
            </div>
            </div>
            <Footer />
        </div>
    );
}

export default CustomizeStay;
