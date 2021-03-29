import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function PetList() {
    const [pets, setPets] = useState([])
    const [message, setMessage] = useState('')
    const [isAdding, setIsAdding] = useState(false)
    const [pet_name, setPetName] = useState('')
    const [breed, setBreed] = useState('')
    const [age, setAge] = useState('')
    const [weight, setWeight] = useState('')
    const [special_needs, setSpecialNeeds] = useState('')
    const [medications, setMedications] = useState('')
    const [image_url, setImage] = useState('')

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
            if (error.response.status === 400) {
                setMessage(error.response.data.msg)
            }
            console.log(error)
        }
    }, [])

    const handleForm = (e) => {
        e.preventDefault()
        setIsAdding(true)
    }

    const handleNewPetSubmit = (e) => {
        e.preventDefault()
        const token = localStorage.getItem('jwtToken')
        const authHeaders = {
            'Authorization': token
        }
        const requestBody = {
            pet_name: pet_name,
            breed: breed,
            age: age,
            weight: weight,
            special_needs: special_needs,
            medications: medications,
            image_url: image_url
        }
        try {
            axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/pets`, requestBody, { headers: authHeaders })
                .then(response => {
                    setMessage(response.data.msg)
                })
            window.location.reload()
        } catch (err) {
            if (err.response.status === 400) {
                setMessage(err.response.data.msg)
            }
            console.log(err)
        }
    }
    const addForm = isAdding ? (
        <div>
            <h1>Add a New Pet:</h1>
            <p>{message}</p>
            <form onSubmit={handleNewPetSubmit}>
                <div>
                    <label htmlFor="pet-name-input">Your Pet's Name:</label>
                    <input
                        id="pet-name-input"
                        type="text"
                        name="pet_name"
                        onChange={e => setPetName(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="breed-input">Breed:</label>
                    <input
                        id="breed-input"
                        type="text"
                        name="breed"
                        onChange={e => setBreed(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="age-input">Age:</label>
                    <input
                        id="age-input"
                        type="text"
                        name="age"
                        onChange={e => setAge(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="weight-input">Weight:</label>
                    <input
                        id="weight-input"
                        type="text"
                        name="weight"
                        onChange={e => setWeight(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="specialneeds-input">Special Needs:</label>
                    <input
                        id="specialneeds-input"
                        type="text"
                        name="special_needs"
                        onChange={e => setSpecialNeeds(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="medications-input">Medications:</label>
                    <input
                        id="medications-input"
                        type="text"
                        name="medications"
                        onChange={e => setMedications(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="image-input">Image Url:</label>
                    <input
                        id="image-input"
                        type="text"
                        name="image_url"
                        onChange={e => setImage(e.target.value)}
                    />
                </div>

                <input
                    type="submit"
                    value="Add to Your Pets"
                />
            </form>
        </div>
    )
        : ""
    return (
        <div>
            <h1>Your pets:</h1>
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
            <form onSubmit={handleForm}>
                <input type="submit" value="Add New Pet" />
            </form>
            {addForm}
            {/* <Link to={{
                pathname: '/newpet',
            }}
            >
                Add new pet
            </Link> */}
        </div>
    )
}