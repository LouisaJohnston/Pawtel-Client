import { useState, useEffect } from 'react'
import axios from 'axios'

export default function HotelList() {
    const [hotels, setHotels] = useState([])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/hotels`)
        .then(response => {
            setHotels(response.data)
            console.log(response.data)
        })
    }, [])


    return (
        <div>
            <h1>Browse dog hotels in your area:</h1>
            {hotels.map((hotel, i) => {
                return(
                    <div key={i}>
                        {hotel.hotel_name}
                    </div>
                )
            })}
        </div>
    )

}