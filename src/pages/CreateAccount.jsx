import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import IconButton from '@mui/material/IconButton';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';

function CreateAccount() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfrimPassword] = useState(false);
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const togglePasswordConfirmVisibility = () => {
        setShowConfrimPassword(!showConfirmPassword);
    };

    const handleLogin = () => {
        navigate('/login');
    };


    return (
        <div className="page__container">
            <img className="heya__logo__blue__round" src="../heya-blue-round.svg" alt="heya logo blue"/>
            <h1 className="title__center">Create Account</h1>

            <div className="form__group__email">
                <input
                    type="email"
                    placeholder="Email"
                    className="input__field"
                />
            </div>

            <div className="form__group__name">
                <input
                    type="name"
                    placeholder="Name"
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
            </div>

            <div className="form__group__confirm__password">
                <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Repeat password"
                    className="input__field"
                />
                <IconButton
                    onClick={togglePasswordConfirmVisibility}
                    aria-label="toggle password visibility"
                    className="password-icon"
                >
                    {showConfirmPassword ? <VisibilityOffOutlinedIcon /> : <RemoveRedEyeOutlinedIcon />}
                </IconButton>
                <span onClick={handleLogin} className="already__have__account">I already have an account</span>
            </div>

            <button className="google__button"><GoogleIcon fontSize="small" /> Create with Google</button>
            <button className="facebook__button"><FacebookRoundedIcon fontSize="small" /> Create with Facebook</button>
            <button className="big__blue__button">Create your account</button>
            <span className="or">Or</span>
            <button onClick={handleLogin} className="big__white__button">Login</button>
        </div>
    );
}

export default CreateAccount;
