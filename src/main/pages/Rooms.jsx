import React from 'react';
import NavApp from '../components/NavApp.jsx';
import Footer from '../../shared/components/Footer.jsx';

function Rooms() {
    return (
        <div className="page__container">
            <NavApp />
            <div className="content">
                <h1>My Rooms</h1>
            </div>
            <Footer />
        </div>
    );
}

export default Rooms;
