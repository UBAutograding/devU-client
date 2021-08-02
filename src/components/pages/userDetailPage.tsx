import React, { useEffect, useState } from 'react'

import { User } from 'devu-shared-modules'

import PageWrapper from 'components/shared/layouts/pageWrapper'
import LoadingOverlay from 'components/shared/loaders/loadingOverlay'

import { useParams } from 'react-router-dom'

import RequestService from 'services/request.service'

import EditUserForm from 'components/shared/forms/editUserForm'

import styles from './userDetailPage.scss'

type Params = {
  userId: string
}

const UserDetailPage = ({}) => {
  const { userId } = useParams() as Params

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState({} as User)

  useEffect(() => {
    RequestService.get(`/api/users/${userId}`)
      .then(setUser)
      .catch((e) => console.error(e))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <LoadingOverlay />

  //using authed user right now for inital population but will use requested user from api later
  return (
    <PageWrapper>
      <div className={styles.userDetailDiv}>
        <EditUserForm user={user} />
      </div>
    </PageWrapper>
  )
}

export default UserDetailPage
