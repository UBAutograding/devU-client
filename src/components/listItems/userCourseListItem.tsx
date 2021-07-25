import React from 'react'
import { Link } from 'react-router-dom'
import { UserCourse, Course } from 'devu-shared-modules'

import { prettyPrintDate } from 'utils/date.utils'

import styles from './userCourseListItem.scss'

type Props = {
  userCourse: UserCourse
  course: Course
}

const UserCourseListItem = ({ userCourse, course }: Props) => (
  <Link to={`/courses/${course.id}`} className={styles.container}>
    <div>
      <div className={styles.name}>{course.name}</div>
      <div className={styles.subText}>{course.number}</div>
      <div className={styles.subText}>{course.semester}</div>
    </div>
    <div>
      <div className={styles.date}>
        <span className={styles.dateLabel}>Start Date:</span>
        {prettyPrintDate(course.startDate)}
      </div>
      <div className={styles.date}>
        <span className={styles.dateLabel}>End Date:</span>
        {prettyPrintDate(course.endDate)}
      </div>
      <div>Dropped: {userCourse.dropped ? 'Yes' : 'No'}</div>
    </div>
  </Link>
)

export default UserCourseListItem
