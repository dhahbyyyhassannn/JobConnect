import HowItWorksCard from "./Cards/HowItWorksCard"
import './HowItWorks.css'

export default function HowItWorks() {
    return (
        <div className="how-it-works-container">
            <div className="header-container">
                <h3 style={{color: "#00C1BD",}}>
                    how it works
                </h3>
                <h1 style={{fontWeight: "bolder"}}>
                    From CV to the right opportunity
                </h1>
                <p style={{color: "#536B82"}}>
                    One profile for a more focused search, a simpler application, and a clearer shortlist.
                </p>
            </div>
            <div className="card-container">
                <HowItWorksCard 
                    iconLink={ "bi bi-file-earmark-person" } 
                    number={"01"} 
                    etape={ "Upload your CV" } 
                    description={"Upload your CV once. JobConnect uses the skills, experience, and preferences in it as the foundation for your search."} 
                />
                <HowItWorksCard 
                    iconLink={ "bi bi-search" } 
                    number={"02"} 
                    etape={ "Super search" } 
                    description={"Search through available roles with your CV in mind and surface the offers that best fit your profile."} 
                />
                <HowItWorksCard 
                    iconLink={ "bi bi-send" } 
                    number={"03"} 
                    etape={ "Apply in one click" } 
                    description={"Apply for the roles you choose. Recruiters can then use AI to clear irrelevant CVs and focus on stronger matches."} 
                />
            </div>
        </div>
    )
}