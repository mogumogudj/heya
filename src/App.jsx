import "antd/dist/antd.min.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./pages/user/Login.jsx";
import CreateAccount from "./pages/user/CreateAccount.jsx";
import SelectSituation from "./pages/user/SelectSituation.jsx";
import AboutYourself from "./pages/user/AboutYourself.jsx";
import ComingSoon from "./pages/ComingSoon";
import Home from './pages/Home';
import Rooms from './pages/Rooms';
import Calendar from './pages/Calendar';
import Chat from './pages/Chat';
import Profile from './pages/user/Profile.jsx';
import './css/global.css';
import './css/app.css';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/select-situation" element={<SelectSituation />} />
          <Route path="/about-yourself" element={<AboutYourself />} />
          <Route path="/" element={<ComingSoon />} />
          <Route path="/home" element={<Home />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
