import React from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { Person } from '@material-ui/icons';
import { AppBar as MdAppBar } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Popper from '@material-ui/core/Popper';
// import Fade from '@material-ui/core/Fade';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import './appbar.css';

import { UserInfo } from './types';

interface AppBarProps {
    userInfo: UserInfo | undefined
    onLoginRequested: () => void
    onRegisterRequested: () => void
    classes: Record<string, string>
}

interface AppBarState {
    userInfoOpened: boolean
    anchorEl: HTMLButtonElement | undefined
}

const useStyles = (theme: Theme) =>
    createStyles({
        paper: {
            padding: theme.spacing(2),
        },
    });

class AppBar extends React.Component<AppBarProps, AppBarState> {

    constructor(props: AppBarProps) {
        super(props);

        this.state = {
            userInfoOpened: false,
            anchorEl: undefined
        };

        this.onUserInfoButtonClicked = this.onUserInfoButtonClicked.bind(this);
    }

    onUserInfoButtonClicked(event: React.MouseEvent<HTMLButtonElement>): void {
        this.setState({
            userInfoOpened: !this.state.userInfoOpened,
            anchorEl: event.currentTarget
        });
    }

    render(): JSX.Element {
        console.log(this.props.userInfo);
        return (
            <>
                <MdAppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" className='app-title'>
                            App
                        </Typography>
                        {
                            this.props.userInfo ?
                                (
                                    <IconButton aria-label="delete" onClick={this.onUserInfoButtonClicked}>
                                        <Person />
                                    </IconButton>
                                ) :
                                (
                                    <>
                                        <Button color="inherit" onClick={this.props.onLoginRequested}>Login</Button>
                                        <Button color="inherit" onClick={this.props.onRegisterRequested}>Register</Button>
                                    </>
                                )
                        }
                    </Toolbar>
                </MdAppBar>
                {
                    this.props.userInfo ?
                        (
                            // <Popper open={this.state.userInfoOpened} anchorEl={this.state.anchorEl} placement={'bottom-end'} transition>
                            //     <Fade timeout={800}>
                            //         <Paper>
                            //             <Typography>{`${this.props.userInfo.firstName} ${this.props.userInfo.lastName}`}</Typography>
                            //             <Typography>{`@${this.props.userInfo.username}`}</Typography>
                            //         </Paper>
                            //     </Fade>
                            // </Popper>
                            <Popper open={this.state.userInfoOpened} anchorEl={this.state.anchorEl} placement={'bottom-end'}>
                                <Paper className={this.props.classes.paper}>
                                    <Typography>{`${this.props.userInfo.firstName} ${this.props.userInfo.lastName}`}</Typography>
                                    <Typography variant="caption">{`@${this.props.userInfo.username}`}</Typography>
                                </Paper>
                            </Popper>
                        ) :
                        (
                            <></>
                        )
                }
            </>
        );
    }
}

export default withStyles(useStyles)(AppBar);
