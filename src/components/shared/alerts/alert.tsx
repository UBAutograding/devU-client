import React, { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { SET_ALERT } from 'redux/types/active.types'

import { getCssVariables } from 'utils/theme.utils'

import FaIconButton from 'components/shared/inputs/faIconButton'

import styles from './alert.scss'

const Alert = () => {
  const alert = useAppSelector((state) => state.active.alert)
  const setAlert = useAppDispatch(SET_ALERT)

  useEffect(() => {
    if (alert && alert.autoDelete) setTimeout(() => setAlert(null), 5000)
  }, [alert])

  const handleRemoveAlert = () => setAlert(null)

  if (!alert) return null

  const colors = getCssVariables()

  let backgroundColor = colors.red

  if (alert.type === 'warning') backgroundColor = colors.yellow
  else if (alert.type === 'info') backgroundColor = colors.purple
  else if (alert.type === 'success') backgroundColor = colors.green

  return (
    <div className={styles.notificationContainer}>
      <div className={styles.notification} style={{ backgroundColor }}>
        <FaIconButton buttonClass={styles.notificationClose} onClick={handleRemoveAlert} icon='times' />
        <div className={styles.notificationMessageContainer}>
          <p className={styles.notificationMessage}>{alert.message}</p>
        </div>
      </div>
    </div>
  )
}

export default Alert
