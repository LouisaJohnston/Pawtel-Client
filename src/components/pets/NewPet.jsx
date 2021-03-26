import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'

export default function NewPet (props) {
    const [message, setMessage] = useState('')
    const [pet_name, setPetName] = useState('')
    const [breed, setBreed] = useState('')
    const [age, setAge] = useState('')
    const [weight, setWeight] = useState('')
    const [special_needs, setSpecialNeeds] = useState('')
    const [medications, setMedications] = useState('')
    const [newPet, setNewPet] = useState(false)

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
            medications: medications
        }
        try {
            axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/pets`, requestBody, { headers: authHeaders })
            .then(response => {
                setMessage(response.data.msg)
            })
            setNewPet(true)
        } catch (err) {
            if(err.response.status === 400){
                setMessage(err.response.data.msg)
            }
            console.log(err)
        }
    }
    if (newPet) return <Redirect to='/pets' />
    return (
            <div>
                <h1>Add a New Pet:</h1>
                <p>{message}</p>
                <form onSubmit={handleNewPetSubmit}>
                    <label htmlFor="pet-name-input">Your Pet's Name:</label>
                    <input
                        id="pet-name-input" 
                        type="text" 
                        name="pet_name"
                        onChange={e => setPetName(e.target.value)}
                    />

                    <label htmlFor="breed-input">Breed:</label>
                    <input
                        id="breed-input" 
                        type="text" 
                        name="breed"
                        onChange={e => setBreed(e.target.value)}
                    />

                    <label htmlFor="age-input">Age:</label>
                    <input
                        id="age-input" 
                        type="text" 
                        name="age"
                        onChange={e => setAge(e.target.value)}
                    />

                    <label htmlFor="weight-input">Weight:</label>
                    <input
                        id="weight-input" 
                        type="text" 
                        name="weight"
                        onChange={e => setWeight(e.target.value)}
                    />

                    <label htmlFor="specialneeds-input">Special Needs:</label>
                    <input
                        id="specialneeds-input" 
                        type="text" 
                        name="special_needs"
                        onChange={e => setSpecialNeeds(e.target.value)}
                    />

                    <label htmlFor="medications-input">Medications:</label>
                    <input
                        id="medications-input" 
                        type="text" 
                        name="medications"
                        onChange={e => setMedications(e.target.value)}
                    />

                    <input 
                        type="submit" 
                        value="Add to Your Pet List"
                    />
            </form>
            <Link to='/pets'>Back to your pets</Link>
        </div>
    )
}