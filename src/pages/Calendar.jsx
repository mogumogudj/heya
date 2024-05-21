import NavApp from "../components/NavApp"
import Footer from "../components/Footer"

function Calendar() {
    return (
        <div className="page__container">
            <NavApp />
            <div className="content">
                <h1>My Calendar</h1>
            </div>
            <Footer />
        </div>
    )
}

export default Calendar