import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase'; 

import { appConfig } from '../config';

import Navbar from '../components/Navbar';

const Home = () => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        // alternatively use callbacks
        onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
                console.log("user", user)
                fetch(appConfig.backendUrl, {
                    headers: { "Authorization": "Bearer " + user.accessToken }
                    })
                .then((response) => response.text())
                .then((data) => {
                    console.log(data)
                    setData(data)
                    setLoading(false)
                    setError(null)
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode, errorMessage);
                    setLoading(false)
                    setError(error)
                });
            
            } else {
              // User is signed out
              console.log("user is logged out")
              setData(null)
              setLoading(false)
              setError("user not logged in")
            }
          });

          if (!auth.currentUser) {
            return
          }

          auth.currentUser.getIdToken()
            .then( (token) => {
                
          })
          

    }, [])

  return (
    <main className='container'>
      <Navbar />
      {loading && <div>Calling the backend ...</div>}
      {error && (
          <div>{`There is a problem fetching the post data - ${error}`}</div>
      )}
      {data && <span>{data}</span>}
    </main>
  )
}

export default Home