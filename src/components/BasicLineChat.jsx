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
                const response = await axios.get(`http://localhost:5000/api/history?sensorId=${sensorId}`);
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

    // Prepare chart dataset using useMemo to optimize re-renders
    const dataset = useMemo(
        () =>
            historicalData.map((entry, index) => ({
                x: new Date(entry.last_updated).toLocaleDateString(), // X-axis: Date
                y: entry.temp_c, // Y-axis: Temperature in Celsius
                // Optionally, you can add an index for unique keys if necessary
                key: index,
            })),
        [historicalData]
    );

    if (loading) return <Stack direction="row" justifyContent="center"><CircularProgress /></Stack>;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Box
            sx={{
                padding: 2,
                borderRadius: '16px',
                backgroundColor: 'background.paper',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
            }}
        >
            <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: 'bold', color: "text.primary" }}>
                Historical Temperature Data
            </Typography>

            <LineChart
                dataset={dataset}
                xAxis={[{ dataKey: 'x', label: 'Date' }]}
                series={[{ dataKey: 'y', label: 'Temperature (°C)' }]}
                height={400}
                margin={{ left: 100, right: 30, top: 50, bottom: 40 }}
                grid={{ vertical: true, horizontal: true }}
            />
        </Box>
    );
};

TemperatureLineChart.propTypes = {
    sensorId: PropTypes.string.isRequired,
};

export default TemperatureLineChart;
