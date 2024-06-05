import React from 'react';
import '../../shared/css/app.css';
import '../../main/css/rooms.css';

function RoomStatistics ({ state }) {

    if (state === "occupancy") {
        return (
            <h1>Occupancy</h1>
        );
    } else if (state === "engage") {
        return (
            <h1>Engage</h1>
        );
    } else if (state === "income") {
        return (
            <h1>Income</h1>
        );
    } else if (state === "satisfaction") {
        return (
            <h1>Satisfaction</h1>
        );
    } else {
        return (
            <h1>Unknown error</h1>
        );
    }
}

export default RoomStatistics;