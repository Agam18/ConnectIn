import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const SavedPosts = () => {
    const navigate=useNavigate();
    const jwt = localStorage.getItem("jwt");
    const [posts, setPosts] = useState([]);
    const [caption, setCaption] = useState('');
    const [image, setImage] = useState(null);
    const handleSave = async (post) => {
        try {
            console.log(post);
            const { data } = await axios.put('http://localhost:8080/posts/' + post.id + '/save', null, {
                headers: {
                    'Authorization': `Bearer ${jwt}`,
                    'Content-Type': 'application/json'
                }
            });
        }
        catch (error) {
            console.log(error);
        }
        navigate('/');





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
                const response = await axios.get('http://localhost:8080/posts/savedPosts', {
                    headers: {
                        "Authorization": `Bearer ${jwt}`,
                    }
                });
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };
        fetchPosts();
    }, []);
    return (
        <div>
            <Navbar />
            <div className="homepage">
                <h1>Saved Posts</h1>
                <div className="post-list center">
                {posts.slice().reverse().map((post) => (
                    <div key={post.id} className="post-card my-8">
                        <div className="post-header">
                            <span className="user-name">{post.user}</span>
                        </div>
                        <img className="post-image" src={post.image} alt="Post" />
                        <div className="post-caption">{post.caption}</div>
                        <div className="post-actions">
                            <button className="icon-button " onClick={() => handleSave(post)}>Unsave</button>
                            <button className="icon-button " onClick={() => handleLike(post)}>Like</button>
                        </div>
                    </div>


                ))}
                </div>
            </div>

        </div>
    )
}

export default SavedPosts