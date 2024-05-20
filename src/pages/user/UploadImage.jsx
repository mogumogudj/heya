import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

function UploadImage() {
    return (
        <div className="center-container">
            <div className="page__container">
                <img className="heya__logo__blue__round" src="../heya-blue-round.svg" alt="heya logo blue"/>
                <h1 className='photo__h1'>Give us a photo of yourself</h1>
                <h2>Upload your profile picture</h2>
                <div className="center">
                    <AddPhotoAlternateIcon style={{width: '160px', height: '160px', padding: '16px', border: '1px solid #A3B9EA', borderRadius: '8px', color: '#A3B9EA', margin: '32px 0 0 0'}}/>
                    <h2>A photo of you</h2>
                    <p>Please make sure the photo clearly shows your face</p>
                    <button className='white__button medium'>Take photo</button>
                    <button className='white__button medium'>Upload photo</button>
                </div>
                <div className="next__help">
                        <button className="blue__button medium" type="submit">Next step</button>
                        <span className='help'>I need help</span>
                </div>
            </div>
        </div>
    )
}

export default UploadImage