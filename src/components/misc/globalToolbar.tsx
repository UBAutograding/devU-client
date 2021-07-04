import React from 'react'
import { Link } from 'react-router-dom'

import FaIcon, { IconLibrary } from 'components/shared/icons/faIcon'
import DarkModeToggle from 'components/utils/darkModeToggle'
import UserOptionsDropdown from 'components/utils/userOptionsDropdown'

import { useAppSelector } from 'redux/hooks'

import styles from './globalToolbar.scss'

const IconLink = ({ icon, to }: { icon: keyof typeof IconLibrary; to: string }) => (
  <Link to={to}>
    <FaIcon icon={icon} />
  </Link>
)

const GlobalToolbar = () => {
  const userId = useAppSelector((store) => store.user.id)

  return (
    <div className={styles.bar}>
      <h1>Auto Four</h1>
      <div className={styles.controls}>
        <IconLink icon='chalkboard' to={`/users/${userId}/courses/`} />
        <UserOptionsDropdown />
        <DarkModeToggle />
      </div>
    </div>
  )
}

export default GlobalToolbar
