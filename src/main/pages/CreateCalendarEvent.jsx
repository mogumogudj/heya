import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import NavLogin from '../../shared/components/NavLogin.jsx';
import Footer from '../../shared/components/Footer.jsx';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { EventEnum } from '../../shared/enums/event.js';

function CreateCalendarEvent() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [event, setEvent] = useState('');
    const [timestamp, setTimestamp] = useState(new Date());
    const [otherUsers, setOtherUsers] = useState([]);
    const [userSuggestions, setUserSuggestions] = useState([]);
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        if (!userId) {
            navigate('/login');
        }
    }, [userId, navigate]);

    const handleUserSearch = async (searchQuery) => {
        if (!searchQuery) {
            setUserSuggestions([]);
            return;
        }
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/users/search?name=${searchQuery}`);
            if (response.ok) {
                const data = await response.json();
                setUserSuggestions(data);
            } else {
                console.error('Failed to fetch user suggestions:', response.statusText);
            }
        } catch (error) {
            console.error('Failed to fetch user suggestions:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newEvent = {
            title,
            description,
            event,
            timestamp,
            userId,
            otherUsersId: otherUsers.map((user) => user._id),
        };

        try {
            await fetch(`${import.meta.env.VITE_API_URL}/calendar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newEvent),
            });
            navigate('/calendar');
        } catch (error) {
            console.error('Failed to create calendar event:', error);
        }
    };

    const handleAddUser = (user) => {
        if (!otherUsers.some((existingUser) => existingUser._id === user._id)) {
            setOtherUsers([...otherUsers, user]);
            setUserSuggestions([]);
        }
    };

    const handleRemoveUser = (userId) => {
        setOtherUsers(otherUsers.filter((user) => user._id !== userId));
    };

    return (
        <div className="page__container">
            <NavLogin />
            <div className="content">
                <div className="center-container">
                    <div className="page__container__signup">
                        <h1 className="title__center">Create Calendar Event</h1>
                        <form onSubmit={handleSubmit} className="event-form">
                            <TextField
                                label="Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Event Type"
                                value={event}
                                onChange={(e) => setEvent(e.target.value)}
                                select
                                required
                                fullWidth
                                margin="normal"
                            >
                                {Object.values(EventEnum).map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DateTimePicker
                                    label="Event Date and Time"
                                    value={timestamp}
                                    onChange={(newValue) => setTimestamp(newValue)}
                                    slots={{
                                        textField: (params) => <TextField {...params} fullWidth margin="normal" />,
                                    }}
                                />
                            </LocalizationProvider>
                            <TextField
                                label="Search Users"
                                onChange={(e) => handleUserSearch(e.target.value)}
                                fullWidth
                                margin="normal"
                            />
                            {userSuggestions.length > 0 && (
                                <div
                                    className="user-suggestions"
                                    style={{
                                        border: '1px solid #ccc',
                                        padding: '10px',
                                        borderRadius: '5px',
                                        marginTop: '10px',
                                    }}
                                >
                                    {userSuggestions.map((user) => (
                                        <div
                                            key={user._id}
                                            onClick={() => handleAddUser(user)}
                                            className="user-suggestion"
                                            style={{ padding: '5px', cursor: 'pointer' }}
                                        >
                                            {user.firstName} {user.lastName}
                                        </div>
                                    ))}
                                </div>
                            )}
                            <div className="selected-users">
                                {otherUsers.map((user) => (
                                    <div
                                        key={user._id}
                                        className="selected-user"
                                        style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}
                                    >
                                        {user.firstName} {user.lastName}
                                        <Button
                                            onClick={() => handleRemoveUser(user._id)}
                                            style={{ marginLeft: '10px' }}
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                ))}
                            </div>
                            <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
                                Create Event
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default CreateCalendarEvent;
