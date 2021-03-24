import { Link } from 'react-router-dom'

export default function PetDetails(props) {
    return (
        <div key={props.location.state.pet}>
            <h2> {props.location.state.pet_name} </h2>
            <h4> {props.location.state.breed} </h4>
            <h4> {props.location.state.age} </h4>
            <h4> {props.location.state.weight} </h4>
            <h4> {props.location.state.special_needs} </h4>
            <h4> {props.location.state.medications} </h4>
            <Link to='/pets'>Back to your pets</Link>
        </div>
    )
}