import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    useEffect(() => {
        handleLogout();
    }, []);

    return null;
}

export default Logout;
