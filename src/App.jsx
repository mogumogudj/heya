import "antd/dist/antd.min.css";
import './css/global.css';
import './css/app.css';
import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./pages/user/Login.jsx";
import CreateAccount from "./pages/user/CreateAccount.jsx";
import SelectSituation from "./pages/user/SelectSituation.jsx";
import AboutYourself from "./pages/user/AboutYourself.jsx";
import ComingSoon from "./pages/ComingSoon.jsx";
import Home from './pages/Home.jsx';
import Rooms from './pages/Rooms.jsx';
import Calendar from './pages/Calendar.jsx';
import Chat from './pages/Chat.jsx';
import Profile from './pages/user/Profile.jsx';
import Logout from './pages/user/Logout.jsx';
import PrivateRoutes from './PrivateRoute.jsx'
import UploadImage from './pages/user/UploadImage.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/" element={<ComingSoon />} />
        <Route path="/home" element={<Home />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/logout" element={<Logout />} />
            <Route path="/select-situation" element={<SelectSituation />} />
            <Route path="/about-yourself" element={<AboutYourself />} />
            <Route path="/upload-image" element={<UploadImage />} />
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
