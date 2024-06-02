import React from 'react';
import '../../shared/css/filters.css';
import { 
  Box, 
  Divider, 
  FormControlLabel, 
  Radio, 
  RadioGroup, 
  TextField, 
  Checkbox, 
  Button 
} from '@mui/material';

function Filter() {
  return (
    <Box width="25%" pr={2} className="filters">
      <Box display="flex" justifyContent="space-between" alignItems="center" className="filter__header">
        <h3>FILTERS</h3>
        <Button className='reset__link' onClick={() => {/* Reset logic */}}>Reset</Button>
      </Box>
      <Divider />
      <Box mt={2} className="filter__section">
        <h4>Type</h4>
        <RadioGroup name="type">
          <FormControlLabel value="room" control={<Radio />} label="Room" />
          <FormControlLabel value="studio" control={<Radio />} label="Studio" />
          <FormControlLabel value="apartment" control={<Radio />} label="Apartment" />
        </RadioGroup>
        <Divider />
      </Box>
      <Box mt={2} className="filter__section">
        <h4>Price Range</h4>
        <TextField fullWidth variant="outlined" placeholder="Min €" />
        <TextField fullWidth variant="outlined" placeholder="Max €" sx={{ mt: 1 }} />
        <Divider />
      </Box>
      <Box mt={2} className="filter__section">
        <h4>Size of Room</h4>
        <TextField fullWidth variant="outlined" placeholder="Min m²" />
        <TextField fullWidth variant="outlined" placeholder="Max m²" sx={{ mt: 1 }} />
        <Divider />
      </Box>
      <Box mt={2} className="filter__section">
        <h4>Availability</h4>
        <FormControlLabel value="immediately" control={<Radio />} label="Immediately available" />
        <TextField fullWidth type="date" variant="outlined" sx={{ mt: 1 }} />
        <Divider />
      </Box>
      <Box mt={2} className="filter__section">
        <h4>Amenities</h4>
        <FormControlLabel control={<Checkbox />} label="Private bathroom" />
        <FormControlLabel control={<Checkbox />} label="Private Toilet" />
        <FormControlLabel control={<Checkbox />} label="Available bike for use" />
        <FormControlLabel control={<Checkbox />} label="Available car for use" />
        <FormControlLabel control={<Checkbox />} label="Dishwasher" />
        <FormControlLabel control={<Checkbox />} label="Washing machine" />
        <Button color="primary">+ See all Amenities</Button>
      </Box>
      <Button className="white__button medium" variant="contained" color="primary" fullWidth>
        More Criteria
      </Button>
    </Box>
  );
}
  
  export default Filter;
