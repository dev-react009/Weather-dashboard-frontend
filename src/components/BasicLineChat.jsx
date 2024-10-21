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
                console.log(response.data); // Check the API response
                setHistoricalData(response.data);
            } catch (error) {
                console.error('Error fetching temperature data:', error);
                setError('Failed to fetch temperature data.');
            } finally {
                setLoading(false);
            }
        };
        fetchTemperatureData();
    }, [sensorId]);

    const dataset = useMemo(() => {
        const data = historicalData.map((entry) => ({
            
            x: new Date(entry.last_updated),
            y: entry.temp_c,
        }));

        console.log("Dataset:", data); // Log the dataset to verify
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
                xAxis={[{ dataKey: 'x', type:"Time",label: 'Date & Time' }]} 
                series={[{ dataKey: 'y', label: 'Temperature (°C)' }]}
                height={400}
                margin={{ left: 100, right: 30, top: 50, bottom: 40 }}
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
