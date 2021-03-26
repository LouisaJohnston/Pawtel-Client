import { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'

export default function PetDetails(props) {
    const [deletedPet, setDeletedPet] = useState(false)

    const handleUpdate = async (e) => {
        e.preventDefault()
        const requestBody = {
            // pet_name: pet_name,
            // breed: breed,
            // age: age,
            // weight: weight,
            // special_needs: special_needs,
            // medications: medications
        }
        try {
            await axios.put(`${process.env.REACT_APP_SERVER_URL}/api-v1/pets`, requestBody)
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
            const boop = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api-v1/pets/${props.location.state._id}`, { headers: authHeaders })
            console.log(boop)
            setDeletedPet(true)
        } catch (err) {
            console.log(err)
        }
    }

    if (deletedPet) return <Redirect to='/pets' />
    return (
        <div key={props.location.state.pet}>
            <h2> {props.location.state.pet_name} </h2>
            <h4> {props.location.state.breed} </h4>
            <h4> {props.location.state.age} </h4>
            <h4> {props.location.state.weight} </h4>
            <h4> {props.location.state.special_needs} </h4>
            <h4> {props.location.state.medications} </h4>

            <form onSubmit={handleUpdate}>
                <input type="submit" value="Update Pet"></input>
            </form>

            <form onSubmit={handleDelete}>
                <input type="submit" value="Delete Pet"></input>
            </form>

            <Link to='/pets'>Back to your pets</Link>
        </div>
    )
}