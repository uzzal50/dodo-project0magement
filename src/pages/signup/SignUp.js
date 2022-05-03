import { useRef, useState } from 'react'
import { useSignup } from '../../hooks/useSignup'

// styles
import './signup.css'

const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [thumbnail, setThumbnail] = useState(null)
  const [thumbnailError, setThumbnailError] = useState(null)
  const thumbPreview = useRef()
  const { signup, error, isPending } = useSignup()

  const handleSubmit = (e) => {
    e.preventDefault()
    signup(email, password, displayName, thumbnail)
  }

  const handleFileChange = (e) => {
    setThumbnailError(null)
    const selected = e.target.files[0]
    if (!selected) {
      setThumbnailError('Please select the image.')
      thumbPreview.current.src = ''
      return
    }
    if (!selected.type.includes('image')) {
      setThumbnailError('Selected file must be an image')
      thumbPreview.current.src = ''
      return
    }
    if (selected.size > 100000) {
      setThumbnailError('Image file size must be less than 100kb')
      thumbPreview.current.src = ''
      return
    }

    setThumbnailError(null)
    const src = URL.createObjectURL(selected)
    thumbPreview.current.src = src
    thumbPreview.current.style = 'block'

    setThumbnail(selected)
  }

  return (
    <form onSubmit={handleSubmit} className='auth-form'>
      <h2>sign up</h2>
      <label>
        <span>email:</span>
        <input
          required
          type='email'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        <span>password:</span>
        <input
          required
          type='password'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      <label>
        <span>display name:</span>
        <input
          required
          type='text'
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
        />
      </label>
      <label>
        <span>Profile thumbnail:</span>

        <div className='thumbPreview'>
          <img className='thumbPreview' ref={thumbPreview} />
        </div>

        <input required type='file' onChange={handleFileChange} />

        {thumbnailError && <div className='error'>{thumbnailError}</div>}
      </label>

      {isPending ? (
        <button className='btn' disabled>
          Loading...
        </button>
      ) : (
        <button className='btn'>SignUp</button>
      )}

      {error && <div className='error'>{error}</div>}
    </form>
  )
}

export default SignUp
