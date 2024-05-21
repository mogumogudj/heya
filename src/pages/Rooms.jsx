import React from "react";
import NavApp from "../components/NavApp";
import Footer from "../components/Footer";

function Rooms() {
    return (
        <div className="page__container">
            <NavApp />
            <div className="content">
                <h1>My Rooms</h1>
            </div>
            <Footer />
        </div>
    )
}

export default Rooms