import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';
import '../../shared/css/app.css';
import '../../main/css/rooms.css';

function RoomStatistics ({ state }) {

    const xLabels = [
        '',
        'Jan',
        'Feb',
        'Marh',
        'Apr',
        'May',
        'Jun',
        'Jul',
      ];

    if (state === "occupancy") {
        return (
            <div className='room-statistics'>
                <h1>Occupancy</h1>
                <BarChart
                    colors={[ '#2A5EF3', '#F7934C', '#668CEF']}
                    series={[
                        { data: [44, 24, 34, 13] },
                        { data: [6, 49, 30, 24] },
                        { data: [25, 30, 50, 48] },
                    ]}
                    height={290}
                    width={600}
                    xAxis={[{ data: ['Jan', 'Feb', 'Mar', 'Apr'], scaleType: 'band' }]}
                    margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
                    borderRadius={8}
                />
                <p>More details comming soon</p>
            </div>
        );
    } else if (state === "engage") {
        return (
            <div className='room-statistics'>
                <h1>Engage</h1>
                <LineChart
                    xAxis={[{ scaleType: 'point', data: xLabels }]}
                    colors={['#F32A5E']}
                    series={[
                        {
                        data: [null, 1200, 1700, 2300, 3100, 5000, 4800, 5600],
                        },
                    ]}
                    width={600}
                    height={300}
                />
                <p>More details comming soon</p>
            </div>
        );
    } else if (state === "income") {
        return (
            <div className='room-statistics'>
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
                    width={500}
                    height={200}
                />
                <p>More details comming soon</p>
            </div>
        );
    } else if (state === "satisfaction") {
        return (
            <div className='room-statistics'>
                <h1>Satisfaction</h1>
                <BarChart
                    colors={[ '#2A5EF3', '#F7934C', '#668CEF']}
                    series={[
                        { data: [44, 24, 34, 13] },
                        { data: [6, 49, 30, 24] },
                        { data: [25, 30, 50, 48] },
                    ]}
                    height={290}
                    width={600}
                    xAxis={[{ data: ['Jan', 'Feb', 'Mar', 'Apr'], scaleType: 'band' }]}
                    margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
                    borderRadius={8}
                />
                <div className='divider divider--room'></div>
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
                <p>More details comming soon</p>
            </div>
        );
    } else {
        return (
            <div className='room-statistics'>
                <h1>Error:</h1>
                <p>I seems we could not find the right data.</p>
            </div>
        );
    }
}

export default RoomStatistics;