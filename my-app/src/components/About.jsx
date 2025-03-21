// About.jsx
import React, { useEffect, useState } from 'react';

const About = ({ selectedCategory }) => {
  return (
    <div>
      <h2>About Me</h2>
      {selectedCategory === 'Bio' && <Biography />}
      {selectedCategory === 'Contact' && <ContactForm />}
    </div>
  );
};

const Biography = () => {
  return (
    <div>
      <h3>Biography</h3>
      <p>This is the Bio text.</p>
    </div>
  );
};

const ContactForm = () => {
  return (
    <div>
      <h3>Contact Form</h3>
      <p>This is the Contact form.</p>
      {/* Add your contact form JSX here */}
    </div>
  );
};

export default About;
