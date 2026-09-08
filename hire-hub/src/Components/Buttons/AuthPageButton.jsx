import './AuthPageButton.css'

export default function AuthPageButton({ buttonName, onClick, active }) {
    return (
        <div
            onClick={onClick}
            className={`auth-page-button-container ${active ? 'active' : ''}`}
        >
            {buttonName}
        </div>
    )
}