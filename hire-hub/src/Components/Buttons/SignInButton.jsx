import './SignInButton.css'
import { useNavigate } from 'react-router-dom';

export default function SignInButton() {
    const navigate = useNavigate()
    return (
        <div className="button" onClick={() => navigate("/auth-page")}>
            Sign In
        </div>
    )
}