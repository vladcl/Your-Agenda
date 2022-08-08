import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import React from 'react';
import Register from './Register';
import Login from './Login';
import Main from './Main';
import Home from './Home';
import Calendar from './Fullcalendar';
import PrivateRoutes from '../utils/PrivateRoute';

export default function Routers() {
    return (
        <Router>
            <Routes>
                <Route index element={<Home />} />
                <Route path='/registro' element={<Register />} />
                <Route path='/login' element={<Login />} />
                <Route element={<PrivateRoutes />}>
                    <Route path='/agenda' element={<Main />} />
                    <Route path='/calendar' element={<Calendar />} />
                </Route>
            </Routes>
        </Router>
    )
}