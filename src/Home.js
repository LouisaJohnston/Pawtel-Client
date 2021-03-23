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

  return (
    // <div className="App">
    //   <header className="App-header">
    //     <Welcome />
    //     <Navbar />
    //     <Navbar />
    //     <Navbar />

    //   </header>
    // </div>
    <Router>
      <header>
        {/* include a handlelogout */}
        <Navbar currentUser={currentUser} />
      </header>

      <div>
        <Switch>
          {/* welcome page should display */}
          <Route exact path='/' component={Welcome} />
          {/* <Route exact path='/' render={(props) => <Login {...props} />} /> */}
        </Switch>
      </div>
    </Router>

  )
}

export default Home;
