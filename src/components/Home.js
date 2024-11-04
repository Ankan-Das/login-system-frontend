import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            console.log("INSIDE HOME")
            try {
                const response = await axios.get('http://localhost:5000/home');
                console.log(response.data);
            } catch (error) {
                navigate('/');
            }
        };
        checkAuth();
    }, [navigate]);

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:5000/logout', {}, { withCredentials: true });
            // alert("Logout successful");
            navigate('/');  // Redirect to the login page or landing page
        } catch (error) {
            console.error("Logout failed:", error);
            alert("Logout failed. Please try again.");
        }
    };

    // return (
    //     <div>
    //         <h2>Welcome to the Home Page</h2>
    //         <button onClick={handleLogout}>Logout</button>
    //     </div>
    // );

    return (
        <div className='home-container'>
            <h2>Welcome to the Home Page</h2>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Home;