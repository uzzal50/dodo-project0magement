import { useState, useEffect } from 'react'
import { projectAuth, projectFirestore } from '../firebase/config'
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()

  const login = async (email, password) => {
    setError(null)
    setIsPending(true)

    try {
      // login
      const res = await projectAuth.signInWithEmailAndPassword(email, password)

      //update user online in user document
      await projectFirestore.collection('users').doc(res.user.uid).update({
        online: true,
      })

      // dispatch login action
      dispatch({ type: 'LOGIN', payload: res.user })
      setIsPending(false)
      setError(null)
    } catch (err) {
      setError(err.message)
      setIsPending(false)
    }
  }

  // useEffect(() => {
  //   return () => setIsCancelled(true)
  // }, [])

  return { login, isPending, error }
}
