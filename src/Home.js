import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import jwt_decode from 'jwt-decode'

import Welcome from './components/Welcome'
import Navbar from './components/Navbar'
import Register from './components/Register'
import Login from './components/Login'
import Profile from './components/Profile'
import Pet from './components/pets/PetList'
import HotelList from './components/hotels/HotelList'
import HotelDetails from './components/hotels/HotelDetails'
import Favorite from './components/Favorite'
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
        <Navbar currentUser={currentUser} handleLogout={handleLogout} />
      </header>

      <div className="route">
        <Switch>
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
            path='/pet'
            render={(props) => <Pet {...props} currentUser={currentUser} setCurrentUser={setCurrentUser} />}
          />

          <Route
            path='/hotels'
            render={(props) => <HotelList {...props} currentUser={currentUser} setCurrentUser={setCurrentUser} />}
          />

          <Route
            path='/hotelpage'
            render={(props) => <HotelDetails {...props} currentUser={currentUser} setCurrentUser={setCurrentUser} />}
          />

          <Route
            path='/favorite'
            render={(props) => <Favorite {...props} currentUser={currentUser} setCurrentUser={setCurrentUser} />}
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
