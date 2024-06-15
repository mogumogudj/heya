import React, { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';

import Footer from '../../shared/components/Footer.jsx';
import NavLogin from '../../shared/components/NavLogin.jsx';
import TextBoxWithMaxInput from '../../shared/components/TextBoxWithMaxInput.jsx';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Alert } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    customAlert: {
        borderRadius: '8px',
        width: '768px',
        margin: '16px auto 32px auto',
    },
    '@media screen and (max-width: 800px)': {
        customAlert: {
            width: 'calc(100% - 32px)',
            margin: '16px 16px 32px 16px',
        },
    },
});

function AccommodationInformation() {
    const [otherInfo, setOtherInfo] = useState('');
    const [userId] = useState(localStorage.getItem('userId'));
    const [error, setLocalError] = useState('');
    const classes = useStyles();
    const methods = useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const [accommodationType, setAccommodationType] = useState('');

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        setAccommodationType(params.get('type') || '');
    }, [location]);

    const handleOtherInfoChange = (e) => setOtherInfo(e.target.value);

    const onSubmit = async (data) => {
        const roomDto = {
            owner: userId,
            type: accommodationType,
            streetName: data.streetName,
            houseNumber: data.houseNumber,
            bus: data.bus,
            city: data.city,
            postalCode: data.postalCode,
            place: data.place,
            country: data.country,
            otherInfo: otherInfo,
        };

        try {
            const roomResponse = await fetch(`${import.meta.env.VITE_API_URL}/rooms`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(roomDto),
            });

            const roomResult = await roomResponse.json();

            if (roomResponse.ok) {
                if (roomResult._id) {
                    const userResponse = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}`);
                    const userResult = await userResponse.json();

                    if (userResponse.ok) {
                        const updatedRooms = userResult.room ? [...userResult.room, roomResult._id] : [roomResult._id];

                        const userUpdateResponse = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}`, {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                room: updatedRooms,
                            }),
                        });

                        const userUpdateResult = await userUpdateResponse.json();

                        if (userUpdateResponse.ok) {
                            navigate(`/household-details-homeowner?roomId=${roomResult._id}`);
                        } else {
                            throw new Error(userUpdateResult.message || 'Failed to update user with room ID');
                        }
                    } else {
                        throw new Error(userResult.message || 'Failed to fetch user data');
                    }
                } else {
                    throw new Error('Room ID is missing in the API response');
                }
            } else {
                throw new Error(roomResult.message || 'Failed to create room');
            }
        } catch (error) {
            setLocalError(error.message || 'Failed to create room');
        }
    };

    return (
        <div className="page__container">
            <NavLogin />
            <div className="content" style={{ height: '100%', marginTop: '-240px' }}>
                <div className="center-container" style={{ height: '100%' }}>
                    <div className="accommodation__information__page">
                        <div className="homeowner__register__header">
                            <h1>Tell us something about</h1>
                            <h2>Your Accommodation</h2>
                        </div>
                        <FormProvider {...methods}>
                            <form onSubmit={methods.handleSubmit(onSubmit)}>
                                <div className="about__yourself__inputs">
                                    <div className="form__group">
                                        <p>Street Name</p>
                                        <input
                                            type="text"
                                            placeholder="Mussenstraat"
                                            className="input__field"
                                            {...methods.register('streetName', { required: 'Street name is required' })}
                                        />
                                        {methods.formState.errors.streetName && (
                                            <span className="error">{methods.formState.errors.streetName.message}</span>
                                        )}
                                    </div>
                                    <div className="form__group">
                                        <p>House Number</p>
                                        <input
                                            type="text"
                                            placeholder="1"
                                            className="input__field"
                                            {...methods.register('houseNumber', {
                                                required: 'House number is required',
                                            })}
                                        />
                                        {methods.formState.errors.houseNumber && (
                                            <span className="error">
                                                {methods.formState.errors.houseNumber.message}
                                            </span>
                                        )}
                                    </div>
                                    <div className="form__group">
                                        <p>Bus</p>
                                        <input
                                            type="text"
                                            placeholder="A"
                                            className="input__field"
                                            {...methods.register('bus')}
                                        />
                                    </div>
                                </div>
                                <div className="about__yourself__inputs">
                                    <div className="form__group">
                                        <p>City</p>
                                        <input
                                            type="text"
                                            placeholder="Leuven"
                                            className="input__field"
                                            {...methods.register('city', { required: 'City is required' })}
                                        />
                                        {methods.formState.errors.city && (
                                            <span className="error">{methods.formState.errors.city.message}</span>
                                        )}
                                    </div>
                                    <div className="form__group">
                                        <p>Postal Code</p>
                                        <input
                                            type="text"
                                            placeholder="3000"
                                            className="input__field"
                                            {...methods.register('postalCode', { required: 'Postal code is required' })}
                                        />
                                        {methods.formState.errors.postalCode && (
                                            <span className="error">{methods.formState.errors.postalCode.message}</span>
                                        )}
                                    </div>
                                    <div className="form__group">
                                        <p>Place</p>
                                        <input
                                            type="text"
                                            placeholder="Vlaams Brabant"
                                            className="input__field"
                                            {...methods.register('place', { required: 'Place is required' })}
                                        />
                                        {methods.formState.errors.place && (
                                            <span className="error">{methods.formState.errors.place.message}</span>
                                        )}
                                    </div>
                                </div>
                                <div className="about__yourself__inputs">
                                    <div className="form__group">
                                        <p>Country</p>
                                        <select
                                            className="input__field"
                                            {...methods.register('country', { required: 'Country is required' })}
                                        >
                                            <option value="Belgium">Belgium</option>
                                        </select>
                                    </div>

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
                                    <button className="blue__button medium" type="submit">
                                        Next step
                                    </button>
                                    <span className="help">I need help</span>
                                </div>
                            </form>
                            {error && (
                                <Alert className={classes.customAlert} severity="error">
                                    {error}
                                </Alert>
                            )}
                        </FormProvider>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default AccommodationInformation;
