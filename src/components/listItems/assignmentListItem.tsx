import React from 'react'
import { Link } from 'react-router-dom'
import { Assignment } from 'devu-shared-modules'

import { prettyPrintDate } from 'utils/date.utils'

import styles from './assignmentListItem.scss'

import colorHash from 'utils/colorHash.utils'

type Props = {
  assignment: Assignment
}

const AssignmentListItem = ({ assignment }: Props) => (
  <Link to={`/assignments/${assignment.id}`} className={styles.container}>
    <div className={styles.tag} style={{backgroundColor: colorHash(String(assignment))}}></div>
    <div>
      <div className={styles.name}>{assignment.name}</div>
      <div className={styles.subText}>
        <div>{assignment.description}</div>
        <div>Start Date: {prettyPrintDate(assignment.startDate)}</div>
        <div>Due Date: {prettyPrintDate(assignment.dueDate)}</div>
        <div>End Date: {prettyPrintDate(assignment.endDate)}</div>
        {/* Add any other class information here */}
      </div>
    </div>
  </Link>
)

export default AssignmentListItem
