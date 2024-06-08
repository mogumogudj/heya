import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import Footer from '../../shared/components/Footer.jsx';
import NavLogin from '../../shared/components/NavLogin.jsx';
import TextBoxWithMaxInput from '../../shared/components/TextBoxWithMaxInput.jsx';

function HouseholdDetails() {
    const methods = useForm();

    const onSubmit = (data) => {
        // Handle form submission
    };

    return (
        <div className="page__container">
            <NavLogin />
            <div className="content">
                <div className="center-container">
                    <div className="about__yourself__page ">
                        <h1>Tell us about your household</h1>
                        <FormProvider {...methods}>
                            <form onSubmit={methods.handleSubmit(onSubmit)}>
                                <div className="about__yourself__inputs">
                                    <div className="form__group">
                                        <p>Room for student(s)</p>
                                        <select {...methods.register('room', { required: true })} className="input__field small">
                                            {[1, 2, 3, 4, 5].map((num) => (
                                                <option key={num} value={num}>{num}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="about__yourself__inputs">
                                    <div className="form__group">
                                        <p>People living in this place</p>
                                        <div className="">
                                            <p>Adults</p>
                                            <input type="number" placeholder="0" {...methods.register('adults', { required: true })} className='input__field small'/>
                                            <p>Children</p>
                                            <input type="number" placeholder="0" {...methods.register('children', { required: true })} className='input__field small' />
                                        </div>
                                    </div>
                                </div>
                                <div className="">
                                    <div className="form__group">
                                        <p>Pets</p>
                                        <div className="pets__radio__button">
                                            <label>
                                                <input type="radio" value="yes" {...methods.register('pets', { required: true })} />
                                                Yes
                                            </label>
                                            <label>
                                                <input type="radio" value="no" {...methods.register('pets', { required: true })} />
                                                No
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="about__yourself__inputs">
                                    <div className="form__group">
                                        <p>Additional information about the animal(s)</p>
                                        <InfoOutlinedIcon />
                                        <TextBoxWithMaxInput value="" onChange={() => {}} className="input__field" />
                                    </div>
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
