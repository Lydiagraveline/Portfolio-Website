import React from 'react';
import { useEffect, useState } from 'react';
import './Radio.css';

const GalleryFilter = ({ categories, selectedCategory, onChange }) => {
  return (
    <div className='radioContainer'>
      <ul>
        {categories.map((category, index) => (
          <li key={index}>
            <label className="radio-button">
              <input
                type="radio"
                value={category}
                checked={selectedCategory === category || (index === 0 && !selectedCategory)}
                onChange={() => onChange(category)}
                // checked
              />
              <div className="radio-circle"></div>
              <span> {category} </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GalleryFilter;