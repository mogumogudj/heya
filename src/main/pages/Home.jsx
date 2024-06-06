import React, { useEffect, useState, searchQuery } from 'react';
import NavApp from '../components/NavApp.jsx';
import Nav from '../../heya-web/components/Nav.jsx';
import Footer from '../../shared/components/Footer.jsx';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { 
    Box, 
    Divider, 
    FormControl, 
    InputLabel, 
    Select, 
    MenuItem, 
    TextField, 
    Chip, 
    IconButton,
  } from '@mui/material';

  import Filter from '../../main/components/Filters.jsx';
  import RoomSlider from '../../main/components/RoomSlider.jsx';
  import PinterestRoomGrid from '../../main/components/PinterestRoomGrid.jsx';


  const cities = [
    { key: 'antwerp', value: 'antwerp', text: 'Antwerp' },
    { key: 'brussels', value: 'brussels', text: 'Brussels' },
    { key: 'ghent', value: 'ghent', text: 'Ghent' },
    { key: 'leuven', value: 'leuven', text: 'Leuven' },
    { key: 'bruges', value: 'bruges', text: 'Bruges' },
    { key: 'namur', value: 'namur', text: 'Namur' },
    { key: 'liege', value: 'liege', text: 'Liege' },
    { key: 'mons', value: 'mons', text: 'Mons' },
    { key: 'hasselt', value: 'hasselt', text: 'Hasselt' },
    { key: 'kortrijk', value: 'kortrijk', text: 'Kortrijk' }
  ];

function Home() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // search
    const [searchKeyword, setSearchKeyword] = useState('');
    const [searchKeywords, setSearchKeywords] = useState([]);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);



    // Function to handle adding search keyword
    const handleAddKeyword = () => {
      if (searchKeyword.trim() !== '') {
          setSearchKeywords([...searchKeywords, searchKeyword.trim()]);
          setSearchKeyword('');
      }
  };

  // Function to handle removing search keyword
  const handleRemoveKeyword = (keywordToRemove) => {
      setSearchKeywords(searchKeywords.filter(keyword => keyword !== keywordToRemove));
  };

  // Function to handle search keyword input change
  const handleChange = (event) => {
      setSearchKeyword(event.target.value);
  };

  // Function to handle search keyword input onEnter
  const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
          handleAddKeyword();
      }
  };

  return (
    <div className="page__container home__body">
      {isLoggedIn ? <NavApp /> : <Nav />}
      <div className="content">
        <div className="home__container">
          <h1 className="home__title">Discover</h1>
          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <FormControl fullWidth variant="outlined" className="form-control-custom">
              <InputLabel >Choose your city</InputLabel>
              <Select className="city-selector-label" label="Choose your city" defaultValue="">
                {cities.map((city) => (
                  <MenuItem key={city.key} value={city.value}>{city.text}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search..."
              className="form-control-custom"
              value={searchKeyword}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={handleAddKeyword}>
                    <SearchIcon className="search-icon" style={{ fontSize: 40 }} />
                  </IconButton>
                ),
              }}
            />
          </Box>
          <Divider />
          
        </div>
        <Box display="flex" alignItems="flex-start" mt={2} gap={4}>
          <Filter />
          <div className="room-slider-container">
          <Box display="flex" alignItems="center" flexWrap="wrap" gap={1} mb={2}>
            {searchKeywords.map((keyword, index) => (
              <Chip
                key={index}
                label={keyword}
                onDelete={() => handleRemoveKeyword(keyword)}
                color="primary"
                variant="outlined"
                style={{ color: 'var(--Mist)', backgroundColor: 'var(--Soft-Grey)', border: 'none', borderRadius: '4px', padding: '20px', width: 'auto', position: 'relative', bottom: '40px'}}
                className="search-keyword"
                deleteIcon={<CloseIcon style={{color: 'var(--Mist)'}} />}
              />
            ))}
          </Box>
            <RoomSlider title="Some rooms in the spotlight" />
            <Divider />
            <RoomSlider title="Best match for you" />
            <Divider />
            <PinterestRoomGrid title="29 listings found for bike" className="pinterest-room-grid"/>
          </div>
        </Box>    
      </div>
      <Footer />
    </div>
  );
}

export default Home;
