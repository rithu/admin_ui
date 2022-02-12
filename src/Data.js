
import React,{useState} from 'react'
import axios from 'axios';


function Data() {
  const [data,setData] = useState([])
    const url = "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"

  
 

    return (
        <div>
          <button onClick={()=>axios.get(url).then((response)=>{
            console.log(response.data)
            setData(response.data)
          })}>click</button>
          { data.map((obj,index)=>{
              
             return <div><h1>{index+1}</h1><h1>{obj.name}</h1></div>
              

            })}
        </div>
    )
}

export default Data

