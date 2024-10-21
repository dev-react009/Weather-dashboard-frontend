// // src/components/TemperatureLineChart.jsx
// import  { useEffect, useState } from 'react';
// import { Line } from 'react-chartjs-2';
// import axios from 'axios';
// import PropTypes from 'prop-types';
// import {
//     Chart as ChartJS,
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     LineElement,
//     Title,
//     Tooltip,
//     Legend,
// } from 'chart.js';

// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// const TemperatureLineChart = ({ sensorId }) => {
//     const [historicalData, setHistoricalData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchTemperatureData = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:5000/api/history?sensorId=${"sensor1"}`);
//                 setHistoricalData(response.data);
//                 setLoading(false);
//             } catch (error) {
//                 console.error('Error fetching historical temperature data:', error);
//                 setError('Failed to fetch temperature data.');
//                 setLoading(false);
//             }
//         };

//         fetchTemperatureData();
//     }, [sensorId]);

//     // Prepare data for the chart
//     const data = {
//         labels: historicalData.map((entry) => new Date(entry.timestamp).toLocaleDateString()), // Assuming each entry has a timestamp
//         datasets: [
//             {
//                 label: 'Temperature (°C)',
//                 data: historicalData.map((entry) => entry.temp_f), // Assuming your data has a temp_c field
//                 fill: false,
//                 borderColor: 'blue',
//                 tension: 0.1,
//             },
//         ],
//     };

//     const options = {
//         responsive: true,
//         plugins: {
//             legend: {
//                 position: 'top',
//             },
//             title: {
//                 display: true,
//                 text: 'Historical Temperature Data',
//             },
//         },
//     };

//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>{error}</p>;

//     return (
//         <div>
//             <h2>Historical Temperature Data</h2>
//             <Line data={data}  options={options}/>
//         </div>
//     );
// };

// // Define PropTypes for the component
// TemperatureLineChart.propTypes = {
//     sensorId: PropTypes.string.isRequired, // Ensure sensorId is a required string
// };

// export default TemperatureLineChart;

// src/components/TemperatureLineChart.jsx
import React, { useEffect, useState, useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import PropTypes from 'prop-types';

// Import and register Chart.js components
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Box, Typography } from '@mui/material';

// Register components to avoid missing scale errors
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const TemperatureLineChart = React.memo(function TemperatureLineChart({ sensorId }) {
    const [historicalData, setHistoricalData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch data from the API
    useEffect(() => {
        const fetchTemperatureData = async () => {
            try {
                const response = await axios.get(
                    `https://weather-dashboard-backend.vercel.app/api/history?sensorId=${sensorId}`
                );
                setHistoricalData(response.data);
            } catch (error) {
                console.error('Error fetching historical temperature data:', error);
                setError('Failed to fetch temperature data.');
            } finally {
                setLoading(false);
            }
        };
        fetchTemperatureData();
    }, [sensorId]);

    // Prepare chart data and options with useMemo to optimize performance
    const chartData = useMemo(() => ({
        labels: historicalData.map((entry) =>
            new Date(entry.timestamp).toLocaleDateString()
        ),
        datasets: [
            {
                label: 'Temperature (°C)',
                data: historicalData.map((entry) => entry.temp_f),
                borderColor: '#1e88e5',
                backgroundColor: 'rgba(30, 136, 229, 0.2)',
                fill: true,
                pointBackgroundColor: '#fff',
                pointBorderColor: '#1e88e5',
                pointHoverBackgroundColor: '#1e88e5',
                pointHoverBorderColor: '#fff',
                tension: 0.3,
                borderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6,
            },
        ],
    }), [historicalData]);

    const chartOptions = useMemo(() => ({
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 800 },
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    color: '#1F2937',
                    font: { size: 14, family: 'Arial, sans-serif' },
                },
            },
            title: {
                display: true,
                text: 'Historical Temperature Data',
                color: '#374151',
                font: { size: 20, family: 'Arial, sans-serif', weight: 'bold' },
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => `Temperature: ${tooltipItem.raw}°F`,
                },
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Date',
                    color: '#4B5563',
                    font: { size: 14, family: 'Arial, sans-serif' },
                },
                ticks: { color: '#6B7280' },
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Temperature (°F)',
                    color: '#4B5563',
                    font: { size: 14, family: 'Arial, sans-serif' },
                },
                ticks: { color: '#6092f5' },
                grid: { color: 'rgba(175, 178, 182, 0.2)' },
            },
        },
    }), []);

    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography>{error}</Typography>;

    return (
        <Box
            sx={{
                height: '400px',
                width: '100%',
                padding: 2,
                borderRadius: '16px',
                backgroundColor: '#F9FAFB',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
            }}
        >
            <Line data={chartData} options={chartOptions} />
        </Box>
    );
});

// Assign display name to the memoized component
TemperatureLineChart.displayName = 'TemperatureLineChart';

TemperatureLineChart.propTypes = {
    sensorId: PropTypes.string.isRequired,
};

export default TemperatureLineChart;
