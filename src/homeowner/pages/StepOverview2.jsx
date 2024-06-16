import React from 'react';

import { useNavigate } from 'react-router-dom';
import StepOverviewComponent from '../../shared/components/StepOverview.jsx';


import Footer from '../../shared/components/Footer.jsx';
import NavLogin from '../../shared/components/NavLogin.jsx';


function StepOverview2() {

    const navigate = useNavigate();

    function nextStep() {
        navigate('/accommodation-type-homeowner');
    }


    return (
        
        <div className="page__container" style={{height: '100%'}}>
            <NavLogin />
            <div className="content">
                <div className="center-container">
                    <div>
                    
                        
                    <StepOverviewComponent
          title="Your Property"
          subtitle="Tell Us About Your Accommodation"
          description="Please provide detailed information about your property. Specify the type of accommodation you are offering, such as a room, studio, or apartment. Include practical details like the address and location, as well as property specifics such as garden size, house size, and room details. This information will help us accurately list your property and match it with potential tenants."
          image="/SleepingRoom.webp"
        />


                        
                        <div className="next__help" style={{position: 'relative', bottom: '240px'}}>
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

export default StepOverview2;
