import React from 'react';
import { useAuth } from '../../AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const { logout } = useAuth(); 
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        localStorage.removeItem('token');
        navigate('/login');
    };
}

export default Logout;
