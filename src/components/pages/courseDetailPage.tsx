import React, { useEffect, useState } from 'react'
import { Assignment, Course, UserCourse } from 'devu-shared-modules'

import PageWrapper from 'components/shared/layouts/pageWrapper'
import LoadingOverlay from 'components/shared/loaders/loadingOverlay'
import Dropdown, { Option } from 'components/shared/inputs/dropdown'
import Button from 'components/shared/inputs/button'
import AssignmentListItem from 'components/listItems/assignmentListItem'

import ErrorPage from './errorPage'
import styles from './courseDetailPage.scss'

import RequestService from 'services/request.service'
import LocalStorageService from 'services/localStorage.service'
import { Link, useParams } from 'react-router-dom'
import { prettyPrintDate } from 'utils/date.utils'
import { useAppSelector } from 'redux/hooks'

const ORDER_BY_STORAGE_KEY = 'course_assignments_order_by'
const GROUP_BY_STORAGE_KEY = 'course_assignments_group_by'

type OrderBy = 'activeDueDate' | 'dueDate' | 'active' | 'assignmentName'
type GroupBy = 'id' | 'category' | 'name' | 'dueDate' | 'active'

const orderByOptions: Option<OrderBy>[] = [
  { label: 'Default', value: 'activeDueDate' },
  { label: 'Due Date', value: 'dueDate' },
  { label: 'Active', value: 'active' },
  { label: 'Name', value: 'assignmentName' },
]

const groupByOptions: Option<GroupBy>[] = [
    { label: 'Defualt', value: 'id' },
    { label: 'Category', value: 'category' },
    { label: 'Name', value: 'name' },
    { label: 'Due Date', value: 'dueDate' },
    { label: 'Active', value: 'active' }
]

type Params = {
    courseId: string
}

const CourseDetailPage = () => {
    const defaultOrderBy = LocalStorageService.get<OrderBy>(ORDER_BY_STORAGE_KEY) || 'activeDueDate'
    const defaultGroupBy = LocalStorageService.get<GroupBy>(GROUP_BY_STORAGE_KEY) || 'id'

    const [loading, setLoading] = useState(true);
    const [course, setCourse] = useState({} as Course);
    const [userCourse, setUserCourse] = useState<UserCourse>({} as UserCourse);
    const [assignments, setAssignments] = useState(new Array<Assignment>());
    const [error, setError] = useState(null);
    const [orderBy, setOrderBy] = useState<OrderBy>(defaultOrderBy);
    const [groupBy, setGroupBy] = useState<GroupBy>(defaultGroupBy);

    const { courseId } = useParams() as Params;

    useEffect(() => {
        fetchCourse(orderBy, groupBy);
    }, []);

    const userId = useAppSelector((store) => store.user.id);

    const fetchCourse = async (orderBy: OrderBy, groupBy: GroupBy) => {
        try {
            const pageCourse = await RequestService.get(`/api/courses/${courseId}`);
            setCourse(pageCourse);
            setAssignments(await RequestService.get(`/api/assignments?orderBy=${orderBy}?groupBy=${groupBy}`));

            // Find the users relationship to the course by calling all user-course objects, and seeing if any have the user/course id.
            const userCourses = await RequestService.get<UserCourse[]>(`/api/user-courses`);
            const uCourse = userCourses.filter(u => u.courseId === parseInt(courseId) && u.userId === userId).shift()
            if (uCourse) { setUserCourse(uCourse); }
        }
        catch(error) {
            setError(error)
        } finally {
            setLoading(false);
        }
    }

    const handleFilterChange = (updatedOrderBy: OrderBy) => {
        setOrderBy(updatedOrderBy)
        fetchCourse(updatedOrderBy, groupBy)
    
        LocalStorageService.set(ORDER_BY_STORAGE_KEY, updatedOrderBy)
      }
    
      const handleGroupByChange = (updatedGroupBy: GroupBy) => {
        setGroupBy(updatedGroupBy)
        fetchCourse(orderBy, updatedGroupBy)
    
        LocalStorageService.set(GROUP_BY_STORAGE_KEY, updatedGroupBy)
      }

    if (loading) return <LoadingOverlay delay={250} />
    if (error) return <ErrorPage error={error} />

    const defaultOrderByOption = orderByOptions.find((o) => o.value === orderBy)
    const defaultGroupByOption = groupByOptions.find((o) => o.value === groupBy)

    return (
        <PageWrapper>
            <header>
                <h1>{course.name}</h1>
                <div className={styles.subtitle}>
                    <h3>{course.number} | {course.semester} ({prettyPrintDate(course.startDate)}-{prettyPrintDate(course.endDate)})</h3>
                    {userCourse.level === "instructor" &&
                        <Link to={`${courseId}/update`}><Button>Update Course</Button></Link>
                    } 
                </div>
            </header>
            {userCourse &&
                <div>
                    <Link className={styles.button} to={`${courseId}/assignments`}><Button>Gradebook</Button></Link>
                    <Link className={styles.button} to={`${courseId}/roster`}><Button>Roster</Button></Link>
                </div>
            }
            <div>
                <div className={styles.assignmentsHeader}>
                    <h2>Assignments</h2>
                    <div className={styles.dropdowns}>
                        <Dropdown
                            label='Group By'
                            className={styles.dropdown}
                            options={groupByOptions}
                            onChange={handleGroupByChange}
                            defaultOption={defaultGroupByOption}
                        />
                        <Dropdown
                            label='Order By'
                            className={styles.dropdown}
                            options={orderByOptions}
                            onChange={handleFilterChange}
                            defaultOption={defaultOrderByOption}
                        />
                    </div>
                </div>
                {assignments.map((assignment) => (
                    <AssignmentListItem key={assignment.id} assignment={assignment} courseId={course.id?.toString() || ''} />
                ))}
            </div>
        </PageWrapper>
    )
}
export default CourseDetailPage
