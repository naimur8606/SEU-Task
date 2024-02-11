import { Link } from 'react-router-dom';
import './nav.css'

function Navbar() {

  return (
    <>
      <ul>
        <li><Link>Add student</Link></li>
        <li><Link>All Students</Link></li>
        <li><Link to={'/createCourse'}>Create Course</Link></li>
        <li><Link to={'/setCredit'}>Set Credits</Link></li>
        <li><Link to={'/Registation'}>Couser Registation</Link></li>
        <li><Link to={'/login'}>Login</Link></li>
      </ul>
    </>
  )
}

export default Navbar;
