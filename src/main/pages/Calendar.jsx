import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { TextField, Typography } from '@mui/material';
import NavApp from '../components/NavApp.jsx';
import Footer from '../../shared/components/Footer.jsx';
import '../css/calendar.css';

function Calendar() {
    const [selectedDate, setSelectedDate] = useState(new Date());

    return (
        <div className="page__container">
            <NavApp />
            <div className="content">
                <h1>Your personal calendar</h1>
                <div className={'calendarGrid'}>
                    <div>
                        <div className="calendar__container">
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <StaticDatePicker
                                    displayStaticWrapperAs="desktop"
                                    value={selectedDate}
                                    onChange={(newValue) => {
                                        setSelectedDate(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </div>
                        <div className={'daily-tasks-selected-date'}></div>
                    </div>
                    <div className={'next-three-days-selected-day'}></div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Calendar;
