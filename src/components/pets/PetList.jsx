import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function PetList() {
    const [pets, setPets] = useState([])
    const [message, setMessage] = useState('')

    useEffect(() => {
        try {
            const token = localStorage.getItem('jwtToken')
            const authHeaders = {
                'Authorization': token
              }
            axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/pets`, { headers: authHeaders })
            .then(response => {
                    setMessage(response.data.msg)
                    setPets(response.data.pets)
                })
        } catch (error) {
            if(error.response.status === 400){
                setMessage(error.response.data.msg)
            }
            console.log(error)
        }
    }, [])

    return (
        <div>
            <h1>Your pet list:</h1>
            <p>{message}</p>
            <div>
                {pets.map((pet, i) => {
                    return (
                        <div key={i}>
                            <Link to={{ 
                                pathname: '/pet', 
                                state: pet 
                            }}
                            key={pet.pet_name}
                            >
                                {pet.pet_name}
                            </Link>
                        </div>
                    )
                })}
            </div>
            <Link to={{
                pathname: '/newpet',
            }}
            >
                Add new pet
            </Link>
        </div>
    )
}