import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

function SelectSituation() {
    return (
        <div className="center-container-always">
            <div className="select__situation__page">
                <img className="heya__logo__blue__round" src="../heya-blue-round.svg" alt="heya logo blue"/>
                <h1>How can we assist you?</h1>
                <h2>Select your situation</h2>
                <div className="select__situation">
                    <div className="place__to__offer">
                        <HomeRoundedIcon style={{ width: 80, height: 80 }}/>
                        <h2>I have a place to offer</h2>
                        <p>Rent out your room, studio of your entire hous. Everything is possible!</p>
                    </div>
                    <div className="looking__for__a__place">
                        <SearchRoundedIcon style={{ width: 80, height: 80 }} />
                        <h2>I am looking for a place</h2>
                        <p>Find the perfect match, based on your preferences.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SelectSituation;
