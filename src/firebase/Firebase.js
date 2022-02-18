// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import firebase from "firebase";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const reactApikey = process.env.REACT_APP_APIKEY;
const firebaseConfig = {
  apiKey: "AIzaSyABnksC6KB3rwmz-w5D2Kh5UoF0z8J7QyE",
  authDomain: "sd-keep-clone.firebaseapp.com",
  projectId: "sd-keep-clone",
  storageBucket: "sd-keep-clone.appspot.com",
  messagingSenderId: "235378947104",
  appId: "1:235378947104:web:c9e26ae846be79a8763845",
};

// Initialize Firebase
initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
//firebase.initializeApp(firebaseConfig);
var auth = getAuth();
////var provider = new firebase.auth.GoogleAuthProvider();
export { auth, provider };
//export default app;
