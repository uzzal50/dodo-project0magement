import { useThemeContext } from '../../context/ThemeContext'

const SearchProjects = ({ search, changeSearchTerm }) => {
  const { color } = useThemeContext()

  return (
    <>
      <input
        type='search'
        placeholder='Search'
        className='search-input'
        style={{ border: `1px solid ${color}` }}
        value={search}
        onChange={(e) => changeSearchTerm(e.target.value)}
      />
    </>
  )
}

export default SearchProjects
