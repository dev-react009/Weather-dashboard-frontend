function generateRandomWeatherData(sensorId) {
    // Generate random values for each weather parameter
    const temperature = (Math.random() * 30 + 10).toFixed(2); // Random temp between 10°C and 40°C
    const humidity = (Math.random() * 100).toFixed(2); // Random humidity between 0% and 100%
    const pressure = (Math.random() * 50 + 950).toFixed(2); // Random pressure between 950mb and 1000mb
    const windSpeed = (Math.random() * 20).toFixed(2); // Random wind speed between 0 and 20 kph
    const precip = (Math.random() * 10).toFixed(2); // Random precipitation between 0 and 10 mm
    const condition = Math.random() > 0.5 ? "Sunny" : "Rainy"; // Randomly select a condition
    const visibility = (Math.random() * 10).toFixed(2); // Random visibility between 0 and 10 km
    const uvIndex = (Math.random() * 10).toFixed(2); // Random UV index between 0 and 10
    const date = new Date().toISOString(); // Get the current date in ISO format

    // Determine the weather icon based on the condition
    let icon;
    switch (condition) {
        case "Sunny":
            icon = "☀️"; // Unicode sun emoji for sunny weather
            break;
        case "Rainy":
            icon = "🌧️"; // Unicode cloud with rain emoji for rainy weather
            break;
        default:
            icon = "🌈"; // Default icon (rainbow)
            break;
    }

    return {
        sensorId,
        data: {
            date:date,
            temp_c: parseFloat(temperature),
            humidity: parseFloat(humidity),
            pressure_mb: parseFloat(pressure),
            wind_kph: parseFloat(windSpeed),
            precip_mm: parseFloat(precip),
            condition: condition,
            vis_km: parseFloat(visibility),
            uv: parseFloat(uvIndex),
            icon: icon,
        },
    };
}
export default generateRandomWeatherData