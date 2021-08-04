import React, { useEffect, useState } from 'react'

import { User } from 'devu-shared-modules'

import PageWrapper from 'components/shared/layouts/pageWrapper'

import LoadingOverlay from 'components/shared/loaders/loadingOverlay'

import { useParams } from 'react-router-dom'

import RequestService from 'services/request.service'

import EditUserForm from 'components/shared/forms/editUserForm'

import styles from './userDetailPage.scss'

import ErrorPage from './errorPage'

type Params = {
  userId: string
}

const UserDetailPage = ({}) => {
  const { userId } = useParams() as Params

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState({} as User)
  const [error, setError] = useState(null)

  useEffect(() => {
    RequestService.get(`/api/users/${userId}`)
      .then(setUser)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <LoadingOverlay delay={250} />
  if (error) return <ErrorPage error={error} />
  return (
    <PageWrapper>
      <div className={styles.userInformationFormWrapper}>
        <EditUserForm user={user} />
      </div>
    </PageWrapper>
  )
}

export default UserDetailPage
