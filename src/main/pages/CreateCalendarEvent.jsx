import NavLogin from '../../shared/components/NavLogin.jsx';
import Footer from '../../shared/components/Footer.jsx';

function CreateCalendarEvent() {
    return (
        <div className="page__container">
            <NavLogin />
            <div className="content">
                <div className="center-container">
                    <div className="page__container__signup">
                        <h1 className="title__center">Create Calendar Event</h1>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default CreateCalendarEvent;
