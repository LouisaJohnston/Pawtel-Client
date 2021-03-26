
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


// export default function Favorite(props) {
//     console.log(props.currentUser)
//     return (
//         <div key={props.currentUser.favorites}>
//             <h1>{props.currentUser.favorites}</h1>
//             <Link to="/hotels">Return to hotels</Link>
//         </div>
//     )

// }

export default function Favorite() {
    const [favorites, setFavorites] = useState([])

    useEffect(() => {

    })
    return (
        <div>
        </div>
    )
}