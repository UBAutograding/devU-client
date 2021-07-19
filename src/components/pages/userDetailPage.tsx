import React, {useEffect} from 'react'

// import { User } from 'devu-shared-modules'

import PageWrapper from 'components/shared/layouts/pageWrapper'

import {useParams } from 'react-router-dom'

import RequestService from 'services/request.service'

// import EditUserForm from 'components/shared/forms/editUserForm'




const UserDetailPage = ({}) =>{


const requestedUser = useParams() as any
const requestedUserID = parseInt(requestedUser.userId)


 useEffect(() => { 
	RequestService.get(`/api/users/${requestedUserID}`).then((user) => {
		//do something with user so it compiles
		console.log(user)
	 }).catch((e) => console.error(e))
 });






//using authed user right now for inital population but will use requested user from api later
return (
	<PageWrapper>
		
	</PageWrapper>)
} 

export default UserDetailPage
