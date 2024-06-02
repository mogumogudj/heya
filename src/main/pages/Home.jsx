import React, { useEffect, useState, searchQuery } from 'react';
import NavApp from '../components/NavApp.jsx';
import Nav from '../../heya-web/components/Nav.jsx';
import Footer from '../../shared/components/Footer.jsx';
import SearchIcon from '@mui/icons-material/Search';
import { 
    Box, 
    Divider, 
    FormControl, 
    InputLabel, 
    Select, 
    MenuItem, 
    TextField, 
  } from '@mui/material';

  import Filter from '../../main/components/Filters.jsx';
  import RoomSlider from '../../main/components/RoomSlider.jsx';


  const cities = [
    { key: 'amsterdam', value: 'amsterdam', text: 'Amsterdam' },
    { key: 'rotterdam', value: 'rotterdam', text: 'Rotterdam' },
    // add more cities as needed
  ];

function Home() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);



    return (
        <div className="page__container">
      {isLoggedIn ? <NavApp /> : <Nav />}
      <div className="content">
      <Box display="flex" alignItems="center" gap={2} mb={2}>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel>Choose your city</InputLabel>
                        <Select label="Choose your city" defaultValue="">
                            {cities.map((city) => (
                                <MenuItem key={city.key} value={city.value}>{city.text}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Search..."
                        InputProps={{
                            endAdornment: (
                              <>
                                    <SearchIcon />
                                </>
                            ),
                        }}
                    />
                </Box>
                <Divider />
                <Box display="flex" alignItems="flex-start" mt={2} gap={2}>
                    <Filter />
                    <RoomSlider />
                </Box>
                <Divider />
            </div>
            <Footer />
        </div>
  );
}

export default Home;
