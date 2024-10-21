// src/components/Dashboard.jsx
import { useState, useEffect } from 'react';
import { Box, AppBar, Toolbar, Typography, CssBaseline, Grid, MenuItem, Select, IconButton } from '@mui/material';
import PropTypes from 'prop-types';
import SensorCard from './SensorCard'; // Your weather card component
import CurrentWeather from './CurrentWeather';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import BasicLineChart from './BasicLineChat';

const Dashboard = ({ toggleTheme, theme }) => {
    const [selectedSensor, setSelectedSensor] = useState('sensor1');
    const [sensors, setSensors] = useState([]); // State to hold sensor data

    // Simulated sensor data fetching
    useEffect(() => {
       
        const fetchedSensors = [
            { id: 'sensor1', location: 'London' },
            { id: 'sensor2', location: 'New York' },
            { id: 'sensor3', location: 'Tokyo' },
        ];
        setSensors(fetchedSensors);
    }, []);

    const handleSensorChange = (event) => {
        setSelectedSensor(event.target.value);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: "column" }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="h6" noWrap component="div">
                        Weather Dashboard
                    </Typography>
                    <IconButton
                        color="inherit"
                        onClick={toggleTheme}
                    >
                        {theme.palette.mode === "light" ? <Brightness7 /> : <Brightness4 />}
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Box sx={{ mt: 5, ml: 1, display: "flex", justifyContent: "flex-end", mr: 2 }}>
                <Select value={selectedSensor} onChange={handleSensorChange} variant="outlined">
                    {sensors.map(sensor => (
                        <MenuItem key={sensor.id} value={sensor.id}>
                            {sensor.location} (ID: {sensor.id})
                        </MenuItem>
                    ))}
                </Select>
            </Box>

            <Box sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, marginTop: 1, borderRadius: 2, width: "100%", display: "flex", flexDirection: { xs: "column", md: "row" } }}>
                <Box sx={{ width: { xs: "auto", md: "20%" } }}>
                    <Grid container spacing={2}>
                        {/* Sensor Cards */}
                        
                            <Grid item xs={12} sm={12} md={12}>
                                <SensorCard sensorId={selectedSensor} />
                            </Grid>
                     
                    </Grid>
                </Box>
                <Box sx={{ width: { xs: "100%", sm: "100%", md: "80%" }, pl: { xs: 0, sm: 2 }, pt: { xs: 5, md: 0 } }}>
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
    theme: PropTypes.string,
    toggleTheme: PropTypes.func.isRequired, // toggleTheme should be a required function
};

export default Dashboard;
