import { Link } from "react-router-dom"

const menuTitles = {
        true: ['Overview', 'Add Day', 'Logout', 'Day List', 'Members', 'Preview'],
        false: ['Login', 'Register']
}

export const Menu = ({authState}) => {   

    let routes = authState 
    ? ['/overview', '/addDay', '/logout', '/dayList', '/members', '/preview'] 
    : ['/login', '/signup']

    return (
        <nav>
            {routes.map((route,key)=> 
                <Link 
                    key={key} to={route}>{ menuTitles[authState][key] }
                </Link>
            )}
        </nav>
    )
}