import{useState} from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import {Redirect} from 'react-router-dom'
import profile from './Profile'

export default function Login() {
    
    // home state for controlled form
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // error message for login 
    const [message, setMessage] = useState('')

    // handeling submit for the form
    const handleSubmit = async e => {
        try{
            e.preventDefault()

            const requestBody = {
                email: email,
                password: password
            }

            const response = await axios.post(`${process.env.REACT_APP_SRVER_URL}/api-v1/users/login`, requestBody)
            console.log(response)
        }catch(error){
            console.log(error)
        }
    }

    return (
        <div>
            <h1>Hello from Login Page</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email-input">Email:</label>
                <input 
                    type="email"  
                    id="email-input"
                    placeholder='email'
                    onChange={e => setEmail(e.target.value)}
                    value={email}    
                />
                <label htmlFor="password-input">Password:</label>
                <input 
                    type="password"  
                    id="password-input"
                    placeholder='password'
                    onChange={e => setPassword(e.target.value)}
                    value={password}    
                />
            </form>
        </div>
    )

}