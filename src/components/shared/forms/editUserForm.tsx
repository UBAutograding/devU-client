import React, { useState } from 'react'

import { User, ExpressValidationError } from 'devu-shared-modules'

import { useAppDispatch } from 'redux/hooks'
import { SET_ALERT } from 'redux/types/active.types'

import TextField from 'components/shared/inputs/textField'

import RequestService from 'services/request.service'

type Props = {
  user: User
}

const EditUserForm = ({ user }: Props) => {
  const [formData, setFormData] = useState<User>(user)
  const setAlert = useAppDispatch<typeof SET_ALERT>(SET_ALERT)

  const handleUpdatePreferredName = (preferredName: string) => setFormData({ ...formData, preferredName })

  const submit = () => {
    RequestService.put(`/api/users/${user.id}`, {})
      .then((response) => console.log(response))
      .catch((err: ExpressValidationError[] | Error) => {
        const message = Array.isArray(err) ? err.map((e) => `${e.param} ${e.msg}`).join(', ') : err.message

        setAlert({ autoDelete: true, type: 'error', message })
      })
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
      <button onClick={submit}>Submit</button>
    </div>
  )
}

export default EditUserForm
