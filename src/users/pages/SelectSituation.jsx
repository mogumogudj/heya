import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { useNavigate } from 'react-router-dom';
import Footer from '../../shared/components/Footer.jsx';
import NavLogin from '../../shared/components/NavLogin.jsx';

function SelectSituation() {
    const navigate = useNavigate();

    function aboutYourself() {
        navigate('/about-yourself');
    }

    return (
        <div className="page__container">
            <NavLogin />
            <div className="content">
                <div className="center-container-always">
                    <div className="select__situation__page">
                        <h1>How can we assist you?</h1>
                        <h2>Select your situation</h2>
                        <div className="select__situation">
                            <div className="place__to__offer">
                                <HomeRoundedIcon style={{ width: 80, height: 80 }} />
                                <h2>I have a place to offer</h2>
                                <p>Rent out your room, studio of your entire hous. Everything is possible!</p>
                            </div>
                            <div onClick={aboutYourself} className="looking__for__a__place">
                                <SearchRoundedIcon style={{ width: 80, height: 80 }} />
                                <h2>I am looking for a place</h2>
                                <p>Find the perfect match, based on your preferences.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default SelectSituation;