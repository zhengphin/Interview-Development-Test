import React, { useState, useEffect } from 'react';
import './Sidebar.css'; // Import your CSS file here

export default function Sidebar() {
  // Initialize the active link state from localStorage or a default value
  const [activeLink, setActiveLink] = useState(
    localStorage.getItem('activeLink') || 'Home'
  );

  const handleLinkClick = (link) => {
    setActiveLink(link);
    const domainName = window.location.hostname;
console.log(domainName);


    // Redirect to the corresponding route
    switch (link) {
      case 'Home':
        window.location.replace('/'); 
        break;
      case 'Profile':
        window.location.replace('/profile'); 
        break;
      case 'Message':
        window.location.replace('/message'); 
        break;
      case 'Settings':
        window.location.replace('/settings'); 
        break;
      default:
        break;
    }
  };

  // Use useEffect to store the active link in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('activeLink', activeLink);
  }, [activeLink]);

  return (
    <div className='Sidebar'>
      <ul className="list-unstyled">
        <li className={activeLink === 'Home' ? 'active' : 'inactive'} onClick={() => handleLinkClick('Home')}>
        Home
        </li>
        <li className={activeLink === 'Profile' ? 'active' : 'inactive'} onClick={() => handleLinkClick('Profile')}>
        Profile
        </li>
        <li className={activeLink === 'Message' ? 'active' : 'inactive'} onClick={() => handleLinkClick('Message')}>
        Message
        </li>
        <li className={activeLink === 'Settings' ? 'active' : 'inactive'} onClick={() => handleLinkClick('Settings')}>
        Settings
        </li>
      </ul>
    </div>
  );
}
