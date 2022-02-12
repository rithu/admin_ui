import React from 'react'
import './Search.css'

function Search({handleSearchQuery}) {
    return (
        <div>
            <input type="text" className="searchBox" placeholder="search by name, email or role..." onChange={(e)=>handleSearchQuery(e.target.value)} name="search"/>
            
            
        </div>
    )
}

export default Search
