import React, { useState, useEffect } from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import TextBoxWithMaxInput from '../../shared/components/TextBoxWithMaxInput.jsx';
import { useNavigate, useLocation } from 'react-router-dom';
import Footer from '../../shared/components/Footer.jsx';
import NavLogin from '../../shared/components/NavLogin.jsx';

function PersonalRoomDetails() {
    const navigate = useNavigate();
    const location = useLocation();
    const [roomId, setRoomId] = useState(null);
    const [otherInfo, setOtherInfo] = useState('');
    const [selectedOptions, setSelectedOptions] = useState({
        activities: [],
        additionalAmenities: [],
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

    const handleOtherInfoChange = (e) => setOtherInfo(e.target.value);

    const handleNextStep = async () => {
        const personalRoomDetails = {
            activities: selectedOptions.activities,
            additionalAmenities: selectedOptions.additionalAmenities,
            otherInfo: otherInfo,
        };

        const roomUpdateDto = {
            personalRoomDetails: personalRoomDetails,
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
                navigate(`/unique-room-details-homeowner?roomId=${roomId}`);
            } else {
                const result = await response.json();
                throw new Error(result.message || 'Failed to save personal room details');
            }
        } catch (error) {
            console.error(error.message || 'Failed to save personal room details');
        }
    };

    return (
        <div className="page__container">
            <NavLogin />
            <div className="content" style={{ minHeight: '100vh', marginTop: '-380px' }}>
                <div className="center-container" style={{ height: '100%' }}>
                    <div className="personal__room__details__page">
                        <div className="homeowner__register__header">
                            <h1>Tell us about your Room</h1>
                            <h2>Your Personal Room Details</h2>
                        </div>
                        <div className="form__group">
                            <p>Room Amenities</p>
                            <div className="forGrid grid">
                                {[
                                    'Private Bathroom',
                                    'Toilet Available',
                                    'Garage',
                                    'Indoor Parking For Bike',
                                    'Outdoor Parking For Bike',
                                    'Parking for Car',
                                    'Basement',
                                    'Attic',
                                    'Laundry Machine',
                                    'Washing Machine',
                                    'Dryer',
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
                                <p>Extra information of the available Amenities</p>
                                <InfoOutlinedIcon
                                    className="TextBoxWithMaxInput__flex__icon"
                                    style={{ marginTop: '24px', fontSize: '20', marginRight: '16px' }}
                                />
                            </div>
                            <TextBoxWithMaxInput value={otherInfo} onChange={handleOtherInfoChange} />
                        </div>

                        <div className="form__group">
                            <p>Additional Amenities</p>
                            <div className="forGrid grid">
                                {['Available Bike', 'Dishwasher', 'Available Car to Use'].map((option) => (
                                    <div
                                        key={option}
                                        className={isChecked('additionalAmenities', option) ? 'checked' : ''}
                                        onClick={() => handleClick('additionalAmenities', option)}
                                    >
                                        <span>{option}</span>
                                    </div>
                                ))}
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

export default PersonalRoomDetails;
