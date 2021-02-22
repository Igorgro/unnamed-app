import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { LoginInfo } from './types';

interface LoginDialogProps {
    onLogin: (loginInfo: LoginInfo) => Promise<void>
    onLoginCanceled: () => void
    open: boolean
    hasError: boolean
}

interface LoginDialogState {
    username: string
    password: string
}


export default class LoginDialog extends React.Component<LoginDialogProps, LoginDialogState> {
    constructor(props: LoginDialogProps) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };

        this.onLoginButtonClicked = this.onLoginButtonClicked.bind(this);
        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
    }

    async onLoginButtonClicked(): Promise<void> {
        await this.props.onLogin({
            username: this.state.username,
            password: this.state.password
        });
    }

    onUsernameChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({ username: event.target.value });
    }

    onPasswordChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({ password: event.target.value });
    }

    render(): JSX.Element {
        return (
            <Dialog
                open={this.props.open} onClose={this.props.onLoginCanceled}
                aria-labelledby="form-dialog-title"
                maxWidth='sm'
                fullWidth={true}>
                <DialogTitle id="form-dialog-title">Login</DialogTitle>
                <DialogContent>
                    <DialogContentText
                        color={this.props.hasError ? 'error' : undefined}>
                        {this.props.hasError ? 'Invalid username or password' : 'Enter your credentials to login'}
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="username"
                        label="Username"
                        type="text"
                        value={this.state.username}
                        onChange={this.onUsernameChange}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="password"
                        label="Password"
                        type="password"
                        value={this.state.password}
                        onChange={this.onPasswordChange}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.onLoginCanceled} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.onLoginButtonClicked} color="secondary">
                        Login
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}
