import React, { useEffect, useState } from 'react'
import { Assignment, Course } from 'devu-shared-modules'

import PageWrapper from 'components/shared/layouts/pageWrapper'
import LoadingOverlay from 'components/shared/loaders/loadingOverlay'

import RequestService from 'services/request.service'
import { useParams } from 'react-router-dom'
import ErrorPage from './errorPage'
import AssignmentListItem from 'components/listItems/assignmentListItem'

type Params = {
    courseId: string
}

const CourseDetailPage = () => {
    const [loading, setLoading] = useState(true);
    const [course, setCourse] = useState({} as Course);
    const [assignments, setAssignments] = useState(new Array<Assignment>());
    const [error, setError] = useState(null);
    const [isActive, setActive] = useState(false);

    const { courseId } = useParams() as Params;

    useEffect(() => {
        fetchCourse();
    }, []);

    const fetchCourse = async () => {
        try {
            const pageCourse = await RequestService.get(`/api/courses/${courseId}`);
            /*
                Assuming active/inactive is relative to the users' current date,
                determine whether a course is active based on the current date's 
                relation to the start/end time.
            */
            if (new Date(pageCourse.startDate) < new Date() && new Date(pageCourse.endDate) > new Date()) {
                setActive(true);
            }
            setCourse(pageCourse);
            setAssignments(await RequestService.get(`/api/assignments`));
        }
        catch(error) {
            setError(error)
        } finally {
            setLoading(false);
        }
    }

    if (loading) return <LoadingOverlay />
    if (error) return <ErrorPage error={error} />

    return (
        <PageWrapper>
            <div className="header">
                <h2 className="name">{course.name}</h2>
                <h3 className="subtitle">{isActive ? 'Active' : 'Inactive'} | {course.semester}</h3>
            </div>
            <div className="assignments">
                <h2>Assignments</h2>
            {assignments.map((assignment) => (
                <AssignmentListItem key={assignment.id} assignment={assignment} courseId={course.id?.toString() || ''} />
            ))}
            </div>
        </PageWrapper>
    )
}
export default CourseDetailPage
