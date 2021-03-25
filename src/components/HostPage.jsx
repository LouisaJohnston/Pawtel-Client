import { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import Login from './Login'

export default function HostPage(props) {
    const [message, setMessage] = useState('')

    useEffect(() => {
        const secretMessage = async function () {
            try {
                const token = localStorage.getItem('jwtToken')

                //make Auth headers
                const authHeaders = {
                    'Authorization': token
                }

                // GET /auth-locked with auth header using token
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/auth-locked`, { headers: authHeaders })
                console.log(response.data)
                setMessage(response.data.msg)

            } catch (error) {
                // display error if response status is 400
                if (error.response.status === 400) {
                    props.handleLogout()
                } else {

                    console.log(error)
                }
            }
        }
        secretMessage()
    }, [props])

    if (!props.currentUser) return <Redirect to='/login' component={Login} />

    return (
        <div>
            <h1>Hello from HostPage</h1>
            <h4>hello {props.currentUser.name}</h4>
            <h5>your email is {props.currentUser.email}</h5>
            <p>{message}</p>
        </div>
    )

}