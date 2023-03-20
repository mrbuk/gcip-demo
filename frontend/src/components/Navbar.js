import { NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li><strong>Webby</strong></li>
            </ul>
            <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/signup">Sign Up</NavLink></li>
                <li><NavLink to="/login" role="button">Login</NavLink></li>
                <li><NavLink to="/logout" role="button">Logout</NavLink></li>
            </ul>
        </nav>
    )
}

export default Navbar