import { Route, BrowserRouter, Routes } from 'react-router-dom';
import React from 'react';
import Register from './Register';
import Login from './Login';
import Main from './Main';
import Home from './Home';
import Calendar from './Fullcalendar';

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Home />} />
                <Route path='/registro' element={<Register />} />
                <Route path='/login' element={<Login />} />
                <Route path='/agenda' element={<Main />} />
                <Route path='/calendar' element={<Calendar />} />
            </Routes>
        </BrowserRouter>
    )
}