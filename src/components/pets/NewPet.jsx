export default function NewPet (props) {
    return (
        <div>
            <form onSubmit={props.location.state.handleNewPetSubmit} method="POST" action="/pets">
                <input type="text" name="pet_name" value={props.location.state.newPetNameInput} onChange={props.location.state.handleNewPetNameChange}/>
                <input type="submit" value="Add to Your Pet List"/>
            </form>
        </div>
    )
}