import React,  { useState }  from 'react'

import TextField from 'components/shared/inputs/textField'

import RequestService from 'services/request.service'

import { User } from 'devu-shared-modules'

import Alert, {AlertBox, AlertBoxPositions} from 'components/shared/alerts/alert'

type EditUserFormFields = {
	userObj : User
}


const EditUserForm = ({userObj} : EditUserFormFields) =>{

if(userObj.id == undefined){
	return null
}


const [formData, setFormData] = useState<User>(userObj)
const [list, setList] = useState(new Array<AlertBox>())
const [alertID, setAlertID] = useState(0)

const handleUpdatePreferredName = (preferredName: string) => setFormData({ ...formData, preferredName })

const submit = () => {

RequestService.put(`/api/users/${userObj.id}`, {})
  .then((response) => {
console.log(response);

// const testList: Array<AlertBox> = [
//     {
//       title: 'Success',
//       description: 'This is a success Alert component it will disapper in 3 seconds',
//       backgroundColor: '#5cb85c',
//       type: "Success",
//       autoDelete: true,
//       dismissTime: 3000
//     },
//     {
//       title: 'Danger',
//       description: 'This is an error Alert component',
//       backgroundColor: '#d9534f',
//       type: "Error",
//       autoDelete: true,
//     },
// ];
// setList(testList)
				
  }).catch((e) => {
  	console.log(alertID)
  	let newList = new Array<AlertBox>()
  	let id  = alertID
  	e.map((error : any)=>{
  		newList = [...newList, {
  			id: id++, 
	      title: 'Error',
	      description: error.msg + " For " + error.param,
	      backgroundColor: '#d9534f',
	      type: "Error",
	      autoDelete: true,
	    }]
  	})
  	setAlertID(id)
  	setList(newList)
  })
}

return (
	<>
	<Alert alerts={list} position={AlertBoxPositions.BL} />
		<div>
			<h1>User Information</h1>
			<TextField type="text" onChange={handleUpdatePreferredName} label="Preferred Name" id="preferredName" placeholder={userObj.preferredName} />
			<TextField type="text" onChange={()=>null} label="Email" id="email" placeholder={userObj.email} disabled />
			<TextField type="text" onChange={()=>null} label="Person Number" id="externalId" placeholder={userObj.externalId} disabled />
			<button onClick={submit}>Submit</button>
		</div>
	</>)
} 

export default EditUserForm