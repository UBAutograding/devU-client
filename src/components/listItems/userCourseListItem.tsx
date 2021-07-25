import React from 'react'
import { UserCourse, Course } from 'devu-shared-modules'

type Props = {
  userCourse: UserCourse
  course: Course
}

const UserCourseListItem = ({ userCourse, course }: Props) => (
  <div>
    <div>{course.number}</div>
    <div>{course.name}</div>
    <div>{course.semester}</div>
    <div>{course.startDate}</div>
    <div>{course.endDate}</div>
    <div>{userCourse.dropped ? 'Yes' : 'No'}</div>
  </div>
)

export default UserCourseListItem
