import React from 'react'
import './ReadOnlyRow.css'

function ReadOnlyRow({obj,handleEditClick,handleDeleteClick}) {
    return (
      <>

    <td>{obj.name}</td>
    <td>{obj.email}</td>
    <td>{obj.role}</td>
    <td>
      
      <i onClick={(e)=>handleEditClick(e,obj)} className="fa-solid fa-pen-to-square"></i>
      
      <i type='button' onClick={()=>{handleDeleteClick(obj.id)}} className="fa-solid fa-trash deleteButton"></i>
      
    </td>

    

  </>
    )
}

export default ReadOnlyRow
