import React from 'react'
import { useNavigate } from "react-router-dom";


function IntorLayout() {
     const navigate = useNavigate();
     // control + B to naviage the userList page 
     document.addEventListener("keypress", e => (e.code === 'KeyB' && e.ctrlKey) && navigate('/list'))

     return (
          <div className='verticl-horizontal-center  '>
               <div className="shadow-sm p4 layout layout-d-center">
                    <span>
                         <p className='hero'> Contacts</p>
                         <p className='subHero'>Press Cmd + B to active commant palete</p>
                    </span>
               </div>
          </div>
     )
}

export default IntorLayout