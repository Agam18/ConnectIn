import { Route, Router, Routes } from 'react-router-dom';
import './App.css';
import Register from './pages/Authentication/Register';
import Homepage from './pages/Homepage';
import { useDispatch, useSelector } from 'react-redux';
import { store } from './Redux/store';
import { useEffect } from 'react';
import { getProfileAction } from './Redux/Auth/auth.action';
import MyProfile from './pages/MyProfile';
import SavedPosts from './pages/SavedPosts';

import AddNewPost from './pages/AddNewPost';
import EditPost from './pages/EditPost';
import UpdateUser from './pages/UpdateUser';


function App() {

  // const {auth}=useSelector(store=>store);
  //localStorage.setItem("jwt",1234);
   const {auth}=useSelector(store=>store);
   
  //  const dispatch=useDispatch();
  //  const jwt=localStorage.getItem("jwt");
  //  useEffect(()=>{
  //   dispatch(getProfileAction(jwt))
  //  },[])
  return (
   <div className=''>
    {/* <Register/> */}
    <Routes >
      
      {/* <Route path="/" element={<Register/>}/> */}
      <Route path="/" element={auth.jwt==null?<Register/>:<Homepage/>}/>
      <Route path="/profile" element={<MyProfile/>}/>
      <Route path="/savedPosts" element={<SavedPosts/>}/>
      <Route path="/addNewPost" element={<AddNewPost/>}/>
      <Route path='/editPost' element={<EditPost/>}/>
      <Route path='/updateProfile' element={<UpdateUser/>}/>
      

    </Routes>

   </div>
  );
}

export default App;
