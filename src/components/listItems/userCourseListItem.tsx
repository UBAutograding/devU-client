import React from 'react'
import { UserCourse, Course } from 'devu-shared-modules'

import styles from './userCourseListItem.scss'

type Props = {
  userCourse: UserCourse
  course: Course
}

const UserCourseListItem = ({ userCourse, course }: Props) => (
  <div className={styles.container}>
    <div>
      <div className={styles.name}>{course.name}</div>
      <div className={styles.subText}>{course.number}</div>
      <div className={styles.subText}>{course.semester}</div>
    </div>
    <div>
      <div>Start Date: {new Date(course.startDate).toLocaleDateString()}</div>
      <div>End Date: {new Date(course.endDate).toLocaleDateString()}</div>
      <div>Dropped: {userCourse.dropped ? 'Yes' : 'No'}</div>
    </div>
  </div>
)

export default UserCourseListItem
