import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import Axios from "../services/axios";



export default function Modal({ selectdUsers, showModal, setStatus }) {
     const newUserFocus = useRef(null);
     useEffect(() => newUserFocus.current.focus(), []);

     const [error, setError] = useState('');
     const [name, setName] = useState('');

     // funciton to  add user;
     const addUser = async () => {
          if (!name) { setError('Please Enter a valid name'); return };
          try {
               const { data } = await Axios.post('/crateUser', { userName: name });
               selectdUsers(state => [{ userName: data.username, _id: data._id }, ...state])
               setStatus({ status: true, message: 'user created successfully', icon: "success" })
               showModal(false)

          } catch ({ response }) {

               setError(response.data.message)
          }
     }


     return ReactDOM.createPortal(
          <div className="modalContainer">

               <form action="" className="addUserFrom" onSubmit={(e) => e.preventDefault()}>
                    <center> <h2>Enter  the deatils of the user...</h2></center>
                    <button onClick={() => showModal(false)} className="closeModal shadow-sm" type="button">X</button>
                    <div className="inputWrap">
                         <label htmlFor="">UserName</label>
                         <br />
                         <input ref={newUserFocus} onChange={e => { setName(e.target.value); setError("") }} type="text" className="shadow-nice" />
                    </div>
                    <center>
                         <div className="inputWrap">
                              <button onClick={addUser} type="button">Add User</button>
                              <p className="error"> {error}</p>
                         </div>
                    </center>
               </form>
          </div>,
          document.getElementById("portal")
     )
}