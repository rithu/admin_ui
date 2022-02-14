import React from 'react'
import './EditableTableRow.css'

function EditableTableRow({editFormData, handleEditFormChange, handleCancelClick, handleSelectOne}) {
    return (
      <>
          <td>
              <input type="checkbox" 
              onChange={(e) => {handleSelectOne(e)}} 
              name="selectOne"/>
         </td>
          <td>
              <input 
              type="text" 
              required="required" 
              placeholder="enter name "
              name="name"
              value={editFormData.name}
              onChange={handleEditFormChange}></input>
          </td>
          <td>
          <input 
              type="email" 
              required="required" 
              placeholder="enter email "
              name="email"
              value={editFormData.email}
              onChange={handleEditFormChange}
              ></input>
          </td>
        
          <td>
          <input 
              type="text" 
              required="required" 
              placeholder="enter role "
              name="role"
              value={editFormData.role}
              onChange={handleEditFormChange}></input>
          </td>
          <td>
              <button type='submit' className='saveButton'>save</button>
              <button type='button'className='cancelButton' onClick={handleCancelClick}>cancel</button>
          </td>
     </>
    )
}

export default EditableTableRow
