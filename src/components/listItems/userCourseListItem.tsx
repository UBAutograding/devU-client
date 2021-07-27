import React from 'react'
import { Link } from 'react-router-dom'
import { UserCourse, Course } from 'devu-shared-modules'

import { prettyPrintDate } from 'utils/date.utils'

import styles from './userCourseListItem.scss'

type Props = {
  userCourse: UserCourse
  course: Course
}

const UserCourseListItem = ({ course }: Props) => (
  <Link to={`/courses/${course.id}`} className={styles.container}>
    <div className={styles.tag}></div>
    <div>
      <div className={styles.name}>{course.name}</div>
      <div className={styles.subText}>
        <div>{course.number}</div>
        <div>Semester: {course.semester}</div>
        <div>Start Date: {prettyPrintDate(course.startDate)}</div>
        <div>End Date: {prettyPrintDate(course.endDate)}</div>
      </div>
    </div>
  </Link>
)

export default UserCourseListItem
