import { Link } from 'react-router-dom'
import Avatar from './Avatar'
import './ProjectList.css'

const ProjectList = ({ projects }) => {
  return (
    <div className='project-list'>
      {projects.length === 0 && <p>No projects yet!</p>}
      {projects.map((project) => (
        <Link to={`/projects/${project.id}`} key={project.id}>
          <h4>{project.name}</h4>
          <p>Due by {project.dueDate.toDate().toDateString()}</p>
          <p>{project.urgency}</p>
          <div className='assigned-to'>
            <p>
              <strong>Assigned to:</strong>
            </p>
            <ul>
              {project.assignedUsers.map((user) => (
                <li key={user.photo}>
                  <Avatar src={user.photo} />
                </li>
              ))}
            </ul>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default ProjectList
