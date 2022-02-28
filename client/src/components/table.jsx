import React, { useState, useEffect } from 'react'
import Axios from '../services/axios'
import SearchBar from './SearchBar'
import { useNavigate } from 'react-router-dom';


function UserTable({ selectdUsers }) {
     const naviage = useNavigate();
     const [users, setUsers] = useState([]);
     const [searchKey, setSearchKey] = useState('');
     const [userShow, setUserShow] = useState([]);


     useEffect(() => {
          (async () => {
               try {
                    const { data } = await Axios.get('/getUsers')
                    const userList = data.data
                    setUserShow(userList);
                    setUsers(userList)
               } catch (err) {
                    console.log(err)
               }
          })()
     }, [])


     useEffect(() => {
          const regx = new RegExp(searchKey);
          setUserShow(users.filter(user => user.userName.match(regx)))
     }, [searchKey, users])


     const particularUser = (data) => {
          selectdUsers([data])
          naviage('/users');
     }

     const allUsers = () => {
          selectdUsers(users)
          naviage('/users');
     }

     return (
          <div className='verticl-horizontal-center'>
               <div className="shadow-sm p2 layout">
                    <span>
                         <SearchBar setSearch={setSearchKey} />
                    </span>
                    {
                         searchKey && (
                              <span className='searchResult'>
                                   {
                                        userShow.map(user => (
                                             <div onClick={() => particularUser(user)} className="result ml3" key={user._id}>
                                                  <p>user</p>
                                                  <p>{user.userName}</p>
                                             </div>
                                        ))
                                   }
                                   <div className="result" onClick={allUsers} >
                                        <p>Action</p>
                                        <p style={{ color: 'blue' }} >Show all users</p>
                                   </div>
                              </span>
                         )
                    }

               </div>
          </div>
     )
}

export default UserTable