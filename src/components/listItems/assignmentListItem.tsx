import React from 'react'
import { Link } from 'react-router-dom'
import { Assignment } from 'devu-shared-modules'

import styles from './assignmentListItem.scss'
import { prettyPrintDate } from 'utils/date.utils'

type Props = {
  assignment: Assignment,
  courseId: string
}

const AssignmentListItem = ({ assignment, courseId }: Props) => (
  <Link to={`/courses/${courseId}/assignments/${assignment.id}`} className={styles.container} >
    <h3 className={styles.name}>{assignment.name}</h3>
    <p className={styles.dueDate}>Due {prettyPrintDate(assignment.dueDate)}</p>
  </Link>
)

export default AssignmentListItem
