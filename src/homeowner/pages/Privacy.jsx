import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import TextBoxWithMaxInput from '../../shared/components/TextBoxWithMaxInput.jsx';
import { useNavigate } from 'react-router-dom';
import Footer from '../../shared/components/Footer.jsx';
import NavLogin from '../../shared/components/NavLogin.jsx';

function Privacy() {
    const navigate = useNavigate();
    const { handleSubmit, control } = useForm();
    const [roomId, setRoomId] = useState(null);
    const [privacyValues, setPrivacyValues] = useState('');
    const [selectedOptions, setSelectedOptions] = useState({
        timeTogether: [],
        helpNeeded: [],
    });

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const roomIdFromParams = params.get('roomId');
        if (roomIdFromParams) {
            setRoomId(roomIdFromParams);
        }
    }, [location]);

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

    const handleNextStep = async (data) => {
        const privacy = {
            timeTogether: data.timeTogether,
            helpNeeded: data.helpNeeded,
            privacyValues: privacyValues,
        };

        const roomUpdateDto = {
            privacy: privacy,
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/rooms/${roomId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(roomUpdateDto),
            });

            if (response.ok) {
                navigate(`/plan-meeting-homeowner?roomId=${roomId}`);
            } else {
                const result = await response.json();
                throw new Error(result.message || 'Failed to update privacy details');
            }
        } catch (error) {
            console.error(error.message || 'Failed to update privacy details');
        }
    };

    const handlePrivacyValuesChange = (event) => {
        setPrivacyValues(event.target.value);
    };

    return (
        <div className="page__container">
            <NavLogin />
            <div className="content" style={{ height: '100%' }}>
                <div className="center-container" style={{ height: '100%' }}>
                    <div className="privacy__page">
                        <div className="homeowner__register__header">
                        <h1>Your Privacy</h1>
                        <h2>Level of Privacy and Independence</h2>
                        </div>

                        <div className='form__group'>
                            <p>How much time do you want to spend together?</p>
                            <div className="forGrid grid">
                                {['Daily', 'Weekly', 'Monthly', 'Just sometimes', 'Never'].map((option) => (
                                    <div
                                        key={option}
                                        className={isChecked('timeTogether', option) ? 'checked' : ''}
                                        onClick={() => handleClick('timeTogether', option)}
                                    >
                                        <span>{option}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className='form__group'>
                            <p>How much help do you want from your attendant?</p>
                            <div className="forGrid grid">
                                {['Daily', 'Weekly', 'Monthly', 'Just sometimes', 'Never'].map((option) => (
                                    <div
                                        key={option}
                                        className={isChecked('helpNeeded', option) ? 'checked' : ''}
                                        onClick={() => handleClick('helpNeeded', option)}
                                    >
                                        <span>{option}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="TextBoxWithMaxInput">
                            <div className="TextBoxWithMaxInput__flex">
                                <p>Tell us something about your Privacy Values</p>
                                <InfoOutlinedIcon
                                    className="TextBoxWithMaxInput__flex__icon"
                                    style={{ marginTop: '24px', fontSize: '20px', marginRight: '16px' }}
                                />
                            </div>
                            <TextBoxWithMaxInput 
                            value={privacyValues}
                            onChange={handlePrivacyValuesChange}
                            className="input__field" />
                        </div>

                        <div className="next__help">
                            <button
                                className="blue__button medium"
                                type="button"
                                onClick={handleSubmit(handleNextStep)}
                            >
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
