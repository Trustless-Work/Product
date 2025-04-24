import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif'
    },
    palette: {
        primary: {
            main: '#5B978E',
        },
        background: {
            default: '#fff',
        },
    },
});

export default theme;
