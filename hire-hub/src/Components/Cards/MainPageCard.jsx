import './MainPageCard.css'

export default function MainPageCard({iconLink, phrase}) {
    return (
        <div className="main-page-card-container">
            <i className={ iconLink }></i>
            <p className="phrase">
                { phrase }
            </p>
        </div>
    );
}