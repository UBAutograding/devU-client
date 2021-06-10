import React from 'react'

import { ExpressValidationError } from 'devu-shared-modules'

import styles from './validationErrorViewer.scss'

type Props = {
  errors: ExpressValidationError[]
}

const ValidationErrorViewer = ({ errors }: Props) => (
  <>
    <label>Validation Errors</label>
    <div className={styles.errorContainer}>
      {errors.map((error, index) => (
        <ul key={index}>
          <li>
            {error.param} - {error.msg}
          </li>
        </ul>
      ))}
    </div>
  </>
)

export default ValidationErrorViewer
