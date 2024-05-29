import 'antd/dist/antd.min.css';
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

function App() {
    return (
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
                <Route path="/home" element={<Home />} />
                <Route element={<PrivateRoutes />}>
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/select-situation" element={<SelectSituation />} />
                    <Route path="/about-yourself" element={<AboutYourself />} />
                    <Route path="/upload-image" element={<UploadImage />} />
                    <Route path="/customize-stay" element={<CustomizeStay />} />
                    <Route path="/rooms" element={<Rooms />} />
                    <Route path="/calendar" element={<Calendar />} />
                    <Route path="/chat" element={<Chat />} />
                    <Route path="/profile" element={<Profile />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
