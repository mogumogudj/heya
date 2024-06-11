import React, { useState } from 'react';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import { makeStyles } from '@mui/styles';
import Footer from '../../shared/components/Footer.jsx';
import NavLogin from '../../shared/components/NavLogin.jsx';

const useStyles = makeStyles({
    customAlert: {
        width: '100%',
        margin: '16px 0 -16px 0',
        borderRadius: '8px',
    },
    errorInput: {
        border: '1px solid red',
    },
});

function UploadImage() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const classes = useStyles();

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setError('Please select a file first!');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('image', selectedFile);

            const response = await fetch(`${import.meta.env.VITE_API_URL}/upload`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                console.error('Failed to upload image to Cloudinary');
                setError('Failed to upload image');
                return;
            }

            const data = await response.json();
            const imageUrl = data.imageUrl;

            const updateUserResponse = await fetch(`${import.meta.env.VITE_API_URL}/users/${localStorage.userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ imageLink: imageUrl }),
            });

            if (updateUserResponse.ok) {
                console.log('Image uploaded successfully');
                navigate('/customize-stay');
            } else {
                console.error('Failed to update user with image link');
                setError('Failed to upload image');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            setError('Error uploading image');
        }
    };

    const handleButtonClick = () => {
        document.getElementById('fileInput').click();
    };

    return (
        <div className="page__container">
            <NavLogin />
            <div className="content">
                <div className="center-container">
                    <div className="upload__image__page">
                        <div className='homeowner__register__header'>
                        <h1 className="photo__h1">Give us a photo of yourself</h1>
                        <h2>Upload your profile picture</h2>
                        </div>
                        <div className="center">
                            {preview ? (
                                <img
                                    src={preview}
                                    alt="Preview"
                                    style={{
                                        width: '160px',
                                        height: '160px',
                                        padding: '16px',
                                        border: '1px solid #A3B9EA',
                                        borderRadius: '8px',
                                        margin: '32px 0 0 0',
                                    }}
                                />
                            ) : (
                                <AddPhotoAlternateIcon
                                    style={{
                                        width: '160px',
                                        height: '160px',
                                        padding: '16px',
                                        border: '1px solid #A3B9EA',
                                        borderRadius: '8px',
                                        color: '#A3B9EA',
                                        margin: '32px 0 0 0',
                                    }} className='AddPhotoAlternateIcon' onClick={handleButtonClick}
                                />
                            )}
                            <h2>A photo of you</h2>
                            <p>Please make sure the photo clearly shows your face</p>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                                id="fileInput"
                            />
                            <button className="white__button medium" type="button" onClick={handleButtonClick}>
                                Upload photo
                            </button>
                        </div>
                        {error && (
                            <Alert severity="error" className={classes.customAlert}>
                                {error}
                            </Alert>
                        )}
                        <div className="next__help">
                            <button className="blue__button medium" type="button" onClick={handleUpload}>
                                Next step
                            </button>
                            <span className="help">I need help</span>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default UploadImage;
