import React from 'react';
import Button from '@material-ui/core/Button';
import { AppBar as MdAppBar } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import './appbar.css';

interface AppBarProps {
    onLoginRequested: () => void
    onRegisterRequested: () => void
}

export class AppBar extends React.Component<AppBarProps> {
    render(): JSX.Element {
        return (
            <MdAppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className='app-title'>
                        App
                    </Typography>
                    <Button color="inherit" onClick={this.props.onLoginRequested}>Login</Button>
                    <Button color="inherit" onClick={this.props.onRegisterRequested}>Register</Button>
                </Toolbar>
            </MdAppBar>
        );
    }
}
