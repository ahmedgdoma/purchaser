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
import {postMultiPart} from "../services/api";
import axios from "axios";

const theme = createTheme();
export default function UploadSheet() {
    let token = localStorage.getItem('token')
    const [isLogin, setIsLogin] = useState(token.length > 0);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const handleSubmit = (event) => {
        event.preventDefault();
        setError(null);
        const data = new FormData(event.currentTarget);
        let body = {
            filesheet: data.get('file'),
        }
        console.log(body);


        postMultiPart('authed/uploadfile', body, token).then(function (response) {
            console.log(response)
            setSuccess(true)
        })
            .catch(function (error) {
                console.log(error)
                setError(error.message);
            })
    };

    return (
        (!isLogin)?<Navigate to="/login" />:
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
                        <Typography component="h1" variant="h5">
                            Upload Sheet
                        </Typography>
                        {success &&
                        <div style={{ color: 'green' }}>uploaded successfully</div>
                        }

                        <div style={{ color: 'red' }}>{error}</div>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <input type="file" name="file" />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Upload
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
    );
}