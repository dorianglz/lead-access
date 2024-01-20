import '../style/App.css';
import logo from '../images/logo.svg'
import logo_mobile from '../images/logo_mobile.svg'
import home from '../images/home.svg'
import people from '../images/people.svg'
import person from '../images/person.svg'
import AuthContext from '../context/AuthProvider';
import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {

    const { auth, setAuth } = useContext(AuthContext);
    const [ floating, setFloating ] = useState(false);
    const [ windowWidth, setWindowWidth ] = useState(window.innerWidth);

    const handleLogout = () => {
        localStorage.removeItem('user')
        setAuth({})
    }

    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    };
    
    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    
    return (
        <div className='Header'>
            <img className='logo' src={windowWidth > 500 ? logo : logo_mobile} alt="Logo" />
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
                {windowWidth > 500 && <p className='username'>{auth.firstname}</p>}
                {floating &&<div className='floating-menu'>
                    <p className='floating-label'onClick={handleLogout}>Se déconnecter</p>
                </div>}
            </div>}
        </div>
    );
}