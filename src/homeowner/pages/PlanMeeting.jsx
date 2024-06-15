import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { TextField } from '@mui/material';
import NavLogin from '../../shared/components/NavLogin.jsx';
import Footer from '../../shared/components/Footer.jsx';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function PlanMeeting() {
    const navigate = useNavigate();
    const [selectedDateTime, setSelectedDateTime] = useState(new Date());
    const [roomId, setRoomId] = useState(null);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const roomIdFromParams = params.get('roomId');
        if (roomIdFromParams) {
            setRoomId(roomIdFromParams);
        }
    }, [location]);

    const handleDateChange = (newDateTime) => {
        setSelectedDateTime(newDateTime);
    };

    const handleSaveMeeting = async () => {
        if (!roomId) {
            console.error('Room ID is missing');
            return;
        }

        const meetingDetails = { meeting: selectedDateTime.toISOString() };

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/rooms/${roomId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(meetingDetails),
            });

            if (response.ok) {
                navigate(`/place-overview-homeowner?roomId=${roomId}`);
            } else {
                const result = await response.json();
                throw new Error(result.message || 'Failed to save meeting details');
            }
        } catch (error) {
            console.error(error.message || 'Failed to save meeting details');
        }
    };

    return (
        <div className="page__container">
            <NavLogin />
            <div className="content" style={{ height: '100%' }}>
                <div className="center-container" style={{ height: '100%' }}>
                    <div className="plan__meeting__page">
                        <div className='homeowner__register__header'>
                        <h1>Plan a Meeting</h1>
                        <h2>Do you want to have a meeting with us?</h2>
                        </div>

                        <div className="availabilityGrid">
                            <div className="availability__container">
                                <LocalizationProvider dateAdapter={AdapterDateFns} >
                                    <DateTimePicker
                                        value={selectedDateTime}
                                        onChange={handleDateChange}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </div>
                        </div>

                        <div className="availability-info">
                            
                            <button className="blue__button big" onClick={handleSaveMeeting}>
                                Plan meeting
                            </button>

                            <a className='availability-info__skip-link'>Skip this for now</a>
                            <p className="availability-info__selected-datetime">
                                Selected Date and Time: {selectedDateTime ? selectedDateTime.toLocaleString() : 'None'}
                            </p>
                        </div>

                        <div className="next__help">
                            <button className="blue__button medium" type="button" onClick={handleSaveMeeting}>
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
