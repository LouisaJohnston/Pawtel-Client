import { Link } from 'react-router-dom'
// NEED TO ADD PETS AND HOTELS LINKS

export default function Navbar(props) {
    const loggedIn = (
        <>
            <Link to='/'>
                <span onClick={props.handleLogout}>log out</span>
            </Link>

            <Link to='/profile'>
                profile
            </Link>
        </>
    )

    const loggedOut = (
        <>
            <Link to='/register'>
                register
            </Link>
            <br></br>
            {/* use css to fix this instead of break line */}
            <Link to='/login'>
                login
            </Link>
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