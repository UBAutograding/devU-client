import React, { useState, useEffect } from 'react'
import { Submission } from 'devu-shared-modules'

import LoadingOverlay from 'components/shared/loaders/loadingOverlay'
import PageWrapper from 'components/shared/layouts/pageWrapper'
import SubmissionListItem from 'components/listItems/submissionListItem'
import Dropdown, { Option } from 'components/shared/inputs/dropdown'
import ErrorPage from './errorPage'

import RequestService from 'services/request.service'
import LocalStorageService from 'services/localStorage.service'

import styles from './userSubmissionsListPage.scss'

const ORDER_BY_STORAGE_KEY = 'submissions_order_by'

type OrderBy = 'submittedAt' | 'dueAt' | 'assignmentName' | 'courseName'

const orderByOptions: Option<OrderBy>[] = [
  { label: 'Submitted At', value: 'submittedAt' },
  { label: 'Due At', value: 'dueAt' },
  { label: 'Assignment', value: 'assignmentName' },
  { label: 'Course', value: 'courseName' },
]

const UserCoursesListPage = () => {
  const defaultOrderBy = LocalStorageService.get<OrderBy>(ORDER_BY_STORAGE_KEY) || 'submittedAt'

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [submissions, setSubmissions] = useState(new Array<Submission>())

  const [orderBy, setOrderBy] = useState<OrderBy>(defaultOrderBy)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    RequestService.get<Submission[]>(`/api/submissions?orderBy=${orderBy}`)
      .then(setSubmissions)
      .catch(setError)
      .finally(() => setLoading(false))
  }

  const handleFilterChange = (updatedOrderBy: OrderBy) => {
    setOrderBy(updatedOrderBy)
    fetchData()

    LocalStorageService.set(ORDER_BY_STORAGE_KEY, updatedOrderBy)
  }

  if (loading) return <LoadingOverlay delay={250} />
  if (error) return <ErrorPage error={error} />

  const defaultOption = orderByOptions.find((o) => o.value === orderBy)

  return (
    <PageWrapper>
      <div className={styles.header}>
        <h1>My Submissions</h1>
        <div className={styles.filters}>
          <Dropdown
            label='Order By'
            className={styles.dropdown}
            options={orderByOptions}
            onChange={handleFilterChange}
            defaultOption={defaultOption}
          />
        </div>
      </div>
      {submissions.map((submission) => (
        <SubmissionListItem key={submission.id} submission={submission} />
      ))}
    </PageWrapper>
  )
}

export default UserCoursesListPage
