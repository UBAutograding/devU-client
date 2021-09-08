import React, { useState, useEffect } from 'react'
import { Assignment } from 'devu-shared-modules'

import LoadingOverlay from 'components/shared/loaders/loadingOverlay'
import PageWrapper from 'components/shared/layouts/pageWrapper'
import ErrorPage from './errorPage'

import RequestService from 'services/request.service'
import LocalStorageService from 'services/localStorage.service'

import styles from './homepage.scss'
import AssignmentListItem from 'components/listItems/assignmentListItem'



const Homepage = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [assignments, setAssignments] = useState(new Array<Assignment>())

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      // The filter isn't implemented by the API yet
      const assignments: Assignment[] = await RequestService.get(`/api/assignments?filterBy=dueDate`)

      setAssignments(assignments)
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <LoadingOverlay />
  if (error) return <ErrorPage error={error} />

  return (
    <PageWrapper>
      <div className={styles.header}>
        <h2 className={styles.myCourses}>My Assignments</h2>
      </div>
      {assignments.map((assignment) => (
        <AssignmentListItem assignment={assignment} />
      ))}
    </PageWrapper>
  )
}

export default Homepage
