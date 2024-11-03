import React, { useState } from 'react';
import axios from 'axios';
import {Container, Box, TextField, Button, Typography, Grid, Paper} from '@mui/material';
import {styled} from '@mui/system'

const StyledBox = styled(Box)({
    display: 'flex',
    flexDirection:'column',
    alignItems:'center',
    padding: '20px',
    marginTop:'50px',
});

const Register: React.FC =()=> {
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
            setMessage(error.response?.data.message || 'An error occured');
        }
    };
}