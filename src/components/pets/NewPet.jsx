import { Link } from 'react-router-dom'

export default function NewPet (props) {
    
    return (
        <div key={props.location.pets}>
            <form onSubmit={props.location.handleNewPetSubmit}>
                <label htmlFor="pet-name-input">Pet Name:</label>
                <input
                    id="pet-name-input" 
                    type="text" 
                    name="pet_name"
                    onChange={props.location.handleNewPetNameChange}
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