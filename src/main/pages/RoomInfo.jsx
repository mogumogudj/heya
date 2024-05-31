import NavApp from '../components/NavApp.jsx';
import Nav from '../../heya-web/components/Nav.jsx';
import Footer from '../../shared/components/Footer.jsx';

function Chat() {
    return (
        <div className="page__container">
            {isLoggedIn ? <NavApp /> : <Nav />}
            <div className="content">
                <h1>Chat</h1>
            </div>
            <Footer />
        </div>
    );
}

export default Chat;