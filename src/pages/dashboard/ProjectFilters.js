import './dashboard.css'
import { useThemeContext } from '../../context/ThemeContext'
import Select from 'react-select'
import { useState } from 'react'

const filterList = [
  { value: 'all', label: 'All' },
  { value: 'mine', label: 'Mine' },
  { value: 'development', label: 'Devlopment' },
  { value: 'design', label: 'Design' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'sales', label: 'Sales' },
]

const urgencies = [
  { value: 'urgent', label: 'Urgent' },
  { value: 'high', label: 'High' },
  { value: 'low', label: 'Low' },
]

const ProjectFilters = ({
  currentfilter,
  changeFilter,

  changeSort,
}) => {
  const { color } = useThemeContext()
  const clickHandler = (newFilter) => {
    changeFilter(newFilter)
  }

  return (
    <div className='project-filter'>
      <nav>
        <div style={{ display: 'flex', flexGrow: '1', alignItems: 'center' }}>
          <p>Filter By : </p>

          <Select
            options={filterList}
            onChange={(option) => changeFilter(option)}
          ></Select>
        </div>
        <p>Sort By : </p>
        <Select
          options={urgencies}
          onChange={(option) => changeSort(option)}
        ></Select>
      </nav>
    </div>
  )
}

export default ProjectFilters
