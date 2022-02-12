import React from 'react'
import './Pagination.css'

function Pagination({handlePageNoClick,totalRows,rowsPerPage}) {
    
    const range = Math.ceil(totalRows/rowsPerPage); 
    const pageNumberArray=[]
 
     
    for (var i = 1; i <=range; i++) {
        pageNumberArray.push(i)
        
    }
    const pageNoButtons = pageNumberArray.map((pageNo) => {
        

        return <button  className="pageNoButton" key={pageNo} type="button" onClick ={()=>handlePageNoClick(pageNo)} > {pageNo} </button>
     })
   
    
    return (
        <div>
            
            
            {pageNoButtons}
            
           
        </div>
    )
}

export default Pagination
