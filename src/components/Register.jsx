import { useState } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { Redirect } from 'react-router-dom'
import {useHistory} from 'react-router-dom'
import Profile from './Profile'

export default function Register(props) {
    // some state for the controlled form
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isHostSelected, setIsHostSelected] = useState(false)

    // state for a flash message 
    const [message, setMessage] = useState('')

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()

            // to post to the backend db
            const requestBody = {
                name: name,
                email: email,
                password: password
            }

            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/register`, requestBody)
            console.log(response)
            // save the response to local storage
            const { token } = response.data
            localStorage.setItem('jwtToken', token)

            // decode the jwt
            const decode = jwt_decode(token)

            // from jwt payload, seting the current user to be loged in in home.js
            props.setCurrentUser(decode)

        } catch (error) {
            // if the response is invalid grab the message and set it to be msg for the server
            if (error.response.status === 400) {

                setMessage(error.response.data.msg)
            } else {

                console.log(error)
            }


        }

    }
    const handleHostSubmit = async (e) => {
        try {
            e.preventDefault()

            // to post to the backend db
            const requestBody = {
                name: name,
                email: email,
                password: password
            }

            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/hosts/register`, requestBody)
            console.log(response)
            // save the response to local storage
            const { token } = response.data
            localStorage.setItem('jwtToken', token)

            // decode the jwt
            const decode = jwt_decode(token)

            // from jwt payload, seting the current user to be loged in in home.js
            props.setCurrentUser(decode)

        } catch (error) {
            // if the response is invalid grab the message and set it to be msg for the server
            if (error.response.status === 400) {

                setMessage(error.response.data.msg)
            } else {

                console.log(error)
            }


        }

    }

   

    const userForm = <form onSubmit={handleSubmit}>
                        <label htmlFor="name-input">userName:</label>
                        <input
                            id="name-input"
                            type="text"
                            placeholder="enter your name"
                            onChange={e => setName(e.target.value)}
                            value={name}
                        />
                        <label htmlFor="email-input">email:</label>
                        <input
                            id="email-input"
                            type="text"
                            placeholder="enter your email"
                            onChange={e => setEmail(e.target.value)}
                            value={email}
                        />
                        <label htmlFor="password-input">password:</label>
                        <input
                            id="password-input"
                            type="password"
                            placeholder="enter your password"
                            onChange={e => setPassword(e.target.value)}
                            value={password}
                        />
                        <input type="submit" value="Register" />
    
                    </form>

    const hostForm = <form onSubmit={handleHostSubmit}>
                        <label htmlFor="name-input">Name:</label>
                        <input
                            id="name-input"
                            type="text"
                            placeholder="enter your name"
                            onChange={e => setName(e.target.value)}
                            value={name}
                        />
                        <label htmlFor="email-input">email:</label>
                        <input
                            id="email-input"
                            type="text"
                            placeholder="enter your email"
                            onChange={e => setEmail(e.target.value)}
                            value={email}
                        />
                        <label htmlFor="password-input">password:</label>
                        <input
                            id="password-input"
                            type="password"
                            placeholder="enter your password"
                            onChange={e => setPassword(e.target.value)}
                            value={password}
                        />
                        <input type="submit" value="Register" />
    
                    </form>



    // if user is logged in, redirect to pfofile page
    if (props.currentUser) return <Redirect to='/profile' component={Profile} currentUser={props.currentUser} />
    return (
        <div>
            <h1>Hello from Register</h1>
            <p>{message}</p>
            {isHostSelected ? hostForm : userForm }
            <button onClick={e => setIsHostSelected(!isHostSelected)}>Host</button>
        </div>
    )

}