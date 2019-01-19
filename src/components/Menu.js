import { Link } from "react-router-dom"

const menuTitles = {
        true: ['Overview', 'Add Day', 'Logout', 'Day List'],
        false: ['Login']
}

export const Menu = ({authState}) => {   

    let routes = authState 
    ? ['/overview', '/addDay', '/logout', '/dayList'] 
    : ['/login']

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