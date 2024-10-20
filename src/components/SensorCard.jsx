// src/components/SensorCard.jsx
// import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const SensorCard = () => {

    console.log()
    // Fetch data for the specific sensor based on sensorId
    // For demo purposes, using static data
    const weatherData = {
        location: "London",
        temperature: "14.2 °C",
        condition: "Light rain",
        humidity: "82%",
    };

    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {weatherData.location}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {weatherData.condition}
                </Typography>
                <Typography variant="body2">
                    Temperature: {weatherData.temperature}
                </Typography>
                <Typography variant="body2">
                    Humidity: {weatherData.humidity}
                </Typography>
            </CardContent>
        </Card>
    );
};

SensorCard.propTypes = {
    sensorId: PropTypes.string.isRequired,
};

export default SensorCard;
