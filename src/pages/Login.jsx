import '../css/login.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import IconButton from '@mui/material/IconButton';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const togglePasswordVisibility = (e) => {
        e.preventDefault();
        setShowPassword(!showPassword);
    };

    const handleCreateAccount = () => {
        navigate('/create-account');
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://heya-api.onrender.com/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (response.ok) {
                console.log('Login successful:', data);
            } else {
                throw new Error(data.message || 'Failed to login');
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <div className="center-container">
            <div className="page__container__login">
                <img className="heya__logo__blue__round" src="../heya-blue-round.svg" alt="heya logo blue"/>
                <h1 className="title__center">Login</h1>

                <form>
                    <div className="form__group__email">
                        <input
                            type="email"
                            placeholder="Email"
                            className="input__field"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoComplete="email"
                        />
                    </div>

                    <div className="form__group__password">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className="input__field"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="current-password"
                        />
                        <IconButton
                            onClick={togglePasswordVisibility}
                            aria-label="toggle password visibility"
                            className="password-icon"
                        >
                            {showPassword ? <VisibilityOffOutlinedIcon /> : <RemoveRedEyeOutlinedIcon />}
                        </IconButton>
                        <span className="forgot__password">Forgot password?</span>
                    </div>

                    <button className="google__button"><GoogleIcon fontSize="small" /> Create with Google</button>
                    <button className="facebook__button"><FacebookRoundedIcon fontSize="small" /> Create with Facebook</button>

                    <button onClick={handleLogin} className="big__blue__button">Login</button>
                    <span className="or">Or</span>
                    <button onClick={handleCreateAccount} className="big__white__button">Create an account</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
