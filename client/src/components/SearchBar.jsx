import React, { useEffect, useRef } from 'react'

function SearchBar({ setSearch }) {
     const focusRef = useRef(null)
     useEffect(() => {
          focusRef.current.focus();
     }, [])
     return (
          <div className="outer">
               <input ref={focusRef} type="text" placeholder='Search here...' className='searchBar shadow-nice' onChange={e => setSearch(e.target.value)} />
               <span className='magnifire'>🔍</span>
          </div>

     )
}

export default SearchBar