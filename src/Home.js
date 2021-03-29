import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import jwt_decode from 'jwt-decode'

import Welcome from './components/Welcome'
import Navbar from './components/Navbar'
import Register from './components/Register'
import Login from './components/Login'
import Profile from './components/Profile'
import PetList from './components/pets/PetList'
import PetDetails from './components/pets/PetDetails'
import NewPet from './components/pets/NewPet'
import HotelList from './components/hotels/HotelList'
import HotelDetails from './components/hotels/HotelDetails'
import Favorite from './components/Favorite'
import HostPage from './components/HostPage'
import './Home.css';
import HostHotel from './components/hotels/HostHotel'
import Footer from './components/Footer'



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
    <div>

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
              path='/pets'
              render={(props) => <PetList {...props} currentUser={currentUser} setCurrentUser={setCurrentUser} />}
            />

            <Route
              path='/pet'
              render={({ location }) => <PetDetails location={location} currentUser={currentUser} setCurrentUser={setCurrentUser} />}
            />

            <Route
              path='/newpet'
              render={({ location }) => <NewPet location={location} currentUser={currentUser} setCurrentUser={setCurrentUser} />}
            />

            <Route
              path='/hotels'
              render={(props) => <HotelList {...props} currentUser={currentUser} setCurrentUser={setCurrentUser} />}
            />
            <Route
              path='/hosthotels'
              render={(props) => <HostHotel {...props} currentUser={currentUser} setCurrentUser={setCurrentUser} />}
            />

            <Route
              path='/hotel'
              render={({ location }) => <HotelDetails location={location} currentUser={currentUser} setCurrentUser={setCurrentUser} />}
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
            <Route
              path='/hostpage'
              render={(props) => currentUser
                ? <HostPage {...props} handleLogout={handleLogout} currentUser={currentUser} setCurrentUser={setCurrentUser} />
                : <Redirect to='/hostlogin' />}
            />
          </Switch>
        </div>

        <footer>
          <Footer currentUser={currentUser} handleLogout={handleLogout} />
        </footer>

      </Router>
    </div>

  )
}

export default Home;
