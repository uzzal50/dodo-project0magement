import './project.css'
import Avatar from '../../components/Avatar'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useFirestore } from '../../hooks/useFirestore'
import { useNavigate } from 'react-router-dom'

const ProjectSummary = ({ project }) => {
  const { user } = useAuthContext()
  const { deleteDocument } = useFirestore('projects')
  const navigate = useNavigate()
  console.log(project)

  const clickHandler = (e) => {
    e.preventDefault()
    deleteDocument(project.id)
    navigate('/')
  }

  return (
    <div>
      <div className='project-summary'>
        <h2 className='page-title'>{project.name}</h2>
        <p>{user.displayName}</p>
        <p className='due-date'>
          Project due by {project.dueDate.toDate().toDateString()}
        </p>
        <p className='details'>{project.details}</p>
        <h4>Project assigned to:</h4>
        <div className='assigned-users'>
          {project.assignedUsers.map((user) => (
            <div key={user.id}>
              <Avatar src={user.photo} name={user.displayName} />
            </div>
          ))}
        </div>
      </div>
      {user.uid === project.createdBy.id && (
        <button className='btn' onClick={clickHandler}>
          Set Complete
        </button>
      )}
    </div>
  )
}

export default ProjectSummary
