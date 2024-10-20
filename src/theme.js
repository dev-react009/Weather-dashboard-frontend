// src/theme.js
import { createTheme } from '@mui/material/styles';

// Light theme
const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
        background: {
            default: '#f5f5f5',
            paper: '#ffffff',
        },
        text: {
            primary: '#321818',
            secondary: '#555555',
        },
    },
});

// Dark theme
const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#90caf9',
        },
        secondary: {
            main: '#f48fb1',
        },
        background: {
            default: '#121212',
            paper: '#383838',
        },
        text: {
            primary: '#ffffff',
            secondary: '#cccccc',
        },
    },
});

export { lightTheme, darkTheme };
