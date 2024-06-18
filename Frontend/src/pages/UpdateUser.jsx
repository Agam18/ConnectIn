import React, { useState } from 'react';
import './UpdateUser.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UpdateUser = () => {
    const navigate=useNavigate();
    const[firstname,setFirstName]=useState('');
    const[lastname,setLastName]=useState('');
    
    const[gender,setGender]=useState('');
    const jwtToken=localStorage.getItem("jwt");
    const handleUpdate = async (event) => {
        event.preventDefault();
        const userData = {
            firstname,
            lastname,
            gender
        };

        console.log(userData);
        try {
            
            const { data } = await axios.put('http://localhost:8080/api/users',userData,{
            headers:{
                'Authorization':`Bearer ${jwtToken}`,
                'Content-Type':"application/json"
            }
        });
    
            console.log(data);
            
    
        } catch (error) {
            
        }
        navigate('/');
        
        
        
        
    };
    return (
        <div className="container">
            <div className="text">
                Edit Details
            </div>
            <form onSubmit={handleUpdate}>
                <div className="form-row">
                    <div className="input-data">
                        <input type="text" onChange={(e) => setFirstName(e.target.value)} required />
                        <div className="underline"></div>
                        <label htmlFor="">First Name</label>
                    </div>
                    <div className="input-data">
                        <input type="text" onChange={(e) => setLastName(e.target.value)} required />
                        <div className="underline"></div>
                        <label htmlFor="">Last Name</label>
                    </div>
                </div>
                <div className="form-row">
                    
                    <div className="input-data">
                        <input type="text" onChange={(e) => setGender(e.target.value)} required />
                        <div className="underline"></div>
                        <label htmlFor="">Gender</label>
                    </div>
                </div>
                
                <div className="form-row submit-btn">
                    <div className="input-data">
                        <div className="inner"></div>
                        <input type="submit" value="submit" />
                    </div>
                </div>
            </form>
        </div>
    );
}

export default UpdateUser;
