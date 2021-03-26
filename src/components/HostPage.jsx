import { useState, useEffect } from 'react'
import { Redirect, Link } from 'react-router-dom'
import axios from 'axios'
import Login from './Login'

export default function HostPage(props) {
    const [message, setMessage] = useState('')
    const [hotels, setHotels] = useState([])
    const [isEditing, setIsEditing] = useState(false)
    const [hotelName, setHotelName] = useState('')
    const [zipcode, setZipcode] = useState('')
    const [speciality, setSpeciality] = useState('')
    const [waightLimit, setWaightLimit] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')

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
                const data = response.data.hotels
                setMessage(response.data.msg)
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
    
    const handleAdd = () => {

        console.log('Edited')
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const token = localStorage.getItem('jwtToken')
        const authHeaders = {
            'Authorization': token
          }
        const requestBody = {
            hotel_name: hotelName,
            zipcode: zipcode,
            speciality: speciality,
            weight_limit_lb: waightLimit,
            phone_number: phoneNumber,
            email: email
        }
        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/hotels`, requestBody, { headers: authHeaders })
            setMessage(response.data.msg)
            console.log(response.data)
        } catch (err) {
            if(err.response.status === 400){
                setMessage(err.response.data.msg)
            }
            console.log(err)
        }
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
                <button onClick={handleAdd}>Add</button>
            </div>
            <div>
                <form  onSubmit={handleSubmit}>
                    <label htmlFor="hotel_name" >hotel_name</label>
                    <input type="text" id="hotel_name" onChange={(e) => setHotelName(e.target.value)}/>
        
                    <label htmlFor="hotel_zipcode">Zipcode</label>
                    <input type="text" id="hotel_zipcode" onChange={(e) => setZipcode(e.target.value)}/>
        
                    <label htmlFor="speciality">specialty</label>
                    <input type="text" id="speciality" onChange={(e) => setSpeciality(e.target.value)}/>
        
                    <label htmlFor="weight_limit_lb">weight_limit_lb</label>
                    <input type="text" id="weight_limit_lb" onChange={(e) => setWaightLimit(e.target.value)}/>
        
                    <label htmlFor="phone_number">phone_number</label>
                    <input type="text" id="phone_number" onChange={(e) => setPhoneNumber(e.target.value)}/>
        
                    <label htmlFor="email">email</label>
                    <input type="text" id="email" onChange={(e) => setEmail(e.target.value)}/>
        
                    <input type="submit" value="submit"/>
        
                </form>)
            </div>
            <p>{message}</p>
        </div>
    )

}