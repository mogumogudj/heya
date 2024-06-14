import React, { useEffect, useState } from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useNavigate, useLocation } from 'react-router-dom';
import Footer from '../../shared/components/Footer.jsx';
import NavLogin from '../../shared/components/NavLogin.jsx';

function PropertyDetails() {
    const navigate = useNavigate();
    const location = useLocation();
    const [roomId, setRoomId] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState({
        types: [],
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

        const propertyDetails = {
            type: selectedOptions.types.includes('House') ? 'House' : 'Apartment',
            hasGarden: selectedOptions.types.includes('Garden'),
            surfaceArea: document.querySelector("input[placeholder='240']").value,
            gardenSize: document.querySelectorAll("input[placeholder='240']")[1].value,
            totalRooms: document.querySelector('select').value,
        };

        const roomUpdateDto = {
            propertyDetails: propertyDetails,
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
                navigate(`/shared-spaces-homeowner?roomId=${roomId}`);
            } else {
                const result = await response.json();
                throw new Error(result.message || 'Failed to update property details');
            }
        } catch (error) {
            console.error(error.message || 'Failed to update property details');
        }
    };

    return (
        <div className="page__container">
            <NavLogin />
            <div className="content">
                <div className="center-container">
                    <div className="property__details__page">
                        <div className="homeowner__register__header">
                            <h1>Tell us something more about</h1>
                            <h2>Your Property Details</h2>
                        </div>
                        <div className="forGrid grid" style={{ gridTemplateColumns: '1fr 1fr', marginTop: '40px' }}>
                            {['House', 'Appartement', 'Garden', 'No Garden'].map((option) => (
                                <div
                                    key={option}
                                    className={isChecked('types', option) ? 'checked' : ''}
                                    onClick={() => handleClick('types', option)}
                                >
                                    <span>{option}</span>
                                </div>
                            ))}
                        </div>

                        <div className="about__yourself__inputs">
                            <div className="form__group">
                                <p>Surface area of the house/apartment</p>
                                <div className="input-container">
                                    <input
                                        type="text"
                                        placeholder="240"
                                        className="input__field"
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

                            <div className="form__group">
                                <p>Garden size</p>
                                <div className="input-container">
                                    <input
                                        type="text"
                                        placeholder="240"
                                        className="input__field"
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

                        <div className="about__yourself__inputs">
                            <div className="form__group">
                                <div className="title__with__icon">
                                    <p>Total available rooms in the house/apartment</p>
                                    <InfoOutlinedIcon style={{ fontSize: '20' }} />
                                </div>
                                <select className="input__field small">
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                                        <option key={num} value={num}>
                                            {num}
                                        </option>
                                    ))}
                                </select>
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

export default PropertyDetails;
