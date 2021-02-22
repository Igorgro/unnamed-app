import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import { LoginInfo, RegisterInfo, UserInfo } from './types';

import AppBar from './appbar';
import LoginDialog from './logindialog';
import RegisterDialog from './registerdialog';

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

interface AppState {
    dataLoaded: boolean
    userInfo: UserInfo | undefined

    loginDialogOpen: boolean
    registerDialogOpen: boolean
    /**
     * false = no error, true = login failed
     */
    currentLoginState: boolean
    currentRegisterState: boolean
}

export class App extends React.Component<unknown, AppState> {
    constructor(props: unknown) {
        super(props);

        this.state = {
            dataLoaded: false,
            userInfo: undefined,
            loginDialogOpen: false,
            registerDialogOpen: false,
            currentLoginState: false,
            currentRegisterState: false
        };

        this.onLoginRequested = this.onLoginRequested.bind(this);
        this.onLogin = this.onLogin.bind(this);
        this.onLoginCanceled = this.onLoginCanceled.bind(this);
        this.onRegisterRequested = this.onRegisterRequested.bind(this);
        this.onRegister = this.onRegister.bind(this);
        this.onRegisterCanceled = this.onRegisterCanceled.bind(this);
    }

    async componentDidMount(): Promise<void> {
        if (!this.state.dataLoaded) {
            const profileResponse = await fetch('/api/user/profile');
            this.setState({ dataLoaded: true });
            if (profileResponse.status == 200) {
                const profile: UserInfo = await profileResponse.json();

                this.setState({
                    userInfo: {
                        firstName: profile.firstName,
                        lastName: profile.lastName,
                        username: profile.username
                    }
                });
            }
        }
    }

    onLoginRequested(): void {
        this.setState({
            loginDialogOpen: true
        });
    }

    async onLogin(loginInfo: LoginInfo): Promise<void> {
        const loginResponse = await fetch(
            '/api/auth/login',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginInfo)
            }
        );
        const data = await loginResponse.json();
        console.log(data);
        if (loginResponse.status == 200) this.setState({ loginDialogOpen: false });
        else this.setState({ currentLoginState: true });
    }

    onLoginCanceled(): void {
        this.setState({
            loginDialogOpen: false
        });
    }

    onRegisterRequested(): void {
        this.setState({
            registerDialogOpen: true
        });
    }

    async onRegister(registerInfo: RegisterInfo): Promise<void> {
        const registerResponse = await fetch(
            '/api/auth/register',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(registerInfo)
            }
        );
        const data = await registerResponse.json();
        console.log(data);
        if (registerResponse.status == 200) this.setState({ registerDialogOpen: false });
        else this.setState({ currentRegisterState: true });
    }
    onRegisterCanceled(): void {
        this.setState({
            registerDialogOpen: false
        });
    }

    render(): JSX.Element {
        return (
            <ThemeProvider theme={theme}>
                <AppBar
                    userInfo={this.state.userInfo}
                    onLoginRequested={this.onLoginRequested}
                    onRegisterRequested={this.onRegisterRequested}/>
                <LoginDialog
                    open={this.state.loginDialogOpen}
                    onLogin={this.onLogin}
                    onLoginCanceled={this.onLoginCanceled}
                    hasError={this.state.currentLoginState}></LoginDialog>
                <RegisterDialog
                    open={this.state.registerDialogOpen}
                    onRegister={this.onRegister}
                    onRegisterCanceled={this.onRegisterCanceled}
                    hasError={this.state.currentRegisterState}></RegisterDialog>
            </ThemeProvider>
        );
    }
}

