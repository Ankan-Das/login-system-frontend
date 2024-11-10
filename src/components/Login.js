import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const API_URL = process.env.REACT_APP_API_URL;

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '', role: 'admin'});
    const [message, setMessage] = useState('');
    const [selectedTab, setSelectedTab] = useState('session');  // State to track selected tab
    const navigate = useNavigate();

    useEffect(() => {
        const checkIfLoggedIn = async () => {
            try {
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
            let response;
            if (selectedTab === 'session') {
                response = await axios.post(`${API_URL}/login`, formData, { withCredentials: true });
            } else if (selectedTab === 'token') {
                response = await axios.post(`${API_URL}/token_login`, formData);
            } else if (selectedTab === 'sso') {
                response = await axios.get(`${API_URL}/sso_login`);
            }
            
            setMessage(response.data.message);
            navigate('/home')
        } catch (error) {
            setMessage('Invalid credentials');
        }
    };

    return (
        <div className="login-container">
            <h2>Study on Authentication</h2>
            {/* Tabs in a single division to look like browser tabs */}
            <div className='tabs-container'>
                <button
                    onClick={() => setSelectedTab('session')}
                    className={`tab-button ${selectedTab === 'session' ? 'session': ''}`}>
                    Session-Based Login
                </button>
                <button
                    onClick={() => setSelectedTab('token')}
                    className={`tab-button ${selectedTab === 'token' ? 'token': ''}`}>
                    Token-Based Login
                </button>
                <button
                    onClick={() => setSelectedTab('sso')}
                    className={`tab-button ${selectedTab === 'sso' ? 'sso': ''}`}>
                    SSO Login
                </button>
            </div>

            {/* Form container for the login form */}
            <div className='form-container'>
                <form onSubmit={handleSubmit}>
                    {selectedTab === 'session' && (
                        <>
                            <input type="text" name="username" placeholder='Username' onChange={handleChange} required />
                            <input type="password" name="password" placeholder='Password' onChange={handleChange} required />
                            {message && <p>{message}</p>}
                            <button type="submit">{selectedTab === 'sso' ? 'Continue with SSO' : 'Login'}</button>
                        </>
                    )}

                    {selectedTab === 'token' && (
                        <>
                            <input type="text" name="username" placeholder='Username' onChange={handleChange} required />
                            <input type="password" name="password" placeholder='Password' onChange={handleChange} required />
                            {message && <p>{message}</p>}
                            <button className='token' type="submit">{selectedTab === 'sso' ? 'Continue with SSO' : 'Login'}</button>
                        </>
                    )}
                    
                    {selectedTab === 'sso' && (
                        <>
                            <p>Select your Single Sign-On (SSO) provider:</p>
                            {message && <p>{message}</p>}
                            <button className='sso' type="submit">{selectedTab === 'sso' ? 'Continue with SSO' : 'Login'}</button>
                        </>
                    )}
                </form>

            </div>
        </div>
    );
};

export default Login;