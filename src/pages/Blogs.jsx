import Nav from "../components/Nav"
import Footer from "../components/Footer"

function Blogs() {
    return (
        <div className="page__container">
            <Nav />
            <div className="content">
                <header className="title__center">
                    <h6>Heya</h6>
                    <h1>Blogs</h1>
                    <h4>Insights and News</h4>
                </header>
            </div>
            <Footer />
        </div>
    )
}

export default Blogs