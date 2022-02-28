import React from 'react'
import UserTable from '../../components/table'

function UserList({ selectdUsers }) {

     return (
          <>
               <UserTable selectdUsers={selectdUsers} />
          </>
     )
}

export default UserList