import { Link } from "react-router-dom"

export const Menu = () => {
    return (
    <nav>
        <Link to="/public">Public Page |</Link>
        <Link to="/protected"> Login |</Link>
        <Link to="/logout"> Logout |</Link>
        <Link to="/dayList"> Day List </Link>
    </nav>
    )
}