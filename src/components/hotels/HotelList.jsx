import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import '../../hotelList.css'

export default function HotelList() {
    const [hotels, setHotels] = useState([])

    useEffect(() => {
        try {
            axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/hotels`)
            .then(response => {
                setHotels(response.data)
            })
        } catch (error) {
            console.log(error)
        }
    }, [])


    return (
        <div>
            <div>
            <h1>Browse dog hotels in your area:</h1>
            </div>
            <div className='container'>
                
            {hotels.map((hotel, i) => {
                return (
                    <div key={i} className="cell">
                        <Link
                            to={{
                                pathname: '/hotel',
                                state: hotel
                            }}
                            key={hotel.hotel_name}
                        >
                            {hotel.hotel_name}
                        </Link>
                    </div>
                )
            })}
                
            </div>
        </div>
    )

}