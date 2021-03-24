import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function PetList() {
    const [pets, setPets] = useState([])

    useEffect(() => {
        try {
            axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/pets`)
                .then(response => {
                    setPets(response.data)
                })
        } catch (error) {
            console.log(error)
        }
    }, [])

    return (
        <div>
            <h1>Your pet list:</h1>
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
        </div>
    )
}