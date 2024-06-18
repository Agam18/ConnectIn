import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MyProfile = () => {
    const navigate = useNavigate();
    const jwt = localStorage.getItem("jwt");
    const [posts, setPosts] = useState([]);
    const [caption, setCaption] = useState('');
    const [image, setImage] = useState(null);
    const [user, setUser] = useState({}); // Change to object, assuming user data is an object

    const handleDelete = async(postId) => {
        
       
        
        try {
            const { data } = await axios.delete('http://localhost:8080/api/posts/'+postId,{
                headers:{
                    'Authorization':`Bearer ${jwt}`,
                    'Content-Type':"application/json"
                }
            });
            
            console.log("post ",data);
            
        } catch (error) {
            
        }
        navigate('/');
        // console.log('Image:', image);
        // console.log('Caption:', caption);
        // // Reset the form after submission
        
        // setImage('');
        // setCaption('');
      };

useEffect(() => {
    const fetchUser = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/users/profile', {
                headers: {
                    "Authorization": `Bearer ${jwt}`,
                }
            });
            // Update the state variable with response.data
            setUser(response.data);
            console.log(user);
        } catch (error) {
            console.error('Error fetching details:', error);
        }
    };
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:8080/posts/profile', {
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
        fetchUser();
    }, []);
    return (
        <div>
            <Navbar />
            <div className="homepage">
                <h1>My Profile</h1>
                <div className="post-card my-8 " style={{ display: 'flex', justifyContent: 'center' }}>
                    <div>
                        <img className="post-image " src={"https://cdn.pixabay.com/photo/2017/06/13/12/54/profile-2398783_1280.png"} alt="Profile" style={{ height: '180px', width: '200px' }} />
                        <div >
                            <p style={{ display: 'flex', justifyContent: 'center' }}>First Name: {user.firstname ? user.firstname:"Please Update"}</p>
                            <p style={{ display: 'flex', justifyContent: 'center' }}>Last Name: {user.lastname ? user.lastname : "Please Update"}</p>
                            <p style={{ display: 'flex', justifyContent: 'center' }}>Gender: {user.gender ? user.gender : "Please Update"}</p>
                            <p style={{ display: 'flex', justifyContent: 'center' }}>Email: {user.email? user.email :"Please Update"}</p>
                        </div>

                    </div>
                </div>
                <button className="icon-button" onClick={() => navigate('/updateProfile')} style={{ alignSelf: 'center' }}>Edit Details</button>


                <h1> Your Posts</h1>
                <div className="post-list center">
                    {posts.slice().reverse().map((post) => (
                        <div key={post.id} className="post-card my-8">
                            <img className="post-image" src={post.image} alt="Post" />
                            <div className="post-caption">{post.caption}</div>
                            <div className="post-actions">

                                <button className="icon-button " onClick={() => navigate('/editPost', { state: { prop1: post.id } })}>Edit Post</button>
                                <button className="icon-button" onClick={() => {handleDelete(post.id)}} >Delete Post</button>

                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default MyProfile;