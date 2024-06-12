import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { TextField } from '@mui/material';
import NavLogin from '../../shared/components/NavLogin.jsx';
import Footer from '../../shared/components/Footer.jsx';

function Availability() {
    const [selectedStartDate, setSelectedStartDate] = useState(new Date());
    const [selectedEndDate, setSelectedEndDate] = useState(null);

    const handleDateChange = (newDate) => {
        if (!selectedStartDate || newDate < selectedStartDate) {
            setSelectedStartDate(newDate);
            setSelectedEndDate(null);
        } else {
            setSelectedEndDate(newDate);
        }
    };

    const handleNextStep = () => {
        navigate('/pricing-homeowner');
    };

    return (
        <div className="page__container">
            <NavLogin />
            <div className="content">
                <div className="center-container-always">
                    <div className="accommodation__type__page">
                        <h1>Availability</h1>
                        <h2>When is your Place Available?</h2>

                        <div className="availabilityGrid">
                            <div className="availability__container">
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <StaticDatePicker
                                        displayStaticWrapperAs="desktop"
                                        value={selectedEndDate || selectedStartDate}
                                        onChange={handleDateChange}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </div>
                        </div>

                        <div className="availability-info">
                            <h2>Selected Dates</h2>
                            <p>Start Date: {selectedStartDate ? selectedStartDate.toLocaleDateString() : 'None'}</p>
                            <p>End Date: {selectedEndDate ? selectedEndDate.toLocaleDateString() : 'None'}</p>
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

export default Availability;
