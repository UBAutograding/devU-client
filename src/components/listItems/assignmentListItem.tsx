import React from 'react'
import { Assignment } from 'devu-shared-modules'

import styles from './assignmentListItem.scss'
import { prettyPrintDate } from 'utils/date.utils'

import ListItemWrapper from 'components/shared/layouts/listItemWrapper'

type Props = {
  assignment: Assignment,
  courseId: string
}

const AssignmentListItem = ({ assignment, courseId }: Props) => (
  <ListItemWrapper
    to={`/courses/${courseId}/assignments/${assignment.id}`}
    tag={`${courseId}-${assignment.id}`}>
      <h3 className={styles.name}>{assignment.name}</h3>
      <p className={styles.dueDate}>Due At: {prettyPrintDate(assignment.dueDate)}</p>
  </ListItemWrapper>
)

export default AssignmentListItem
