import { Link } from 'react-router'

export const Menu = () => 
    <nav>
        <Link to='/' activeClassName="selected">Home</Link>
        <Link to='/add-day' activeClassName="selected">Add Day</Link>
        <Link to='/list-days' activeClassName="selected" >List Day</Link>
        
    </nav>
