// src/components/Dashboard.jsx
import { useState } from 'react';
import {
    Box, AppBar, Toolbar, Typography, CssBaseline, Grid,
    MenuItem, Select, IconButton, TextField, Autocomplete
} from '@mui/material';
import PropTypes from 'prop-types';
import SensorCard from './SensorCard'; // Your weather card component
import CurrentWeather from './CurrentWeather';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import BasicLineChart from './BasicLineChat';

const cities = [
    { label: 'London', id: 'sensor1' },
    { label: 'New York', id: 'sensor2' },
    { label: 'Tokyo', id: 'sensor3' },
    { label: 'Paris', id: 'sensor4' },
    { label: 'Sydney', id: 'sensor5' },
    { label: 'Mumbai', id: 'sensor6' },
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
                    renderInput={(params) => <TextField {...params} label="Select City" variant="outlined" />}
                    sx={{ width: 300, marginRight: 2 }}
                />

                {/* Sensor Selection Dropdown */}
                <Select value={selectedSensor} disabled variant="outlined">
                    {cities.map((city) => (
                        <MenuItem key={city.id} value={city.id}>
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
