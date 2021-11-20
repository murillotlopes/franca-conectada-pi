
import {Link} from 'react-router-dom'

import './header.css'

const Header = () => {
    return(
        <header className='header'>
            <ul>
                <Link to='/'>
                    <li>Inicio</li>
                </Link>

                <Link to='/dashboard'>
                    <li>Serviços</li>
                </Link>

                <Link to='/ajuda'>
                    <li>Ajuda</li>
                </Link>

                <Link to='/login'>
                    <li>Login</li>
                </Link>

            </ul>

        </header>
    )
}

export default Header