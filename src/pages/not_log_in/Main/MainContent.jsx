import React from 'react';
import printer_person from '../../../assets/printerWithPerson.png'
import './MainContent.css';

const MainContent = () => {
  return (
    <main className="mainContent">
      <div className="heroSection">
        <div className="eroText">
          <h1 className="heroTitle">
            <span className="largeText">Student Smart</span>
            <br />
            <span className="largeText">Printing Service</span>
            <span className="smallText"> by HCMUT</span>
          </h1>
        </div>
        <div className="heroImageWrapper">
          <img src={printer_person} alt="Smart Printing Illustration" className="heroImage" />
        </div>
      </div>
    </main>
  );
};

export default MainContent;