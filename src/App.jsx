import "antd/dist/antd.min.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ComingSoon from "./pages/ComingSoon";
import Home from './pages/Home';
import Rooms from './pages/Rooms';
import Calendar from './pages/Calendar';
import Chat from './pages/Chat';
import Profile from './pages/Profile';
import './css/App.css';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<ComingSoon />} /> {/* Corrected from elements to element */}
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
