import React, { useContext } from 'react';
import '../css/userInfo.css';
import NavLogin from '../../shared/components/NavLogin.jsx';
import Footer from '../../shared/components/Footer.jsx';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../shared/contexts/UserContext';

function ProfileOverview() {
    const navigate = useNavigate();
    const { userData, isLoading } = useContext(UserContext);

    const handleSubmit = () => {
        navigate('/home');
    };

    const goHome = () => {
        navigate('/home');
    };

    return (
        <div className="page__container">
            <NavLogin />
            <div className="content">
                <h1>Welcome {!isLoading && userData && `${userData.firstName}`}</h1>
                <h2>Your account has been created!</h2>
                {!isLoading && userData && (
                    <div>
                        <img className={'userImage'} src={userData.imageLink} alt="User Image" />
                        <h3 className={'centered'}>
                            {userData.firstName} {userData.lastName}
                        </h3>
                    </div>
                )}

                {!isLoading && userData && (
                    <div>
                        <h3>Profile overview</h3>
                        <div className={'personalInfo'}>
                            <h4>Details</h4>
                            <div className={'twoGrid grid'}>
                                <div>
                                    <b>Firstname</b>
                                    <br />
                                    <span>{userData.firstName}</span>
                                </div>
                                <div>
                                    <b>Lastname</b>
                                    <br />
                                    <span>{userData.lastName}</span>
                                </div>
                                <div>
                                    <b>Birthday</b>
                                    <br />
                                    <span>
                                        <span>
                                            {userData.birthday
                                                ? new Date(userData.birthday).toLocaleDateString('en-GB')
                                                : '-'}
                                        </span>
                                    </span>
                                </div>
                                <div>
                                    <b>Phone number</b>
                                    <br />
                                    <span>{userData.phoneNumber}</span>
                                </div>
                            </div>
                            <br />
                            <h4>Extra information</h4>
                            <div className={'twoGrid grid'}>
                                <div>
                                    <b>Languages</b>
                                    <br />
                                    <span>
                                        {userData.userInfo[0].languages.join(', ') +
                                            ' ' +
                                            userData.userInfo[0].otherLanguage}
                                    </span>
                                </div>
                                <div>
                                    <b>Character</b>
                                    <br />
                                    <span>
                                        {userData.userInfo[0].character.join(', ') +
                                            ' ' +
                                            userData.userInfo[0].otherCharacter}
                                    </span>
                                </div>
                                <div>
                                    <b>Short description</b>
                                    <br />
                                    <span>{userData.userInfo[0].shortDescription}</span>
                                </div>
                            </div>
                            <br />
                            <h4>Stay information</h4>
                            <div className={'twoGrid grid'}>
                                <div>
                                    <b>Activities</b>
                                    <br />
                                    <span>{userData.userStayInfo[0].activities.join(', ')}</span>
                                </div>
                                <div>
                                    <b>Experiences</b>
                                    <br />
                                    <span>{userData.userStayInfo[0].experiences.join(', ')}</span>
                                </div>
                                <div>
                                    <b>Study</b>
                                    <br />
                                    <span>{userData.userStayInfo[0].study}</span>
                                </div>
                                <div>
                                    <b>City</b>
                                    <br />
                                    <span>{userData.userStayInfo[0].city}</span>
                                </div>
                            </div>
                            <br />
                            <h4>Expectations</h4>
                            <div className={'twoGrid grid'}>
                                <div>
                                    <b>Wants</b>
                                    <br />
                                    <span>{userData.userExpectations[0].wants.join(', ')}</span>
                                </div>
                                <div>
                                    <b>Characteristics</b>
                                    <br />
                                    <span>
                                        {userData.userExpectations[0].characteristics.join(', ') +
                                            ' ' +
                                            userData.userExpectations[0].otherCharacteristics}
                                    </span>
                                </div>
                            </div>
                            <br />
                            <h4>Preferred accommodation</h4>
                            <div className={'twoGrid grid'}>
                                <div>
                                    <b>Move in date</b>
                                    <br />
                                    <span>{userData.preferredAccommodation[0].moveInDate}</span>
                                </div>
                                <div>
                                    <b>Move out date</b>
                                    <br />
                                    <span>{userData.preferredAccommodation[0].moveOutDate}</span>
                                </div>
                                <div>
                                    <b>Amount of people</b>
                                    <br />
                                    <span>{userData.preferredAccommodation[0].peopleAmount}</span>
                                </div>
                                <div>
                                    <b>Minimum budget</b>
                                    <br />
                                    <span>{'€ ' + userData.preferredAccommodation[0].minBudget}</span>
                                </div>
                                <div>
                                    <b>Maximum budget</b>
                                    <br />
                                    <span>{'€ ' + userData.preferredAccommodation[0].maxBudget}</span>
                                </div>
                                <div>
                                    <b>Minimum size in m²</b>
                                    <br />
                                    <span>{userData.preferredAccommodation[0].minimumSize + 'm²'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div className="next__help">
                    <button className="blue__button medium" type="button" onClick={handleSubmit}>
                        Next step
                    </button>
                    <span className="help">I need help</span>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ProfileOverview;
