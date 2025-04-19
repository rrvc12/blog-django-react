import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppLayout from './components/ui/AppLayout'
import HomePage from './pages/HomePage'
import DetailPage from './pages/DetailPage'
import ProfilePage from './pages/ProfilePage'
import SignupPage from './pages/SignupPage'
import CreatePostPage from './pages/CreatePostPage'
import LoginPage from './pages/LoginPage'
import ProtectedRoute from './components/ui/ProtectedRoute'
import { useEffect, useState } from 'react'
import { getUsername } from './services/apiBlog'
import { useQuery } from '@tanstack/react-query'

const App = () => {

  const [username, setUsername] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const { data } = useQuery({
    queryKey: ["username"],
    queryFn: getUsername
  })

  console.log(data)

  useEffect(function () {
    // se asegura de actualizar el usuario siempre que refresquemos la página y nos mantengamos autenticados
    if (data) {
      setUsername(data.username)
      setIsAuthenticated(true)
    }
  }, [data])

  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} username={username} setUsername={setUsername} />}>
          <Route index element={<HomePage />} />
          <Route path="blogs/:slug" element={<DetailPage username={username} isAuthenticated={isAuthenticated} />} />
          <Route path="profile/:username" element={<ProfilePage authUsername={username} />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="create" element={
            <ProtectedRoute>
              <CreatePostPage />
            </ProtectedRoute>
          } />
          <Route path="login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} setUsername={setUsername} />} />
        </Route>
      </Routes>
    </BrowserRouter>

  )
}

export default App