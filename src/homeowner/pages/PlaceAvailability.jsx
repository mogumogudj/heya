import React, { useEffect, useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { TextField } from '@mui/material';
import NavLogin from '../../shared/components/NavLogin.jsx';
import Footer from '../../shared/components/Footer.jsx';
import { useLocation, useNavigate } from 'react-router-dom';

function Availability() {
    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);
    const [roomId, setRoomId] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const roomIdFromParams = params.get('roomId');
        if (roomIdFromParams) {
            setRoomId(roomIdFromParams);
        }
    }, [location]);

    const handleDateChange = (newDate) => {
        newDate.setUTCHours(0, 0, 0, 0);

        if (!selectedStartDate || newDate < selectedStartDate) {
            setSelectedStartDate(newDate);
            setSelectedEndDate(null);
        } else {
            setSelectedEndDate(newDate);
        }
    };

    const handleNextStep = async () => {
        try {
            const startDateUTC = selectedStartDate ? selectedStartDate.toISOString().slice(0, 10) : null;
            const endDateUTC = selectedEndDate ? selectedEndDate.toISOString().slice(0, 10) : null;

            const response = await fetch(`${import.meta.env.VITE_API_URL}/rooms/${roomId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    startDateAvailable: startDateUTC,
                    endDateAvailable: endDateUTC,
                }),
            });

            const result = await response.json();

            if (response.ok) {
                navigate(`/pricing-homeowner?roomId=${roomId}`);
            } else {
                throw new Error(result.message || 'Failed to save availability');
            }
        } catch (error) {
            console.error('Error saving availability:', error);
        }
    };

    return (
        <div className="page__container">
            <NavLogin />
            <div className="content" style={{ height: '100%' }}>
                <div className="center-container-always" style={{ height: '100%' }}>
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

                        <div style={{ paddingTop: '16px' }} className="availability-info">
                            <h2>Selected Dates</h2>
                            <p style={{ padding: 0 }}>
                                Start Date: {selectedStartDate ? selectedStartDate.toLocaleDateString() : 'None'}
                            </p>
                            <p style={{ padding: 0 }}>
                                End Date: {selectedEndDate ? selectedEndDate.toLocaleDateString() : 'None'}
                            </p>
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
