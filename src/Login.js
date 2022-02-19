import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, provider } from "./firebase/Firebase";
import React from "react";
import keepIcon from "./keepIcon.png";

export default function Login() {
  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  return (
    <div className="flex flex-col items-center">
      <img src={keepIcon} alt="" className=" m-10 h-20 w-20 " />
      <div className="text-5xl p-10 text-yellow-500">Google Keep Clone</div>
      <center>
        <button
          onClick={signIn}
          className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
        >
          Sign In with Google
        </button>
      </center>
    </div>
  );
}
