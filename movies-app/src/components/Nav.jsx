import {Link} from 'react-router-dom';
import '../styles/nav.css';

const Nav = () => {
   return  (
    <nav>
        <div className='nav-buttons'>
        <Link to='/home'>Home</Link>
        <Link to='/reviews'>Reviews</Link> 
        <Link to='/create'>Create</Link>
        </div>

    </nav>
   );
};

export default Nav;