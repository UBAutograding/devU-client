import React, { useEffect, useState } from 'react'
import { Course } from 'devu-shared-modules'

import PageWrapper from 'components/shared/layouts/pageWrapper'
import LoadingOverlay from 'components/shared/loaders/loadingOverlay'

import RequestService from 'services/request.service'
import { useParams } from 'react-router-dom'
import ErrorPage from './errorPage'

type Params = {
    courseId: string
}

const CourseDetailPage = () => {
    const [loading, setLoading] = useState(true)
    const [course, setCourse] = useState({} as Course)
    const [error, setError] = useState(null)

    const { courseId } = useParams() as Params

    useEffect(() => {
        RequestService.get(`/api/courses/${courseId}`)
            .then(setCourse)
            .catch(setError)
            .finally(() => setLoading(false))
    }, [])

    if (loading) return <LoadingOverlay />
    if (error) return <ErrorPage error={error} />

    return (
        <PageWrapper>
            <div>{course.name}</div>
        </PageWrapper>
    )
}
export default CourseDetailPage
