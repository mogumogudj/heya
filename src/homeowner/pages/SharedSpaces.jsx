import React, { useEffect, useState } from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import TextBoxWithMaxInput from '../../shared/components/TextBoxWithMaxInput.jsx';
import { useNavigate, useLocation } from 'react-router-dom';
import Footer from '../../shared/components/Footer.jsx';
import NavLogin from '../../shared/components/NavLogin.jsx';

function SharedSpaces() {
    const navigate = useNavigate();
    const location = useLocation();
    const [roomId, setRoomId] = useState(null);
    const [otherInfo, setOtherInfo] = useState('');
    const handleOtherInfoChange = (e) => setOtherInfo(e.target.value);

    const [selectedOptions, setSelectedOptions] = useState({
        activities: [],
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
        if (!roomId) {
            console.error('Room ID is missing');
            return;
        }

        const sharedSpacesDetails = {
            sharedSpaces: selectedOptions.activities,
            otherInfo,
        };

        const roomUpdateDto = {
            sharedSpaces: sharedSpacesDetails,
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
                navigate(`/room-details-homeowner?roomId=${roomId}`);
            } else {
                const result = await response.json();
                throw new Error(result.message || 'Failed to update shared spaces details');
            }
        } catch (error) {
            console.error(error.message || 'Failed to update shared spaces details');
        }
    };

    return (
        <div className="page__container">
            <NavLogin />
            <div className="content" style={{ minHeight: '100vh', marginTop: '-240px' }}>
                <div className="center-container" style={{ height: '100%' }}>
                    <div className="shared__spaces__page">
                        <div className="homeowner__register__header">
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

                        <div className="TextBoxWithMaxInput">
                            <div className="TextBoxWithMaxInput__flex">
                                <p>Additional information about the shared spaces</p>
                                <InfoOutlinedIcon
                                    className="TextBoxWithMaxInput__flex__icon"
                                    style={{ marginTop: '24px', fontSize: '20px', marginRight: '16px' }}
                                />
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
