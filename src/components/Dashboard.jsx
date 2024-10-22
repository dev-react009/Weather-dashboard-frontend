// src/components/Dashboard.jsx
import { useState } from 'react';
import {
    Box, AppBar, Toolbar, Typography, CssBaseline, Grid,
    MenuItem, Select, IconButton, TextField, Autocomplete,
    InputAdornment
} from '@mui/material';
import PropTypes from 'prop-types';
import SensorCard from './SensorCard'; // Your weather card component
import CurrentWeather from './CurrentWeather';
import { Brightness4, Brightness7, LocationOn } from '@mui/icons-material';
import BasicLineChart from './BasicLineChat';

const cities = [
    { label: 'London', id: 'sensor1' },
    { label: 'New York', id: 'sensor2' },
    { label: 'Tokyo', id: 'sensor3' },
    { label: 'Paris', id: 'sensor4' },
    { label: 'Sydney', id: 'sensor5' },
    { label: 'Mumbai', id: 'sensor6' },
    { label: 'Delhi', id: 'sensor7' },
    { label: 'Bangalore', id: 'sensor8' },
    { label: 'Chennai', id: 'sensor9' },
    { label: 'Hyderabad', id: 'sensor10' },
    { label: 'Kolkata', id: 'sensor11' },
    { label: 'Ahmedabad', id: 'sensor12' },
    { label: 'Pune', id: 'sensor13' },
    { label: 'Jaipur', id: 'sensor14' },
    { label: 'Lucknow', id: 'sensor15' },
    { label: 'Kanpur', id: 'sensor16' },
    { label: 'Chandigarh', id: 'sensor17' },
    { label: 'Patna', id: 'sensor18' },
    { label: 'Bhopal', id: 'sensor19' },
    { label: 'Indore', id: 'sensor20' },
    { label: 'Toronto', id: 'sensor21' },
    { label: 'Berlin', id: 'sensor22' },
    { label: 'Moscow', id: 'sensor23' },
    { label: 'Beijing', id: 'sensor24' },
    { label: 'Dubai', id: 'sensor25' },
    { label: 'Rio de Janeiro', id: 'sensor26' },
    { label: 'Cape Town', id: 'sensor27' },
    { label: 'Los Angeles', id: 'sensor28' },
    { label: 'Rome', id: 'sensor29' },
    { label: 'Buenos Aires', id: 'sensor30' },
    { label: 'Seoul', id: 'sensor31' },
    { label: 'Mexico City', id: 'sensor32' },
    { label: 'Hong Kong', id: 'sensor33' },
    { label: 'Istanbul', id: 'sensor34' },
    { label: 'Singapore', id: 'sensor35' },
    { label: 'Jakarta', id: 'sensor36' },
    { label: 'Bangkok', id: 'sensor37' },
    { label: 'Cairo', id: 'sensor38' },
    { label: 'Lagos', id: 'sensor39' },
    { label: 'Karachi', id: 'sensor40' },
    { label: 'Madrid', id: 'sensor41' },
    { label: 'Vienna', id: 'sensor42' },
    { label: 'Sao Paulo', id: 'sensor43' },
];


const Dashboard = ({ toggleTheme, theme }) => {
    const [selectedCity, setSelectedCity] = useState(cities[0]); // Default to first city
    const [selectedSensor, setSelectedSensor] = useState(cities[0].id); // Sync sensor with city

    const handleCityChange = (event, newValue) => {
        if (newValue) {
            setSelectedCity(newValue);
            setSelectedSensor(newValue.id); // Sync sensor with selected city
        }
    };
    console.log("city",selectedCity)

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h6" noWrap component="div">
                        Weather Dashboard
                    </Typography>
                    <IconButton color="inherit" onClick={toggleTheme}>
                        {theme.palette.mode === 'light' ? <Brightness7 /> : <Brightness4 />}
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Box sx={{ mt: 5, ml: 1, display: 'flex', justifyContent: 'space-between', mr: 2 }}>
                {/* Autocomplete for City Selection */}

                <Autocomplete
                    options={cities}
                    value={selectedCity}
                    onChange={handleCityChange}
                    getOptionLabel={(option) => option.label}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Select City"
                            variant="outlined"
                            InputProps={{
                                ...params.InputProps,
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LocationOn sx={{ color: '#1976d2' }} /> {/* Custom icon color */}
                                    </InputAdornment>
                                ),
                                sx: {
                                    backgroundColor: '#f9f9f9', // Soft background color
                                    borderRadius: '8px', // Rounded corners
                                    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)', // Light shadow for elevation
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'none', // Custom border color
                                    },
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: theme.palette.mode === 'light'?'#1565c0':"none", // Darker on hover
                                    },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: theme.palette.mode === 'light'?'#1e88e5':"none", // Even darker when focused
                                    },
                                    '& .MuiAutocomplete-input': {
                                        color:"#000000",
                                    },
                                },
                            }}
                            InputLabelProps={{
                                sx: {
                                    display: theme.palette.mode === 'dark'?"none":"flex",
                                    color: theme.palette.mode === 'dark' ? '#ffffff' : '#1976d2', // Adjust label color for dark theme
                                },
                            }}
                        />
                    )}
                    sx={{
                        width: 300,
                        marginRight: 2,
                        marginTop:1,
                        '& .MuiAutocomplete-option': {
                            padding: '10px 16px', // More padding for options
                        },
                        '& .MuiAutocomplete-option:hover': {
                            backgroundColor: '#e3f2fd', // Highlight option on hover
                        },
                        '& .MuiAutocomplete-inputRoot': {
                            padding: '4px 10px', // Padding inside the input box
                        },
                        '& .MuiAutocomplete-paper': {
                            borderRadius: '8px', // Rounded corners for dropdown
                            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)', // Shadow for dropdown
                        },
                    }}
                />

                {/* Sensor Selection Dropdown */}
                <Select
                    value={selectedSensor}
                    disabled
                    variant="outlined"
                    sx={{
                        width: 300,
                        backgroundColor: theme.palette.mode === 'dark'?'#424242':"#ffffff", // Dark background color for dark theme
                        borderRadius: '8px', // Rounded corners
                        color: '#9e9e9e', // Text color for the selected item in dark theme
                        boxShadow: '0 3px 6px rgba(0, 0, 0, 0.3)', // Slightly darker shadow for elevation
                        '.MuiOutlinedInput-notchedOutline': {
                            borderColor: '#1976d2', // Custom border color
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#1e88e5', // Darker border on hover
                        },
                        '& .MuiSelect-select': {
                            color: '#9e9e9e', // Text color for selected item
                            padding: '10px 14px', // Increase padding for the selected item
                        },
                        '& .MuiSelect-icon': {
                            color: '#9e9e9e', // Icon color for the dropdown indicator
                        },
                    }}
                >
                    {cities.map((city) => (
                        <MenuItem
                            key={city.id}
                            value={city.id}
                            sx={{
                                color: '#9e9e9e', // Text color for options in dark theme
                                padding: '10px 16px', // Increase padding for options
                                '&:hover': {
                                    backgroundColor: '#303f9f', // Highlight option on hover (use a darker shade)
                                    color: '#ffffff', // Change text color on hover
                                },
                            }}
                        >
                            {city.label} (ID: {city.id})
                        </MenuItem>
                    ))}
                </Select>

            </Box>

            <Box
                sx={{
                    flexGrow: 1,
                    bgcolor: 'background.default',
                    p: 3,
                    marginTop: 1,
                    borderRadius: 2,
                    width: '100%',
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                }}
            >
                <Box sx={{ width: { xs: 'auto', md: '20%' } }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <SensorCard sensorId={selectedSensor} />
                        </Grid>
                    </Grid>
                </Box>

                <Box
                    sx={{
                        width: { xs: '100%', sm: '100%', md: '80%' },
                        pl: { xs: 0, sm: 2 },
                        pt: { xs: 5, md: 0 },
                    }}
                >
                    <BasicLineChart sensorId={selectedSensor} />
                </Box>
            </Box>

            <Box>
                <CurrentWeather sensorId={selectedSensor} />
            </Box>
        </Box>
    );
};

Dashboard.propTypes = {
    theme: PropTypes.object.isRequired,
    toggleTheme: PropTypes.func.isRequired,
};

export default Dashboard;
