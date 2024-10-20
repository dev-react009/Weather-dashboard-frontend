// src/App.jsx
import { Box, } from '@mui/material';
import Dashboard from './components/Dashboard';
import { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from './theme';
import PropTypes from 'prop-types';
import WeatherDataSimulator from './components/WeatherDataSimulation';
const App = () => {
    // State to manage the current theme
    const [theme, setTheme] = useState(lightTheme);

    // Toggle between light and dark theme
    const toggleTheme = () => {
        setTheme((prevTheme) =>
            prevTheme.palette.mode === 'light' ? darkTheme : lightTheme
        );
    };

    // Effect to get the user's theme preference from local storage
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            setTheme(darkTheme);
        }
    }, []);

    // Save the theme preference in local storage
    useEffect(() => {
        localStorage.setItem('theme', theme.palette.mode);
    }, [theme]);

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ padding: 4 }}>
                
                <Dashboard toggleTheme={toggleTheme} theme={theme} />
                <WeatherDataSimulator/>
            </Box>
        </ThemeProvider>
    );
};

// Define PropTypes
Dashboard.propTypes = {
    toggleTheme: PropTypes.func.isRequired, // toggleTheme should be a required function
};

export default App;
