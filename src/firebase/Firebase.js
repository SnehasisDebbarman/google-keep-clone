// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import firebase from "firebase";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const reactApikey = process.env.REACT_APP_API_KEY;
const authDomain = process.env.REACT_APP_AUTH_DOMAIN;
const projectId = process.env.REACT_APP_PROJECT_ID;
const storageBucket = process.env.REACT_APP_STORAGE_BUCKET;
const messagingSenderId = process.env.REACT_APP_MESSAGING_SENDER_ID;
const appId = process.env.REACT_APP_APP_ID;
const firebaseConfig = {
  apiKey: reactApikey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId,
};

// Initialize Firebase
initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
//firebase.initializeApp(firebaseConfig);
var auth = getAuth();
////var provider = new firebase.auth.GoogleAuthProvider();
export { auth, provider };
//export default app;
