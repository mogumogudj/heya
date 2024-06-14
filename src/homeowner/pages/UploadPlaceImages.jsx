import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import Footer from '../../shared/components/Footer.jsx';
import NavLogin from '../../shared/components/NavLogin.jsx';

function UploadPlaceImages() {
    const navigate = useNavigate();
    const [images, setImages] = useState(Array(8).fill(null));
    const [imageFiles, setImageFiles] = useState(Array(8).fill(null));
    const [roomId, setRoomId] = useState(null);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const roomIdFromParams = params.get('roomId');
        if (roomIdFromParams) {
            setRoomId(roomIdFromParams);
        }
    }, []);

    const handleImageUpload = (event) => {
        const index = parseInt(event.target.id.split('-')[2]);
        const newImages = [...images];
        const newImageFiles = [...imageFiles];

        const file = event.target.files[0];
        newImages[index] = window.URL.createObjectURL(file);
        newImageFiles[index] = file;

        setImages(newImages);
        setImageFiles(newImageFiles);
    };

    const handleRemoveImage = (index) => {
        const newImages = [...images];
        const newImageFiles = [...imageFiles];

        newImages[index] = null;
        newImageFiles[index] = null;

        setImages(newImages);
        setImageFiles(newImageFiles);
    };

    const handleNextStep = async () => {
        const formData = new FormData();
        imageFiles.forEach((file) => {
            if (file) {
                formData.append('images', file);
            }
        });

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/upload/multiple`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                console.error('Failed to upload images');
                return;
            }

            const data = await response.json();
            console.log('Uploaded to Cloudinary:', data);
            const uploadUrls = data.uploadUrls;
            console.log('Upload URLs:', uploadUrls);

            const roomUpdateDto = {
                images: uploadUrls,
            };

            const updateRoomResponse = await fetch(`${import.meta.env.VITE_API_URL}/rooms/${roomId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(roomUpdateDto),
            });

            if (updateRoomResponse.ok) {
                console.log('Room updated successfully:', await updateRoomResponse.json());
                navigate(`/place-overview-homeowner/?roomId=${roomId}`);
            } else {
                const result = await updateRoomResponse.json();
                console.error('Failed to update room:', result);
                throw new Error(result.message || 'Failed to update room with images');
            }
        } catch (error) {
            console.error('Error uploading images:', error);
        }
    };

    return (
        <div className="page__container" style={{ minHeight: '128vh' }}>
            <NavLogin />
            <div className="content" style={{ minHeight: '140vh' }}>
                <div className="center-container">
                    <div className="upload__place__images__page">
                        <div className="homeowner__register__header">
                            <h1>Upload images</h1>
                            <h2>What does your place look like?</h2>
                        </div>

                        <div className="form__group">
                            <p>Upload your images</p>
                            <div className="image-upload-container">
                                {images.map((image, index) => (
                                    <div key={index} className="image-upload">
                                        {image ? (
                                            <div className="image-preview">
                                                <img src={image} alt={`Uploaded ${index}`} />
                                                <IconButton
                                                    onClick={() => handleRemoveImage(index)}
                                                    className="remove-image-button"
                                                >
                                                    <CloseIcon />
                                                </IconButton>
                                            </div>
                                        ) : (
                                            <div className="image-placeholder">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageUpload}
                                                    style={{ display: 'none' }}
                                                    id={`upload-button-${index}`}
                                                />
                                                <label htmlFor={`upload-button-${index}`}>
                                                    <IconButton component="span">
                                                        <AddIcon />
                                                    </IconButton>
                                                </label>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="info-section">
                            <h4>How to Make Your Place Stand Out</h4>
                            <ul>
                                <li>
                                    <h6 className="bold">Good Lighting</h6>
                                    <p>Ensure your images are well-lit to highlight the best features of your room.</p>
                                </li>
                                <li>
                                    <h6 className="bold">Clean and Tidy</h6>
                                    <p>A clean and tidy room is more appealing to potential guests.</p>
                                </li>
                                <li>
                                    <h6 className="bold">Unique Features</h6>
                                    <p>Showcase any unique features that make your place special.</p>
                                </li>
                            </ul>
                            <button className="white__button small read-more-button">Read more</button>
                        </div>

                        <div className="next__help">
                            <button className="blue__button medium" type="button" onClick={handleNextStep}>
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

export default UploadPlaceImages;
