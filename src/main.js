import React, { useState, useEffect } from "react";
import keepIcon from "./keepIcon.png";
import { getAuth, signOut } from "firebase/auth";
//firestore
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, updateDoc } from "firebase/firestore";
import { getDocs } from "firebase/firestore";
import { doc, setDoc, deleteDoc } from "firebase/firestore";
import uuid from "react-uuid";
import { async } from "@firebase/util";

const Card = ({ item, date, deleteData, updateData }) => {
  const [showDropdown, setshowDropdown] = useState(false);
  const [ShowEditDialog, setShowEditDialog] = useState(false);
  const [EditInput, setEditInput] = useState(item.input);
  const [EditTitle, setEditTitle] = useState(item.title);
  function handleDropdown() {
    setshowDropdown(!showDropdown);
  }
  function DeleteKeep() {
    deleteData(item.id);
    // handleDropdown();
  }

  function onSave() {
    updateData(item.id, EditTitle, EditInput);
    setShowEditDialog(!ShowEditDialog);
    handleDropdown();
  }
  function onCancel() {
    setEditInput("");
    setEditTitle("");
    setShowEditDialog(!ShowEditDialog);
    handleDropdown();
  }
  return (
    <div className=" rounded overflow-hidden shadow-sm bg-slate-50 m-2 border min-h-[30vh] ">
      <div className="">
        <div className="flex justify-between items-center p-5">
          <p className="truncate w-[40%] font-bold text-lg "> {item.title}</p>
          <span className="text-yellow-600 text-[12px] ">
            {new Date(date).toDateString()}
          </span>
          <div class="flex justify-end">
            <button
              id="dropdownButton"
              data-dropdown-toggle="dropdown"
              className="hidden sm:inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5 "
              type="button"
              onClick={handleDropdown}
            >
              <svg
                class="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
              </svg>
            </button>
            {/* <!-- Dropdown menu --> */}
            {showDropdown ? (
              <div
                id="dropdown"
                className="absolute mt-10 w-44 text-base list-none bg-white rounded divide-y divide-gray-100 shadow"
              >
                <ul class="py-1" aria-labelledby="dropdownButton">
                  <li>
                    <a
                      href="#"
                      className="block py-2 px-4 text-sm text-yellow-600 "
                      onClick={() => setShowEditDialog(!ShowEditDialog)}
                    >
                      edit
                    </a>
                  </li>
                </ul>
                <ul class="py-1" aria-labelledby="dropdownButton">
                  <li>
                    <a
                      href="#"
                      className="block py-2 px-4 text-sm text-red-600 "
                      onClick={DeleteKeep}
                    >
                      Delete
                    </a>
                  </li>
                </ul>
              </div>
            ) : (
              ""
            )}
            {ShowEditDialog ? (
              <div
                id="dropdown"
                className=" flex flex-col absolute mt-10 p-10  bg-white rounded shadow-sm border"
              >
                <label
                  for="exampleFormControlTextarea11"
                  className="form-label inline-block mb-2 text-gray-700"
                >
                  Update
                </label>
                <input
                  type="text"
                  value={EditTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  placeholder="Title"
                  className="w-full mt-2 mb-6 px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-yellow-500"
                />

                <textarea
                  type="text"
                  value={EditInput}
                  onChange={(e) => setEditInput(e.target.value)}
                  className="w-full mt-2 mb-6 px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-yellow-500"
                />
                <span className="flex justify-end gap-1">
                  <button
                    onClick={onCancel}
                    className=" w-auto mt-4 text-red-500 bg-white-500 hover:bg-red-400 hover:text-white font-bold py-2 px-4  border-red-700 hover:border-red-500 rounded"
                  >
                    cancel
                  </button>
                  <button
                    onClick={onSave}
                    className=" w-auto mt-4 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                  >
                    Save
                  </button>
                </span>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <p className="text-gray-700 text-[12px] border-t-2 p-5 ">
          {item.input}
        </p>
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
    try {
      let data = {
        title: Title,
        input: Input,
        date: Date.now(),
      };
      await setDoc(doc(db, Email.toString(), uuid()), data);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setInput("");
    setTitle("");
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
    lists.sort(function (a, b) {
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return new Date(b.date) - new Date(a.date);
    });
    setkeepList(lists);
  };
  //delete Data
  const deleteData = async (id) => {
    await deleteDoc(doc(db, Email.toString(), id));
    readData();
  };

  const updateData = async (id, t, i) => {
    console.log(id);
    try {
      await updateDoc(doc(db, Email.toString(), id), {
        id: id,
        title: t,
        input: i,
        date: Date.now(),
      });
    } catch (error) {
      console.error(error);
    }

    readData();
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
    <div className="w-[100vw]">
      <ul className="w-auto pl-5 pr-5 pt-5 flex justify-between ">
        <li className="mr-6 flex flex-row justify-center items-center gap-5">
          <img src={keepIcon} alt="keep" className="w-8 h-8 " />
          <a className="text-yellow-800 hover:text-blue-800" href="#">
            Welcome
            {" " + auth.currentUser.displayName}
          </a>
        </li>
        <li className="mr-1">
          <a className="text-blue-500 hover:text-blue-800" href="#">
            <button onClick={logout}>Logout</button>
          </a>
        </li>
      </ul>
      <div className="w-[90vw] bg-grey-100 dark:bg-grey-800">
        <div className="pt-5 flex justify-center">
          <div className=" w-[40vw] flex flex-col mb-3">
            <label
              for="exampleFormControlTextarea1"
              className="form-label inline-block mb-2 text-gray-700"
            >
              Write Notes
            </label>
            <input
              type="text"
              placeholder="Title"
              value={Title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full mt-2 mb-6 px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-yellow-500"
            />
            <textarea
              value={Input}
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-yellow-500"
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
      <div className="pl-16 text-3xl">Notes</div>
      <div className="grid pl-10 pr-10  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
        {keepList.map((item) => (
          <Card
            key={item.id}
            item={item}
            date={Date.now()}
            deleteData={deleteData}
            updateData={updateData}
          />
        ))}
      </div>
    </div>
  );
};

export default Mainpage;
