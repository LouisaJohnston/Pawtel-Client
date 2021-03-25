import { Link } from 'react-router-dom'

export default function HostHotel(props) {
    return (
        <div key={props.location.state.hotel}>
            <h2> {props.location.state.hotel_name} </h2>
            <h4> {props.location.state.zipcode} </h4>
            <h4> {props.location.state.specialty} </h4>
            <h4> {props.location.state.weight_limit_lb} </h4>
            <h4> {props.location.state.phone_number} </h4>
            <h4> {props.location.state.email} </h4>
            <Link to='/hostpage'>Back to hotels</Link>
        </div>
    )
}