import React, { useState } from 'react';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import Footer from '../../shared/components/Footer.jsx';
import NavLogin from '../../shared/components/NavLogin.jsx';
import TextBoxWithMaxInput from '../../shared/components/TextBoxWithMaxInput.jsx';

import { makeStyles } from '@mui/styles';


const useStyles = makeStyles({

});

function AccommodationInformation() {
    const [otherInfo, setOtherInfo] = useState(''); 

    const handleOtherInfoChange = (e) => setOtherInfo(e.target.value); 

    const methods = useForm();
    const navigate = useNavigate();

    const onSubmit = () => {
       
    };

    return (
        <div className="page__container" style={{ marginTop: '148px' }}>
            <NavLogin />
            <div className="content">
                <div className="center-container">
                    <div className="about__yourself__page ">
                        <h1>Tell us something about</h1>
                        <h2>Your Accommodation</h2>
                        <FormProvider {...methods}>
                            <form onSubmit={methods.handleSubmit(onSubmit)}>
                                <div className={'about__yourself__inputs'}>
                                </div>
                                <div className="about__yourself__inputs">
                                    <div className="form__group">
                                        <p>Street Name</p>
                                        <input
                                            type="text"
                                            placeholder='Mussenstraat'
                                            className="input__field"
                                            {...methods.register('streetname', { required: true })}
                                        />
                                    </div>
                                    <div className="form__group">
                                        <p>Street Number</p>
                                        <input
                                            type="text"
                                            placeholder='1'
                                            className="input__field"
                                            {...methods.register('streetnumber', { required: true })}
                                        />
                                    </div>
                                    <div className="form__group">
                                        <p>Bus</p>
                                        <input
                                            type="text"
                                            placeholder='A'
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
                                            placeholder='Leuven'
                                            className="input__field"
                                            {...methods.register('city', { required: true })}
                                        />
                                    </div>
                                    <div className="form__group">
                                        <p>Postal Code</p>
                                        <input
                                            type="text"
                                            placeholder='3000'
                                            className="input__field"
                                            {...methods.register('postalcode', { required: true })}
                                        />
                                    </div>
                                    <div className="form__group">
                                        <p>Place</p>
                                        <input
                                            type="text"
                                            placeholder='Vlaams Brabant'
                                            className="input__field"
                                            {...methods.register('place', { required: true })}
                                        />
                                    </div>
                                </div>
                                <div className="about__yourself__inputs">
                                    <div className="form__group">
                                        <p>Country</p>
                                        <select {...methods.register('country', { required: true })}>
                                            <option value="Belgium">Belgium</option>
                                        </select>
                                    </div>

                                    <div>
                                        <p>Extra information you would like us to know?</p>
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
                        </FormProvider>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default AccommodationInformation;