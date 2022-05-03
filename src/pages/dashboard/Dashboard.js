import { useCollection } from '../../hooks/useCollection'
import ProjectList from '../../components/ProjectList'

const Dashboard = () => {
  const { error, documents } = useCollection('projects')

  return (
    <div>
      <h2 className='page-title'>Dashboard</h2>
      {error && <p className='error'>{error}</p>}
      {documents && <ProjectList projects={documents} />}
    </div>
  )
}

export default Dashboard