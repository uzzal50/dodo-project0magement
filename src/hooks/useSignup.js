import { useState } from 'react'
import {
  projectAuth,
  projectStorage,
  projectFirestore,
} from '../firebase/config'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(null)
  const { dispatch } = useAuthContext()

  //wait for user to fill form and this function will fire after form sumbition
  const signup = async (email, password, displayName, thumbnail) => {
    setError(null) //purano error lae remove garna
    setIsPending(true)
    try {
      //signup user
      const res = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      )
      //if response ayena vaney
      if (!res) {
        throw new Error('could not complete signup')
      }

      //upload user thumnnail
      const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`
      const img = await projectStorage.ref(uploadPath).put(thumbnail)
      const imgUrl = await img.ref.getDownloadURL()

      //add displayname to user
      await res.user.updateProfile({ displayName, photoURL: imgUrl })

      //create a document for user
      await projectFirestore.collection('users').doc(res.user.uid).set({
        online: true,
        displayName,
        photoURL: imgUrl,
      })

      //dispatching action
      dispatch({ type: 'LOGIN', payload: res.user })

      setIsPending(false)
      setError(null)
    } catch (error) {
      console.log(error.message)
      setError(error.message)
      setIsPending(false)
    }
  }

  return { useSignup, signup, isPending, error }
}
