import React, { useState } from 'react'
import shortid from 'shortid'

import styles from './radioButtons.scss'

export type Option = {
  label: string
  value: any
  disabled?: boolean
}

type Props = {
  options: Option[]
  onChange: (value: any, e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
}

const CheckboxRadioList = ({ options, onChange, className = '' }: Props) => {
  const [name] = useState(shortid.generate())
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value, e)

  return (
    <div className={`${styles.list} ${className}`}>
      {options.map(({ label, value, disabled = false }) => (
        <span className={styles.item} key={value}>
          <input type='radio' name={name} id={value} value={value} onChange={handleChange} disabled={disabled} />
          <label htmlFor={value}>{label}</label>
        </span>
      ))}
    </div>
  )
}

export default CheckboxRadioList
