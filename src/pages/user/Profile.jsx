import Footer from "../../components/Footer"
import NavApp from "../../components/NavApp"

function Profile() {
    return (
        <div className="page__container">
            <NavApp />
            <div className="content">
                <h1>My Profile</h1>
            </div>
            <Footer />
        </div>
    )
}

export default Profile