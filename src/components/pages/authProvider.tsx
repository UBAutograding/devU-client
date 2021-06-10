import React, { useState, useEffect } from 'react'

import { Provider, ExpressValidationError, toCapitalizedWords } from 'devu-shared-modules'

import config from 'config'

import RequestService from 'services/request.service'

import LoadingOverlay from 'components/shared/loaders/loadingOverlay'
import TextField from 'components/shared/inputs/textField'

import styles from './authProvider.scss'

type ProviderSelectorProps = { providers: Provider[]; onSelect: (provider: Provider) => void }
type ProivderFormProps = { provider: Provider }

const ProviderSelector = ({ providers, onSelect }: ProviderSelectorProps) => (
  <>
    <h1>Select a Login Provider</h1>
    <div className={styles.providerList}>
      {providers.map((provider, index) => (
        <button onClick={() => onSelect(provider)} key={index} className={styles.providerButton}>
          Login with {provider.name}
        </button>
      ))}
    </div>
  </>
)

const ProviderForm = ({ provider }: ProivderFormProps) => {
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [_errors, setErrors] = useState(new Array<ExpressValidationError>())

  const { body: fields = [] } = provider

  const handleUpdateForm = (key: string, value: string) => setFormData({ ...formData, [key]: value })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const { route } = provider

    RequestService.post(`/api${route}`, formData, { credentials: 'include' })
      .then(() => window.location.reload())
      .catch(setErrors)
  }

  return (
    <>
      <h1>{toCapitalizedWords(provider.name)}</h1>
      <p className={styles.description}>{provider.description}</p>
      <form onSubmit={handleSubmit}>
        <div className={styles.fields}>
          {fields.map((fieldName: string, index: number) => (
            <TextField
              id={`input-${index}`}
              type={fieldName}
              label={fieldName}
              onChange={(value: string) => handleUpdateForm(fieldName, value)}
              key={index}
            />
          ))}
        </div>
        <button onSubmit={handleSubmit} className={styles.submit}>
          Submit
        </button>
      </form>
    </>
  )
}

const AuthProvider = ({}) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [providers, setProviders] = useState(new Array<Provider>())
  const [provider, setProvider] = useState<null | Provider>(null)

  const fetchProviders = () => {
    RequestService.get('/api/login/providers')
      .then(setProviders)
      .catch(setError)
      .finally(() => setLoading(false))
  }

  const handleProviderSelect = (provider: Provider) => {
    if (provider.method === 'post') return setProvider(provider)

    // Needs to allow the browser to actually redirect to via a 302
    window.location.href = config.apiUrl + provider.route
  }

  useEffect(fetchProviders, [])

  if (loading) <LoadingOverlay />
  if (error) <div>error</div>

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        {provider ? (
          <ProviderForm provider={provider} />
        ) : (
          <ProviderSelector providers={providers} onSelect={handleProviderSelect} />
        )}
      </div>
    </div>
  )
}

export default AuthProvider