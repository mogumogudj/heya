import React, { useEffect, useState } from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import TextBoxWithMaxInput from '../../shared/components/TextBoxWithMaxInput.jsx';
import { useNavigate } from 'react-router-dom';
import Footer from '../../shared/components/Footer.jsx';
import NavLogin from '../../shared/components/NavLogin.jsx';
import { useForm } from 'react-hook-form';
import { Gender } from '../../shared/enums/gender.js';

function IdealAttendant() {
    const navigate = useNavigate();
    const { handleSubmit, control, register, setValue } = useForm();
    const [roomId, setRoomId] = useState(null);
    const [extraInformationCharacter, setExtraInformationCharacter] = useState('');
    const [extraInformation, setExtraInformation] = useState('');

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const roomIdFromParams = params.get('roomId');
        if (roomIdFromParams) {
            setRoomId(roomIdFromParams);
        }
    }, [location]);

    const [selectedOptions, setSelectedOptions] = useState({
        activities: [],
        mustBe: [],
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

    const onSubmit = async (data) => {
        const idealAttendantDetails = {
            ageRange: {
                min: parseInt(data.ageMin),
                max: parseInt(data.ageMax),
            },
            gender: data.gender,
            language: data.language,
            preferredCharacteristics: selectedOptions.activities,
            extraInformationCharacter: extraInformationCharacter,
            mustBe: selectedOptions.mustBe,
            extraInformation: extraInformation,
        };

        const roomUpdateDto = {
            idealAttendant: idealAttendantDetails,
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/rooms/${roomId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(roomUpdateDto),
            });

            if (response.ok) {
                navigate(`/privacy-homeowner?roomId=${roomId}`);
            } else {
                const result = await response.json();
                throw new Error(result.message || 'Failed to update ideal attendant details');
            }
        } catch (error) {
            console.error(error.message || 'Failed to update ideal attendant details');
        }
    };

    const handleCharacterInputChange = (event) => {
        setExtraInformationCharacter(event.target.value);
    };

    const handleMustBeInputChange = (event) => {
        setExtraInformation(event.target.value);
    };

    return (
        <div className="page__container">
            <NavLogin />
            <div className="content" style={{ minHeight: '128vh' }}>
                <div className="center-container" style={{ height: '100%' }}>
                    <div className="ideal__attendant__page">
                        <div className="homeowner__register__header">
                            <h1>Perfect Attendant</h1>
                            <h2>Describe Your Ideal Attendant</h2>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form__group">
                                <p>Preferred Age</p>
                                <div className="flex" style={{ marginTop: '-8px' }}>
                                    <div>
                                        <input
                                            style={{ width: '35%' }}
                                            type="number"
                                            placeholder="18"
                                            {...register('ageMin', { required: true })}
                                            className="input__field small bold"
                                            defaultValue={18}
                                        />
                                    </div>

                                    <div>
                                        <input
                                            style={{ width: '35%' }}
                                            type="number"
                                            placeholder="30"
                                            {...register('ageMax', { required: true })}
                                            className="input__field small bold"
                                            defaultValue={30}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex">
                                <div className="form__group">
                                    <p>Gender</p>
                                    <select {...register('gender', { required: true })}>
                                        {Object.values(Gender).map((genderOption) => (
                                            <option key={genderOption} value={genderOption}>
                                                {genderOption}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form__group">
                                    <p>Language</p>
                                    <select {...register('language', { required: true })}>
                                        <option value="English">English</option>
                                        <option value="Spanish">Spanish</option>
                                        <option value="French">French</option>
                                        <option value="German">German</option>
                                        <option value="Italian">Italian</option>
                                        <option value="Portuguese">Portuguese</option>
                                        <option value="Dutch">Dutch</option>
                                        <option value="Russian">Russian</option>
                                        <option value="Chinese">Chinese</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form__group">
                                <p>Preferred Characteristics</p>
                                <div className="forGrid grid">
                                    {[
                                        'Friendly',
                                        'Reliable',
                                        'Professional',
                                        'Adaptable',
                                        'Organized',
                                        'Patient',
                                        'Thrustworthy',
                                        'Other (please specify in textbox)',
                                    ].map((option) => (
                                        <div
                                            key={option}
                                            className={isChecked('activities', option) ? 'checked' : ''}
                                            onClick={() => handleClick('activities', option)}
                                        >
                                            <span>{option}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="TextBoxWithMaxInput">
                                <div className="TextBoxWithMaxInput__flex">
                                    <p>Extra information for characteristics</p>
                                    <InfoOutlinedIcon
                                        className="TextBoxWithMaxInput__flex__icon"
                                        style={{ marginTop: '24px', fontSize: '20', marginRight: '16px' }}
                                    />
                                </div>
                                <TextBoxWithMaxInput
                                    value={extraInformationCharacter}
                                    onChange={handleCharacterInputChange}
                                    className="input__field"
                                />
                            </div>

                            <div className="form__group">
                                <p>Must be</p>
                                <div className="forGrid grid">
                                    {['Non Smoker', 'Vegetarian', 'Vegan', 'Other (please specify in textbox)'].map(
                                        (option) => (
                                            <div
                                                key={option}
                                                className={isChecked('mustBe', option) ? 'checked' : ''}
                                                onClick={() => handleClick('mustBe', option)}
                                            >
                                                <span>{option}</span>
                                            </div>
                                        ),
                                    )}
                                </div>
                            </div>

                            <div className="TextBoxWithMaxInput">
                                <div className="TextBoxWithMaxInput__flex">
                                    <p>Extra information for must be's</p>
                                    <InfoOutlinedIcon
                                        className="TextBoxWithMaxInput__flex__icon"
                                        style={{ marginTop: '24px', fontSize: '20', marginRight: '16px' }}
                                    />
                                </div>
                                <TextBoxWithMaxInput
                                    value={extraInformation}
                                    onChange={handleMustBeInputChange}
                                    className="input__field"
                                />
                            </div>

                            <div className="next__help">
                                <button className="blue__button medium" type="submit">
                                    Next step
                                </button>
                                <span className="help">I need help</span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default IdealAttendant;
