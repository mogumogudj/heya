import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { TextField } from '@mui/material';
import NavApp from '../components/NavApp.jsx';
import Footer from '../../shared/components/Footer.jsx';
import '../css/calendar.css';

function Calendar() {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const tasks = {
        today: ['Task 1', 'Task 2', 'Task 3'],
        nextDay1: ['Task 4', 'Task 5'],
        nextDay2: ['Task 6', 'Task 7', 'Task 8'],
    };

    const formatDate = (date) => date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    const getTomorrow = () => {
        const tomorrow = new Date();
        tomorrow.setDate(new Date().getDate() + 1);
        return tomorrow;
    };

    const getDayAfterTomorrow = () => {
        const dayAfterTomorrow = new Date();
        dayAfterTomorrow.setDate(new Date().getDate() + 2);
        return dayAfterTomorrow;
    };

    return (
        <div className="page__container">
            <NavApp />
            <div className="content">
                <h1>Your personal calendar</h1>
                <div className="calendarGrid">
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
                        <div className="daily-tasks">
                            <h2>Tasks for {formatDate(selectedDate)}</h2>
                            <ul>
                                {tasks.today.map((task, index) => (
                                    <li key={index}>{task}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="next-days-tasks">
                        <div className="next-day-task">
                            <h2>Tasks for {formatDate(getTomorrow())}</h2>
                            <ul>
                                {tasks.nextDay1.map((task, index) => (
                                    <li key={index}>{task}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="next-day-task">
                            <h2>Tasks for {formatDate(getDayAfterTomorrow())}</h2>
                            <ul>
                                {tasks.nextDay2.map((task, index) => (
                                    <li key={index}>{task}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Calendar;
