import React, { useState, useEffect } from "react";
import keepIcon from "./keepIcon.png";
import { getAuth, signOut } from "firebase/auth";
//firestore
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { getDocs } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import uuid from "react-uuid";

const Card = ({ item }) => {
  return (
    <div class="max-w-sm rounded overflow-hidden shadow-lg bg-slate-100 m-5 ">
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">
          {item.title}--{item.id}
        </div>
        <p class="text-gray-700 text-[12px]">{item.input}</p>
      </div>
    </div>
  );
};

const Mainpage = () => {
  const auth = getAuth();
  const [Title, setTitle] = useState("");
  const [Input, setInput] = useState("");
  const [Email, setEmail] = useState(auth.currentUser.email);
  const [keepList, setkeepList] = useState([]);
  const db = getFirestore();

  useEffect(() => {
    readData();
  }, []);

  const createData = async () => {
    // const docRef = await setDoc(
    //   doc(db, "users", auth.currentUser.email, uuid()),
    //   {
    //     data: d,
    //   }
    // );
    try {
      let data = {
        title: Title,
        input: Input,
      };
      await setDoc(doc(db, Email.toString(), uuid()), data);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    readData();
  };
  //read
  const readData = async () => {
    const querySnapshot = await getDocs(collection(db, Email.toString()));
    let lists = [];
    querySnapshot.forEach((doc) => {
      lists.push({ ...doc.data(), id: doc.id });
      //console.log(`${doc.id} => ${doc.data().title}`);
    });
    console.log(lists);
    setkeepList(lists);
  };

  // Signout function
  const logout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <div>
      <ul className="w-[100vw] pl-10 pr-10 flex justify-between">
        <li className="mr-6 flex flex-row justify-center items-center gap-5">
          <img src={keepIcon} alt="keep" className="w-8 h-8 " />
          <a className="text-yellow-800 hover:text-blue-800" href="#">
            Welcome
            {" " + auth.currentUser.displayName}
          </a>
        </li>
        <li className="mr-6">
          <a className="text-blue-500 hover:text-blue-800" href="#">
            <button onClick={logout}>Logout</button>
          </a>
        </li>
      </ul>
      <div>
        <div className="p-5 flex justify-center">
          <div className="flex flex-col mb-3 xl:w-96">
            <label
              for="exampleFormControlTextarea1"
              className="form-label inline-block mb-2 text-gray-700"
            >
              Notes
            </label>
            <input
              type="text"
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
              class="w-full mt-2 mb-6 px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-yellow-500"
            />
            <textarea
              className="w-[70vw] px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-yellow-500"
              rows="4"
              onChange={(e) => setInput(e.target.value)}
            ></textarea>
            <div className="flex flex-row-reverse">
              <button
                onClick={createData}
                className=" w-[10rem] mt-4 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-3 p-16">
        {keepList.map((item) => (
          <Card item={item} />
        ))}
      </div>
    </div>
  );
};

export default Mainpage;
