import React, { useState, useEffect } from 'react'

import config from 'config'

import RequestService from 'services/request.service'

import LoadingOverlay from 'components/shared/loaders/loadingOverlay'

import styles from './authProvider.scss'

type Providers = {
  name: string
  route: string
}

const AuthProvider = ({}) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [providers, setProviders] = useState(new Array<Providers>())

  const fetchProviders = () => {
    RequestService.get('/api/login/providers')
      .then(setProviders)
      .catch(setError)
      .finally(() => setLoading(false))
  }

  const handleProviderSelect = (providerRoute: string) => {
    // Really strange, but we have to redirect to login in this case
    // This is likey to be different for each provider type
    // So we'll probably have to change how it works
    window.location.href = config.apiUrl + providerRoute
  }

  useEffect(fetchProviders, [])

  if (loading) <LoadingOverlay />
  if (error) <div>error</div>

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1>Select a Login Provider</h1>
        <div className={styles.providerList}>
          {providers.map((provider, index) => (
            <button onClick={() => handleProviderSelect(provider.route)} key={index} className={styles.providerButton}>
              Login with {provider.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AuthProvider
