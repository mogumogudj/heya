import React, { useEffect, useState } from 'react';
import NavApp from '../components/NavApp.jsx';
import Nav from '../../heya-web/components/Nav.jsx';
import Footer from '../../shared/components/Footer.jsx';

function Home() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    return (
        <div className="page__container">
            {isLoggedIn ? <NavApp /> : <Nav />}
            <div className="content">
                <h1>Discover</h1>
            </div>
            <Footer />
        </div>
    );
}

export default Home;
