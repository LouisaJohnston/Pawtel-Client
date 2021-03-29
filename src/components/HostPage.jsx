import { useState, useEffect } from 'react'
import { Redirect, Link } from 'react-router-dom'
import axios from 'axios'
import Login from './Login'

export default function HostPage(props) {
    const [isAdding, setIsAdding] = useState(false)
    const [message, setMessage] = useState('')
    const [hotels, setHotels] = useState([])
    const [hotelName, setHotelName] = useState('')
    const [zipcode, setZipcode] = useState('')
    const [speciality, setSpeciality] = useState('')
    const [waightLimit, setWaightLimit] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')
    const [imageUrl, setImageUrl] = useState('')


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
        setIsAdding(!isAdding)
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
            email: email,
            image_url: imageUrl
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
        <Redirect to="/hostpage" />
    }

    const editForm = isAdding ? (
        <form className="hotel-Form" onSubmit={handleSubmit}>
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
                    
                    <label htmlFor="imageUrl">Image Url</label>
                    <input type="text" id="imageUrl" onChange={(e) => setImageUrl(e.target.value)}/>

                    <label htmlFor="submit">.</label>
                    <input id="submit" type="submit" value="submit"/>
        
                </form>)
        : ""

   const mappedData = hotels.map((hotel, index) => {
       return (
           <div id={index}  className="grid">

            
                
                <span>
                <strong>Id</strong>
                </span>
                <span>
                    <strong>hotel_name</strong>
                </span>
                <span>
                <strong>Zipcode</strong>
                </span>
                <span>
                <strong>specialty</strong>
                </span>
                <span>
                <strong>weight_limit_lb</strong>
                </span>
                <span>
                <strong>phone_number</strong>
                </span>
                <span>
                <strong>email</strong>
            </span>
            <span>{hotel._id}</span>
            <span>
                <Link to={{ pathname: '/hosthotels', state:{ hotel: hotel} }} > {hotel.hotel_name} </Link>
            </span>
            <span>{hotel.zipcode}</span>
            <span>{hotel.speciality}</span>
            <span>{hotel.weight_limit_lb}</span>
            <span>{hotel.phone_number}</span>
            <span>{hotel.email}</span>

           
           </div>
        )})
    if (!props.currentUser) return <Redirect to='/login' component={Login} />

    return (
        <div>
            <div>
            <h1>Hello {props.currentUser.name}!</h1>
            <h5>Email address: {props.currentUser.email}</h5> 
            </div>
            
            
                {mappedData}
                <div>
                <button className="edit-button2 button" onClick={handleAdd}>+ New</button>
                </div>
            
            <div>
                {editForm}
            </div>
            <p>{message}</p>
        </div>
    )

}