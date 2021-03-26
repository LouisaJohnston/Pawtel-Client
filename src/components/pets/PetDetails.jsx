import { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'

export default function PetDetails(props) {
    const [deletedPet, setDeletedPet] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [pet_name, setPetName] = useState('')
    const [breed, setBreed] = useState('')
    const [age, setAge] = useState('')
    const [weight, setWeight] = useState('')
    const [special_needs, setSpecialNeeds] = useState('')
    const [medications, setMedications] = useState('')

    const handleEdit = (e) => {
        e.preventDefault()
        setIsEditing(true)
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
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
            await axios.put(`${process.env.REACT_APP_SERVER_URL}/api-v1/pets/${props.location.state._id}`, requestBody, { headers: authHeaders })
            // window.location.reload()
        } catch (err) {
            console.log(err)
        }
    }

    const handleDelete = async (e) => {
        e.preventDefault()
        try {
            const token = localStorage.getItem('jwtToken')
            const authHeaders = {
                'Authorization': token
              }
            await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api-v1/pets/${props.location.state._id}`, { headers: authHeaders })
            backToPets()
        } catch (err) {
            console.log(err)
        }
    }

    const backToPets = () => {
        setDeletedPet(true)
    }
    if (deletedPet) return <Redirect to='/pets' />

    const editForm = isEditing ? (
        <div>
                <h1>Update Your Pet's Information:</h1>
                <form onSubmit={handleUpdate}>
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
                        value="Update Pet Information"
                    />
            </form>
        </div>
    )
    : ""
    return (
        <div key={props.location.state.pet}>
            <h2> {props.location.state.pet_name} </h2>
            <h4> {props.location.state.breed} </h4>
            <h4> {props.location.state.age} </h4>
            <h4> {props.location.state.weight} </h4>
            <h4> {props.location.state.special_needs} </h4>
            <h4> {props.location.state.medications} </h4>

            <form onSubmit={handleDelete}>
                <input type="submit" value="Delete Pet"></input>
            </form>
            <form onSubmit={handleEdit}>
                <input type="submit" value="Update Pet"></input>
            </form>
            {editForm}
            <Link to='/pets'>Back to your pets</Link>
        </div>
    )
}