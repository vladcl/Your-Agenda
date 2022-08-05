import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import React from 'react';
import PrivateRoutes from '../utils/PrivateRoute';
import Register from './Register';
import Login from './Login';
import Main from './Main';
import Home from './Home';
import Calendar from './Fullcalendar';

export default function Routers() {
    return (
        <Router>
            <Routes>
                <Route index element={<Home />} />
                <Route element={<Register />} path='/registro' />
                <Route element={<Login />} path='/login' />
                <Route element={<PrivateRoutes />}>
                    <Route element={<Main />} path='/agenda' />
                    <Route element={<Calendar />} path='/calendar' />
                </Route>
            </Routes>
        </Router>
    )
}