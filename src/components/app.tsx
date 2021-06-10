import React, { useState, useEffect } from 'react'
import { Switch, Route, Router } from 'react-router-dom'

import RequestService from 'services/request.service'
import history from 'services/history.service'

import AuthProvider from './pages/authProvider'
import LoadingOverlay from 'components/shared/loaders/loadingOverlay'

import HomePage from 'components/pages/homePage'
import NotFoundPage from 'components/pages/notFoundPage'

const App = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [authenticated, setAuthenticated] = useState(false)

  const checkLoginStatus = () => {
    RequestService.get('/api/login', { credentials: 'include' })
      .then((res) => {
        console.log(res)
        setAuthenticated(true)
      })
      .catch(setError)
      .finally(() => setLoading(false))
  }

  useEffect(checkLoginStatus, [])

  if (loading) return <LoadingOverlay /> // TODO - needs some styling
  if (!authenticated) return <AuthProvider /> // TODO - needs to support POST & fields

  if (error) return <div>Error</div> // Should probably be an actual errors page

  return (
    <Router history={history}>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  )
}

export default App
