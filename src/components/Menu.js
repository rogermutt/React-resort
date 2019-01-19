import { Link } from "react-router-dom"

const menuTitles = {
    true: ['Main', 'Add Day', 'Logout', 'Day List'],
    false: ['Main', 'Login']
}

export const Menu = ({authState}) => {   

    let routes = authState 
    ? ['/', '/addDay', '/logout', '/dayList'] 
    : ['/', '/login']

    return (
        <nav>
            {routes.map((route,key)=> 
                <Link 
                    key={key} to={route}>{menuTitles[authState][key]}|
                </Link>
            )}
        </nav>
    )
}