import { useState } from 'react'
import * as usersService from '../../../../utilities/user-services'

export default function LoginForm({ setUser }) {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  })

  const [error, setError] = useState('')

  function handleChange(evt) {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value })
    setError('')
  }

  async function handleSubmit(evt) {
    evt.preventDefault()
    try {
      const user = await usersService.login(credentials)
      setUser(user)
    } catch {
      setError('Log In Failed - Try Again')
    }
  }

  return (
    <div>
      <div className="form-container">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <label>Email</label>
          <br></br>
          <input type="text" name="email" value={credentials.email} onChange={handleChange} required />
          <br></br>
          <label>Password</label>
          <br></br>
          <input type="password" name="password" value={credentials.password} onChange={handleChange} required />
          <br></br>
          <button className='submit-btn' type="submit">LOG IN</button>
        </form>
      </div>
      <p className="error-message">&nbsp;{error}</p>
    </div>
  )
}