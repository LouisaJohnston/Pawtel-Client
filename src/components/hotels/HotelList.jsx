import { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import '../../hotelList.css'

export default function HotelList() {
    const [hotels, setHotels] = useState([])
    const [redirect, setRedirect] = useState(false)

    useEffect(() => {
        try {
            const token = localStorage.getItem('jwtToken')
            const authHeaders = {
                'Authorization': token
            }
            axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/hotels`, { headers: authHeaders })
                .then(response => {
                    // console.log(response.data)
                    setHotels(response.data)
                })
                .catch(error => console.log(error))
        } catch (error) {
            console.log(error)
        }
    }, [])

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
            <div>
                <h1>Browse dog hotels in your area:</h1>
            </div>
            <div className='container'>
                {hotels.map((hotel, i) => {
                    return (
                        <div key={i} className="cell" style={{backgroundImage: `url("${hotel.image_url}")`}}>
                            <Link
                                to={{
                                    pathname: '/hotel',
                                    state: hotel
                                }}
                                key={hotel.hotel_name}
                            >
                                <div>
                                {/* <img src={hotel.image_url} alt="hotelImageUrl" height="150px" width="150px"/>  */}
                                </div>
                                {hotel.hotel_name}
                            </Link>
                            <div>
                                <form onSubmit={(e) => handleFavorites(e, i)}>
                                    <input type="submit" value="favorite" />
                                </form>
                            
                            </div>
                        </div>
                    )
                })}

            </div>
        </div>
    )

}