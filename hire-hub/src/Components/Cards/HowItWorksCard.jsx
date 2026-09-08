import './HowItWorksCard.css'

export default function HowItWorksCard({ number, iconLink, etape, description }) {
    return(
        <div className="container">
            <div className="hero-section">
                <div className="icon-container">
                    <i className={ iconLink }></i>
                </div>
                <div className="number-container">
                    <h2>
                        { number }
                    </h2>
                </div>
            </div>
            <div className="etape-container">
                { etape }
            </div>
            <div className="description-container">
                { description }
            </div>
        </div>
    )
}