import { Link } from 'react-router-dom';

export default function LogoBrand() {
    return (
        <Link to="/" className="logo-container" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="icon-container">
                <i className="bi bi-suitcase-lg"></i>
            </div>
            <div className="logo-name-container">
                <span style={{ color: 'black' }}>Job</span>
                <span style={{ color: '#00C1BD' }}>Connect</span>
            </div>
        </Link>
    );
}
