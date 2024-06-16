import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';
import '../../shared/css/app.css';
import '../../main/css/rooms.css';

function RoomStatistics({ state }) {
    const { roomId } = useParams();
    const userId = localStorage.getItem('userId');
    const [userData, setUserData] = useState(null);
    const [chartWidth, setChartWidth] = useState(600);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const xLabels = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];

    useEffect(() => {
        if (window.innerWidth < 700) {
            setChartWidth(400);
        } else {
            setChartWidth(600);
        }
    }, []);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}`);
                const data = await response.json();
                setUserData(data);

                const authorized = data.room.includes(roomId);
                setIsAuthorized(authorized);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, [roomId, userId]);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (!isAuthorized) {
        navigate('/home');
    }

    return (
        <div className="room-statistics">
            {state === 'occupancy' && (
                <>
                    <h1>Occupancy</h1>
                    <BarChart
                        colors={['#2A5EF3', '#F7934C', '#668CEF']}
                        series={[{ data: [44, 24, 34, 13] }, { data: [6, 49, 30, 24] }, { data: [25, 30, 50, 48] }]}
                        height={290}
                        width={chartWidth}
                        xAxis={[{ data: ['Jan', 'Feb', 'Mar', 'Apr'], scaleType: 'band' }]}
                        margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
                        borderRadius={8}
                    />
                    <p>More details coming soon</p>
                </>
            )}
            {state === 'engage' && (
                <>
                    <h1>Engage</h1>
                    <LineChart
                        xAxis={[{ scaleType: 'point', data: xLabels }]}
                        colors={['#F32A5E']}
                        series={[
                            {
                                data: [null, 1200, 1700, 2300, 3100, 5000, 4800, 5600],
                            },
                        ]}
                        width={chartWidth}
                        height={300}
                    />
                    <p>More details coming soon</p>
                </>
            )}
            {state === 'income' && (
                <>
                    <h1>Income</h1>
                    <PieChart
                        colors={['#F7934C', '#2A5EF3']}
                        series={[
                            {
                                data: [
                                    { id: 0, value: 10, label: 'Tasks' },
                                    { id: 1, value: 15, label: 'Events' },
                                ],
                                innerRadius: 60,
                                paddingAngle: 2,
                                cornerRadius: 4,
                            },
                        ]}
                        width={chartWidth}
                        height={200}
                    />
                    <p>More details coming soon</p>
                </>
            )}
            {state === 'satisfaction' && (
                <>
                    <h1>Satisfaction</h1>
                    <BarChart
                        colors={['#2A5EF3', '#F7934C', '#668CEF']}
                        series={[{ data: [44, 24, 34, 13] }, { data: [6, 49, 30, 24] }, { data: [25, 30, 50, 48] }]}
                        height={290}
                        width={chartWidth}
                        xAxis={[{ data: ['Jan', 'Feb', 'Mar', 'Apr'], scaleType: 'band' }]}
                        margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
                        borderRadius={8}
                    />
                    <div className="divider divider--room"></div>
                    <PieChart
                        colors={['#F7934C', '#2A5EF3']}
                        series={[
                            {
                                data: [
                                    { id: 0, value: 10, label: 'Tasks' },
                                    { id: 1, value: 15, label: 'Events' },
                                ],
                                innerRadius: 60,
                                paddingAngle: 2,
                                cornerRadius: 4,
                            },
                        ]}
                        width={500}
                        height={200}
                    />
                    <p>More details coming soon</p>
                </>
            )}
            {state !== 'occupancy' && state !== 'engage' && state !== 'income' && state !== 'satisfaction' && (
                <>
                    <h1>Error:</h1>
                    <p>It seems we could not find the right data.</p>
                </>
            )}
        </div>
    );
}

export default RoomStatistics;
