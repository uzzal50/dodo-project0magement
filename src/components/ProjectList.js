import { Link } from 'react-router-dom'
import Avatar from './Avatar'
import './ProjectList.css'
import { motion, AnimatePresence } from 'framer-motion'

const ProjectList = ({ projects }) => {
  return (
    <motion.div className='project-list'>
      {projects.length === 0 && <p>No projects yet!</p>}
      <AnimatePresence>
        {projects.map((project) => (
          <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            key={project.id}
            className='card'
          >
            <Link to={`/projects/${project.id}`}>
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
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  )
}

export default ProjectList
