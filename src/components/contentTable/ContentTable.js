import React,{useState,useEffect} from 'react'
import axios from 'axios';
import './ContentTable.css'
import ReadOnlyRow from '../ReadOnlyRow/ReadOnlyRow';
import EditableTableRow from '../EditableTableRow/EditableTableRow';
import Pagination from '../Pagination/Pagination';
import Search from '../Search/Search'

function ContentTable() {
    const [data,setData] = useState([]); //state to represent fetched data from url
    const [editUserId,setEditUserId] = useState(null);
    const [editFormData,setEditFormData] = useState({
      name:"",
      email:"",
      role:""
    });
    
   const [currentPage,setCurrentPage] =useState(1);
    
   const [searchQuery,setSearchQuery] = useState("")
   
   const url = "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    
    useEffect(() => {    
      let isApiSubscribed = true;
      axios.get(url).then((response) => {
          if (isApiSubscribed) {
              setData(response.data)
              
          }
      });
      return () => {
          // disposing the subscription that no longer needed to avoid memory leak
          isApiSubscribed = false;
      };
  }, []);

      
    
   
  const handleEditClick = (e,obj)=>{
    e.preventDefault();
    setEditUserId(obj.id)
    const formValues = {
      name :obj.name,
      email :obj.email,
      role : obj.role
    }
    setEditFormData(formValues);
  }
  const handleEditFormChange = (e)=>{
    e.preventDefault();
    const fieldName = e.target.getAttribute("name");
    const fieldValue = e.target.value;
    const newFormData = {...editFormData}
    newFormData[fieldName] =fieldValue
    setEditFormData(newFormData)
  }
  const handleEditFormSubmit = (e)=>{
    e.preventDefault();
    const editedUser = {
      id:editUserId,
      name: editFormData.name,
      email: editFormData.email,
      role: editFormData.role
    }
    const newUsers=[...data];
    const index=data.findIndex((obj)=>obj.id===editUserId)
    newUsers[index] = editedUser
    setData(newUsers)
    setEditUserId(null)

  }
  const handleCancelClick = () =>{
    setEditUserId(null);
  }
  const handleDeleteClick=(userId) =>{
    const newUsers=[...data];
    const index=data.findIndex((obj)=>obj.id===userId)
    newUsers.splice(index,1);
    setData(newUsers)
  }
  const handleDeleteSelectedClick=(userId) =>{
    const newUsers=[...data];
    const index=data.findIndex((obj)=>obj.id===userId)
    newUsers.splice(index,1);
    setData(newUsers)
  }
  const totalRows = data.length;
  var noOfFilteredRows = 0;
  const rowsPerPage = 10;
  const indexOfLastData = currentPage*rowsPerPage;
  const indexOfFirstData = indexOfLastData - rowsPerPage;
  let currentPageData=data.slice(indexOfFirstData,indexOfLastData)
  const handlePageNoClick = (pageNo)=>{
     let  currentPageNo = pageNo;
     setCurrentPage(currentPageNo);     
     }

     const handleSearchQuery=(searchTerm)=>{

       setSearchQuery(searchTerm)
     }
     const handleSelectAll=(e)=>{
       const selectedUserIds = []
       if(data.id===selectedUserIds){
       
        
       }
       else{
         

       }
       return selectedUserIds

     }
     const handleSelectOne=()=>{

     }
    
  
    return (
        <div>
          <Search handleSearchQuery={handleSearchQuery}/>
          <form onSubmit={handleEditFormSubmit}>
          <table id='customers'>
        
           <thead>
  <tr>
    <th> <input type="checkbox" onChange={(e) => {handleSelectAll(e)}} name="selectAll"/> </th>
    <th>Name</th>
    <th>Email</th>
    <th>Role</th>
    <th>Actions</th>
    
  </tr>
  </thead>
  <tbody> 
        {
          // if searchQuery is there execute this:
        searchQuery?(data.filter(val=>
        {if(searchQuery===""){return val }
        else if(val.name.toLowerCase().includes(searchQuery.toLowerCase())||
        val.email.toLowerCase().includes(searchQuery.toLowerCase())||
        val.role.toLowerCase().includes(searchQuery.toLowerCase())){
          noOfFilteredRows++;
          return val
          } else {
            return 0;
          }
        }).slice(indexOfFirstData,indexOfLastData).map((obj)=>(

      <>  
            <tr>

          
            {(editUserId === obj.id) ? (<EditableTableRow editFormData={editFormData} 
            handleEditFormChange={handleEditFormChange}
            handleCancelClick={handleCancelClick}
            handleSelectOne={handleSelectOne}/>): 
            (<ReadOnlyRow 
              obj = {obj} 
            handleEditClick={handleEditClick}
            handleDeleteClick={handleDeleteClick}
            handleSelectOne={handleSelectOne}
            
            /> )}   
            </tr>       
      </>  
        )))
        : //if searchQuery is not there execute these:
        (currentPageData.map((obj)=>(

      <>  
            <tr>

          
            {(editUserId === obj.id) ? (<EditableTableRow editFormData={editFormData} 
            handleEditFormChange={handleEditFormChange}
            handleCancelClick={handleCancelClick}
            handleSelectOne={handleSelectOne}/>): 
            (<ReadOnlyRow 
              obj = {obj} 
            handleEditClick={handleEditClick}
            handleDeleteClick={handleDeleteClick}
            handleSelectOne={handleSelectOne}
            
            /> )}   
            </tr>       
      </>  
        )))} 
  </tbody>
  </table>
  </form>
  <div className='sideBySide'>
  <button type='button' onClick={()=>{handleDeleteSelectedClick()}} className="deleteSelectedButton">Delete Selected</button> 
  <Pagination handlePageNoClick={handlePageNoClick} totalRows={searchQuery?noOfFilteredRows:totalRows} rowsPerPage={rowsPerPage}/>
  </div> 

  </div>
          
    )
}

export default ContentTable
