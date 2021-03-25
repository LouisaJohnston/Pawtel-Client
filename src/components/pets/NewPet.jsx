import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'

export default function NewPet (props) {
    // handle submit -> axios post to backend await response redirect to petlist
    //update state
    const [pet_name, setPetName] = useState('')
    const [breed, setBreed] = useState('')
    const [age, setAge] = useState('')
    const [weight, setWeight] = useState('')
    const [special_needs, setSpecialNeeds] = useState('')
    const [medications, setMedications] = useState('')

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
            // headers are third argument
            await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/pets`, requestBody)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <form onSubmit={handleNewPetSubmit}>
                <label htmlFor="pet-name-input">Pet Name:</label>
                <input
                    id="pet-name-input" 
                    type="text" 
                    name="pet_name"
                    onChange={e => setPetName(e.target.value)}
                />
                <label htmlFor="breed-input">Pet Name:</label>
                <input
                    id="breed-input" 
                    type="text" 
                    name="breed"
                    onChange={e => setBreed(e.target.value)}
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