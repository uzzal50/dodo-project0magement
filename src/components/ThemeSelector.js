import React, { useState } from 'react'
import { useThemeContext } from '../context/ThemeContext'

const colors = ['#6359c7', '#e66666', '#0ebb50']

export const ThemeSelector = () => {
  const [currentColor, setCurrentColor] = useState('#6359c7')
  const { dispatch } = useThemeContext()

  const changeHandler = (color) => {
    setCurrentColor(color)
    dispatch({ type: 'CHANGE_COLOR', payload: color })
  }

  return (
    <div style={{ display: 'flex', marginRight: '0.5rem' }}>
      {colors.map((color) => {
        return (
          <li
            key={color}
            className='clr'
            style={{
              backgroundColor: color,
              marginRight: '0.3rem',
            }}
            onClick={() => changeHandler(color)}
          ></li>
        )
      })}
    </div>
  )
}
