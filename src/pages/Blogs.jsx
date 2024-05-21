import '../css/blogs.css';
import Nav from "../components/Nav"
import Footer from "../components/Footer"
import Article from "../components/Article"

function Blogs() {
    return (
        <div>
            <Nav />
            <div className="page__container">
                <div className="content">
                    <header className="title__center normal__header">
                        <h6>Heya</h6>
                        <h1>Blogs</h1>
                        <h4>Insights and News</h4>
                    </header>
                    <div className="blogs__articles">
                        <Article />
                        <Article />
                        <Article />
                        <Article />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Blogs