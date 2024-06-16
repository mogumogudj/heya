import React, { useEffect, useState } from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import TextBoxWithMaxInput from '../../shared/components/TextBoxWithMaxInput.jsx';
import { useNavigate, useLocation } from 'react-router-dom';
import Footer from '../../shared/components/Footer.jsx';
import NavLogin from '../../shared/components/NavLogin.jsx';

function RoomDetails() {
    const navigate = useNavigate();
    const location = useLocation();
    const [roomId, setRoomId] = useState(null);
    const [otherInfo, setOtherInfo] = useState('');
    const [roomSize, setRoomSize] = useState('');
    const handleOtherInfoChange = (e) => setOtherInfo(e.target.value);
    const [selectedOptions, setSelectedOptions] = useState({
        furnishing: [],
        existingFurnishing: [],
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

        const roomDetails = {
            furnishing: selectedOptions.furnishing.includes('Furnished') ? 'Furnished' : 'Not Furnished',
            size: roomSize,
            existingFurnishing: selectedOptions.existingFurnishing,
            otherInfo,
        };

        const roomUpdateDto = {
            roomDetails: roomDetails,
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
                navigate(`/personal-room-details-homeowner?roomId=${roomId}`);
            } else {
                const result = await response.json();
                throw new Error(result.message || 'Failed to update room details');
            }
        } catch (error) {
            console.error(error.message || 'Failed to update room details');
        }
    };

    return (
        <div className="page__container">
            <NavLogin />
            <div className="content">
                <div className="center-container" style={{ height: '100%', marginTop: '-520px' }}>
                    <div className="room__details__page">
                        <div className="homeowner__register__header">
                            <h1>Tell us about your Room</h1>
                            <h2>Your Room Details</h2>
                        </div>
                        <div className="form__group">
                            <p>Furnishing</p>
                            <div className="forGrid grid">
                                {['Furnished', 'Not Furnished'].map((option) => (
                                    <div
                                        key={option}
                                        className={isChecked('furnishing', option) ? 'checked' : ''}
                                        onClick={() => handleClick('furnishing', option)}
                                    >
                                        <span>{option}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="about__yourself__inputs">
                            <div className="form__group">
                                <p>Size of the Room</p>
                                <div className="input-container">
                                    <input
                                        type="text"
                                        placeholder="24"
                                        className="input__field"
                                        value={roomSize}
                                        onChange={(e) => setRoomSize(e.target.value)}
                                        style={{ paddingRight: '30px' }}
                                    />
                                    <span
                                        className="input-unit"
                                        style={{
                                            position: 'absolute',
                                            right: '10px',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                        }}
                                    >
                                        m²
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="form__group">
                            <p>Furnishing already available in the Room</p>
                            <div className="forGrid grid">
                                {[
                                    'Bed',
                                    'Sofa',
                                    'Desk',
                                    'Chair',
                                    'Wardrobe',
                                    'BookShelf',
                                    'Nightstand',
                                    'TV',
                                    'Other (please specify in textbox)',
                                ].map((option) => (
                                    <div
                                        key={option}
                                        className={isChecked('existingFurnishing', option) ? 'checked' : ''}
                                        onClick={() => handleClick('existingFurnishing', option)}
                                    >
                                        <span>{option}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="TextBoxWithMaxInput">
                            <div className="TextBoxWithMaxInput__flex">
                                <p>Give here your room Description</p>
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

export default RoomDetails;
