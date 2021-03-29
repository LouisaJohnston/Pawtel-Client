import {useState, useEffect} from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import {useLocation} from 'react-router-dom'

export default function HostHotel(props) {
    const [isEditing, setIsEditing] = useState(false)
    const [hotelName, setHotelName] = useState('')
    const [zipcode, setZipcode] = useState('')
    const [speciality, setSpeciality] = useState('')
    const [waightLimit, setWaightLimit] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')


    const data = useLocation()
    console.log(data.state.hotel)

    const handleEdit = () => {
        setIsEditing(!isEditing)
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const responseData = await axios.put(`${process.env.REACT_APP_SERVER_URL}/api-v1/hotels/${data.state.hotel._id}`, {
            hotel_name: hotelName,
            zipcode: zipcode,
            speciality: speciality,
            weight_limit_lb: waightLimit,
            phone_number: phoneNumber,
            email: email
        })
        console.log(responseData.data)
    }


    const editForm = isEditing ? (
    <form  className="hotel-Form" onSubmit={handleSubmit}>
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
        
        <label htmlFor="submit">.</label>
        <input type="submit" value="submit"/>
        
    </form>)
    : ""
    return (
        <div >
            <div>
            <img src={data.state.hotel.image_url} alt="imageUrl" height="150px" width="150px" />
            <h4>{data.state.hotel.hotel_name}</h4>
            <h4>{data.state.hotel.zipcode}</h4>
            <h4>{data.state.hotel.specialty}</h4>
            <h4>{data.state.hotel.weight_limit_lb}</h4>
            <h4>{data.state.hotel.phone_number}</h4>
            <h4>{data.state.hotel.email}</h4>
            <button className="edit-button button" onClick={handleEdit}> edit</button>
            </div>
            <div>
            {editForm}
            </div>
            <div>
            <Link to='/hostpage'>Back to hotels</Link> 
            </div>
        </div>
        
    )
}