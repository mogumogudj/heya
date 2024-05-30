import React from 'react';
import '../css/customizeStay.css';
import Footer from '../../shared/components/Footer.jsx';
import NavLogin from '../../shared/components/NavLogin.jsx';
import TextBoxWithMaxInput from '../../shared/components/TextBoxWithMaxInput.jsx';

function CustomizeStay() {
    return (
        <div className="page__container">
            <NavLogin />
            <div className="content">
                <h1>Customize your stay</h1>
                <h2>Upload your profile picture</h2>
                <div>
                    <p>What will you do during your stay?</p>
                    <div className={'forGrid grid'}>
                        <div className={''}>
                            <span>Study</span>
                        </div>
                        <div>
                            <span>Work</span>
                        </div>
                        <div>
                            <span>Internship</span>
                        </div>
                        <div>
                            <span>Other</span>
                        </div>
                    </div>
                    <div>
                        <p>Other information</p>
                        <TextBoxWithMaxInput />
                    </div>
                    <div className={'twoGrid grid'}>
                        <div>
                            <p>What do/will you study?</p>
                            <input type="text" maxLength="100" placeholder="Bachelor/Master in..." />
                        </div>
                        <div>
                            <p>In what city do/will you study?</p>
                            <input type="text" maxLength="100" placeholder="Antwerp" />
                        </div>
                    </div>
                    <p>Have you ever...</p>
                    <div className={'forGrid grid'}>
                        <div>
                            <span>Lived with a Host</span>
                        </div>
                        <div>
                            <span>Lived Abroad</span>
                        </div>
                        <div>
                            <span>Lived on my own</span>
                        </div>
                        <div>
                            <span>Lived with a Guest Family</span>
                        </div>
                        <div>
                            <span>None of the above</span>
                        </div>
                    </div>
                    <div>
                        <p>Extra information you would like us to know?</p>
                        <TextBoxWithMaxInput />
                    </div>
                    <div className="next__help">
                        <button className="blue__button medium" type="button">
                            Next step
                        </button>
                        <span className="help">I need help</span>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default CustomizeStay;
