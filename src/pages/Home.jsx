import Nav from "../components/Nav"
import Footer from "../components/Footer"

function Home() {
    return (
        <div className="page__container">
            <Nav />
            <div className="content">
                <h1>Discover</h1>
            </div>
            <Footer />
        </div>
    )
}

export default Home