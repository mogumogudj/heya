import React from 'react';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { Gender } from '../../shared/enums/gender';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'; 
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

function AboutYourself() {
    const methods = useForm();
    const { handleSubmit, control } = methods;

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <div className="center-container">
            <div className="about__yourself__page">
                <img className="heya__logo__blue__round" src="../heya-blue-round.svg" alt="heya logo blue"/>
                <h1>Tell us about yourself</h1>
                <h2>Personal information</h2>
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)} className={'about__yourself__inputs'}>
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
                                name=""
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
                    </form>
                    <div className="next__help">
                        <button className="blue__button__medium__width-height" type="submit">Next step</button>
                        <span className='help'>I need help</span>
                    </div>
                </FormProvider>
            </div>
        </div>
    );
}

export default AboutYourself;
