// src/components/SensorCard.jsx
import { useEffect, useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { Line, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';

// Register the required components
ChartJS.register(
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Tooltip,
    Legend,
    ArcElement // Register ArcElement for Pie chart
);

// Function to generate random weather data
function generateRandomWeatherData(sensorId) {
    const temperature = (Math.random() * 30 + 10).toFixed(2); // Random temp between 10°C and 40°C
    const humidity = (Math.random() * 100).toFixed(2); // Random humidity between 0% and 100%

    // Example condition object
    const conditions = [
        { text: "Sunny", icon: "☀️" },
        { text: "Cloudy", icon: "☁️" },
        { text: "Rainy", icon: "🌧️" },
        { text: "Snowy", icon: "❄️" },
    ];
    const condition = conditions[Math.floor(Math.random() * conditions.length)];

    return {
        sensorId,
        data: {
            temp_c: parseFloat(temperature),
            humidity: parseFloat(humidity),
            condition, // Pass the condition as an object
        },
    };
}

const SensorCard = ({ sensorId }) => {
    const [weatherData, setWeatherData] = useState({
        location: "London",
        temperature: "0 °C",
        condition: { text: "Fetching...", icon: "" }, // Initialize as an object
        humidity: "0%",
        temperatureHistory: [],
        humidityHistory: [],
    });

    // Update weather data every 30 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            const newData = generateRandomWeatherData(sensorId);
            const newTemperature = newData.data.temp_c;
            const newHumidity = newData.data.humidity;
            const newCondition = newData.data.condition;

            setWeatherData((prevData) => {
                const updatedTemperatureHistory = [...prevData.temperatureHistory, newTemperature].slice(-7);
                const updatedHumidityHistory = [...prevData.humidityHistory, newHumidity].slice(-7);

                return {
                    ...prevData,
                    temperature: `${newTemperature} °C`,
                    humidity: `${newHumidity}%`,
                    condition: newCondition, // Update condition with the new object
                    temperatureHistory: updatedTemperatureHistory,
                    humidityHistory: updatedHumidityHistory,
                };
            });
        }, 30000); // Update every 30 seconds

        return () => clearInterval(interval); // Clear interval on unmount
    }, [sensorId]);

    // Prepare data for charts
    const tempChartData = {
        labels: ['1h ago', '2h ago', '3h ago', '4h ago', '5h ago', '6h ago', '7h ago'],
        datasets: [
            {
                label: 'Temperature (°C)',
                data: weatherData.temperatureHistory,
                fill: false,
                borderColor: 'rgba(75,192,192,1)',
                tension: 0.1,
            },
        ],
    };

    const humidityChartData = {
        labels: ['1h ago', '2h ago', '3h ago', '4h ago', '5h ago', '6h ago', '7h ago'],
        datasets: [
            {
                label: 'Humidity (%)',
                data: weatherData.humidityHistory,
                fill: false,
                borderColor: 'rgba(255,99,132,1)',
                tension: 0.1,
            },
        ],
    };

    // Data for Pie charts
    const pieChartData = {
        labels: ['Temperature', 'Humidity'],
        datasets: [
            {
                label: 'Current Readings',
                data: [parseFloat(weatherData.temperature), parseFloat(weatherData.humidity)], // Current temperature and humidity
                backgroundColor: [
                    'rgba(75,192,192,0.6)', // Color for Temperature
                    'rgba(255,99,132,0.6)', // Color for Humidity
                ],
            },
        ],
    };

    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {weatherData.location}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {weatherData.condition.icon} {weatherData.condition.text} {/* Display condition as an object */}
                </Typography>
                <Typography variant="body2">
                    Temperature: {weatherData.temperature}
                </Typography>
                <Typography variant="body2">
                    Humidity: {weatherData.humidity}
                </Typography>

                {/* Temperature Line Chart */}
                <Line data={tempChartData} options={{ responsive: true }} />

                {/* Humidity Line Chart */}
                <Line data={humidityChartData} options={{ responsive: true }} />

                {/* Pie Chart for Temperature and Humidity */}
                <Typography variant="h6" sx={{ mt: 2 }}>
                    Current Readings
                </Typography>
                <Pie data={pieChartData} options={{ responsive: true }} />
            </CardContent>
        </Card>
    );
};

SensorCard.propTypes = {
    sensorId: PropTypes.string.isRequired,
};

export default SensorCard;
