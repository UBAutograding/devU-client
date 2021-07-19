import React from 'react'

import PageWrapper from 'components/shared/layouts/pageWrapper'

// import { useAppSelector } from 'redux/hooks'

// import {useParams } from 'react-router-dom'

// import TextField from 'components/shared/inputs/textField'

// import RequestService from 'services/request.service'



const EditUserForm = ({}) =>{


// type EditUserFormFields = {
// 	userID : int
// }

// const submit = () => {
// 	//will swap with sending to server but for now just console log 
// 	console.log(preferredName);
// 	console.log(email);
// 	console.log(externalID);
// }

// const requestedUser = useParams() as any
// const requestedUserID = parseInt(requestedUser.userId)

// const [preferredName, setPreferredName] = useState(props.preferredName)
// const [email, setEmail] = useState(authedUser.email)
// const [externalID, setExternalID] = useState(authedUser.externalId)




//using authed user right now for inital population but will use requested user from api later
return (
	<PageWrapper>
		{/*<TextField type="text" onChange={(value) => {setPreferredName(value)}} label="Preferred Name" id="preferredName" placeholder={preferredName} />
		<TextField type="text" onChange={(value) => {setEmail(value)}} label="Email" id="email" placeholder={email} />
		<TextField type="text" onChange={(value) => {setExternalID(value)}} label="Person Number" id="externalId" placeholder={externalID} />
		<button onClick={submit}>Submit</button>*/}
	</PageWrapper>)
} 

export default EditUserForm