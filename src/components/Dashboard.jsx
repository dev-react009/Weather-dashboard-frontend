// src/components/Dashboard.jsx
import { useState } from 'react';
import { Box, AppBar, Toolbar, Typography, CssBaseline, Grid, MenuItem, Select, IconButton } from '@mui/material';
import PropTypes from 'prop-types';
import SensorCard from './SensorCard'; // Your weather card component
import CurrentWeather from './CurrentWeather';
import { Brightness4, Brightness7 } from '@mui/icons-material';
// import TemperatureLineChart from './TemparatureLineChart';
import BasicLineChart from './BasicLineChat';

const Dashboard = ({toggleTheme,theme}) => {
    const [selectedSensor, setSelectedSensor] = useState('sensor1');

    const handleSensorChange = (event) => {
        setSelectedSensor(event.target.value);
    };
    
    
    return (
        <Box sx={{ display: 'flex', flexDirection: "column" }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, }}>
                <Toolbar sx={{display:"flex", justifyContent:"space-between"}}>
                    <Typography variant="h6" noWrap component="div">
                        Weather Dashboard
                    </Typography>
                    <IconButton
                        color="inherit"
                        onClick={toggleTheme}
                    >
                        {theme.palette.mode === "light" ?<Brightness7 /> : <Brightness4 />}
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Box sx={{ mt: 5, ml: 1, display: "flex", justifyContent: "flex-end", mr: 2}}>
                <Select value={selectedSensor} onChange={handleSensorChange} variant="outlined">
                    <MenuItem value="sensor1">Sensor 1</MenuItem>
                    <MenuItem value="sensor2">Sensor 2</MenuItem>
                    <MenuItem value="sensor3">Sensor 3</MenuItem>
                </Select>
            </Box>

            <Box sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, marginTop: 1, borderRadius: 2,width:"100%",display:"flex" }}>
              <Box sx={{width:"20%"}}>
                    <Grid container spacing={3}>
                        {/* Sensor Cards */}
                        <Grid item xs={12} sm={12} md={12}>
                            <SensorCard sensorId="sensor1" />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12}>
                            <SensorCard sensorId="sensor2" />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12}>
                            <SensorCard sensorId="sensor3" />
                        </Grid>
                        

                    </Grid>

              </Box>
                <Box sx={{ width: "70%" ,pr:"3"}}>
                    {/* <TemperatureLineChart sensorId={selectedSensor}/> */}
                    <BasicLineChart/>
                </Box>
            </Box>

            <Box>
                <CurrentWeather sensorId={selectedSensor} />
            </Box>
        </Box>
    );
};

Dashboard.propTypes = {
    theme:PropTypes.string,
    toggleTheme: PropTypes.func.isRequired, // toggleTheme should be a required function
};

export default Dashboard;
