import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import React from 'react';
import RequireAuth from '../utils/PrivateRoute';
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
                <Route path='/registro' element={<Register />} />
                <Route path='/login' element={<Login />} />
                <Route
                    path='/agenda'
                    element={
                        <RequireAuth>
                            <Main />
                        </RequireAuth>
                    } />
                <Route
                    path='/calendar'
                    element={
                        <RequireAuth>
                            <Calendar />
                        </RequireAuth>
                    } />


            </Routes>
        </Router>
    )
}