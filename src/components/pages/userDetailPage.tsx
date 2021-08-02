import React, {useEffect, useState } from 'react'

import { User } from 'devu-shared-modules'

import PageWrapper from 'components/shared/layouts/pageWrapper'

import {useParams } from 'react-router-dom'

import RequestService from 'services/request.service'

import EditUserForm from 'components/shared/forms/editUserForm'

import styles from './userDetailPage.scss'


const UserDetailPage = ({}) =>{


const requestedUser = useParams() as any
const requestedUserID = parseInt(requestedUser.userId)
const [userObj, setUserObj] = useState({} as User)

 useEffect(() => { 
	RequestService.get(`/api/users/${requestedUserID}`).then(setUserObj).catch((e) => console.error(e))
 }, []);


//using authed user right now for inital population but will use requested user from api later
return (
	<PageWrapper>
	<div className={styles.userDetailDiv}>
		<EditUserForm userObj={userObj}  />
	</div>
	</PageWrapper>)
} 

export default UserDetailPage
