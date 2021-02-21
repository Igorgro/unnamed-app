import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import './app.css';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#4dabf5',
            main: '#2196f3',
            dark: '#1769aa',
            contrastText: '#fff',
        },
        secondary: {
            light: '#f73378',
            main: '#f50057',
            dark: '#ab003c',
            contrastText: '#fff',
        },
    },
});

export class App extends React.Component {
    render(): JSX.Element {
        return (
            <ThemeProvider theme={theme}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" className='app-title'>
                            App
                        </Typography>
                        <Button color="inherit">Login</Button>
                        <Button color="inherit">Register</Button>
                    </Toolbar>
                </AppBar>
            </ThemeProvider>
        );
    }
}

