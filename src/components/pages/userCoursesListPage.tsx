import React, { useState, useEffect } from 'react'
import { UserCourse, Course } from 'devu-shared-modules'

import PageWrapper from 'components/shared/layouts/pageWrapper'
import UserCourseListItem from 'components/listItems/userCourseListItem'

import RequestService from 'services/request.service'

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
      {userCourses.map((userCourse) => (
        <UserCourseListItem userCourse={userCourse} course={courses[userCourse.id || '']} />
      ))}
    </PageWrapper>
  )
}

export default UserCoursesListPage
