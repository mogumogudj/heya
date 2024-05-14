import '../css/login.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import IconButton from '@mui/material/IconButton';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleCreateAccount = () => {
        navigate('/create-account');
    };

    return (
        <div className="page__container">
            <img className="heya__logo__blue__round" src="../heya-blue-round.svg" alt="heya logo blue"/>
            <h1 className="title__center">Login</h1>

            <div className="form__group__email">
                <input
                    type="email"
                    placeholder="Email"
                    className="input__field"
                />
            </div>

            <div className="form__group__password">
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="input__field"
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

            <button className="big__blue__button">Login</button>
            <span className="or">Or</span>
            <button onClick={handleCreateAccount} className="big__white__button">Create an account</button>

        </div>
    );
}

export default Login;
