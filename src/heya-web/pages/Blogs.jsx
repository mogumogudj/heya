import '../css/blogs.css';
import Nav from '../components/Nav.jsx';
import Footer from '../../shared/components/Footer.jsx';
import Article from '../components/Article.jsx';
import CitySelector from '../../shared/components/CitySelector.jsx';

function Blogs() {
    return (
        <div className="page__container">
            <Nav />
            <div className="content">
                <header className="title__center normal__header">
                    <h6>Heya</h6>
                    <h1>Blogs</h1>
                    <h4>Insights and News</h4>
                </header>
                <div className="blogs__articles blogs__articles__50">
                    <Article
                        type="Default"
                        title="Tackling the Student Housing Crisis"
                        description="The student housing crisis is a well-known problem, leaving many students struggling to find affordable accommodation. Heya is addressing this issue with innovative solutions that help homeowners rent out spare rooms safely and quickly. Learn how we are making student housing more accessible and sustainable."
                        imageUrl="/Blogs/medium-shot-people-planning-trip-indoors.webp"
                        className="article"
                    />
                    <Article
                        type="Default"
                        title="How Hospitawonen is Revolutionizing Student Housing"
                        description="Hospitawonen offers a new way to tackle the student housing shortage. By enabling homeowners to rent out rooms to students, Heya is creating a win-win situation for both parties. Discover the benefits of this alternative housing model and how it helps students find affordable living spaces."
                        imageUrl="/Blogs/gents-schepen-van-wonen-tine-heyse-groen-het-heeft-financiele.webp"
                        className="article"
                    />
                </div>
                <CitySelector />
                <div className="blogs__articles blogs__articles__33">
                    <Article
                        type="Default"
                        title="Building Trust Between Homeowners and Students"
                        description="Trust is crucial in the renting process. Heya ensures that both students and homeowners feel comfortable and secure through a seamless matching process and extra safety measures. Find out how we are building a community of trust and cooperation in student housing."
                        imageUrl="/Blogs/medium-shot-man-grandchild-with-laptop.webp"
                        className="article"
                    />
                    <Article
                        type="Default"
                        title="Heya's Modern Approach to Student Accommodation"
                        description="Combining modern trends with user-friendly design, Heya's platform appeals to both students and homeowners. Our branding focuses on bold minimalism and duotone images, creating a fresh yet familiar visual style. Explore how Heya is transforming student accommodation with a modern touch."
                        imageUrl="/Blogs/low-angle-view-building-with-windows-against-blue-sky-duotone.webp"
                        className="article"
                    />
                    <Article
                        type="Default"
                        title="Enhancing Student Life with Hospitawonen"
                        description="Living in a welcoming environment can significantly impact a student's academic success and well-being. Heya's hospitawonen model not only provides affordable housing but also fosters a sense of community and support. Discover how hospitawonen enhances student life and creates lasting connections."
                        imageUrl="/Blogs/hospitawonen.webp"
                        className="article"
                    />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Blogs;
