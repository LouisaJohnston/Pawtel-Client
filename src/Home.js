import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import jwt_decode from 'jwt-decode'

import Welcome from './components/Welcome'
import Navbar from './components/Navbar'
import Register from './components/Register'
import Login from './components/Login'
import Profile from './components/Profile'
import './Home.css';

function Home() {

  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('jwtToken')
    if (token) {
      const decoded = jwt_decode(token)
      setCurrentUser(decoded)
    } else {
      setCurrentUser(null)
    }
  }, [])

  const handleLogout = () => {
    if (localStorage.getItem('jwtToken')) {
      localStorage.removeItem('jwtToken')
      setCurrentUser(null)
    }
  }

  return (
    <Router>
      <header>
        {/* include a handlelogout */}
        <Navbar currentUser={currentUser} />
      </header>

      <div>
        <Switch>
          {/* welcome page should display */}
          <Route exact path='/' component={Welcome} />

          <Route
            path='/register'
            render={(props) => <Register {...props} currentUser={currentUser} setCurrentUser={setCurrentUser} />}
          />

          <Route
            path='/login'
            render={(props) => <Login {...props} currentUser={currentUser} setCurrentUser={setCurrentUser} />}
          />

          <Route
            path='/profile'
            render={(props) => currentUser
              ? <Profile {...props} handleLogout={handleLogout} currentUser={currentUser} setCurrentUser={setCurrentUser} />
              : <Redirect to='/login' />}
          />
        </Switch>
      </div>
    </Router>

  )
}

export default Home;
