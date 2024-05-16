import "antd/dist/antd.min.css";
import './css/global.css';
import './css/app.css';
import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext.jsx';
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
import PrivateRoute from './PrivateRoute.jsx';
import Logout from './pages/user/Logout.jsx';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/" element={<ComingSoon />} />
          <Route path="/home" element={<Home />} />
          <Route path="/logout" element={<PrivateRoute />}>
            <Route path="/logout" element={<Logout />} />
          </Route>
          <Route path="/select-situation" element={<PrivateRoute />}>
            <Route path="/select-situation" element={<SelectSituation />} />
          </Route>
          <Route path="/about-yourself" element={<PrivateRoute />}>
            <Route path="/about-yourself" element={<AboutYourself />} />
          </Route>
          <Route path="/rooms" element={<PrivateRoute />}>
            <Route path="/rooms" element={<Rooms />} />
          </Route>
          <Route path="/calendar" element={<PrivateRoute />}>
            <Route path="/calendar" element={<Calendar />} />
          </Route>
          <Route path="/chat" element={<PrivateRoute />}>
            <Route path="/chat" element={<Chat />} />
          </Route>
          <Route path="/profile" element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
