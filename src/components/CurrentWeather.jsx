// src/components/CurrentWeather.jsx
import { useEffect, useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, CardMedia, CircularProgress, Stack } from '@mui/material';
import axios from 'axios';
import PropTypes from 'prop-types';
import SensorTimeDisplay from './SensorTimeDisplay';
import WeatherHistoryCard from './WeatherHistoryCard';

const CurrentWeather = ({ sensorId }) => {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [historyData, setHistoryData] = useState([]); // New state for historical data

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const response = await axios.get('https://weather-dashboard-backend.vercel.app/api/current');
                setWeatherData(response.data);
            } catch (error) {
                console.error('Error fetching weather data:', error);
                setError('Could not fetch weather data.');
            } finally {
                setLoading(false);
            }
        };

        

        fetchWeatherData();
    }, []);

    useEffect(()=>{
        const fetchHistoryData = async () => {
            if (!sensorId) return; // Check if sensorId is available
            try {
                const response = await axios.get(`https://weather-dashboard-backend.vercel.app/api/history?sensorId=${sensorId}`);
                setHistoryData(response.data); // Adjust this based on the expected data structure
            } catch (error) {
                console.error('Error fetching history data:', error);
                setError('Could not fetch history data.');
            }
        };

        fetchHistoryData()
    }, [sensorId])

    console.log("hist",historyData);

    if (loading) return <Stack direction={"row"} justifyContent={'center'}><CircularProgress /></Stack>;
    if (error) return <Typography color="error">{error}</Typography>;

    const { location, current } = weatherData;
    return (
        <Box sx={{ padding: 4, background: 'linear-gradient(135deg, #A1C4FD 0%, #C2E9FB 100%)', borderRadius: '8px' }}>
            <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ color: '#1E3A8A' }}>
                Current Weather in {location.name}, {location.region}
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Card sx={{ borderRadius: '16px', boxShadow: 2 }}>
                        <CardContent sx={{ textAlign: 'center', padding: 4 }}>
                            <Typography variant="h2" sx={{ fontWeight: 'bold', color: '#2563EB' }}>
                                {current.temp_c}°C
                            </Typography>
                            <Typography variant="body2" sx={{ marginTop: 2 }}>
                                Feels Like: <span style={{ fontWeight: 'bold' }}>{current.feelslike_c}°C</span>
                            </Typography>
                            <Typography variant="body1" sx={{ color: '#4B5563' }}>
                                {current.condition.text}
                            </Typography>
                            <CardMedia
                                component="img"
                                image={current.condition.icon}
                                alt={current.condition.text}
                                sx={{ width: 180, height: 180, margin: 'auto', marginTop: 2 }}
                            />
                            <Typography variant="body2">
                                Wind: <span style={{ fontWeight: 'bold' }}>{current.wind_mph} mph</span>
                            </Typography>
                            <Typography variant="body2">
                                Humidity: <span style={{ fontWeight: 'bold' }}>{current.humidity}%</span>
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Card sx={{ borderRadius: '16px', boxShadow: 2 , mb:{xs:2,sm:4}}}>
                        <CardContent sx={{ padding: 3 }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1E3A8A' }}>Additional Information</Typography>
                            <Typography variant="body1">
                                Pressure: <span style={{ fontWeight: 'bold' }}>{current.pressure_mb} mb</span>
                            </Typography>
                            <Typography variant="body1">
                                Visibility: <span style={{ fontWeight: 'bold' }}>{current.vis_km} km</span>
                            </Typography>
                            <Typography variant="body1">
                                Last Updated: <span style={{ fontWeight: 'bold' }}>{current.last_updated}</span>
                            </Typography>
                        </CardContent>
                    </Card>
                    <Card sx={{ borderRadius: '16px', boxShadow: 2,height:"220px" }}>
                        <CardContent sx={{ padding: 3, textAlign: 'center' }}>
                            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1E3A8A',mb:4,fontSize:"30px" }}>
                                {location.name}
                            </Typography>
                            <SensorTimeDisplay localtime={location.localtime} />
                        </CardContent>
                    </Card>
                </Grid>
                
                
                <Grid item xs={12}>
                    <Card sx={{ borderRadius: '16px', boxShadow: 2 }}>
                        <CardContent sx={{ padding: 3 }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1E3A8A' }}>Weather History</Typography>
                            {historyData && historyData.length > 0 ? (
                                historyData.flatMap((entry,index) => (
                                    <Box key={index}>
                                    <WeatherHistoryCard historyData={entry} />
                                    </Box>
                                ))
                            ) : (
                                <Typography variant="body2" sx={{ color: '#4B5563' }}>
                                    No history data available.
                                </Typography>
                            )}
                        </CardContent>
                    </Card>
                </Grid>
               
            </Grid>
        </Box>
    );
};

CurrentWeather.propTypes={
    sensorId:PropTypes.string,
}

export default CurrentWeather;
