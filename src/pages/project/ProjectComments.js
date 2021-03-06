import { useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import './project.css'
import { timestamp } from '../../firebase/config'
import { useFirestore } from '../../hooks/useFirestore'
import Avatar from '../../components/Avatar'
import { useThemeContext } from '../../context/ThemeContext'
import { formatDistanceToNow } from 'date-fns'

const ProjectComments = ({ project }) => {
  const { user } = useAuthContext()
  const [newComment, setNewComment] = useState('')
  const { updateDocument, response } = useFirestore('projects')
  const { color } = useThemeContext()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const commentToAdd = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      content: newComment,
      createdAt: timestamp.fromDate(new Date()),
      id: Math.random(),
    }
    updateDocument(project.id, {
      comments: [...project.comments, commentToAdd],
    })
    if (!response.error) {
      setNewComment('')
    }
  }

  return (
    <div className='project-comments'>
      <h3>Project Comments</h3>
      <ul>
        {project.comments.length > 0 &&
          project.comments.map((comment) => {
            return (
              <li key={comment.id}>
                <div className='comment-author'>
                  <Avatar
                    src={comment.photoURL}
                    name={comment.displayName}
                  ></Avatar>
                  <p>{comment.displayName}</p>
                </div>
                <div className='comment-date'>
                  <p>
                    {formatDistanceToNow(comment.createdAt.toDate(), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
                <div className='comment-content'>
                  <p>{comment.content}</p>
                </div>
              </li>
            )
          })}
      </ul>
      <form className='add-comment' onSubmit={handleSubmit}>
        <label>
          <span>Add new comment:</span>
          <textarea
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
          ></textarea>
        </label>
        <button
          className={
            color === 'red'
              ? 'btn btn-danger-br'
              : color === 'green'
              ? 'btn btn-success-br'
              : 'btn btn-default-br'
          }
        >
          Add Comment
        </button>
      </form>
    </div>
  )
}

export default ProjectComments
