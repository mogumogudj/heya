import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import StepOverviewComponent from '../../shared/components/StepOverview.jsx';


import Footer from '../../shared/components/Footer.jsx';
import NavLogin from '../../shared/components/NavLogin.jsx';


function StepOverview1() {

    const navigate = useNavigate();

    //make funtion to navigate to next page
    const handleClick = () => {
        navigate('/step-overview');
    }


    return (
        <div className="page__container">
            <NavLogin />
            <div className="content">
                <div className="center-container">
                    <div>
                    
                        
                    <StepOverviewComponent
          title="Next Step: Profile Information"
          subtitle="Complete your profile"
          description="Please provide detailed information about yourself to improve your experience."
          image="/SleepingRoom.webp"
        />


                        
                        <div className="next__help">
                            <button className="blue__button medium" type="button" >
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

export default StepOverview1;
