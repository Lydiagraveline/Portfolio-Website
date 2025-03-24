
//Header.jsx

import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import Link and useLocation
import GalleryFilter from './GalleryFilter'; // Import GalleryFilter component
import './Radio.css';
import classnames from "classnames";


const Header = ({ categories, selectedCategory, handleFilterChange, handleAboutChange, selectedAboutCategory, setGalleryPosition }) => {
  const location = useLocation(); // Get the current location
  const [isHidden, setIsHidden] = useState(true);
  const [headerTestHeight, setHeaderTestHeight] = useState(0);

  const updateHeaderHeight = () => {
    const headerTestElement = document.querySelector('.headerTest');
    if (headerTestElement) {
      setHeaderTestHeight(headerTestElement.clientHeight);
    }
  };
  
  const toggleHeader = () => {
    setIsHidden(!isHidden);
     updateHeaderHeight();
     setGalleryPosition(headerTestHeight); 
      console.log(headerTestHeight);
  };

  function handleScrollChange() {
    if (window.scrollY !== 0) {
      setIsHidden(true);
    }
  }

  useEffect(() => {
    updateHeaderHeight();
      // Listen for resize events to update the height
      window.addEventListener('resize', updateHeaderHeight);

    window.addEventListener("scroll", handleScrollChange);
    return () => {
      window.removeEventListener("scroll", handleScrollChange);
      window.removeEventListener('resize', updateHeaderHeight);
    };
  }, []); 

  const headerStyle = {
      transform: `translateY(${isHidden ? 0 : headerTestHeight}px)`,
      // marginTop: !isHidden && window.scrollY === 0 ? `0px` : null
  };

  const testStyle = {
    transform: `translateY(${isHidden ? 0 : headerTestHeight}px)`,
    // marginTop: !isHidden && window.scrollY === 0 ? `0px` : null
};

  return (
    <header style={headerStyle}        
    className={classnames("header", {
        "hidden": isHidden
    })}>
            <div       
            className={classnames("headerTest", {
              "header-hidden": isHidden
            })}
      >
      <div className={`headerTop`}>
          <div 
              className={classnames("about-section", {
              "about-hidden": isHidden
            }) }>
            <div className="profilePic">
              <img src="/images/profile.png" alt="Lydia Graveline" loading="lazy"/>
            </div>
            <div className="bio">
              <p>Visual Artist, designer, sound artist, and DJ. Originally from Baltimore Maryland, now based in Montreal, where I’m completing a BFA in Computation Arts at Concordia (graduating in 2025).</p>
              <div className="contact"> 
                <a href="mailto:lydiagraveline20@gmail.com">lydiagraveline20@gmail.com</a> <br/>
                <a href="https://www.instagram.com/lydiote___/" target="_blank">Instagram</a>
              </div>
            </div>
            </div>
      </div>
      {/* <img src="/images/profile.png" alt="Lydia Graveline" /> */}
      </div>
      <div className='headerBottom '  >

      <div className="header-left">
        <div id="logo">
        <Link to="/">Lydia Graveline</Link>
        </div>
      </div>

      <div id="category" className="header-center">
        {location.pathname === '/' && ( // Conditionally render the radio buttons only when the path is '/'
        <GalleryFilter
         categories={categories}
         selectedCategory={selectedCategory}
         onChange={handleFilterChange}
        />
      )}
      </div>
      <div className="header-right">
      <Link to="#" onClick={() => {toggleHeader(); updateHeaderHeight();}}>About</Link>
      </div>  
      </div>
    </header>
  );
};

export default Header;
