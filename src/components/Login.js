import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import './Login.css';

const API_URL = process.env.REACT_APP_API_URL;

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '', role: '' });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const checkIfLoggedIn = async () => {
            try {
                // Check the session status by making a request to the backend
                const response = await axios.get(`${API_URL}/check_session`, { withCredentials: true });
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
        e.preventDefault();
        try {
            const response = await axios.post(`${API_URL}/login`, formData);
            console.log("inside login", response)
            setMessage(response.data.message);
            navigate('/home');
        } catch (error) {
            setMessage('Invalid credentials');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <input type="text" name="role" placeholder="Role" onChange={handleChange} required />
                <button type="submit">Login</button>
            </form>
            {message && <p>{message}</p>}
            <button onClick={() => navigate('/register')}>Go to Register</button>
        </div>
    );
};

export default Login;