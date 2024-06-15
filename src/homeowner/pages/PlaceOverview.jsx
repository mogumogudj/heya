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
            if (roomId) {
                try {
                    const response = await fetch(`${import.meta.env.VITE_API_URL}/rooms/${roomId}`);
                    if (response.ok) {
                        const data = await response.json();
                        setRoomData(data);
                    } else {
                        console.error('Failed to fetch room data');
                    }
                } catch (error) {
                    console.error('Error fetching room data:', error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchRoomData();
    }, [roomId]);

    const handleSubmit = () => {
        navigate(`/home`);
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
                <h1>Okay, {userData?.firstName}, your place is ready.</h1>
                <h2>Here are all the important details:</h2>
                <div>
                    <img className={'userImage'} src={roomData?.images[0] || ''} alt="Room Image" />
                    <h3 className={'centered'}>
                        {userData?.firstName} {userData?.lastName}
                    </h3>
                </div>
                <div>
                    <h3>Room overview</h3>
                    <div className={'personalInfo'}>
                        <h4>Details owner and room</h4>
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
                                {roomData.sharedSpaces?.length > 0 &&
                                    roomData.sharedSpaces[0]?.sharedSpaces?.map((space, index) => (
                                        <span key={index}>
                                            {space}
                                            <br />
                                        </span>
                                    ))}
                            </div>
                            <div>
                                <b>Room Details</b>
                                <br />
                                {roomData.roomDetails?.length > 0 && (
                                    <>
                                        <span> {roomData.roomDetails[0].furnishing}</span>
                                        <br />
                                        <span>size: {roomData.roomDetails[0].size} m²</span>
                                        <br />
                                        {roomData.roomDetails[0]?.existingFurnishing?.map(
                                            (existingFurnishing, index) => (
                                                <span key={index}>
                                                    {existingFurnishing}
                                                    <br />
                                                </span>
                                            ),
                                        )}
                                        <span>{roomData.roomDetails[0]?.otherInfo}</span>
                                    </>
                                )}
                            </div>
                            <div>
                                <b>For Personal Use</b>
                                <br />
                                {roomData.personalRoomDetails?.length > 0 && (
                                    <>
                                        {roomData.personalRoomDetails[0]?.amentities?.map((amenity, index) => (
                                            <span key={index}>
                                                {amenity}
                                                <br />
                                            </span>
                                        ))}
                                        <span>{roomData.personalRoomDetails[0]?.additionalAmenities}</span>
                                        <span>{roomData.personalRoomDetails[0]?.otherInfo}</span>
                                    </>
                                )}
                            </div>
                        </div>
                        <br />
                        <Divider />
                        <h4>Pricing</h4>
                        <div className={'twoGrid grid'}>
                            <div>
                                <b>Rent</b>
                                <br />
                                <span>{roomData.pricing[0]?.rent} €/month</span>
                                <br />
                                <span>{roomData.pricing[0]?.deposit} € deposit</span>
                            </div>
                        </div>
                        <br />
                        <h4>Availability</h4>
                        <div className={'twoGrid grid'}>
                            <div>
                                <b>Available From</b>
                                <br />
                                <span>{new Date(roomData.startDateAvailable).toLocaleDateString()}</span>
                            </div>
                            <div>
                                <b>Available Till</b>
                                <br />
                                <span>{new Date(roomData.endDateAvailable).toLocaleDateString()}</span>
                            </div>
                        </div>
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
