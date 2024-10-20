
import { Typography,Box } from '@mui/material';
import PropTypes from 'prop-types'; // Import PropTypes

const SensorTimeDisplay = ({ localtime }) => {
    // Create a Date object from the localtime string
    const date = new Date(localtime);

    // Format the date and time
    const options = { weekday: 'long', day: '2-digit', month: 'short' };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
    console.log(formattedDate)
    // Extract the time in HH:mm format
    const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <Box>
            <Typography sx={{fontSize:"55px",fontWeight:"bold"}}>
                {` ${timeString}`}
            </Typography>
            <Typography sx={{color:"#555"}}>
                {`${formattedDate}`}
            </Typography>
        </Box>
    );
};

SensorTimeDisplay.propTypes = {
    localtime: PropTypes.string.isRequired, // Ensure localtime is a required string
};

export default SensorTimeDisplay

