import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Check from './components/Check';
import axios from 'axios';

// axios.defaults.withCredentials = true;

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/home" element={<Home />} />
                <Route path="/check" element={<Check />} />
            </Routes>
        </Router>
    );
}

export default App;