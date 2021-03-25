import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function PetList() {
    const [pets, setPets] = useState([])
    const [pet_name, setPetName] = useState('')
    const [breed, setBreed] = useState('')
    const [age, setAge] = useState('')
    const [weight, setWeight] = useState('')
    const [special_needs, setSpecialNeeds] = useState('')
    const [medications, setMedications] = useState('')

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

    const handleNewPetSubmit = async(e) => {
        e.preventDefault()
        const requestBody = {
            pet_name: pet_name,
            breed: breed,
            age: age,
            weight: weight,
            special_needs: special_needs,
            medications: medications
        }
        try {
            await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/pets`, requestBody)
        } catch (err) {
            console.log(err)
        }
    }

    const handleNewPetNameChange = e => {
        setPetName(e.target.value)
    }

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
            <Link to={{
                pathname: '/newpet',
            }}
            key={pets}
            >
                Add new pet
            </Link>
        </div>
    )
}