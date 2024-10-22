import { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { LineChart } from '@mui/x-charts/LineChart';
import PropTypes from 'prop-types';
import { Box, Typography, CircularProgress, Stack } from '@mui/material';

const TemperatureLineChart = ({ sensorId }) => {
    const [historicalData, setHistoricalData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch data dynamically from API
    useEffect(() => {
        const fetchTemperatureData = async () => {
            try {
                const response = await axios.get(`https://weather-dashboard-backend.vercel.app/api/history?sensorId=${sensorId}`);
                console.log('API Response:', response); // Log the full response object

                if (response.status === 200 && response.data.length > 0) {
                    // Successful response, and data exists
                    setHistoricalData(response.data);
                    setError(null); // Clear any previous error
                } else {
                    setError('No data available or incorrect response.');
                }
            } catch (error) {
                console.error('Error fetching temperature data:', error.response || error.message);
                setError('Failed to fetch temperature data.', error.response || error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTemperatureData();
    }, [sensorId]);

    
    console.log(sensorId); // Check the API response
    

    const dataset = useMemo(() => {
        const data = historicalData.map((entry) => ({
            
            x: new Date(entry.last_updated).getSeconds(),
            y: entry.temp_c,
        }));

        return data;
    }, [historicalData]);

    if (loading) return <Stack direction="row" justifyContent="center"><CircularProgress /></Stack>;
    if (error) return <Typography color="error">{error}</Typography>;
    if (!dataset.length) return <Typography>No temperature data available.</Typography>;

    return (
        <Box
            sx={{
                padding: 2,
                borderRadius: '16px',
                backgroundColor: 'background.paper',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
            }}
        >
            <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: 'bold', color: 'text.primary' }}>
                Historical Temperature Data
            </Typography>

            <LineChart
                dataset={dataset}
                xAxis={[{ dataKey: 'x', type:"Time",label: 'Time' }]} 
                series={[{ dataKey: 'y', label: 'Temperature (°C)' }]}
                height={400}
                margin={{ left: 40, right: 30, top: 50, bottom: 40 }}
                grid={{ vertical: true, horizontal: true }}
                autoScale
            />
        </Box>
    );
};

TemperatureLineChart.propTypes = {
    sensorId: PropTypes.string.isRequired,
};

export default TemperatureLineChart;
