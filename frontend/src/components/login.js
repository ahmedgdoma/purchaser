import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useState} from "react";
import {
    Navigate
} from "react-router-dom";
import { postJson} from "../services/api";
import axios from "axios";

const theme = createTheme();
export default function Login() {
    let token = localStorage.getItem('token')
    const [isLogin, setIsLogin] = useState(token && token.length > 0);
    const [error, setError] = useState(null);
    const handleSubmit = (event) => {
        event.preventDefault();
        setError(null);
        const data = new FormData(event.currentTarget);
        let cred = {
            email: data.get('email'),
            password: data.get('password'),
        }
        console.log(cred);


        postJson('auth/login', cred).then(function (response) {
            localStorage.setItem('token', response.data.access_token);
            setIsLogin(true)
        })
            .catch(function (error) {
                setError(error.message);
            })
    };

    return (
        (isLogin)?<Navigate to="/" />:
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <div style={{ color: 'red' }}>{error}</div>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}