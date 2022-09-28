import { withRouter } from 'next/router';
import { useState } from 'react';
import Router from "next/router";

function Exam(props) {
  // user details
  const [name,setName] = useState('')
  const [age,setAge] = useState('')
  const [gender,setGender] = useState('female')

  // save data and route to next page
  const saveData=()=>{
    Router.push({ pathname: `/exam/seat-selection`, query: {'name':name,'age':age,'gender':gender} }, `/exam/seat-selection`)
  }
  // get prev props
  let examData = props.router.query;

  return (
    <div className="mainarea">
      <h1>{examData.title}</h1>
      <h4>{examData.detail1}<br/>
      {examData.detail2}</h4>
      <i>To be held on {Date(examData?.exam_date)}</i><br />
      <p>{examData.Eligibility}</p>
      <b>Enter Details </b><br /><br />
      <input type={'text'} placeholder='Name' onChange={(e)=>setName(e.target.value)} value={name}/><br />
      
      <input type={'number'} placeholder='Age' onChange={(e)=>setAge(e.target.value)} value={age} /><br />
      
      <select name="gender" id="gender" onChange={(e)=>setGender(e.target.value)} value={gender}><br />
        <option value="female">female</option>
        <option value="male">male</option>
      </select><br /><br />
      
      <button onClick={() => saveData()}>
        Select Seat
      </button>
    </div>
  )
}

export default withRouter(Exam);
