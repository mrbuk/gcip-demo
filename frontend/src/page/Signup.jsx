import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import { auth } from '../firebase';
import Navbar from '../components/Navbar';

const Signup = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
  
    const onSubmit = (e) => {
      e.preventDefault()
      
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            updateProfile(user, { displayName: firstName + " " + lastName})
            sendEmailVerification(user)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
    }   

  return (
    <main className="container">
        <Navbar />   
        <section>
            <div>
                <div>
                    <div>
                        <p>Sign up today</p>
                    </div>
                    <form onSubmit={onSubmit}>
                        <div>
                            <div>
                                <input label="First name" type="text" value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}                                    
                                    name="firstname" placeholder="First name" required />
                            </div>

                            <div>
                                <input label="Last name" type="text" value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}                                    
                                     name="lastname" placeholder="Last name" required />
                            </div>
                            
                            <div>
                                <input label="Email address" type="email" value={email}
                                    onChange={(e) => setEmail(e.target.value)}                                    
                                    name="email" placeholder="Email address" required />
                            </div>

                            <div>
                                <input label="Create password" type="password" value={password}
                                    onChange={(e) => setPassword(e.target.value)}                                    
                                    placeholder="Password" required />
                            </div>
                        </div>                        

                        <div>
                            <button type="submit">Sign up</button>
                        </div>
                                             
                    </form>
                   

                    <p className="text-sm text-white text-center">
                        Already have an account?{' '}
                        <NavLink to="/login" className="underline text-tertiary">
                            Sign in
                        </NavLink>
                    </p>
                    
                </div>
            </div>
        </section>
    </main>
  )
}

export default Signup