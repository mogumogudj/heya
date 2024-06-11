import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { TextField } from '@mui/material';
import NavLogin from '../../shared/components/NavLogin.jsx';
import Footer from '../../shared/components/Footer.jsx';
import { useNavigate } from 'react-router-dom'; 

function PlanMeeting() {
    const navigate = useNavigate();
    const [selectedDateTime, setSelectedDateTime] = useState(new Date());

    const handleDateChange = (newDateTime) => {
        setSelectedDateTime(newDateTime);
    };

    const handleNextStep = () => {
        navigate('/next-step');
    };

    return (
        <div className="page__container">
            <NavLogin />
            <div className="content">
                <div className="center-container-always">
                    <div className="accommodation__type__page">
                        <h1>Plan a Meeting</h1>
                        <h2>Do you want to have a meeting with us?</h2>

                        <div className="availabilityGrid">
                            <div className="availability__container">
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DateTimePicker
                                        value={selectedDateTime}
                                        onChange={handleDateChange}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </div>
                        </div>

                        <div className="availability-info">
                        <a>Skip this for now</a>
                            <button className="blue__button small">Plan meeting</button>
                            <p>Selected Date and Time: {selectedDateTime ? selectedDateTime.toLocaleString() : 'None'}</p>
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

export default PlanMeeting;
