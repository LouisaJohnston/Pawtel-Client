import { useState, useEffect } from 'react'
import { Redirect, Link } from 'react-router-dom'
import axios from 'axios'
import Login from './Login'

export default function HostPage(props) {
    const [message, setMessage] = useState('')
    const [hotels, setHotels] = useState([])

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
                const responseData = await axios.put(`${process.env.REACT_APP_SERVER_URL}/api-v1/hotels/:id`, { headers: authHeaders })
                console.log(response.data)
                console.log(responseData.data)
                const data = response.data.hotels
                setMessage(response.data.msg)
                console.log(response.data.hotels)
                console.log(data)
                setHotels(prev => [...data])
                
                
            } catch(error) {
                //display error if response status is 400
                if (error.response.status === 400) {
                    props.handleLogout()
                } else {
                    
                    console.log(error)
                }
            }
        }
        secretMessage()
    }, [props])
    const handleEdit = () => {

        console.log('Edited')
    }
    const handleDelete = () => {
        console.log('Deleted')
    }
   const mappedData = hotels.map((hotel, index) => {
       return (
           <div id={index}>
                <Link 
                    to={{
                            pathname: '/hosthotels',
                            state:{ hotel: hotel}
                        }}

                >
                    {hotel.hotel_name}
                </Link>
           </div>
        )})
    if (!props.currentUser) return <Redirect to='/login' component={Login} />

    return (
        <div>
            <div>
            <h1>Hello {props.currentUser.name}!</h1>
            <h5>Email address: {props.currentUser.email}</h5> 
            </div>
            <div>
                {mappedData}
                <button onClick={handleEdit}>Edit</button>
                <button onClick={handleDelete}>Delete</button>
            </div>
            <p>{message}</p>
        </div>
    )

}