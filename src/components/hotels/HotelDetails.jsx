// import { Link } from 'react-router-dom'

export default function HotelDetails(props) {
    return (
        <div key={props.location.state.hotel}>
            <h2> {props.location.state.hotel_name} </h2>
            
        </div>
    )
}