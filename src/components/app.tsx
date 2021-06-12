import React, { useState, useEffect } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { Switch, Route, Router } from 'react-router-dom'

import { Token, User } from 'devu-shared-modules'

import { setUser } from 'redux/actions/user.actions'

import RequestService from 'services/request.service'
import history from 'services/history.service'

import AuthProvider from 'components/pages/authProvider'
import LoadingOverlay from 'components/shared/loaders/loadingOverlay'

import HomePage from 'components/pages/homePage'
import NotFoundPage from 'components/pages/notFoundPage'
import { decodeAccessToken } from 'services/authentication.service'

const mapDispatch = { setUser }
const connector = connect(null, mapDispatch)

type Props = ConnectedProps<typeof connector>

const App = ({ setUser }: Props) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [authenticated, setAuthenticated] = useState(false)

  const getUserInfo = async () => {
    try {
      const loginResponse: Token = await RequestService.get('/api/login', { credentials: 'include' })
      const decodedToken = decodeAccessToken(loginResponse.accessToken)

      // Normally the RequestService will handle all of this for us
      // But because the auth token hasn't been written to the store yet (and the RequestService attempts to get
      // the access token from the store), we have to setup the request by hand
      const options = {
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          authorization: `Bearer ${loginResponse.accessToken}`,
        },
      }

      // Telling the request service to not use it's auth (it's not there) and passing by hand via options
      const user: User = await RequestService.get(`/api/users/${decodedToken.userId}`, options, true)

      setUser({ ...loginResponse, ...user })
      setAuthenticated(true)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getUserInfo()
  }, [])

  if (loading) return <LoadingOverlay delay={100} />
  if (!authenticated) return <AuthProvider />
  if (error) return <div>Error</div> // Should probably be an actual errors page

  // TODO - As the list of Routes grows, we should move this into a router.tsx
  return (
    <Router history={history}>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  )
}

export default connector(App)
