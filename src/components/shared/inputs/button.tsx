import React from 'react'

import styles from './button.scss'

type Props = {
  label: string
  className?: string
  onClick?: () => void
  loading?: boolean
}

const Button = ({ className = '', label, loading = false, onClick }: Props) => {
  if (loading)
    return (
      <button
        disabled
        className={`${className} ${styles.defaultButton} ${styles.isLoading}`}
        aria-label={label}
        onClick={onClick}>
        <span className={styles.loading}></span>
        <span className={styles.buttonLabel}>{label}</span>
      </button>
    )
  else
    return (
      <button className={`${className} ${styles.defaultButton}`} aria-label={label} onClick={onClick}>
        {label}
      </button>
    )
}

export default Button
