import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { getUser } from '../../../utilities/user-services'
import AuthPage from '../Auth/AuthPage/AuthPage'
import NavBar from '../NavBar/NavBar'
import AboutPage from '../AboutPage/AboutPage'
import IndexPage from '../Discussions/IndexPage/IndexPage'
import PostsPage from '../Discussions/PostsPage/PostsPage'

function App() {
  const [user, setUser] = useState(getUser())

  return (
    <main>
      {user ?
        <>
          <NavBar user={user} setUser={setUser} />
          <Routes>
            <Route path='/' element={<IndexPage />} />
            <Route path='/quotes/:_id' element={<PostsPage user={user}/>} />
            <Route path='/about' element={<AboutPage />} />
          </Routes>
        </> :
        <AuthPage setUser={setUser} />
      }
    </main>
  )
}

export default App
