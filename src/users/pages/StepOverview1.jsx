import React from 'react';

import { useNavigate } from 'react-router-dom';
import StepOverviewComponent from '../../shared/components/StepOverview.jsx';


import Footer from '../../shared/components/Footer.jsx';
import NavLogin from '../../shared/components/NavLogin.jsx';


function StepOverview1() {

    const navigate = useNavigate();

    function nextStep() {
        navigate('/about-yourself');
    }


    return (
        
        <div className="page__container" style={{height: '100%'}}>
            <NavLogin />
            <div className="content step-overview_-content">
                <div className="center-container">
                    <div>
                    
                        
                    <StepOverviewComponent
          title="Provide Your Personal Information"
          subtitle="Help Us Get to Know You Better"
          description="Please fill out the form below with your personal details. This information is crucial for us to create your student profile and ensure that we have all the necessary data to support your educational journey. All information provided will be kept confidential and secure."
          image="/SleepingRoom.webp"
        />


                        
                        <div className="next__help">
                            <button className="blue__button medium" type="button" onClick={nextStep}>
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
