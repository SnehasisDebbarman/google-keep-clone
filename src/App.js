import React, { useState } from "react";
import "./App.css";
import Login from "./Login";
import Mainpage from "./main";
import { getAuth, onAuthStateChanged } from "firebase/auth";

//firebase

function App() {
  const [user, setUser] = useState(false);
  const auth = getAuth();
  const checkUserExists = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(true);
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
      } else {
        setUser(false);
        // User is signed out
        // ...
      }
    });
  };
  checkUserExists();
  return (
    <div className="flex flex-col items-center w-[100vw] h-[100vh] dark:bg-grey-800">
      <div className="p-1 ">{user ? <Mainpage /> : <Login />}</div>
    </div>
  );
}

export default App;
