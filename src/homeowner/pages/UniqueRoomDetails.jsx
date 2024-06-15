import React, { useEffect, useState } from 'react';

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import TextBoxWithMaxInput from '../../shared/components/TextBoxWithMaxInput.jsx';
import { useNavigate } from 'react-router-dom';
import Footer from '../../shared/components/Footer.jsx';
import NavLogin from '../../shared/components/NavLogin.jsx';

function UniqueRoomDetails() {
    const navigate = useNavigate();
    const [otherInfo, setOtherInfo] = useState('');
    const [roomId, setRoomId] = useState(null);
    const handleOtherInfoChange = (e) => setOtherInfo(e.target.value);
    const [selectedOptions, setSelectedOptions] = useState({
        features: [],
        ideals: [],
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

    const handleNextStep = async () => {
        const uniqueAboutPlace = {
            features: selectedOptions.features,
            ideals: selectedOptions.ideals,
            otherInfo,
        };

        const roomUpdateDto = {
            uniqueAboutPlace: uniqueAboutPlace,
        };

        try {
            if (!roomId) {
                console.error('Room ID is missing');
                return;
            }

            const response = await fetch(`${import.meta.env.VITE_API_URL}/rooms/${roomId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(roomUpdateDto),
            });

            if (response.ok) {
                navigate(`/upload-place-images-homeowner?roomId=${roomId}`);
            } else {
                const result = await response.json();
                throw new Error(result.message || 'Failed to update unique room details');
            }
        } catch (error) {
            console.error(error.message || 'Failed to save personal room details');
        }
    };

    return (
        <div className="page__container">
            <NavLogin />
            <div className="content" style={{ height: '100%' }}>
                <div className="center-container" style={{ height: '100%', marginTop: '-540px' }}>
                    <div className="unique__room__details__page">
                        <div className="homeowner__register__header">
                            <h1>Tell us about your Room</h1>
                            <h2>What makes your place unique?</h2>
                        </div>

                        <div className="form__group">
                            <p>Unique Features</p>
                            <div className="forGrid grid">
                                {[
                                    'Quiet',
                                    'Close to City Center',
                                    'Near Public Transport',
                                    'Spacious',
                                    'Cozy',
                                    'Eco-friendly',
                                    'Animal friendly',
                                    'Close to Nature',
                                    'High-speed WIFI',
                                    'Washing Machine',
                                    'Shared Tools',
                                    'Other (please specify in textbox)',
                                ].map((option) => (
                                    <div
                                        key={option}
                                        className={isChecked('features', option) ? 'checked' : ''}
                                        onClick={() => handleClick('features', option)}
                                    >
                                        <span>{option}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="TextBoxWithMaxInput">
                            <div className="TextBoxWithMaxInput__flex">
                                <p>Extra information of the available Amentities</p>
                                <InfoOutlinedIcon
                                    className="TextBoxWithMaxInput__flex__icon"
                                    style={{ marginTop: '24px', fontSize: '20', marginRight: '16px' }}
                                />
                            </div>
                            <TextBoxWithMaxInput value={otherInfo} onChange={handleOtherInfoChange} />
                        </div>

                        <div className="form__group">
                            <p>Select Your Ideal Setting</p>
                            <div className="forGrid grid">
                                {['Noise-free environment', 'Vibrant City Life', 'Close to major attractions'].map(
                                    (option) => (
                                        <div
                                            key={option}
                                            className={isChecked('ideals', option) ? 'checked' : ''}
                                            onClick={() => handleClick('ideals', option)}
                                        >
                                            <span>{option}</span>
                                        </div>
                                    ),
                                )}
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

export default UniqueRoomDetails;
