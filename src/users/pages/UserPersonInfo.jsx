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

function UserPersonInfo() {
    const [selectedOptions, setSelectedOptions] = useState({
        languages: [],
        character: [],
    });
    const [otherLanguage, setOtherLanguage] = useState('');
    const [otherCharacter, setOtherCharacter] = useState('');
    const [shortDescription, setShortDescription] = useState('');
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

    const handleOtherLanguageChange = (e) => setOtherLanguage(e.target.value);
    const handleOtherCharacterChange = (e) => setOtherCharacter(e.target.value);
    const handleShortDescriptionChange = (e) => setShortDescription(e.target.value);

    const isChecked = (category, option) => selectedOptions[category].includes(option);

    const validateFields = () => {
        const newErrors = {};

        if (selectedOptions.languages.length === 0) newErrors.languages = 'Please select at least one language.';
        if (selectedOptions.character.length === 0) newErrors.character = 'Please select at least one character.';
        if (!shortDescription) newErrors.shortDescription = 'Please enter a short description.';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        console.log('Short description value:', shortDescription);
        if (!validateFields()) return;

        const data = {
            userInfo: {
                languages: selectedOptions.languages,
                otherLanguage: otherLanguage,
                character: selectedOptions.character,
                otherCharacter: otherCharacter,
                shortDescription: shortDescription,
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
                navigate('/user-expectations');
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
            <div className="content" style={{minHeight:'172vh'}}>
            <div className="center-container">
                <div className="user__person__info__page">
                <div className="user__register__header">
                <h1>Who are you as a person?</h1>
                <h2>Tell us about yourself so we can find the best match possible</h2>
                </div>
                <div className='form__group'>
                    <p>What languages do you speak?</p>
                    <div className="forGrid grid">
                        {['Dutch', 'English', 'French', 'German', 'Other'].map((option) => (
                            <div
                                key={option}
                                className={isChecked('languages', option) ? 'checked' : ''}
                                onClick={() => handleClick('languages', option)}
                            >
                                <span>{option}</span>
                            </div>
                        ))}
                    </div>
                    {errors.languages && (
                        <Alert className={classes.customAlert} severity="error">
                            {errors.languages}
                        </Alert>
                    )}

                            <div className="form__group">
                                <div className="TextBoxWithMaxInput">
                                    <div className="TextBoxWithMaxInput__flex">
                                    <p>Other Languages</p>
                                        <InfoOutlinedIcon
                                            className="TextBoxWithMaxInput__flex__icon"
                                            style={{ marginTop: '24px', fontSize: '20px', marginRight: '16px' }}
                                        />
                                    </div>
                                    <TextBoxWithMaxInput value={otherLanguage} onChange={handleOtherLanguageChange} />
                                </div>
                            </div>




                    <div className="form__group">
                    <p>What characterizes you?</p>
                    <div className="forGrid grid">
                        {[
                            'Clean',
                            'Quiet',
                            'Eco friendly',
                            'Animal friendly',
                            'Social',
                            'Pro-active',
                            'Honest',
                            'Outgoing',
                            'Other',
                        ].map((option) => (
                            <div
                                key={option}
                                className={isChecked('character', option) ? 'checked' : ''}
                                onClick={() => handleClick('character', option)}
                            >
                                <span>{option}</span>
                            </div>
                        ))}
                    </div>
                    </div>
                    {errors.character && (
                        <Alert className={classes.customAlert} severity="error">
                            {errors.character}
                        </Alert>
                    )}

                    <div className="form__group">
                                <div className="TextBoxWithMaxInput">
                                    <div className="TextBoxWithMaxInput__flex">
                                    <p>Other characteristics</p>
                                        <InfoOutlinedIcon
                                            className="TextBoxWithMaxInput__flex__icon"
                                            style={{ marginTop: '24px', fontSize: '20px', marginRight: '16px' }}
                                        />
                                    </div>
                                    <TextBoxWithMaxInput value={otherCharacter} onChange={handleOtherCharacterChange} />
                                </div>
                    </div>

                    <div className="form__group">
                                <div className="TextBoxWithMaxInput">
                                    <div className="TextBoxWithMaxInput__flex">
                                    <p>Give us a short description of yourself</p>
                                        <InfoOutlinedIcon
                                            className="TextBoxWithMaxInput__flex__icon"
                                            style={{ marginTop: '24px', fontSize: '20px', marginRight: '16px' }}
                                        />
                                    </div>
                                    <TextBoxWithMaxInput value={shortDescription} onChange={handleShortDescriptionChange} />
                                    {errors.shortDescription && (
                            <Alert className={classes.customAlert} severity="error">
                                {errors.shortDescription}
                            </Alert>
                        )}
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

export default UserPersonInfo;
