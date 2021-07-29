import React from 'react'

import { toCapitalizedWords } from 'devu-shared-modules'

import styles from './textField.scss'

type Props = {
  type: string
  onChange: (value: string, e: React.ChangeEvent<HTMLInputElement>) => void
  label?: string
  className?: string
  placeholder?: string
  id?: string
  disabled? : boolean 
}

const TextField = ({ type, onChange, className = '', label, placeholder, id, disabled }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value, e)
  }

  return (
    <div className={`${styles.textField} ${className}`}>
      {label && <label htmlFor={id}>{toCapitalizedWords(label)}</label>}
      <input id={id} type={type} onChange={handleChange} className={styles.input} placeholder={placeholder} disabled={disabled} />
    </div>
  )
}

export default TextField
