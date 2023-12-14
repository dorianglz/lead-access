import '../style/App.css';
import logo from '../images/logo.svg'
import home from '../images/home.svg'
import people from '../images/people.svg'
import person from '../images/person.svg'

export default function Header() {
    return (
        <div className='Header'>
            <img src={logo} alt="Logo" />
            <div className='tabs'>
                <img className='tabIcon' src={home} alt="Home" />
                <img className='tabIcon' src={people} alt="People" />
            </div>
            <div className='profil'>
              <img className='tabIcon' src={person} alt="Person" />
                <p className='username'>username</p>
            </div>
        </div>
    );
}