import React, { useState, useEffect } from 'react'
import { UserCourse, Course } from 'devu-shared-modules'

import PageWrapper from 'components/shared/layouts/pageWrapper'
import UserCourseListItem from 'components/listItems/userCourseListItem'

import RequestService from 'services/request.service'

import styles from './userCoursesListPage.scss'

const UserCoursesListPage = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [userCourses, setUserCourses] = useState(new Array<UserCourse>())
  const [courses, setCourses] = useState<Record<string, Course>>({})

  const fetchData = async () => {
    try {
      const userCourses: UserCourse[] = await RequestService.get(`/api/user-courses`)
      const courseRequests = userCourses.map((u) => RequestService.get(`/api/courses/${u.courseId}`))
      const courses: Course[] = await Promise.all(courseRequests)

      // Mapify course ids so we can look them up more easilly via their id
      const courseMap: Record<string, Course> = {}
      for (const course of courses) courseMap[course.id || ''] = course

      setUserCourses(userCourses)
      setCourses(courseMap)
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (loading) return <div>Loading</div>
  if (error) return <div>{error}</div>

  return (
    <PageWrapper>
      <div className={styles.courseTable}>
        <div className={styles.header}>
          <div className={styles.component}>Number</div>
          <div className={styles.component}>Name</div>
          <div className={styles.component}>Semester</div>
          <div className={styles.component}>Start Date</div>
          <div className={styles.component}>End Date</div>
          <div className={styles.component}>Dropped</div>
        </div>
        {userCourses.map((userCourse) => (
          <UserCourseListItem userCourse={userCourse} course={courses[userCourse.id || '']} />
        ))}
      </div>
    </PageWrapper>
  )
}

export default UserCoursesListPage
