import { useCallback, useEffect } from 'react';
import axios from 'axios';

const WeatherDataSimulator = () => {
    const sensors = ['sensor1', 'sensor2', 'sensor3',"sensor4",'sensor5','sensor6','sensor7','sensor8','sensor9','sensor10'];

    const generateRandomWeatherData = () => {
        const temperature = (Math.random() * 40).toFixed(2); // Random temp between 0-40
        const humidity = (Math.random() * 100).toFixed(2); // Random humidity between 0-100
        const pressure = (Math.random() * 1000 + 900).toFixed(2); // Random pressure between 900-1900
        const windSpeed = (Math.random() * 100).toFixed(2); // Random wind speed between 0-100
        const precipitation = (Math.random() * 50).toFixed(2); // Random precipitation between 0-50
        const condition = Math.random() < 0.5 ? 'Sunny' : 'Rainy'; // Random condition

        return {
            temp_c: parseFloat(temperature),
            humidity: parseFloat(humidity),
            pressure_mb: parseFloat(pressure),
            wind_kph: parseFloat(windSpeed),
            precip_mm: parseFloat(precipitation),
            condition: condition,
            vis_km: (Math.random() * 10).toFixed(2), // Random visibility
            uv: (Math.random() * 10).toFixed(2), // Random UV index
        };
    };

    const postWeatherData = async (sensorId) => {
        const data = generateRandomWeatherData();
        try {
            const response = await axios.post('http://localhost:5000/api/data', {
                sensorId,
                data,
            });
            console.log(`Data posted for ${sensorId}:`, response.data);
        } catch (error) {
            console.error('Error posting weather data:', error.message);
        }
    };

    const simulateWeatherData = useCallback(() => {
        sensors.forEach(sensorId => {
            postWeatherData(sensorId);
        });
    },[sensors]);

    useEffect(() => {
        // Start the simulation to post data every 30 seconds
        const interval = setInterval(simulateWeatherData, 30000);

        // Cleanup the interval on component unmount
        return () => clearInterval(interval);
    }, [simulateWeatherData]);

    return null; // This component doesn't render anything
};

export default WeatherDataSimulator;
