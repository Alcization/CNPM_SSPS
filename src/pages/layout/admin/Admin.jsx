import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import './Admin.css';

function MainComponent() {
    return (
        <div>
            <Header />
            <Sidebar />
            <Outlet />
        </div>
    );
};

export default MainComponent;