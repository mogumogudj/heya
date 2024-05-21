import React, { useEffect, useState } from 'react';
import NavApp from '../components/NavApp';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

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
