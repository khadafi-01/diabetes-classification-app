import React, { useState } from 'react';
import axios from 'axios';
import { Container, Box, TextField, Button, Typography, Grid, Paper } from '@mui/material';
import { styled } from '@mui/system'
import '../index.css';
const StyledBox = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    marginTop: '50px',
});

const StyledPaper = styled(Paper)({
    padding: '40px',
    borderRadius: '15px',
    background: 'linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%)',
});

const StyledButton = styled(Button)({
    backgroundColor: '#673ab7',
    color: 'fff',
    '&:hover': {
        backgroundColor: '#5e35b1',
    },
    boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.2)',
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
        <Container maxWidth="sm" className="min-h-screen flex items-center justify-center bg-gray-100">
            <StyledPaper elevation={3}>
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
                                    fullWidth
                                    required
                                    className="mt-1 block w-full px-3 py-2
                                     border border-gray-300 rounded-md shadow-sm
                                      focus:outline-none focus:ring-indigo-500
                                       focus:border-indigo-500
                                        sm:text-sm"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="email"
                                    label="Email"
                                    type='email'
                                    value={formData.email}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    className="mt-1 block w-full px-3 py-2 border
                                     border-gray-300 rounded-md shadow-sm
                                      focus:outline-none focus:ring-indigo-500
                                       focus:border-indigo-500 sm:text-sm"
                                />
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Password"
                                        name="password"
                                        type="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        className="block w-full mt-1 px-3 py-2
                                         border border-gray-400 rounded-md
                                          shadow-sm focus:outline-none
                                           focus:ring-indigo-500
                                            focus:border-indigo-500
                                             sm:text-sm"
                                    />

                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Confirm Password"
                                        name="confirmPassword"
                                        type="password"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                        className="mt-1 block w-full px-3 py-2
                                         border border-gray-300 rounded-md shadow-sm
                                          focus:outline-none focus:ring-indigo-500
                                           focus:border-indigo-500
                                            sm:text-sm"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <StyledButton type="submit" variant='contained' color="primary" fullWidth>
                                        Register
                                    </StyledButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                    {message && (<Typography variant='body1' color='error' mt={2}> {message} </Typography>)}
                </StyledBox>
            </StyledPaper>
        </Container>
    );
};

export default Register;