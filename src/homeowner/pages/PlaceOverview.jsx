import React from 'react';
import NavLogin from '../../shared/components/NavLogin.jsx';
import Footer from '../../shared/components/Footer.jsx';
import { useNavigate } from 'react-router-dom';
import { Divider } from '@mui/material';

function PlaceOverview() {
    const navigate = useNavigate();

    const handleSubmit = () => {
        navigate('/place-availability-homeowner');
    };

    return (
        <div className="page__container">
            <NavLogin />
            <div className="content">
                <h1>Okay, John your place is ready.</h1>
                <h2>Here are all the important details </h2>
                <div>
                    <img className={'userImage'} src="" alt="User Image" />
                    <h3 className={'centered'}>John Doe</h3>
                </div>
                <div>
                    <h3>Room overview</h3>
                    <div className={'personalInfo'}>
                        <h4>Details</h4>
                        <div className={'twoGrid grid'}>
                            <div>
                                <b>Firstname</b>
                                <br />
                                <span>John</span>
                            </div>
                            <div>
                                <b>Lastname</b>
                                <br />
                                <span>Doe</span>
                            </div>
                            <div>
                                <b>Birthday</b>
                                <br />
                                <span>01/01/1990</span>
                            </div>
                            <div>
                                <b>Phone number</b>
                                <br />
                                <span>123-456-7890</span>
                            </div>
                        </div>
                        <br />
                        <h4>Extra information</h4>
                        <div className={'twoGrid grid'}>
                            <div>
                                <b>Languages</b>
                                <br />
                                <span>English, Spanish</span>
                            </div>
                            <div>
                                <b>Character</b>
                                <br />
                                <span>Friendly, Responsible</span>
                            </div>
                            <div>
                                <b>Short description</b>
                                <br />
                                <span>A brief description about John Doe.</span>
                            </div>
                        </div>
                        <br />
                        <h4>Your accommodation's information</h4>
                        <div className={'twoGrid grid'}>
                            <div>
                                <b>Practical information</b>
                                <br />
                                <span>Lange Noordstraat 66</span>
                                <br />
                                <span>3000 Antwerp, Belgium</span>
                                <br />
                                <span>Vlaams Brabant</span>
                            </div>
                            <div>
                                <b>1 Room</b>
                                <br />
                                <span>12 m2</span>
                            </div>
                            <div>
                                <b>Measurements</b>
                                <br />
                                <span>Entire House: 129m2</span>
                                <br />
                                <span>Garden: 80m2</span>
                                <br />
                                <span>Room: 12m2</span>
                            </div>
                            <div>
                                <b>For Shared Use</b>
                                <br />
                                <span>Kitchen</span>
                                <br />
                                <span>Bathroom</span>
                                <br />
                                <span>Living room</span>
                                <br />
                                <span>Garden</span>
                                <br />
                                <span>TV Room</span>
                            </div>

                            <div>
                                <b>Available Amentities</b>
                                <br />
                                <span>Kitchen</span>
                                <br />
                                <span>Bathroom</span>
                                <br />
                                <span>Living room</span>
                                <br />
                                <span>Garden</span>
                                <br />
                                <span>TV Room</span>
                            </div>

                            <div>
                                <b>For Personal Use</b>
                                <br />
                                <span>Kitchen</span>
                                <br />
                                <span>Bathroom</span>
                                <br />
                                <span>Living room</span>
                                <br />
                                <span>Garden</span>
                                <br />
                                <span>TV Room</span>
                            </div>
                        </div>
                        <br />
                        <Divider />
                        <h4>Pricing</h4>
                        <div className={'twoGrid grid'}>
                            <div>
                                <b>Rent</b>
                                <br />
                                <span>€390</span>
                                <span>/month</span>
                                <br />
                                <span>€1200</span>
                                <span>/deposit</span>
                            </div>
                        </div>

                        <br />
                        <h4>Availability</h4>
                        <div className={'twoGrid grid'}>
                            <div>
                                <b>Available From</b>
                                <br />
                                <span>01/06/2023</span>
                            </div>
                            <div>
                                <b>Available Till</b>
                                <br />
                                <span>01/06/2024</span>
                            </div>
                        </div>
                        <button className="white__button small">More details..</button>
                    </div>
                    <div className="next__help">
                        <button className="blue__button medium" type="button" onClick={handleSubmit}>
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

export default PlaceOverview;
