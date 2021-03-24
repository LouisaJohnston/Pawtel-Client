import { Link } from 'react-router-dom'

export default function Navbar(props) {
    const loggedIn = (
        <>
            <div className="navbar">
                <Link to='/pet' id="route-link">
                    pets
            </Link>
                <Link to='/hotels' id="route-link">
                    hotels
            </Link>

                <Link to='/favorite' id="route-link">
                    favs
            </Link>

            </div>
            <div className="navbar" id="route-link">
                <Link to='/'>
                    <span onClick={props.handleLogout}>log out</span>
                </Link>

                <Link to='/profile' id="route-link">
                    profile
            </Link>
            </div>
        </>
    )

    const loggedOut = (
        <>
            <div>
                <Link to='/hotels' id="route-link">
                    hotels
            </Link>
                <Link to='/register' id="route-link">
                    register
            </Link>
                <Link to='/hostregister' id="route-link">
                    hostregister
            </Link>

                <Link to='/login' id="route-link">
                    login
            </Link>
                <Link to='/HostLogin'>
                    Host
            </Link>
            </div>

        </>

    )

    return (
        <nav className="navbar">
            <Link to='/' id="route-link">
                <h2>pawtel</h2>
            </Link>

            {props.currentUser ? loggedIn : loggedOut}
        </nav>
    )

}