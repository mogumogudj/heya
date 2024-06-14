import React, { useEffect, useState, useContext } from 'react';
import NavLogin from '../../shared/components/NavLogin.jsx';
import Footer from '../../shared/components/Footer.jsx';
import { useNavigate } from 'react-router-dom';
import { Divider } from '@mui/material';
import { UserContext } from '../../shared/contexts/UserContext';

function PlaceOverview() {
    const navigate = useNavigate();
    const [roomId, setRoomId] = useState(null);
    const [roomData, setRoomData] = useState(null);
    const [loading, setLoading] = useState(true);
    const { userData } = useContext(UserContext);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const roomIdFromParams = params.get('roomId');
        if (roomIdFromParams) {
            setRoomId(roomIdFromParams);
        }

        const fetchRoomData = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/rooms/${roomId}`);
                if (response.ok) {
                    const data = await response.json();
                    setRoomData(data);
                    if (data.owner && data.owner.userId) {
                        await fetchUserData(data.owner.userId);
                    }
                } else {
                    console.error('Failed to fetch room data');
                }
            } catch (error) {
                console.error('Error fetching room data:', error);
            } finally {
                setLoading(false);
            }
        };

        if (roomId) {
            fetchRoomData();
        }
    }, [roomId]);

    const handleSubmit = () => {
        navigate(`/place-availability-homeowner?roomId=${roomId}`);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!roomData || !roomData.owner) {
        return <div>Room data not found.</div>;
    }

    return (
        <div className="page__container">
            <NavLogin />
            <div className="content">
                <h1>Okay, {userData?.firstName} your place is ready.</h1>
                <h2>Here are all the important details </h2>
                <div>
                    <img className={'userImage'} src={userData?.imageLink || ''} alt="User Image" />
                    <h3 className={'centered'}>
                        {userData?.firstName} {userData?.lastName}
                    </h3>
                </div>
                <div>
                    <h3>Room overview</h3>
                    <div className={'personalInfo'}>
                        <h4>Details</h4>
                        <div className={'twoGrid grid'}>
                            <div>
                                <b>Firstname</b>
                                <br />
                                <span>{userData?.firstName}</span>
                            </div>
                            <div>
                                <b>Lastname</b>
                                <br />
                                <span>{userData?.lastName}</span>
                            </div>
                            <div>
                                <b>Birthday</b>
                                <br />
                                <span>{userData?.birthday}</span>
                            </div>
                            <div>
                                <b>Phone number</b>
                                <br />
                                <span>{userData?.phoneNumber}</span>
                            </div>
                        </div>
                        <br />
                        <h4>Extra information</h4>
                        <div className={'twoGrid grid'}>
                            <div>
                                <b>Languages</b>
                                <br />
                                <span>{userData?.languages?.join(', ')}</span>
                            </div>
                            <div>
                                <b>Character</b>
                                <br />
                                <span>{userData?.character?.join(', ')}</span>
                            </div>
                            <div>
                                <b>Short description</b>
                                <br />
                                <span>{userData?.description}</span>
                            </div>
                        </div>
                        <br />
                        <h4>Your accommodation's information</h4>
                        <div className={'twoGrid grid'}>
                            <div>
                                <b>Practical information</b>
                                <br />
                                <span>
                                    {roomData.streetName} {roomData.houseNumber} {roomData.bus}
                                </span>
                                <br />
                                <span>
                                    {roomData.postalCode} {roomData.city}, {roomData.country}
                                </span>
                                <br />
                                <span>{roomData.place}</span>
                            </div>
                            <div>
                                <b>1 Room</b>
                                <br />
                                <span>{roomData.roomDetails[0]?.size} m²</span>
                            </div>
                            <div>
                                <b>Measurements</b>
                                <br />
                                <span>Entire House: {roomData.propertyDetails[0]?.surfaceArea}m²</span>
                                <br />
                                <span>Garden: {roomData.propertyDetails[0]?.gardenSize}m²</span>
                                <br />
                                <span>Room: {roomData.roomDetails[0]?.size}m²</span>
                            </div>
                            <div>
                                <b>For Shared Use</b>
                                <br />
                                {roomData.sharedSpaces[0]?.sharedSpaces.map((space) => (
                                    <span key={space}>
                                        {space}
                                        <br />
                                    </span>
                                ))}
                            </div>
                            <div>
                                <b>Available Amentities</b>
                                <br />
                                {roomData.roomDetails[0]?.amenities.map((amenity) => (
                                    <span key={amenity}>
                                        {amenity}
                                        <br />
                                    </span>
                                ))}
                            </div>
                            <div>
                                <b>For Personal Use</b>
                                <br />
                                {roomData.personalRoomDetails[0]?.activities.map((activity) => (
                                    <span key={activity}>
                                        {activity}
                                        <br />
                                    </span>
                                ))}
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
