import React from 'react';
import '../../heya-web/css/citySelector.css';

const CitySelector = () => {
    return (
        <div className="city__select">
            <h2>Popular cities</h2>
            <div className="city__select-cities">
                <div className="city__select-city image-Antwerp">
                    <p className="strong__text">Antwerp</p>
                </div>
                <div className="city__select-city image-Leuven">
                    <p className="strong__text">Leuven</p>
                </div>
                <div className="city__select-city image-Ghent">
                    <p className="strong__text">Ghent</p>
                </div>
                <div className="city__select-city image-Brussels">
                    <p className="strong__text">Brussels</p>
                </div>
                <div className="city__select-city image-Kortrijk">
                    <p className="strong__text">Kortrijk</p>
                </div>
                <div className="city__select-city image-Hasselt">
                    <p className="strong__text">Hasselt</p>
                </div>
            </div>
        </div>
    );
};

export default CitySelector;
