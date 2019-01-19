import { Link } from "react-router-dom"

const menuTitles = {
    true: ['Main', 'Add Day', 'Logout', 'Day List'],
    false: ['Main', 'Login']
}


export const Menu = ({authState}) => {      
    return (
        <nav>
            { authState 
                ? ['/', '/add-day', '/logout', '/dayList']
                    .map((route,key)=> <Link key={key} to={route}>{menuTitles[authState][key]}|</Link>) 
                : ['/', '/protected']
                    .map((route,key)=> <Link key={key} to={route}>{menuTitles[authState][key]}|</Link>) 
            }
        </nav>
    )
}

// {/* <Link to="/">Main|</Link>
// <Link to="/login"> Login |</Link>
// <Link to="/add-day"> Add Day |</Link>
// <Link to="/logout"> Logout |</Link>
// <Link to="/dayList"> Day List </Link> */}
