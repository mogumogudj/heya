import React, { useState } from 'react';
import '../css/userInfo.css';
import Footer from '../../shared/components/Footer.jsx';
import NavLogin from '../../shared/components/NavLogin.jsx';
import TextBoxWithMaxInput from '../../shared/components/TextBoxWithMaxInput.jsx';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Alert from '@mui/material/Alert';
import { makeStyles } from '@mui/styles';

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

function UserExpectations() {
    const [selectedOptions, setSelectedOptions] = useState({
        wants: [],
        characteristics: [],
    });
    const [otherCharacteristics, setOtherCharacteristics] = useState('');
    const [userId] = useState(localStorage.getItem('userId'));
    const [errors, setErrors] = useState({});
    const classes = useStyles();

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

    const handleOtherCharacteristicsChange = (e) => setOtherCharacteristics(e.target.value);

    const isChecked = (category, option) => selectedOptions[category].includes(option);

    const validateFields = () => {
        const newErrors = {};

        if (selectedOptions.wants.length === 0) newErrors.wants = 'Please select at least one want.';
        if (selectedOptions.characteristics.length === 0)
            newErrors.characteristics = 'Please select at least one characteristics.';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateFields()) return;

        const data = {
            userExpectations: {
                wants: selectedOptions.wants,
                characteristics: selectedOptions.characteristics,
                otherCharacteristics: otherCharacteristics,
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
            <div className="content" style={{minHeight:'140vh'}}>
            <div className="center-container">
            <div className="user__expectations__page">
                <div className="user__register__header">
                <h1>Your Expectations?</h1>
                <h2>This helps us find your ideal match.</h2>
                </div>

                <div className='form__group'>
                    <p>I want my host to..</p>
                    <div className="forGrid grid">
                        {[
                            'Become friends with me',
                            'Let me become a member of the family',
                            'Hang out and do things together',
                            'Have a chat now and then',
                            'Do my own thing',
                        ].map((option) => (
                            <div
                                key={option}
                                className={isChecked('wants', option) ? 'checked' : ''}
                                onClick={() => handleClick('wants', option)}
                            >
                                <span>{option}</span>
                            </div>
                        ))}
                    </div>
                    {errors.wants && (
                        <Alert className={classes.customAlert} severity="error">
                            {errors.wants}
                        </Alert>
                    )}


                    <div className='form__group'>
                    <p>Characteristics you find important for the house?</p>
                    <div className="forGrid grid">
                        {[
                            'Clean',
                            'Quiet',
                            'Eco friendly',
                            'Animal friendly',
                            'Spacious',
                            'Light',
                            'Unique',
                            'In the city center',
                            'Close to public transport',
                            'Other',
                        ].map((option) => (
                            <div
                                key={option}
                                className={isChecked('characteristics', option) ? 'checked' : ''}
                                onClick={() => handleClick('characteristics', option)}
                            >
                                <span>{option}</span>
                            </div>
                        ))}
                    </div>
                    </div>

                    {errors.characteristics && (
                        <Alert className={classes.customAlert} severity="error">
                            {errors.characteristics}
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
                                    <TextBoxWithMaxInput value={otherCharacteristics} onChange={handleOtherCharacteristicsChange} />
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

export default UserExpectations;
