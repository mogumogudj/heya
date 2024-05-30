import React from 'react';
import Nav from '../components/Nav.jsx';
import Footer from '../../shared/components/Footer.jsx';
import Alert from '@mui/material/Alert';
import { makeStyles } from '@mui/styles';
import '../css/contact.css';

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

/*function handleContactFormSubmit(e) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const classes = useStyles();

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        console.log("Contact form submitted");
        try {
            const response = await fetch('https://heya-api.onrender.com/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email }),
            });
            const data = await response.json();
            if (response.ok) {
                console.log('Contact form submitted:', data);
            } else {
                console.error('Contact form failed:', data);
                setError(error.message || 'Failed to submit contact form');
            }
        } catch (error) {
            console.error('Contact form failed:', error);
            setError(error.message || 'Failed to submit contact form');
        }
    }; Dit is basic setup gekopieerd van login en aangepast waar nodig, backednd is uiteraard nog niet werkende*/

const handleFormSubmit = (e) => {
    e.preventDefault();
    handleLogin(e);
};

//deze variabelen zijn nog niet in gebruik, maar zullen nodig zijn voor de contact form
const error = '';
const name = '';
const email = '';
const phone = '';
const subject = '';
const message = '';

function Contact() {
    return (
        <div className="page__container">
            <Nav />
            <div className="content">
                <header className="title__center normal__header">
                    <h6>Heya</h6>
                    <h1>Contact us</h1>
                </header>
                <div className="contact__container">
                    <div className="contact__form">
                        <form onSubmit={handleFormSubmit}>
                            <h4>Contact inquiry</h4>
                            <div className="form__group__name">
                                <input
                                    type="text"
                                    placeholder="Name"
                                    className={`input__field ${error && classes.errorInput}`}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    autoComplete="name"
                                />
                            </div>

                            <div className="form__group__email-contact">
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

                            <div className="form__group__phone">
                                <input
                                    type="tel"
                                    placeholder="Phone number"
                                    className={`input__field ${error && classes.errorInput}`}
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required //staat nu op required ma ik weet niet of da echt nodig is
                                    autoComplete="phone"
                                />
                            </div>

                            <div className="form__group__subject">
                                <input
                                    type="text"
                                    placeholder="Select a Subject"
                                    className={`input__field ${error && classes.errorInput}`}
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form__group__message">
                                <input
                                    type="text"
                                    placeholder="Message"
                                    className={`input__field ${error && classes.errorInput}`}
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    required
                                />
                            </div>

                            {error && (
                                <Alert className={classes.customAlert} severity="error">
                                    {error}
                                </Alert>
                            )}

                            <button type="submit" className="blue__button big">
                                Submit
                            </button>
                        </form>
                    </div>
                    <div className="contact__info">
                        <h4>Contact Details</h4>
                        <div className="contact__person">
                            <a className='contact__mail' href="#">eenmail@heya.me</a>
                            <p>+32 468 21 04 21</p>
                        </div>
                        <div className="contact__info--offices">
                            <div className="contact__info--office">
                                <h6 className="bold">Bierbeek Office</h6>
                                <p className="office__street">Stationsstraat 15-4B</p>
                                <p className="office__place">3360 Bierbeek, Belgium</p>
                            </div>
                            <div className="contact__info--office">
                                <h6 className="bold">Antwerp Office</h6>
                                <p className="office__street">Meir 24</p>
                                <p className="office__place">2000 Antwerp, Belgium</p>
                            </div>
                            <div className="contact__info--office">
                                <h6 className="bold">Ghent Office</h6>
                                <p className="office__street">Korenmarkt 10</p>
                                <p className="office__place">9000 Ghent, Belgium</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Contact;
