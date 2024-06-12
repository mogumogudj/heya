import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useState } from 'react';

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { 
    RadioGroup,
    Box
  } from '@mui/material';

import Footer from '../../shared/components/Footer.jsx';
import NavLogin from '../../shared/components/NavLogin.jsx';
import TextBoxWithMaxInput from '../../shared/components/TextBoxWithMaxInput.jsx';

function HouseholdDetails() {
    const methods = useForm();
    const [otherInfo, setOtherInfo] = useState('');
    const handleOtherInfoChange = (e) => setOtherInfo(e.target.value); 

    const onSubmit = (data) => {
        // Handle form submission
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
                                        <select {...methods.register('room', { required: true })} className="input__field small">
                                            {[1, 2, 3, 4, 5].map((num) => (
                                                <option key={num} value={num}>{num}</option>
                                            ))}
                                        </select>
                                </div>
                                </div>

                                <div className="household__details__inputs">
            <div className="form__group">
                <p>People living in this place</p>
                <div className="household__details__flex">
                    <div className="household__details__item">
                        <p style={{textDecoration:'underline'}}>Adults</p>
                        <input type="number" placeholder="1" {...methods.register('adults', { required: true })} className="input__field small" />
                    </div>
                    <div className="household__details__item">
                        <p style={{textDecoration:'underline'}}>Children</p>
                        <input type="number" placeholder="0" {...methods.register('children', { required: true })} className="input__field small" />
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
                                            <RadioGroup name="type" className='radio__button__section'>
                                                <label className="radio-label">
                                                    <input type="radio" value="yes" name="type" />
                                                    <span className="radio-custom"></span>
                                                    Yes
                                                </label>

                                                <label className="radio-label">
                                                    <input type="radio" value="no" name="type" />
                                                    <span className="radio-custom"></span>
                                                    No
                                                </label>
                                            </RadioGroup>
                                        </Box>
                                        
                                        </div>
                                    </div>
                                </div>

                                <div className='TextBoxWithMaxInput'>
                                        <div className="TextBoxWithMaxInput__flex">
                                        <p>Additional information about the animal(s)</p>
                                        <InfoOutlinedIcon className='TextBoxWithMaxInput__flex__icon' style={{marginTop:'24px', fontSize:'20', marginRight:'16px' }}/>
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
