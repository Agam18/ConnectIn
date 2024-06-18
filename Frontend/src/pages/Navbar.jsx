import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate=useNavigate();
  return (
    <nav className="navbar">
  <div className="navbar-left">
    <div className="logo-container">
      <img src="https://cdn.cms-twdigitalassets.com/content/dam/partners-twitter/partner-profile/sprinklr/Sprinklr-NewLogo.png.twimg.1920.png" alt="Logo" className="logo" />
      <h1 className="nav-link app-name" onClick={() => navigate('/')}>Social Media</h1>
    </div>
  </div>
  <div className="navbar-right">
    <ul className="nav-links">
      <li className="nav-link mx-3" onClick={() => navigate('/profile')}>My Profile</li>
      <li className="nav-link mx-3" onClick={() => navigate('/savedPosts')}>Saved Posts</li>
      <li className="nav-link" onClick={() => navigate('/addNewPost')}>Add Post</li>
    </ul>
  </div>
</nav>

  
  );
};

export default Navbar;
