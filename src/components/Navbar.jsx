import { Link } from 'react-router-dom'

export default function Navbar(props) {


    const loggedIn = (
        <>
            <div className="navbar">
                <Link to='/pets'>
                    pets
                </Link>

                <Link to='/hotels'>
                    hotels
                </Link>

                <Link to='/favorite'>
                    favs
                 </Link>

            </div>
            <div className="navbar">

                <Link to='/profile'>
                    profile
                </Link>

                <Link to='/'>
                    <span onClick={props.handleLogout}>log out</span>
                </Link>

            </div>
        </>
    )

    const hostLoggedIn = (
        <>
            <div className="navbar">
                <div>
                    <Link to='/'>
                        <h2>pawtel</h2>
                    </Link>
                </div>
                <div>
                    <Link to='/hotels'>
                        hotels
                    </Link>
                </div>
                <div>
                    <Link to='/hostpage'>
                        host profile
                    </Link>

                    <Link to='/'>
                        <span onClick={props.handleLogout}>log out</span>
                    </Link>
                </div>

            </div>

        </>
    )


    const loggedOut = (
        <>
            <div>
                <Link to='/hotels'>
                    hotels
                </Link>
                <Link to='/register'>
                    register
                </Link>
                <Link to='/login'>
                    login
                </Link>
            </div>

        </>
    )

    if (props.currentUser && props.currentUser.isHost) return hostLoggedIn


    return (
        <nav className="navbar">
            <Link to='/'>
                <h2>pawtel</h2>
            </Link>
            {props.currentUser ? loggedIn : loggedOut}
        </nav>
    )

}