import { Link } from 'react-router-dom';
import './NavBarLink.css';

export default function NavBarLink({LinkName, path}) {
    return (
        <div className="nav-link-container">
            <Link to={path} className="app-nav-link">
                {LinkName}
            </Link>
        </div>
    )
}