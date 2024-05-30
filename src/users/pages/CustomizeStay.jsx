import React, { useState } from 'react';
import '../css/customizeStay.css';
import Footer from '../../shared/components/Footer.jsx';
import NavLogin from '../../shared/components/NavLogin.jsx';
import TextBoxWithMaxInput from '../../shared/components/TextBoxWithMaxInput.jsx';

function CustomizeStay() {
    const [selectedOptions, setSelectedOptions] = useState({
        activities: '',
        experiences: '',
    });
    const [otherInfo, setOtherInfo] = useState('');
    const [study, setStudy] = useState('');
    const [city, setCity] = useState('');
    const [userId] = useState(localStorage.getItem('userId'));

    const handleClick = (category, option) => {
        setSelectedOptions((prevState) => ({
            ...prevState,
            [category]: option === prevState[category] ? '' : option,
        }));
    };

    const handleOtherInfoChange = (e) => setOtherInfo(e.target.value);
    const handleStudyChange = (e) => setStudy(e.target.value);
    const handleCityChange = (e) => setCity(e.target.value);

    const isChecked = (category, option) => selectedOptions[category] === option;

    const handleSubmit = async () => {
        const data = {
            userStayInfo: {
                activities: selectedOptions.activities,
                experiences: selectedOptions.experiences,
                otherInfo: otherInfo,
                study: study,
                city: city,
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
                <h1>Customize your stay</h1>
                <h2>Upload your profile picture</h2>
                <div>
                    <p>What will you do during your stay?</p>
                    <div className="forGrid grid">
                        {['Study', 'Work', 'Internship', 'Other'].map((option) => (
                            <div
                                key={option}
                                className={isChecked('activities', option) ? 'checked' : ''}
                                onClick={() => handleClick('activities', option)}
                            >
                                <span>{option}</span>
                            </div>
                        ))}
                    </div>
                    <div>
                        <p>Other information</p>
                        <TextBoxWithMaxInput value={otherInfo} onChange={handleOtherInfoChange} />
                    </div>
                    <div className="twoGrid grid">
                        <div>
                            <p>What do/will you study?</p>
                            <input
                                type="text"
                                maxLength="100"
                                placeholder="Bachelor/Master in..."
                                value={study}
                                onChange={handleStudyChange}
                            />
                        </div>
                        <div>
                            <p>In what city do/will you study?</p>
                            <input
                                type="text"
                                maxLength="100"
                                placeholder="Antwerp"
                                value={city}
                                onChange={handleCityChange}
                            />
                        </div>
                    </div>
                    <p>Have you ever...</p>
                    <div className="forGrid grid">
                        {[
                            'Lived with a Host',
                            'Lived Abroad',
                            'Lived on my own',
                            'Lived with a Guest Family',
                            'None of the above',
                        ].map((option) => (
                            <div
                                key={option}
                                className={isChecked('experiences', option) ? 'checked' : ''}
                                onClick={() => handleClick('experiences', option)}
                            >
                                <span>{option}</span>
                            </div>
                        ))}
                    </div>
                    <div>
                        <p>Extra information you would like us to know?</p>
                        <TextBoxWithMaxInput value={otherInfo} onChange={handleOtherInfoChange} />
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

export default CustomizeStay;
