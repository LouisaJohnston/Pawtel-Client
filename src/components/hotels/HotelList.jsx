import { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'

export default function HotelList() {
    const [hotels, setHotels] = useState([])
    const [redirect, setRedirect] = useState(false)
    // const [favorites, setFavorites] = useState([])


    useEffect(() => {
        try {
            const token = localStorage.getItem('jwtToken')
            const authHeaders = {
                'Authorization': token
            }
            axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/hotels`, { headers: authHeaders })
                .then(response => {
                    console.log(response.data)
                    setHotels(response.data)
                })
                .catch(error => console.log(error))
        } catch (error) {
            console.log(error)
        }
    }, [])

    // const AddFavoriteHotels = (hotel) => {
    //     const newFavoriteList = [...favorites, hotel]
    //     setFavorites(newFavoriteList)
    // }

    const handleFavorites = async (e, i) => {
        e.preventDefault()
        try {
            const token = localStorage.getItem('jwtToken')
            const authHeaders = {
                'Authorization': token
            }
            const requestBody = {
                hotel_name: hotels[i].hotel_name,
                zipcode: hotels[i].zipcode
            }
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/favorite`, requestBody, { headers: authHeaders })
            setRedirect(true)

        } catch (error) {
            console.log(error)
        }
    }
    if (redirect) return < Redirect to="/favorite" />

    return (
        <div>
            <h1>Browse pet friendly hotels in your area:</h1>
            {hotels.map((hotel, i) => {
                return (
                    <div key={i}>
                        <Link
                            to={{
                                pathname: '/hotel',
                                state: hotel
                            }}
                            key={hotel.hotel_name}
                        >
                            {hotel.hotel_name}
                        </Link>
                        <form onSubmit={(e) => handleFavorites(e, i)}>

                            <input type="submit" value="favorite" />
                        </form>
                    </div>
                )
            })}
        </div>
    )

}