import React, { useState } from 'react'
import { useLogin } from '../../hooks/useLogin'
import './login.css'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, error, isPending } = useLogin()

  const handleSubmit = (e) => {
    e.preventDefault()
    login(email, password)
  }

  return (
    <form onSubmit={handleSubmit} className='auth-form'>
      <h2>login</h2>
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
      {!isPending && <button className='btn btn-default-br'>Login</button>}
      {isPending && (
        <button className='btn btn-default-br' disabled>
          loading
        </button>
      )}
      {error && <div className='error'>{error}</div>}
    </form>
  )
}

export default Login
