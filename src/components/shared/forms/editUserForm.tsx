import React, { useState } from 'react'

import { User, ExpressValidationError } from 'devu-shared-modules'

import { useAppDispatch } from 'redux/hooks'
import { SET_ALERT } from 'redux/types/active.types'

import TextField from 'components/shared/inputs/textField'

import RequestService from 'services/request.service'

import Button from 'components/shared/inputs/button'

type Props = {
  user: User
}

const EditUserForm = ({ user }: Props) => {
  const [formData, setFormData] = useState<User>(user)
  const [loading, setLoading] = useState(false)
  const setAlert = useAppDispatch(SET_ALERT)

  const handleUpdatePreferredName = (preferredName: string) => setFormData({ ...formData, preferredName })

  const handleSubmit = () => {
    setLoading(true)
    RequestService.put(`/api/users/${user.id}`, formData)
      .then(() => setAlert({ autoDelete: true, type: 'success', message: 'User Preferences Updated' }))
      .catch((err: ExpressValidationError[] | Error) => {
        const message = Array.isArray(err) ? err.map((e) => `${e.param} ${e.msg}`).join(', ') : err.message
        setAlert({ autoDelete: false, type: 'error', message })
      })
      .finally(() => setLoading(false))
  }

  return (
    <div>
      <h1>User Information</h1>
      <TextField
        onChange={handleUpdatePreferredName}
        label='Preferred Name'
        id='preferredName'
        placeholder={user.preferredName}
      />
      <TextField type='email' label='Email' id='email' placeholder={user.email} disabled />
      <TextField label='Person Number' id='externalId' placeholder={user.externalId} disabled />
      <Button onClick={handleSubmit} loading={loading}>
        Submit
      </Button>
    </div>
  )
}

export default EditUserForm
