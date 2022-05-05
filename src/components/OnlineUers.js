import React from 'react'
import { useCollection } from '../hooks/useCollection'
// components
import Avatar from './Avatar'

// styles
import './OnlineUsers.css'

const OnlineUers = () => {
  const { error, documents } = useCollection('users')

  return (
    <div className='user-list'>
      <h2>All Users</h2>
      {/* {isPending && <div>Loading users...</div>} */}
      {error && <div>{error}</div>}
      {documents &&
        documents.map((user) => (
          <div key={user.id} className='user-list-item'>
            {user.online && <span className='online-user'></span>}
            <span>{user.displayName}</span>
            <Avatar src={user.photoURL} name={user.displayName} />
          </div>
        ))}
    </div>
  )
}

export default OnlineUers
