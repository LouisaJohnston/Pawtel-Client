import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function PetList() {
    const [pets, setPets] = useState([])

    useEffect(() => {
        try {
            axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/pets`)
                .then(res => {
                    setPets(res.data)
                })
        } catch (error) {
            console.log(error)
        }
    }, [])

    return (
        <div>
            <h1>your pet list:</h1>
            <div>
                {pets.map((pet, index) => {
                    return (
                        <div key={index}>
                            <Link to={{ pathname: 'petpage', state: pet }} key={pet.pet_name}>
                            </Link>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}