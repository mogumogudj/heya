import '../../css/login.css'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import IconButton from '@mui/material/IconButton';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import Alert from '@mui/material/Alert';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    customAlert: {
        borderRadius: '8px',
        width: '768px',
        margin: '-16px auto 32px auto',
    },
    '@media screen and (max-width: 800px)': {
        customAlert: {
          width: 'calc(100% - 32px)',
          margin: '-16px 16px 32px 16px',
        },
    },
    errorInput: {
        border: '1px solid red',
    },
});

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const classes = useStyles();

    const togglePasswordVisibility = (e) => {
        e.preventDefault();
        setShowPassword(!showPassword);
    };

    const handleCreateAccount = () => {
        navigate('/create-account');
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log("Login button clicked"); 
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
                localStorage.setItem('token', data.token);
                navigate('/home')
            } else {
                throw new Error(data.message || 'Failed to login');
            }
        } catch (error) {
            console.error('Login error:', error);
            setError(error.message || 'Failed to login');
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        handleLogin(e);
    };

    return (
        <div className="center-container">
            <div className="page__container__login">
                <img className="heya__logo__blue__round" src="../heya-blue-round.svg" alt="heya logo blue"/>
                <h1 className="title__center">Login</h1>

                <form onSubmit={handleFormSubmit}>
                    <div className="form__group__email">
                        <input
                            type="email"
                            placeholder="Email"
                            className={`input__field ${error && classes.errorInput}`}
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
                            className={`input__field ${error && classes.errorInput}`}
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

                    {error && <Alert className={classes.customAlert} severity="error">{error}</Alert>}

                    <button className="google__button"><GoogleIcon fontSize="small" /> Create with Google</button>
                    <button className="facebook__button"><FacebookRoundedIcon fontSize="small" /> Create with Facebook</button>

                    <button type="submit" className="big__blue__button">Login</button>
                    <span className="or">Or</span>
                    <button onClick={handleCreateAccount} className="big__white__button">Create an account</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
