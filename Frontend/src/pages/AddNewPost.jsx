
import React, { useState } from 'react';
import Navbar from './Navbar';
import { api } from '../config/api';
import axios from 'axios';

const AddNewPost = () => {
    const jwtToken=localStorage.getItem("jwt");
    const [image, setImage] = useState('');
  const [caption, setCaption] = useState('');

  const handleImageChange = (e) => {
    setImage(e.target.value);
  };

  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Your logic for handling the post data
    const userData = {
        image,
        caption
    };
    try {
        const { data } = await axios.post('http://localhost:8080/api/posts',userData,{
            headers:{
                'Authorization':`Bearer ${jwtToken}`,
                'Content-Type':"application/json"
            }
        });
        
        console.log("post ",data);
        
    } catch (error) {
        
    }
    console.log('Image:', image);
    console.log('Caption:', caption);
    // Reset the form after submission
    
    setImage('');
    setCaption('');
  };

  return (
    <div>
        <Navbar/>
    <div className="add-post-container">
      <div className="card">
        <h1 className="title">Add New Post</h1>
        <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label htmlFor="Image Address">Image:</label>
            <textarea id="image" value={image} onChange={handleImageChange} className="caption-input" />
          </div>
        
          <div className="form-group">
            <label htmlFor="caption">Caption:</label>
            <textarea id="caption" value={caption} onChange={handleCaptionChange} className="caption-input small-textarea" />
          </div>
          <button type="submit" className="caption-input small-textarea">Add Post</button>
        </form>
      </div>
    </div>
    </div>
  )
}

export default AddNewPost


