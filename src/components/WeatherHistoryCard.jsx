// src/components/WeatherHistoryCard.jsx
import PropTypes from 'prop-types'; // Import PropTypes
import { Card, CardContent, Typography, Grid, CardMedia } from '@mui/material';
import defaultIcon from "../assets/globe.png"

const WeatherHistoryCard = ({ historyData }) => {
    const {
        temp_c,
        feelslike_c,
        condition,
        wind_kph,
        humidity,
        precip_mm,
        pressure_mb,
        last_updated,
    } = historyData;
console.log("icon",condition.icon)
  
    return (
        <Card sx={{ borderRadius: '16px', marginTop: 2, boxShadow: 2 }}>
            <CardContent>
                <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                    Weather History - {new Date(last_updated).toLocaleDateString()}
                </Typography>

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="body1">
                            <strong>Temperature:</strong> {temp_c}°C (Feels like {feelslike_c}°C)
                        </Typography>
                        
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <Typography variant="body1">
                            <strong>Wind:</strong> {wind_kph} kph
                        </Typography>
                        <Typography variant="body1">
                            <strong>Humidity:</strong> {humidity}%
                        </Typography>
                        <Typography variant="body1">
                            <strong>Precipitation:</strong> {precip_mm} mm
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <Typography variant="body1">
                            <strong>Pressure:</strong> {pressure_mb} mb
                        </Typography>
                        <Typography variant="body1">
                            <strong>Last Updated:</strong> {new Date(last_updated).toLocaleTimeString()}
                        </Typography>
                        <CardMedia
                            component="img"
                            image={condition.icon ? condition.icon : defaultIcon}
                            alt={"text"}
                            title={condition.text}
                            sx={{ width: 64, height: 64, marginTop: 1 }}
                            onError={({ currentTarget }) => {
                                currentTarget.onerror = null; // prevents looping
                                currentTarget.src = defaultIcon
                            }}
                        />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

// Add PropTypes validation
WeatherHistoryCard.propTypes = {
    historyData: PropTypes.shape({
        temp_c: PropTypes.number,
        feelslike_c: PropTypes.number,
        condition: PropTypes.shape({
            text: PropTypes.string,
            icon: PropTypes.string.isRequired,
        }).isRequired,
        wind_kph: PropTypes.number.isRequired,
        humidity: PropTypes.number.isRequired,
        precip_mm: PropTypes.number.isRequired,
        pressure_mb: PropTypes.number.isRequired,
        last_updated: PropTypes.string.isRequired,
        wind_dir: PropTypes.string.isRequired,
    }).isRequired,
};

export default WeatherHistoryCard;
