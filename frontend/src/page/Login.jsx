import React, {useState} from 'react';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, msProvider } from '../firebase';
import { NavLink, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;

            // alternatively check this in the Cloud Function "beforeLogin"
            if (!user.emailVerified) {
                console.log("please verify your email first")
                return
            }
            navigate("/")
            console.log(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });
    }

    const microsoftLogin = (e) => {
        console.log(msProvider)      
        signInWithPopup(auth, msProvider)
        .then((result) => {
            console.log(result)
            navigate("/")
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });
    }

    return(
        <main className='container'>        
            <Navbar />
            <section>
                <div>
                    <div>
                        <details>
                            <summary>Login with Microsoft</summary>
                            <div>
                                <button onClick={microsoftLogin}>Login</button>
                            </div>
                        </details>

                        <details>
                            <summary>Login with E-Mail</summary> 
                            <form>                            
                                <div>
                                    <div>
                                        <input id="email-address" name="email" type="email"                                    
                                            onChange={(e)=>setEmail(e.target.value)}                                            
                                            placeholder="Email address" required />
                                    </div>

                                    <div>
                                        <input id="password" name="password" type="password"
                                            onChange={(e)=>setPassword(e.target.value)}
                                            placeholder="Password" required />
                                    </div>
                                </div>
                                <div>
                                    <button onClick={onLogin}>Login with Password</button>
                                </div>
                            </form>                    
                            <p>
                                No account yet?{' '}
                                <NavLink to="/Signup">Sign up</NavLink>
                            </p>
                        </details>
                        
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Login