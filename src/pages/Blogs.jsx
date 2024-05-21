import '../css/blogs.css';
import Nav from "../components/Nav"
import Footer from "../components/Footer"
import Article from "../components/Article"
import CitySelector from '../components/CitySelector';

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
                    <div className="blogs__articles blogs__articles__50">
                        <Article type="Default" />
                        <Article type="Default" />
                    </div>
                    <CitySelector />
                    <div className="blogs__articles blogs__articles__33">
                        <Article type="Default" />
                        <Article type="Default" />
                        <Article type="Default" />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Blogs