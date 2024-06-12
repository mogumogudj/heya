import React, { useState } from 'react';

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useNavigate } from 'react-router-dom';
import Footer from '../../shared/components/Footer.jsx';
import NavLogin from '../../shared/components/NavLogin.jsx';

function PropertyDetails() {
    const navigate = useNavigate();


    const [selectedOptions, setSelectedOptions] = useState({
        activities: [],
        experiences: [],
    });

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

    function handleNextStep() {
        navigate('/shared-spaces-homeowner');
    }

    return (
        <div className="page__container">
            <NavLogin />
            <div className="content">
                <div className="center-container">
                <div className="property__details__page">
                <div className='homeowner__register__header'>
                        <h1>Tell us something more about</h1>
                        <h2>Your Property Details</h2>
<<<<<<< HEAD
                        </div>
                        <div className="forGrid grid" style={{gridTemplateColumns:'1fr 1fr', marginTop: '40px'}}>
                        {['House', 'Appartement', 'Garden', 'No Garden'].map((option) => (
                            <div
                                key={option}
                                className={isChecked('activities', option) ? 'checked' : ''}
                                onClick={() => handleClick('activities', option)}
                            >
                                <span>{option}</span>
                            </div>
                        ))}
                    </div>
                    
                    <div className={'about__yourself__inputs'}>
                                    
                                        
                                        <div className="form__group">
                                        <p>Surface area of the house/apartment</p>
                                        <div className="input-container">
                                        <input
                                            type="text"
                                            placeholder="240"
                                            className="input__field"
                                            style={{ paddingRight: '30px' }}
                                        />
                                        <span className="input-unit" style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}>m²</span>
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
                                        <span className="input-unit" style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}>m²</span>
                                    </div>
                                </div>
                                </div>

                    <div className="about__yourself__inputs">
                                    <div className="form__group">
                                        <div className="title__with__icon">
                                        <p>Total available rooms in the house/apartment</p><InfoOutlinedIcon style={{fontSize: '20'}} />
                                        </div>
                                        <select className="input__field small">
                                            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                                                <option key={num} value={num}>{num}</option>
                                            ))}
                                        </select>
                                    </div>
=======
                        <div className="forGrid grid">
                            {['House', 'Appartement', 'Garden', 'No Garden'].map((option) => (
                                <div
                                    key={option}
                                    className={isChecked('activities', option) ? 'checked' : ''}
                                    onClick={() => handleClick('activities', option)}
                                >
                                    <span>{option}</span>
>>>>>>> d82847a04ebd1b426b15e2d55b1061cdf3ed9e61
                                </div>
                            ))}
                        </div>

                        <div className="flex">
                            <p>Surface area of the house/apartment in m²</p>
                            <div className="inputWrapper">
                                <input type="text" maxLength="4" placeholder="20" className={'input__field'} />
                            </div>

                            <p>Garden size in m²</p>
                            <div className="inputWrapper">
                                <input type="text" maxLength="4" placeholder="20" className={'input__field'} />
                            </div>
                        </div>

                        <div className="about__yourself__inputs">
                            <div className="form__group">
                                <p>Total available rooms in the house/apartment</p>
                                <InfoOutlinedIcon />
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
