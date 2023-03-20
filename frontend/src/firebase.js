// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { OAuthProvider, getAuth } from 'firebase/auth';
import { appConfig } from './config';  

const firebaseConfig = {
  apiKey: appConfig.apiKey,
  authDomain: appConfig.authDomain,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// initialize Microsoft IdP
export const msProvider = new OAuthProvider('microsoft.com');
export default app;