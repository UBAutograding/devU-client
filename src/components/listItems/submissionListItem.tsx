import React from 'react'
import { Link } from 'react-router-dom'
import { Submission } from 'devu-shared-modules'

type Props = {
  submission: Submission
}

const SubmissionListItem = ({ submission }: Props) => <Link to={`/submissions/${submission.id}`}>Submission</Link>

export default SubmissionListItem
