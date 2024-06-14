import React, { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { RadioGroup, Box } from '@mui/material';

import Footer from '../../shared/components/Footer.jsx';
import NavLogin from '../../shared/components/NavLogin.jsx';
import TextBoxWithMaxInput from '../../shared/components/TextBoxWithMaxInput.jsx';

function HouseholdDetails() {
    const methods = useForm();
    const [otherInfo, setOtherInfo] = useState('');
    const handleOtherInfoChange = (e) => setOtherInfo(e.target.value);
    const navigate = useNavigate();
    const location = useLocation();
    const [roomId, setRoomId] = useState(null);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const roomIdFromParams = params.get('roomId');
        if (roomIdFromParams) {
            setRoomId(roomIdFromParams);
        }
    }, [location]);

    const onSubmit = async (data) => {
        if (!roomId) {
            console.error('Room ID is missing');
            return;
        }

        const householdDetails = [
            {
                room: data.room,
                adults: data.adults,
                children: data.children,
                pets: data.pets,
                otherInfo: otherInfo,
            },
        ];

        const roomUpdateDto = {
            householdDetails: householdDetails,
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
                navigate(`/property-details-homeowner?roomId=${roomId}`);
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
                <div className="center-container">
                    <div className="household__details__page">
                        <div className="homeowner__register__header">
                            <h1>Tell us about your household</h1>
                            <h2>Your Household Details</h2>
                        </div>
                        <FormProvider {...methods}>
                            <form onSubmit={methods.handleSubmit(onSubmit)}>
                                <div className="household__details__flex">
                                    <div className="household__details__inputs">
                                        <div className="form__group">
                                            <p>Room for student(s)</p>
                                            <select
                                                {...methods.register('room', { required: true })}
                                                className="input__field small"
                                            >
                                                {[1, 2, 3, 4, 5].map((num) => (
                                                    <option key={num} value={num}>
                                                        {num}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="household__details__inputs">
                                        <div className="form__group">
                                            <p>People living in this place</p>
                                            <div className="household__details__flex">
                                                <div className="household__details__item">
                                                    <p style={{ textDecoration: 'underline' }}>Adults</p>
                                                    <input
                                                        type="number"
                                                        placeholder="1"
                                                        {...methods.register('adults', { required: true })}
                                                        className="input__field small"
                                                    />
                                                </div>
                                                <div className="household__details__item">
                                                    <p style={{ textDecoration: 'underline' }}>Children</p>
                                                    <input
                                                        type="number"
                                                        placeholder="0"
                                                        {...methods.register('children', { required: true })}
                                                        className="input__field small"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="household__details__inputs">
                                    <div className="form__group">
                                        <p>Pets</p>
                                        <div className="pets__radio__button">
                                            <Box className="household__details__radio__section">
                                                <RadioGroup name="type" className="radio__button__section">
                                                    <label className="radio-label">
                                                        <input type="radio" value="yes" name="type" />
                                                    </label>

                                                    <label className="radio-label">
                                                        <input type="radio" value="no" name="type" />
                                                    </label>
                                                </RadioGroup>
                                            </Box>

                                            <label>
                                                <input
                                                    type="radio"
                                                    value="yes"
                                                    {...methods.register('pets', { required: true })}
                                                />
                                                Yes
                                            </label>
                                            <label>
                                                <input
                                                    type="radio"
                                                    value="no"
                                                    {...methods.register('pets', { required: true })}
                                                />
                                                No
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="TextBoxWithMaxInput">
                                    <div className="TextBoxWithMaxInput__flex">
                                        <p>Additional information about the animal(s)</p>
                                        <InfoOutlinedIcon
                                            className="TextBoxWithMaxInput__flex__icon"
                                            style={{ marginTop: '24px', fontSize: '20px', marginRight: '16px' }}
                                        />
                                    </div>
                                    <TextBoxWithMaxInput value={otherInfo} onChange={handleOtherInfoChange} />
                                </div>

                                <div className="next__help">
                                    <button className="blue__button medium" type="submit">
                                        Next step
                                    </button>
                                    <span className="help">I need help</span>
                                </div>
                            </form>
                        </FormProvider>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default HouseholdDetails;
