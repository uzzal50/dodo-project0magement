import React from 'react'
import './Avatar.css'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css' // optional

const Avatar = ({ src, name }) => {
  return (
    <div className='avatar'>
      <Tippy content={name}>
        <img src={src} alt='user avatar' />
      </Tippy>
    </div>
  )
}

export default Avatar
