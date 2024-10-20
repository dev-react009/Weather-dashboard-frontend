
import { createRoot } from 'react-dom/client'; // Import createRoot

import App from './App';

// Get the root element from the DOM
const container = document.getElementById('root');

// Create a root using createRoot
const root = createRoot(container);

// Render the application using the root
root.render(
    <App />
  
);
