import NavApp from '../components/NavApp.jsx';
import Footer from '../../shared/components/Footer.jsx';

function Calendar() {
    return (
        <div className="page__container">
            <NavApp />
            <div className="content">
                <h1>My Calendar</h1>
            </div>
            <Footer />
        </div>
    );
}

export default Calendar;
