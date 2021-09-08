import React, { useState, useEffect } from 'react'
import { Assignment } from 'devu-shared-modules'

import LoadingOverlay from 'components/shared/loaders/loadingOverlay'
import PageWrapper from 'components/shared/layouts/pageWrapper'
import Dropdown, { Option } from 'components/shared/inputs/dropdown'
import ErrorPage from './errorPage'

import RequestService from 'services/request.service'
import LocalStorageService from 'services/localStorage.service'

import styles from './userCoursesListPage.scss'
import AssignmentListItem from 'components/listItems/assignmentListItem'

const FILTER_LOCAL_STORAGE_KEY = 'courses_filter'

type Filter = 'all' | 'active' | 'inactive' | 'dropped'

const filterOptions: Option<Filter>[] = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
  { label: 'Dropped', value: 'dropped' },
]

const AssignmentsListPage = () => {
  const defaultFilter = LocalStorageService.get<Filter>(FILTER_LOCAL_STORAGE_KEY) || 'active'

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [assignments, setAssignments] = useState(new Array<Assignment>())
  const [filter, setFilter] = useState<Filter>(defaultFilter)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      // The filter isn't implemented by the API yet
      const assignments: Assignment[] = await RequestService.get(`/api/assignments?filterBy=${filter}`)

      setAssignments(assignments)
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (updatedFilter: Filter) => {
    setFilter(updatedFilter)
    fetchData()

    LocalStorageService.set(FILTER_LOCAL_STORAGE_KEY, updatedFilter)
  }

  if (loading) return <LoadingOverlay />
  if (error) return <ErrorPage error={error} />

  const defaultOption = filterOptions.find((o) => o.value === filter)

  return (
    <PageWrapper>
      <div className={styles.header}>
        <h2 className={styles.myCourses}>My Courses</h2>
        <div className={styles.filters}>
          <Dropdown
            label='Filter Courses'
            className={styles.dropdown}
            options={filterOptions}
            onChange={handleFilterChange}
            defaultOption={defaultOption}
          />
        </div>
      </div>
      {assignments.map((assignment) => (
        <AssignmentListItem assignment={assignment} />
      ))}
    </PageWrapper>
  )
}

export default AssignmentsListPage
