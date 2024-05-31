import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Alert from '@mui/material/Alert';
import { makeStyles } from '@mui/styles';
import Footer from '../../shared/components/Footer.jsx';
import NavLogin from '../../shared/components/NavLogin.jsx';
import { Cities } from '../../shared/enums/cities';
import '../css/userInfo.css';

const useStyles = makeStyles({
    customAlert: {
        borderRadius: '8px',
        width: '100%',
        margin: '16px 0 0 0',
    },
    errorInput: {
        border: '1px solid red',
    },
});

const getDefaultMoveInDate = () => {
    const today = new Date();
    const currentYear = today.getFullYear();
    return new Date(currentYear, 8, 1);
};

const getDefaultMoveOutDate = () => {
    const today = new Date();
    const nextYear = today.getFullYear() + 1;
    return new Date(nextYear, 5, 30);
};

function PreferredAccommodation() {
    const methods = useForm();
    const [selectedOptions, setSelectedOptions] = useState({
        peopleAmount: '',
    });
    const [city, setCity] = useState(null);
    const [moveInDate] = useState(getDefaultMoveInDate());
    const [moveOutDate] = useState(getDefaultMoveOutDate());
    const [minBudget, setMinBudget] = useState('');
    const [maxBudget, setMaxBudget] = useState('');
    const [minimumSize, setMinimumSize] = useState('');
    const [userId] = useState(localStorage.getItem('userId'));
    const [errors, setErrors] = useState({});
    const classes = useStyles();
    const navigate = useNavigate();

    const handleClick = (category, option) => {
        setSelectedOptions((prevState) => {
            const isSelected = prevState[category] === option;
            return {
                ...prevState,
                [category]: isSelected ? '' : option,
            };
        });
    };

    const handleCityChange = (selectedOption) => setCity(selectedOption);

    const handleMinBudgetChange = (e) => setMinBudget(e.target.value);
    const handleMaxBudgetChange = (e) => setMaxBudget(e.target.value);
    const handleMinimumSizeChange = (e) => setMinimumSize(e.target.value);

    const isChecked = (category, option) => selectedOptions[category] === option;

    const validateFields = () => {
        const newErrors = {};

        if (!moveInDate) newErrors.moveInDate = 'Please enter on what date you want to move in.';
        if (!moveOutDate) newErrors.moveOutDate = 'Please enter on what date you want to move out.';
        if (!city) newErrors.city = 'Please enter the city you will study in.';
        if (!selectedOptions.peopleAmount) newErrors.peopleAmount = 'Please enter the amount of people';
        if (!minBudget) newErrors.minBudget = 'Please enter the minimum budget you want to spend';
        if (!maxBudget) newErrors.maxBudget = 'Please enter the maximum budget you want to spend';
        if (!minimumSize) newErrors.minimumSize = 'Please enter the minimum size you want to spend';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateFields()) return;

        const moveInDateAdjusted = new Date(moveInDate.getTime() - moveInDate.getTimezoneOffset() * 60000);
        const moveOutDateAdjusted = new Date(moveOutDate.getTime() - moveOutDate.getTimezoneOffset() * 60000);

        const data = {
            preferredAccommodation: {
                city: city.value,
                moveInDate: moveInDateAdjusted.toISOString().split('T')[0],
                moveOutDate: moveOutDateAdjusted.toISOString().split('T')[0],
                peopleAmount: selectedOptions.peopleAmount,
                minBudget: minBudget,
                maxBudget: maxBudget,
                minimumSize: minimumSize,
            },
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                console.log('Data submitted successfully');
                navigate('/profile-overview');
            } else {
                console.error('Error submitting data');
            }
        } catch (error) {
            console.error('Network error', error);
        }
    };

    return (
        <div className="page__container">
            <NavLogin />
            <div className="content">
                <h1>Tell us something about</h1>
                <h2>Your preferred accommodation</h2>
                <div>
                    <p>In which city do you want to stay?</p>
                    <select
                        {...methods.register('city', { required: true })}
                        onChange={(e) => handleCityChange(e.target.value)}
                    >
                        {Object.values(Cities).map((cityOption) => (
                            <option key={cityOption} value={cityOption}>
                                {cityOption}
                            </option>
                        ))}
                    </select>
                    {errors.city && (
                        <Alert className={classes.customAlert} severity="error">
                            {errors.city}
                        </Alert>
                    )}
                    <div className="twoGrid grid">
                        <div>
                            <p>Preferred move-in date?</p>
                            <Controller
                                name="moveInDate"
                                control={methods.control}
                                defaultValue={moveInDate}
                                render={({ field }) => (
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            {...field}
                                            value={field.value}
                                            onChange={(date) => field.onChange(date)}
                                            textField={(params) => <input {...params} placeholder="YYYY-MM-DD" />}
                                        />
                                    </LocalizationProvider>
                                )}
                            />
                            {errors.moveInDate && (
                                <Alert className={classes.customAlert} severity="error">
                                    {errors.moveInDate}
                                </Alert>
                            )}
                        </div>
                        <div>
                            <p>Preferred move-out date?</p>
                            <Controller
                                name="moveOutDate"
                                control={methods.control}
                                defaultValue={moveOutDate}
                                render={({ field }) => (
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            {...field}
                                            value={field.value}
                                            onChange={(date) => field.onChange(date)}
                                            textField={(params) => <input {...params} placeholder="YYYY-MM-DD" />}
                                        />
                                    </LocalizationProvider>
                                )}
                            />
                            {errors.moveOutDate && (
                                <Alert className={classes.customAlert} severity="error">
                                    {errors.moveOutDate}
                                </Alert>
                            )}
                        </div>
                    </div>
                    <p>For how many people are you searching a place for?</p>
                    <div className="twoGrid selectGrid grid">
                        {['Myself', 'Multiple people'].map((option) => (
                            <div
                                key={option}
                                className={isChecked('peopleAmount', option) ? 'checked' : ''}
                                onClick={() => handleClick('peopleAmount', option)}
                            >
                                <span>{option}</span>
                            </div>
                        ))}
                    </div>
                    {errors.peopleAmount && (
                        <Alert className={classes.customAlert} severity="error">
                            {errors.peopleAmount}
                        </Alert>
                    )}
                    <div className="twoGrid grid">
                        <div>
                            <p>Min. monthly rental budget</p>
                            <input
                                type="text"
                                maxLength="4"
                                placeholder="100"
                                value={minBudget}
                                onChange={handleMinBudgetChange}
                            />
                            {errors.minBudget && (
                                <Alert className={classes.customAlert} severity="error">
                                    {errors.minBudget}
                                </Alert>
                            )}
                        </div>
                        <div>
                            <p>Max. monthly rental budget</p>
                            <input
                                type="text"
                                maxLength="4"
                                placeholder="1000"
                                value={maxBudget}
                                onChange={handleMaxBudgetChange}
                            />
                            {errors.maxBudget && (
                                <Alert className={classes.customAlert} severity="error">
                                    {errors.maxBudget}
                                </Alert>
                            )}
                        </div>
                    </div>
                    <div>
                        <p>Minimum m² of rented space</p>
                        <div className="inputWrapper">
                            <input
                                type="text"
                                maxLength="4"
                                placeholder="20"
                                value={minimumSize}
                                onChange={handleMinimumSizeChange}
                                className={'input__field'}
                            />
                            {errors.minimumSize && (
                                <Alert className={classes.customAlert} severity="error">
                                    {errors.minimumSize}
                                </Alert>
                            )}
                        </div>
                    </div>
                    <div className="next__help">
                        <button className="blue__button medium" type="button" onClick={handleSubmit}>
                            Next step
                        </button>
                        <span className="help">I need help</span>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default PreferredAccommodation;
