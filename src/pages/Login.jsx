import { useState } from 'react';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import IconButton from '@mui/material/IconButton';
import '../css/login.css';

function Login() {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
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

            <button className="google__button">Continue with Google</button>
            <button className="facebook__button">Continue with Facebook</button>

            <button className="big__blue__button">Login</button>
            <span className="or">Or</span>
            <button className="big__white__button">Create an account</button>

        </div>
    );
}

export default Login;
