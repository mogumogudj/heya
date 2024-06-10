import 'antd/dist/reset.css';
import './shared/css/global.css';
import './shared/css/app.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './users/pages/Login.jsx';
import CreateAccount from './users/pages/CreateAccount.jsx';
import SelectSituation from './users/pages/SelectSituation.jsx';
import AboutYourself from './users/pages/AboutYourself.jsx';
import Home from './main/pages/Home.jsx';
import Rooms from './main/pages/Rooms.jsx';
import Calendar from './main/pages/Calendar.jsx';
import Chat from './main/pages/Chat.jsx';
import Profile from './main/pages/Profile.jsx';
import Logout from './users/pages/Logout.jsx';
import PrivateRoutes from './PrivateRoute.jsx';
import UploadImage from './users/pages/UploadImage.jsx';
import Welcome from './heya-web/pages/Welcome.jsx';
import CustomizeStay from './users/pages/CustomizeStay.jsx';
import Blogs from './heya-web/pages/Blogs.jsx';
import About from './heya-web/pages/About.jsx';
import Faq from './heya-web/pages/Faq.jsx';
import Contact from './heya-web/pages/Contact.jsx';
import UserPersonInfo from './users/pages/UserPersonInfo.jsx';
import UserExpectations from './users/pages/UserExpectations.jsx';
import RoomInfo from './main/pages/RoomInfo.jsx';
import PreferredAccommodation from './users/pages/PreferredAccommodation.jsx';
import ProfileOverview from './users/pages/ProfileOverview.jsx';

import ProfileOverviewHomeOwner from './homeowner/pages/ProfileOverview.jsx';
import AboutYourselfHomeOwner from './homeowner/pages/AboutYourself.jsx';
import UploadImageHomeOwner from './homeowner/pages/UploadImage.jsx';
import AccommodationTypeHomeOwner from './homeowner/pages/AccommodationType.jsx';
import AccommodationInformationHomeOwner from './homeowner/pages/AccommodationInformation.jsx';
import HouseholdDetailsHomeOwner from './homeowner/pages/HouseholdDetails.jsx';
import PropertyDetailsHomeOwner from './homeowner/pages/PropertyDetails.jsx';
import SharedSpacesHomeOwner from './homeowner/pages/SharedSpaces.jsx';
import RoomDetailsHomeOwner from './homeowner/pages/RoomDetails.jsx';
import PersonalRoomDetailsHomeOwner from './homeowner/pages/PersonalRoomDetails.jsx';
import UniqueRoomDetailsHomeOwner from './homeowner/pages/UniqueRoomDetails.jsx';
import UploadPlaceImagesHomeOwner from './homeowner/pages/UploadPlaceImages.jsx';
import PlaceAvailabilityHomeOwner from './homeowner/pages/PlaceAvailability.jsx';

import { UserProvider } from './shared/contexts/UserContext.jsx';

function App() {
    return (
        <UserProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/create-account" element={<CreateAccount />} />
                    <Route path="/" element={<Welcome />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/blogs" element={<Blogs />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/faq" element={<Faq />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/room-info" element={<RoomInfo />} />
                    <Route element={<PrivateRoutes />}>
                        <Route path="/logout" element={<Logout />} />
                        <Route path="/select-situation" element={<SelectSituation />} />
                        <Route path="/about-yourself" element={<AboutYourself />} />
                        <Route path="/upload-image" element={<UploadImage />} />
                        <Route path="/customize-stay" element={<CustomizeStay />} />
                        <Route path="/user-person-info" element={<UserPersonInfo />} />
                        <Route path="/user-expectations" element={<UserExpectations />} />
                        <Route path="/preferred-accommodation" element={<PreferredAccommodation />} />
                        <Route path="/profile-overview" element={<ProfileOverview />} />

                        <Route path="/profile-overview-homeowner" element={<ProfileOverviewHomeOwner />} />
                        <Route path="/about-yourself-homeowner" element={<AboutYourselfHomeOwner />} />
                        <Route path="/upload-image-homeowner" element={<UploadImageHomeOwner />} />
                        <Route path="/accommodation-type-homeowner" element={<AccommodationTypeHomeOwner />} />
                        <Route path="/accommodation-information-homeowner" element={<AccommodationInformationHomeOwner />} />
                        <Route path="/household-details-homeowner" element={<HouseholdDetailsHomeOwner />} />
                        <Route path="/property-details-homeowner" element={<PropertyDetailsHomeOwner />} />
                        <Route path="/shared-spaces-homeowner" element={<SharedSpacesHomeOwner />} />
                        <Route path="/room-details-homeowner" element={<RoomDetailsHomeOwner />} />
                        <Route path="/personal-room-details-homeowner" element={<PersonalRoomDetailsHomeOwner />} />
                        <Route path="/unique-room-details-homeowner" element={<UniqueRoomDetailsHomeOwner />} />
                        <Route path="/upload-place-images-homeowner" element={<UploadPlaceImagesHomeOwner />} />
                        <Route path="/place-availability-homeowner" element={<PlaceAvailabilityHomeOwner />} />


                        <Route path="/rooms" element={<Rooms />} />
                        <Route path="/calendar" element={<Calendar />} />
                        <Route path="/chat" element={<Chat />} />
                        <Route path="/chat/:otherUserId" element={<Chat />} />
                        <Route path="/profile" element={<Profile />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </UserProvider>
    );
}

export default App;
