import Footer from '../../shared/components/Footer.jsx';
import NavApp from '../components/NavApp.jsx';

function Profile() {
    return (
        <div className="page__container">
            <NavApp />
            <div className="content">
                <h1>My Profile</h1>
            </div>
            <Footer />
        </div>
    );
}

export default Profile;
