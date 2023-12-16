import '../style/App.css';
import logo from '../images/logo.svg'
import home from '../images/home.svg'
import people from '../images/people.svg'
import person from '../images/person.svg'
import AuthContext from '../context/AuthProvider';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {

    const { auth, setAuth } = useContext(AuthContext);
    const [ floating, setFloating ] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('user')
        setAuth({})
    }

    return (
        <div className='Header'>
            <img src={logo} alt="Logo" />
            {auth.email && <div className='tabs'>
                <Link to={'/'}>
                    <img className='tabIcon' src={home} alt="Home" />
                </Link>
                <Link to={'/collaborators'}>
                    <img className='tabIcon' src={people} alt="People" />
                </Link>
            </div>}
            {auth.email && <div className='profil' onClick={() => setFloating(!floating)}>
                <img className='tabIcon' src={person} alt="Person" />
                <p className='username'>{auth.firstname}</p>
                {floating &&<div className='floating-menu'>
                    <p className='floating-label'onClick={handleLogout}>Se déconnecter</p>
                </div>}
            </div>}
        </div>
    );
}