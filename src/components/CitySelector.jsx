import React from 'react';
import '../css/citySelector.css';

const CitySelector = () => {
  return (
    <div className='city__select'>
        <h2>Popular cities</h2>
        <div className='city__select-cities'>
            <div className='city__select-city'>
                <p className='strong__text'>Antwerp</p>
            </div>
            <div className='city__select-city'>
                <p className='strong__text'>Leuven</p>
            </div>
            <div className='city__select-city'>
                <p className='strong__text'>Ghent</p>
            </div>
            <div className='city__select-city'>
                <p className='strong__text'>Brussels</p>
            </div>
            <div className='city__select-city'>
                <p className='strong__text'>Kortrijk</p>
            </div>
            <div className='city__select-city'>
                <p className='strong__text'>Hasselt</p>
            </div>
        </div>
    </div>
  );
}

export default CitySelector;