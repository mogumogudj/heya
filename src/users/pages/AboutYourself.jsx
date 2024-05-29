import React from 'react';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Gender } from '../../shared/enums/gender.js';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Alert from '@mui/material/Alert';
import { makeStyles } from '@mui/styles';
import { jwtDecode } from 'jwt-decode';
import Footer from '../../shared/components/Footer.jsx';
import NavLogin from '../../shared/components/NavLogin.jsx';

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

function AboutYourself() {
    const methods = useForm();
    const { handleSubmit, control } = methods;
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const classes = useStyles();
    const [error, setLocalError] = React.useState('');

    const onSubmit = async (data) => {
        console.log('Next step pressed:', data);

        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;
        console.log('Decoded token:', userId);

        const userDto = {
            auth: userId,
            firstName: data.firstname,
            lastName: data.lastname,
            type: data.gender,
            birthday: data.birthday,
            phoneNumber: data.phone,
            rentsRoom: false,
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(userDto),
            });

            const result = await response.json();
            if (response.ok) {
                console.log('User created successfully:', result);
                localStorage.setItem('userId', result._id);
                navigate('/upload-image');
            } else {
                throw new Error(result.message || 'Failed to create user');
            }
        } catch (error) {
            console.error('User creation error:', error);
            setLocalError(error.message || 'Failed to create user');
        }
    };

    return (
        <div className="page__container">
            <NavLogin />
            <div className="content">
                <div className="center-container">
                    <div className="about__yourself__page">
                        <h1>Tell us about yourself</h1>
                        <h2>Personal information</h2>
                        <FormProvider {...methods}>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className={'about__yourself__inputs'}>
                                    <div className="form__group">
                                        <p>Firstname</p>
                                        <input
                                            type="text"
                                            placeholder="John"
                                            className="input__field"
                                            {...methods.register('firstname', { required: true })}
                                        />
                                    </div>
                                    <div className="form__group">
                                        <p>Lastname</p>
                                        <input
                                            type="text"
                                            placeholder="Doe"
                                            className="input__field"
                                            {...methods.register('lastname', { required: true })}
                                        />
                                    </div>
                                    <div className="form__group">
                                        <p>Gender</p>
                                        <select {...methods.register('gender', { required: true })}>
                                            {Object.values(Gender).map((genderOption) => (
                                                <option key={genderOption} value={genderOption}>
                                                    {genderOption}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form__group">
                                        <p>Birthday</p>
                                        <Controller
                                            className="date__controller"
                                            name="birthday"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => (
                                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                    <DatePicker
                                                        {...field}
                                                        className="date__picker"
                                                        label=""
                                                        format="dd/MM/yyyy"
                                                        value={field.value !== '' ? new Date(field.value) : null}
                                                    />
                                                </LocalizationProvider>
                                            )}
                                        />
                                    </div>
                                    <div className="form__group">
                                        <p>Phone number</p>
                                        <input
                                            type="tel"
                                            placeholder="+32412345678"
                                            className="input__field"
                                            {...methods.register('phone', { required: true })}
                                        />
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

export default AboutYourself;
