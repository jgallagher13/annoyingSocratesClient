import { Link } from 'react-router-dom'
import * as userService from '../../../utilities/user-services'
import './NavBar.css'

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    userService.logOut()
    setUser(null)
  }

  return (
    <nav>
      <img src='../../../images/thinkingsoc.png' />
      <Link to='/'>All Quotes</Link>
      &nbsp;&nbsp;
      <Link to='/about'>About</Link>
      &nbsp;&nbsp;
      <span>Welcome, {user.name}</span>
      &nbsp;&nbsp;<Link to='' onClick={handleLogOut}>Log Out</Link>
      <img src='../../../images/lightbulbsoc.png' />
    </nav>
  );
}