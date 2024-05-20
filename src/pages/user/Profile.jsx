import Footer from "../../components/Footer"
import Nav from "../../components/Nav"

function Profile() {
    return (
        <div className="page__container">
            <Nav />
            <div className="content">
                <h1>My Profile</h1>
            </div>
            <Footer />
        </div>
    )
}

export default Profile