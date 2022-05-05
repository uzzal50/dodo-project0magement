import { useCollection } from '../../hooks/useCollection'
import ProjectList from '../../components/ProjectList'
import ProjectFilters from './ProjectFilters'
import { useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'

const Dashboard = () => {
  const { error, documents } = useCollection('projects')
  const [currentfilter, setCurrentFilter] = useState('all')
  const { user } = useAuthContext()

  const changeFilter = (newFilter) => {
    setCurrentFilter(newFilter)
  }
  console.log(currentfilter, documents)

  const projects = documents
    ? documents.filter((document) => {
        switch (currentfilter) {
          case 'all':
            return true

          case 'mine':
            let assignedToMe = false
            document.assignedUsers.forEach((u) => {
              if (u.id === user.uid) {
                assignedToMe = true
              }
            })
            return assignedToMe

          case 'development':
          case 'design':
          case 'marketing':
          case 'sales':
            return document.category === currentfilter
        }
      })
    : null

  return (
    <div>
      <h2 className='page-title'>Dashboard</h2>
      {error && <p className='error'>{error}</p>}
      {documents && (
        <ProjectFilters
          currentfilter={currentfilter}
          changeFilter={changeFilter}
        />
      )}
      {projects && <ProjectList projects={projects} />}
    </div>
  )
}

export default Dashboard
