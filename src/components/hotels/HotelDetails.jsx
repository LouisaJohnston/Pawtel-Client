// import { Link } from 'react-router-dom'

export default function HotelDetails(props) {
    return (
        <div key={props.hotel}>
            <h2> wooo {props.hotel_name} </h2>
        </div>
    )
}