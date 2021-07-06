import React from 'react'

import PageWrapper from 'components/shared/layouts/pageWrapper'

import styles from './userCoursesListPage.scss'

// import FaIcon from 'components/shared/icons/faIcon'


const UserCoursesListPage = ({}) => <PageWrapper><RenderView/></PageWrapper>

type Course = {
    name: string,
    semester: string,
    number: string,
    startDate: Date,
    endDate: Date,
    status: string,
};

type State = {
    filter: string
};

class CourseView extends React.Component<Course, State> {
    render() {
        return (
            <div className={styles.row}>
                <div className={styles.component}>{this.props.number}</div>
                <div className={styles.component}>{this.props.name}</div>
                <div className={styles.component}>{this.props.semester}</div>
                <div className={styles.component}>
                    {this.props.startDate.getMonth()}/
                    {this.props.startDate.getDay()}/
                    {this.props.startDate.getFullYear()}
                </div>

                <div className={styles.component}>
                    {this.props.endDate.getMonth()}/
                    {this.props.endDate.getDay()}/
                    {this.props.endDate.getFullYear()}
                </div>
                <div className={styles.component}>{this.props.status}</div>
            </div>
        );
    }
}

class CourseFilter extends React.Component<{}, State> {
    state: State= {
        filter: "active"
    }

    onChange = (event: React.FormEvent<HTMLSelectElement>): void => {
        this.setState({ filter: event.currentTarget.value })
        // change order of requests (what is the most effient way to do this?)
    }

    render() {
        return (
            <form>
                <label>Status: </label>
                <select name="courseType" onChange={this.onChange}>
                    <option selected value="active">active</option>
                    <option value="inactive">inactive</option>
                    <option value="dropped">dropped</option>
                    <option value="all">all</option>
                </select>
            </form>
        )
    }
}

class CourseList extends React.Component {
    renderCourses(courses: Course[]) {
        return courses.map((course) =>
            <CourseView 
                name={course.name} 
                semester={course.semester} 
                number={course.number}
                startDate={course.startDate}
                endDate={course.endDate}
                status={course.status}
            />
        );
    }

    render() {
        // make api call here, parse into list of Course objects
        let courses: Course[] = [
            {
                name: "Intro to CS I", 
                semester: "f21", 
                number: "CSE115",
                startDate: new Date(),
                endDate: new Date(),
                status: 'active',
            },
            {
                name: "Intro to CS II", 
                semester: "f21", 
                number: "CSE116",
                startDate: new Date(),
                endDate: new Date(),
                status: 'inactive',
            },
            {
                name: "Systems Programming", 
                semester: "f21", 
                number: "CSE220",
                startDate: new Date(),
                endDate: new Date(),
                status: 'dropped',
            },
        ]
        
        return(
            <div className={styles.courseTable}>
                <div className={styles.header}>
                    <div className={styles.component}>Number</div>
                    <div className={styles.component}>Name</div>
                    <div className={styles.component}>Semester</div>
                    <div className={styles.component}>Start Date</div>
                    <div className={styles.component}>End Date</div>
                    <div className={styles.component}>Status</div>

                </div>
                {this.renderCourses(courses)}
            </div>
        )
    }
}

class RenderView extends React.Component<{}, {}> {
    render() {
        return(
            <div>
                <CourseFilter/>
                <CourseList/>
            </div>
        )
    }
}

export default UserCoursesListPage
