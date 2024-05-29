import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        const handleLogout = () => {
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            navigate('/login');
        };
        handleLogout();
    }, [navigate]);
    return null;
}

export default Logout;
