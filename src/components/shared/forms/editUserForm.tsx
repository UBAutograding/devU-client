import React,  { useState }  from 'react'

import TextField from 'components/shared/inputs/textField'

import RequestService from 'services/request.service'

import { User } from 'devu-shared-modules'

type EditUserFormFields = {
	userObj : User
}


const EditUserForm = ({userObj} : EditUserFormFields) =>{

if(userObj.id == undefined){
	return null
}


const [formData, setFormData] = useState<User>(userObj)

console.log(formData)

const handleUpdatePreferredName = (preferredName: string) => setFormData({ ...formData, preferredName })


const submit = () => {

RequestService.put(`/api/users/${userObj.id}`, formData)
  .then((response) => {
    console.log(response)
  }).catch((e) => console.error(e))
}

return (
	<>
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