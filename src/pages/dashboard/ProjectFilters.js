import './dashboard.css'

const filterList = [
  'all',
  'mine',
  'development',
  'design',
  'marketing',
  'sales',
]

const ProjectFilters = ({ currentfilter, changeFilter }) => {
  const clickHandler = (newFilter) => {
    changeFilter(newFilter)
  }

  return (
    <div className='project-filter'>
      <nav>
        <p>Filter By : </p>
        {filterList.map((u) => {
          return (
            <button
              key={u}
              onClick={() => clickHandler(u)}
              className={currentfilter === u ? 'active' : ''}
            >
              {u}
            </button>
          )
        })}
      </nav>
    </div>
  )
}

export default ProjectFilters
