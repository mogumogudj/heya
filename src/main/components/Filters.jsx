import React from 'react';
import '../../shared/css/filters.css';
import { 
  Box,
  Divider,
  RadioGroup,
  TextField
} from '@mui/material';

function Filter() {
  return (
    <Box width="25%" className="filters">
      <Box className="filter__header">
        <h6 className='bold'>FILTERS</h6>
        <a className='reset__link' onClick={() => {}}>Reset</a>
      </Box>
      <Box className="filter__section">
        <h6>Type</h6>
        <RadioGroup name="type">
          <label className="radio-label">
            <input type="radio" value="room" name="type" />
            <span className="radio-custom"></span>
            Room
          </label>
          <label className="radio-label">
            <input type="radio" value="studio" name="type" />
            <span className="radio-custom"></span>
            Studio
          </label>
          <label className="radio-label">
            <input type="radio" value="apartment" name="type" />
            <span className="radio-custom"></span>
            Apartment
          </label>
        </RadioGroup>
      </Box>
      <Box className="filter__section">
        <h6>Price Range</h6>
        <TextField fullWidth variant="outlined" placeholder="Min €" className="input__price" />
        <TextField fullWidth variant="outlined" placeholder="Max €" className="input__price mt-1" />
      </Box>
      <Box className="filter__section">
        <h6>Size of Room</h6>
        <TextField fullWidth variant="outlined" placeholder="Min m²" className="input__size" />
        <TextField fullWidth variant="outlined" placeholder="Max m²" className="input__size mt-1" />
      </Box>
      <Box className="filter__section">
        <h6>Availability</h6>
        <label className="radio-label">
          <input type="radio" value="immediately" name="availability" />
          <span className="radio-custom"></span>
          Immediately available
        </label>
        <TextField fullWidth type="date" variant="outlined" className="date__picker mt-1" />
      </Box>
      <Box className="filter__section">
        <h6>Amenities</h6>
        <label className="checkbox-label">
          <input type="checkbox" />
          <span className="checkbox-custom"></span>
          Private bathroom
        </label>
        <label className="checkbox-label">
          <input type="checkbox" />
          <span className="checkbox-custom"></span>
          Private Toilet
        </label>
        <label className="checkbox-label">
          <input type="checkbox" />
          <span className="checkbox-custom"></span>
          Available bike for use
        </label>
        <label className="checkbox-label">
          <input type="checkbox" />
          <span className="checkbox-custom"></span>
          Available car for use
        </label>
        <label className="checkbox-label">
          <input type="checkbox" />
          <span className="checkbox-custom"></span>
          Dishwasher
        </label>
        <label className="checkbox-label">
          <input type="checkbox" />
          <span className="checkbox-custom"></span>
          Washing machine
        </label>
        <a className="see__all__amenities">+ See all Amenities</a>
      </Box>
      <button className="white__button medium">More Criteria</button>
    </Box>
  );
}
  
  export default Filter;
