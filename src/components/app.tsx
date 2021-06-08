import React, { useEffect, useState } from 'react'
import { Switch, Route, Router } from 'react-router-dom'
import Cookies from 'js-cookie'

import config from '../config'

import RequestService from 'services/request.service'
import history from 'services/history.service'

import HomePage from 'components/pages/homePage'
import NotFoundPage from 'components/pages/notFoundPage'

const App = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const setLoadingSlow = () => setTimeout(() => setLoading(false), 2000)

  const fetchUserInfo = async () => {
    const jwt = Cookies.get('jwt')

    if (jwt) return setLoading(false)

    RequestService.get('/api/login')
      .then((res) => {
        const [ubProvider] = res

        window.location.href = config.apiUrl + ubProvider.route
      })
      .catch(setError)
      .finally(setLoadingSlow)
  }

  useEffect(() => {
    fetchUserInfo()
  }, [])

  if (loading) return <div>Loading</div>
  if (error) return <div>Error</div>

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
