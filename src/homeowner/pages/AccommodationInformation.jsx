import React, { useEffect, useState } from 'react';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';

import Footer from '../../shared/components/Footer.jsx';
import NavLogin from '../../shared/components/NavLogin.jsx';
import TextBoxWithMaxInput from '../../shared/components/TextBoxWithMaxInput.jsx';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Alert } from '@mui/material';

function AccommodationInformation() {
    const [otherInfo, setOtherInfo] = useState('');
    const [userId] = useState(localStorage.getItem('userId'));
    const [error, setLocalError] = useState('');

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
            streetname: data.streetname,
            houseNumber: data.streetnumber,
            bus: data.bus,
            city: data.city,
            postalCode: data.postalcode,
            place: data.place,
            country: data.country,
            otherInfo: otherInfo,
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/rooms`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(roomDto),
            });

            const result = await response.json();
            if (response.ok) {
                navigate('/household-details-homeowner');
            } else {
                throw new Error(result.message || 'Failed to create room');
            }
        } catch (error) {
            setLocalError(error.message || 'Failed to create room');
        }
    };

    return (
        <div className="page__container">
            <NavLogin />
            <div className="content" style={{ minHeight: '112vh' }}>
                <div className="center-container">
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
                                            {...methods.register('streetname', { required: 'Street name is required' })}
                                        />
                                        {methods.formState.errors.streetname && (
                                            <span className="error">{methods.formState.errors.streetname.message}</span>
                                        )}
                                    </div>
                                    <div className="form__group">
                                        <p>Street Number</p>
                                        <input
                                            type="text"
                                            placeholder="1"
                                            className="input__field"
                                            {...methods.register('streetnumber', {
                                                required: 'Street number is required',
                                            })}
                                        />
                                        {methods.formState.errors.streetnumber && (
                                            <span className="error">
                                                {methods.formState.errors.streetnumber.message}
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
                                            {...methods.register('postalcode', { required: 'Postal code is required' })}
                                        />
                                        {methods.formState.errors.postalcode && (
                                            <span className="error">{methods.formState.errors.postalcode.message}</span>
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
