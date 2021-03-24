// import { Link } from 'react-router-dom'

export default function HotelDetails(props) {
    return (
        <div key={props.state.hotel}>
            <h2> wooo {props.state.hotel_name} </h2>
        </div>
    )
}