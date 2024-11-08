import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import './Register.css'

const API_URL = process.env.REACT_APP_API_URL;

const Register = () => {
    const [formData, setFormData] = useState({ name: '', username: '', password: '', confirmPassword: '', role: '' });
    const [message, setMessage] = useState('');
    const [messageColor, setMessageColor] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const checkIfLoggedIn = async () => {
            try {
                // Check the session status by making a request to the backend
                const response = await axios.get('${API_URL}/check_session', { withCredentials: true });
                if (response.status === 200 && response.data.logged_in) {
                    navigate('/home');  // Redirect to /home if user is already logged in
                }
            } catch (error) {
                console.error('User not logged in:', error);
            }
        };
        checkIfLoggedIn();
    }, [navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        console.log(formData)
        e.preventDefault();
        try {
            console.log(formData)
            const response = await axios.post('${API_URL}/register', formData);
            setMessageColor('green');
            setMessage(response.data.message);
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (error) {
            setMessageColor('red');
            setMessage(error.response.data.message);
        }
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
                <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required />
                <input type="text" name="role" placeholder="Role" onChange={handleChange} required />
                <button type="submit">Register</button>
            </form>
            {message && <p style={{ color: messageColor }}>{message}</p>}
            <button onClick={() => navigate('/')}>Go to Login</button>
        </div>
    );
};

export default Register;