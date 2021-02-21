import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

interface RegisterDialogProps {
    onRegister: (username: string, email: string, password: string) => Promise<void>
    onRegisterCanceled: () => void
    open: boolean
    hasError: boolean
}

interface RegisterDialogState {
    username: string
    email: string
    password: string
}


export default class RegisterDialog extends React.Component<RegisterDialogProps, RegisterDialogState> {
    constructor(props: RegisterDialogProps) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: ''
        };

        this.onRegisterButtonClicked = this.onRegisterButtonClicked.bind(this);
        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
    }


    async onRegisterButtonClicked(): Promise<void> {
        await this.props.onRegister(this.state.username, this.state.email, this.state.password);
    }

    onUsernameChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({ username: event.target.value });
    }

    onEmailChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({ email: event.target.value });
    }

    onPasswordChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({ password: event.target.value });
    }

    render(): JSX.Element {
        return (
            <Dialog
                open={this.props.open} onClose={this.props.onRegisterCanceled}
                aria-labelledby="form-dialog-title"
                maxWidth='sm'
                fullWidth={true}>
                <DialogTitle id="form-dialog-title">Register</DialogTitle>
                <DialogContent>
                    <DialogContentText
                        color={this.props.hasError ? 'error' : undefined}>
                        {this.props.hasError ? 'User already exists' : 'Enter your info to sign up'}
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
                        id="email"
                        label="E-mail"
                        type="email"
                        value={this.state.email}
                        onChange={this.onEmailChange}
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
                    <Button onClick={this.props.onRegisterCanceled} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.onRegisterButtonClicked} color="secondary">
                        Sign Up
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}
