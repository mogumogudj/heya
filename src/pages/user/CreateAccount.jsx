import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import IconButton from '@mui/material/IconButton';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import Alert from '@mui/material/Alert';
import { makeStyles } from '@mui/styles';
import Footer from '../../components/Footer';

const useStyles = makeStyles({
    customAlert: {
        borderRadius: '8px',
        width: '768px',
        margin: '16px auto 32px auto',
    },
    '@media screen and (max-width: 800px)': {
        customAlert: {
          width: 'calc(100% - 32px)',
          margin: '16px 16px 32px 16px',
        },
    },
    errorInput: {
        border: '1px solid red',
    },
});

function CreateAccount() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const classes = useStyles();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleCreateAccount = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        if (name === '' || email === '' || password === '' || confirmPassword === '') {
            setError('All fields are required');
            return;
        }
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
                localStorage.setItem('token', data.token);
                navigate('/select-situation');
            } else {
                throw new Error(data.message || 'Failed to signup');
            }
        } catch (error) {
            console.error('signup error:', error);
            setError(error.message || 'Failed to login');
        }
    };

    const handleLogin = () => {
        navigate('/login');
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        handleCreateAccount(e);
    };

    return (
        <div className="page__container">
            <div className='content'>
                <div className="center-container">
                    <div className="page__container__signup">
                        <img className="heya__logo__blue__round" src="../heya-blue-round.svg" alt="heya logo blue"/>
                        <h1 className="title__center">Create Account</h1>

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

                            <div className="form__group__name">
                                <input
                                    type="name"
                                    placeholder="Name"
                                    className={`input__field ${error && classes.errorInput}`}
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
                                    className={`input__field ${error && classes.errorInput}`}
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
                                    className={`input__field ${error && classes.errorInput}`}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    autoComplete="new-password"
                                />
                                <IconButton
                                    onClick={toggleConfirmPasswordVisibility}
                                    aria-label="toggle confirm password visibility"
                                    className="password-icon"
                                >
                                    {showConfirmPassword ? <VisibilityOffOutlinedIcon /> : <RemoveRedEyeOutlinedIcon />}
                                </IconButton>
                            </div>

                            <span onClick={handleLogin} className="already__have__account">I already have an account</span>


                            {error && <Alert className={classes.customAlert} severity="error">{error}</Alert>}

                            <button type="submit" className="blue__button big">Create your account</button>
                            <span className="or">Or</span>
                            <button className="google__button"><GoogleIcon fontSize="small" /> Create with Google</button>
                            <button className="facebook__button"><FacebookRoundedIcon fontSize="small" /> Create with Facebook</button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default CreateAccount;
