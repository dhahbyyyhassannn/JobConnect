import './AboutUsPageCard.css'


export default function AboutUsPageCard({number, title}) {
    return (
        <div className="about-us-card-container">
            <h2>
                {number}+
            </h2>
            <p>
                {title}
            </p>
        </div>
    )
}