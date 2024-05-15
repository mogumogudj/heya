import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import IconButton from '@mui/material/IconButton';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';

function CreateAccount() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfrimPassword] = useState(false);
    const navigate = useNavigate();

    const togglePasswordVisibility = (e) => {
        e.preventDefault();
        setShowPassword(!showPassword);
    };

    const togglePasswordConfirmVisibility = (e) => {
        e.preventDefault();
        setShowConfrimPassword(!showConfirmPassword);
    };

    const handleCreateAccount = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://heya-api.onrender.com/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });
            const data = await response.json();
            if (response.ok) {
                console.log('signup successful:', data);
            } else {
                throw new Error(data.message || 'Failed to signup');
            }
        } catch (error) {
            console.error('signup error:', error);
        }
    };

    const handleLogin = () => {
        navigate('/login');
    };


    return (
        <div className="center-container">
            <div className="page__container__signup">
                <img className="heya__logo__blue__round" src="../heya-blue-round.svg" alt="heya logo blue"/>
                <h1 className="title__center">Create Account</h1>

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

                    <div className="form__group__name">
                        <input
                            type="name"
                            placeholder="Name"
                            className="input__field"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            autoComplete="name"
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
                            autoComplete="new-password"
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
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            autoComplete="new-password"
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
                </form>

                <button onClick={handleCreateAccount} className="big__blue__button">Create your account</button>
                <span className="or">Or</span>
                <button className="google__button"><GoogleIcon fontSize="small" /> Create with Google</button>
                <button className="facebook__button"><FacebookRoundedIcon fontSize="small" /> Create with Facebook</button>
            </div>
        </div>
    );
}

export default CreateAccount;
