import { createContext, useContext, useReducer } from 'react'

const ThemeContext = createContext()

const colorReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_COLOR':
      return { ...state, color: action.payload }
    case 'CHANGE_MODE':
      return { ...state, mode: action.payload }
    default:
      return state
  }
}

export const ThemeContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(colorReducer, {
    color: '#6359c7',
    mode: 'light',
  })

  const changeMode = (mode) => {
    console.log(mode)
    dispatch({ type: 'CHANGE_MODE', payload: mode })
  }

  return (
    <ThemeContext.Provider value={{ ...state, dispatch, changeMode }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useThemeContext = () => {
  return useContext(ThemeContext)
}
