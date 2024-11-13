import React from 'react';
import { Outlet } from 'react-router-dom';
import './Blank.css';

function Blank() {
    return (
        <div className="blank">
          <Outlet/>
        </div>
    );
}

export default Blank;