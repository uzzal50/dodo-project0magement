import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { timestamp } from '../../firebase/config'
import { useCollection } from '../../hooks/useCollection'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useFirestore } from '../../hooks/useFirestore'
import './create.css'
import { useNavigate } from 'react-router-dom'

const categories = [
  { value: 'development', label: 'Development' },
  { value: 'design', label: 'Design' },
  { value: 'sales', label: 'Sales' },
  { value: 'marketing', label: 'Marketing' },
]

const urgencies = [
  { value: 'low', label: 'Low' },
  { value: 'high', label: 'High' },
  { value: 'urgent', label: 'Urgent' },
]

const Create = () => {
  // form field values
  const [name, setName] = useState('')
  const [details, setDetails] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [category, setCategory] = useState('')
  const [urgency, setUrgency] = useState(null)
  const [assignedUsers, setAssignedUsers] = useState([])
  const [users, setUsers] = useState([])
  const [errorMessage, seterrorMessage] = useState(null)

  const { documents } = useCollection('users')
  const { user } = useAuthContext()
  const { addDocument, response } = useFirestore('projects')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    seterrorMessage(null)
    if (!category) {
      seterrorMessage('please select the category')
      return
    }
    if (assignedUsers.length < 1) {
      seterrorMessage('please add at least one assinee.')
      return
    }
    if (!urgency) {
      seterrorMessage('please add at least one assinee.')
      return
    }

    const assignedUsersList = assignedUsers.map((u) => {
      return {
        displayName: u.value.displayName,
        photo: u.value.photoURL,
        id: u.value.id,
      }
    })

    const createdBy = {
      displayName: user.displayName,
      id: user.uid,
      photo: user.photoURL,
    }

    const project = {
      name,
      details,
      urgency: urgency.value,
      dueDate: timestamp.fromDate(new Date(dueDate)),
      category: category.value,
      assignedUsers: assignedUsersList,
      createdBy,
    }
    await addDocument(project)
    if (!response.error) {
      navigate('/')
    }
  }

  useEffect(() => {
    if (documents) {
      const options = documents.map((user) => {
        return { label: user.displayName, value: user }
      })
      setUsers(options)
    }
  }, [documents])

  return (
    <div className='create-form'>
      <h2 className='page-title'>Create a new Project</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Project name:</span>
          <input
            required
            type='text'
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <label>
          <span>Project Details:</span>
          <textarea
            required
            onChange={(e) => setDetails(e.target.value)}
            value={details}
          ></textarea>
        </label>
        <label>
          <span>Set due date:</span>
          <input
            required
            type='date'
            onChange={(e) => setDueDate(e.target.value)}
            value={dueDate}
          />
        </label>
        <label>
          <span>Project category:</span>
          <Select
            onChange={(option) => setCategory(option)}
            options={categories}
          />
        </label>
        <label>
          <span>Assign to:</span>
          <Select
            options={users}
            onChange={(option) => setAssignedUsers(option)}
            isMulti
          />
        </label>
        <label>
          <span>Urgency:</span>
          <Select
            options={urgencies}
            onChange={(option) => setUrgency(option)}
          />
        </label>
        {errorMessage && <div className='error'>{errorMessage}</div>}
        <button className='btn'>Add Project</button>
      </form>
    </div>
  )
}

export default Create
