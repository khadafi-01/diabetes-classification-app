import React, { useState } from 'react';
import axios from 'axios';
import { Container, Box, TextField, Button, Typography, Grid, Paper } from '@mui/material';
import { styled } from '@mui/system'

const StyledBox = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    marginTop: '50px',
});

const Register: React.FC = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',

    });

    const [message, setMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const res = await axios.post('http://localhost:5000/user/register', formData);
            setMessage(res.data.message);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setMessage(error.response?.data.message || 'An error occured');
            } else {
                setMessage('An error occured');
            }
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3}>
                <StyledBox>
                    <Typography variant='h4' component="h1" gutterBottom>
                        Register
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    name='username'
                                    label="Username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth label="Email"
                                    name="email"
                                    type='email'
                                    value={formData.email}
                                    onChange={handleChange}
                                    required />
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Password"
                                        name="password"
                                        type="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required />

                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Confirm Password"
                                        name="confirmPassword"
                                        type="password"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button type="submit" variant='contained' color="primary" fullWidth>
                                        Register
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                    {message && <Typography variant='body1' color='error' mt={2}>{message}</Typography>}
                </StyledBox>
            </Paper>
        </Container>
    );
};

export default Register;