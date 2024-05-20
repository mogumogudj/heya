import '../css/coming-soon.css';
import Footer from '../components/Footer';

function ComingSoon() {
    return (
        <div className="page__container__coming-soon">
            <div className="content">
                <div className='heya2tone'>
                    <img src="heya2tone.svg" alt="Heya 2 tune" />
                </div>
                <h1 className='coming-soon-h1'>Bringing a new vision to student housing</h1>
                <p>Coming soon...</p>
            </div>
            <Footer />
        </div>
    )
}

export default ComingSoon