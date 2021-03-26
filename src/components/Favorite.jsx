import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Favorite() {
    const [favorites, setFavorites] = useState([])
    const [message, setMessage] = useState('')

    useEffect(() => {
        try {
            const token = localStorage.getItem('jwtToken')
            const authHeaders = {
                'Authorization': token
            }
            axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/favorite`, { headers: authHeaders })
                .then(response => {
                    // console.log(response.data.favorites)
                    setFavorites(response.data.favorites)
                    setMessage(response.data.msg)
                })
        } catch (error) {
            console.log(error)
        }
    }, [])

    return (
        <div>
            <div>
                <h1>
                    Favorite List:
                </h1>
            </div>

            <div>
                {favorites.map((favorite, i) => {
                    return (
                        <div key={i}>

                            {favorite.hotel_name}
                            {favorite.zipcode}

                        </div>
                    )
                })}
            </div>
            <Link to="/hotels">Return to hotels</Link>
        </div>
    )
}