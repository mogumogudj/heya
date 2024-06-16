import React from 'react';

import { useNavigate } from 'react-router-dom';
import StepOverviewComponent from '../../shared/components/StepOverview.jsx';


import Footer from '../../shared/components/Footer.jsx';
import NavLogin from '../../shared/components/NavLogin.jsx';


function StepOverview2() {

    const navigate = useNavigate();

    function nextStep() {
        navigate('/customize-stay');
    }


    return (
        
        <div className="page__container" style={{minHeight: '100%'}}>
            <NavLogin />
            <div className="content">
                <div className="center-container-always">
                    <div>
                    
                        
                    <StepOverviewComponent
          title="Customize Your Stay"
          subtitle="Tell Us About Your Ideal Accommodation"
          description="We want to ensure you find the perfect place that suits your needs and preferences. Please provide details about what you're looking for in a room or accommodation. Let us know if you’re here to study, work, or intern, and share a bit about yourself and your expectations. Your input will help us match you with the ideal accommodation."
          image="/SleepingRoom.webp"
        />


                        
                        <div className="next__help" style={{position:'relative', bottom: '140px'}}>
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
