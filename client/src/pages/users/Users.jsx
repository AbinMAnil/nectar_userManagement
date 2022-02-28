import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Modal from '../../components/Modal';
import Axios from '../../services/axios';




function Users({ users, selectdUsers }) {

     const navigate = useNavigate();
     const editInputRef = useRef(null);

     const [showModal, setShowModal] = useState(false);
     const [editUser, setEditUser] = useState({ value: '', visible: '', userName: '' });
     const [createSuccess, setCreateSuccess] = useState({
          status: false,
          message: "",
          icon: "",
     })

     // edit users
     const confirmEditUser = async (e, userName) => {
          if (e.key !== 'Enter') return;
          if (editUser.value === '') return;
          if (userName === editUser.value) return;

          try {

               await Axios.post('/updateUser', { newUserName: editUser.value, id: editUser.visible })

               selectdUsers(
                    users.map(user => {
                         if (user._id === editUser.visible) {
                              user.userName = editUser.value
                              setEditUser({ value: "", visible: "", userName: "" })
                              setCreateSuccess({ status: true, icon: 'success', message: 'user updated successuly.' })
                              return user;
                         }
                         return user

                    })
               )
          } catch (err) {
               alert(err.response.data.message)
               console.log(err.response)

          }
     }
     const deleteUser = id => {
          console.log(id);
          Swal.fire({
               title: 'Are you sure?',
               text: "You won't be able to revert this!",
               icon: 'warning',
               showCancelButton: true,
               confirmButtonColor: '#3085d6',
               cancelButtonColor: '#d33',
               confirmButtonText: 'Yes, delete it!'
          }).then(async (result) => {
               if (result.isConfirmed) {
                    try {
                         const { data } = await Axios.delete('/deleteUser', { data: { id: id } });
                         setCreateSuccess({ icon: 'success', message: data.message, status: true })
                         selectdUsers(users.filter(user => user._id !== id));
                    } catch (err) {
                         alert(err.response.data.message)
                         console.log(err.response)
                    }
               }
          })
     }

     useEffect(() => {

          if (!createSuccess.status) return;
          const tost = async () => {
               const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                         toast.addEventListener("mouseenter", Swal.stopTimer);
                         toast.addEventListener("mouseleave", Swal.resumeTimer);
                    },
               });

               Toast.fire({
                    icon: createSuccess.icon,
                    title: createSuccess.message,
               });
          }
          tost();
     }, [createSuccess]);

     const startEdit = user => {
          setEditUser({ value: user.userName, visible: user._id })
     }

     return (
          (users.length === 0 || users[0]._id !== "") > 0 ? <>
               {showModal && <Modal selectdUsers={selectdUsers} showModal={setShowModal} setStatus={setCreateSuccess} />}
               <div className="verticl-horizontal-center">
                    <div className="shadow-sm p2 layout">
                         <div className="actionHead">
                              <span>
                                   <h3>{users.length} Users</h3>
                              </span>
                              <span>
                                   <button onClick={() => setShowModal(true)} className='shadow-lg'>Add user</button>
                              </span>
                         </div>
                         <div className="allUserBody">
                              <span className='searchResult limitHeight'>
                                   {
                                        users.length > 0 ? users.map(user => (
                                             <div className="allUserResult" key={user._id}>
                                                  <span>
                                                       {editUser.visible === user._id ? <input ref={editInputRef} type="text" onKeyPress={e => confirmEditUser(e, user.userName)} value={editUser.value} onChange={e => setEditUser({ ...editUser, value: e.target.value })} /> :
                                                            <p className='p1 userName'>{user.userName}</p>}
                                                  </span>
                                                  <span>
                                                       <button className='actonButton'>
                                                            {editUser.visible === user._id ? <i className="fa-solid fa-xmark" onClick={() => setEditUser({ ...editUser, visible: "" })}  ></i> : <i className="fa-solid fa-pen-to-square" onClick={() => startEdit(user)}> </i>}
                                                       </button>
                                                       <button onClick={() => deleteUser(user._id)} className='actonButton btn-red'><i className="fa-solid fa-delete-left"></i></button>
                                                  </span>
                                             </div>
                                        ))
                                             :
                                             <center >
                                                  <h2 style={{ color: "black" }}> there is no more users..</h2>
                                                  <button className='button_default' onClick={() => navigate('/')}>Back To Home</button>
                                             </center>
                                   }
                              </span>
                         </div>
                    </div>
               </div >

          </>
               :
               <div className="verticl-horizontal-center">
                    <div className="shadow-sm p2 layout">
                         <h2>Please select the users first</h2>
                         <button className='button_default' onClick={() => navigate('/')}>Go to home</button>
                    </div>
               </div>

     )
}

export default Users