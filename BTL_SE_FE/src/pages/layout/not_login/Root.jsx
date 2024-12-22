import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import './Root.css';

function Root() {
    return (
        <div className="root">
          <Header />
          <Outlet/>
          <Footer />
        </div>
    );
}

export default Root;