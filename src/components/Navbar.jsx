import { Link } from 'react-router-dom'
// NEED TO ADD PETS AND HOTELS LINKS

export default function Navbar(props) {
    const loggedIn = (
        <>
            <div>
                <Link to='/pet'>
                    pets
            </Link>
                <Link to='/hotel'>
                    hotels
            </Link>

                <Link to='/favorite'>
                    favs
            </Link>

            </div>
            <div>
                <Link to='/'>
                    <span onClick={props.handleLogout}>log out</span>
                </Link>

                <Link to='/profile'>
                    profile
            </Link>
            </div>
        </>
    )

    const loggedOut = (
        <>
            <div>
                <Link to='/hotel'>
                    hotels
            </Link>
            </div>
            <div>
                <Link to='/register'>
                    register
            </Link>
                <br></br>
                {/* use css to fix this instead of break line */}
                <Link to='/login'>
                    login
            </Link>

            </div>
        </>

    )

    return (
        <nav className="navbar">
            {/* sends to home or user? */}
            <Link to='/'>
                <h2>pawtel</h2>
            </Link>

            {props.currentUser ? loggedIn : loggedOut}
        </nav>
    )

}