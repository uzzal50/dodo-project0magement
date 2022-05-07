import { useCollection } from '../../hooks/useCollection'
import ProjectList from '../../components/ProjectList'
import ProjectFilters from './ProjectFilters'
import { useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useThemeContext } from '../../context/ThemeContext'
import SearchProjects from './SearchProjects'

const Dashboard = () => {
  const { error, documents } = useCollection('projects')
  const [currentfilter, setCurrentFilter] = useState('all')
  const [sortProject, setSortProject] = useState(null)
  const [term, setTerm] = useState('')
  const { user } = useAuthContext()
  const { color } = useThemeContext()

  const changeFilter = (newFilter) => {
    setCurrentFilter(newFilter.value)
  }

  const changeSearchTerm = (term) => {
    setTerm(term)
    setCurrentFilter(term)
  }

  const changeSort = (urgency) => {
    setSortProject(urgency)
    changeFilter(urgency)
  }

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
          case term:
            if (!term) {
              return false
            } else {
              return document.name.toLowerCase().includes(term)
            }

          case sortProject:
            return document.urgency.toLowerCase() === sortProject.value
          default:
            return true
        }
      })
    : null

  return (
    <div>
      <div className='dash-search-container'>
        <h3 className='page-title' style={{ color }}>
          Dashboard
        </h3>
        <SearchProjects search={term} changeSearchTerm={changeSearchTerm} />
      </div>
      {error && <p className='error'>{error}</p>}
      {documents && (
        <ProjectFilters
          currentfilter={currentfilter}
          changeFilter={changeFilter}
          changeSort={changeSort}
        />
      )}
      {projects && <ProjectList projects={projects} />}
    </div>
  )
}

export default Dashboard
