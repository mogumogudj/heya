import React, { useState, useEffect } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import NavApp from '../components/NavApp.jsx';
import Footer from '../../shared/components/Footer.jsx';
import AddIcon from '@mui/icons-material/Add';
import '../css/calendar.css';

function Calendar() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [allTasks, setAllTasks] = useState([]);
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchCalendarInfo = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/calendar/${userId}`);
                const data = await response.json();
                setAllTasks(data);
            } catch (error) {
                console.error('Failed to fetch user calendar:', error);
            }
        };

        fetchCalendarInfo();
    }, [userId]);

    const formatDate = (date) => date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    const filterTasksByDate = (date) => {
        return allTasks.filter((task) => {
            const taskDate = new Date(task.timestamp);
            return taskDate.toDateString() === date.toDateString();
        });
    };

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

    const handleAddIconClick = () => {
        navigate('/create-calendar-event');
    };

    const tasksForSelectedDate = filterTasksByDate(selectedDate);
    const tasksForTomorrow = filterTasksByDate(getTomorrow());
    const tasksForDayAfterTomorrow = filterTasksByDate(getDayAfterTomorrow());

    return (
        <div className="page__container">
            <NavApp />
            <div className="content">
                <div className={'twoGrid grid'}>
                    <h1>Your personal calendar</h1>
                    <AddIcon fontSize="large" className="addIcon" onClick={handleAddIconClick} />
                </div>
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
                                    slots={{
                                        textField: (params) => <TextField {...params} />,
                                    }}
                                />
                            </LocalizationProvider>
                        </div>
                        <div className="daily-tasks">
                            <h2>Tasks for {formatDate(selectedDate)}</h2>
                            <ul>
                                {tasksForSelectedDate.length > 0 ? (
                                    tasksForSelectedDate.map((task, index) => <li key={index}>{task.title}</li>)
                                ) : (
                                    <li>No tasks or events today</li>
                                )}
                            </ul>
                        </div>
                    </div>
                    <div className="next-days-tasks">
                        <div className="next-day-task">
                            <h2>Tasks for {formatDate(getTomorrow())}</h2>
                            <ul>
                                {tasksForTomorrow.length > 0 ? (
                                    tasksForTomorrow.map((task, index) => <li key={index}>{task.title}</li>)
                                ) : (
                                    <li>No tasks or events tomorrow</li>
                                )}
                            </ul>
                        </div>
                        <div className="next-day-task">
                            <h2>Tasks for {formatDate(getDayAfterTomorrow())}</h2>
                            <ul>
                                {tasksForDayAfterTomorrow.length > 0 ? (
                                    tasksForDayAfterTomorrow.map((task, index) => <li key={index}>{task.title}</li>)
                                ) : (
                                    <li>No tasks or events the day after tomorrow</li>
                                )}
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
