import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { loginUserAction, registerUserAction } from '../../Redux/Auth/auth.action';

const Register = () => {
    const[firstname,setFirstName]=useState('');
    const[lastname,setLastName]=useState('');
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const dispatch=useDispatch();
    const handleSignup = async (event) => {
        event.preventDefault();
        const userData = {
            firstname,
            lastname,
            email,
            password
        };
        console.log(userData);
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        dispatch(registerUserAction(userData));
        
        
    };
    const handleSignin=(event)=>{
        event.preventDefault();
        const userData = {
            email,
            password
        };
        console.log(userData);
        setEmail("");
        setPassword("");
        dispatch(loginUserAction(userData));
        
    };
  return (
    
        <div class="main">  	
		<input type="checkbox" id="chk" aria-hidden="true"/>

			<div class="signup">
				<form onSubmit={handleSignup}>
					<label htmlFor="chk" aria-hidden="true">Sign up</label>
                    <input type="text" value={firstname} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" required />
        <input type="text" value={lastname} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" required />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <button type="submit">Sign up</button>
				</form>
			</div>

			<div class="login">
				<form onSubmit={handleSignin}>
					<label htmlFor="chk" aria-hidden="true">Login</label>
					<input type="email" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required=""/>
					<input type="password" name="pswd" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required=""/>
					<button>Login</button>
				</form>
			</div>
	</div>
    
  )
}

export default Register