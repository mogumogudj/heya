import Nav from "../components/Nav"
import Footer from "../components/Footer"

function Calendar() {
    return (
        <div>
            <Nav />
            <div className="page__container">
                <div className="content">
                    <h1>My Calendar</h1>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Calendar