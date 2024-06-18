import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
    const jwt = localStorage.getItem("jwt");
     const navigate=useNavigate();
    const [posts, setPosts] = useState([]);
    const [savedPosts, setSavedPosts] = useState([]);
    const [caption, setCaption] = useState('');
    const [image, setImage] = useState(null);
    const [postId, setPostId] = useState('');
    const [save, setSave] = useState('Save')
    const getButtonText = (post) => {
        return savedPosts.includes(post.id) ? "Unsave" : "Save";
    };
    const handleSave = async (post) => {
        try {
            console.log(post);
            const { data } = await axios.put('http://localhost:8080/posts/' + post.id + '/save', null, {
                headers: {
                    'Authorization': `Bearer ${jwt}`,
                    'Content-Type': 'application/json'
                }
            });
            if(savedPosts.includes(post.id)) savedPosts.filter(element => element !== post.id);
            else savedPosts.push(post.id);
            // console.log(savedPosts);
            navigate('/savedPosts');
        }
        catch (error) {
            console.log(error);
        }
        





    };
    const handleLike = async (post) => {
        try {
            console.log(post);
            const { data } = await axios.put('http://localhost:8080/posts/like/' + post.id, null, {
                headers: {
                    'Authorization': `Bearer ${jwt}`,
                    'Content-Type': 'application/json'
                }
            });
        }
        catch (error) {
            console.log(error);
        }





    };
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:8080/posts', {
                    headers: {
                        "Authorization": `Bearer ${jwt}`,

                    }
                });
                setPosts(response.data.content);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };
        const fetchUser = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/users/profile', {
                    headers: {
                        "Authorization": `Bearer ${jwt}`,
                    }
                });
                // Update the state variable with response.data
                setSavedPosts(response.data.saved);
                console.log("save"+savedPosts);
            } catch (error) {
                console.error('Error fetching details:', error);
            }
        };
        fetchUser();
        fetchPosts();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="homepage post-list center">
                {posts.slice().reverse().map((post) => (
                    <div key={post.id} className="post-card my-8">
                        <div className="post-header">
                            <span className="user-name">By {post.user}</span>
                        </div>
                        <img className="post-image" src={post.image} alt="Post" />
                        <div className="post-caption">{post.caption}</div>
                        <div className="post-actions">
                            <button className="icon-button" onClick={() => handleSave(post)}>
                                {getButtonText(post)}
                            </button>
                            <button className="icon-button " onClick={() => handleLike(post)}>Like</button>
                        </div>
                    </div>


                ))}
            </div>

        </div>
    );
};

export default Homepage;
