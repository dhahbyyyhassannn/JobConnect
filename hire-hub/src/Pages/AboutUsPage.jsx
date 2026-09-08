import NavBar from "../Layouts/NavBar"
import Badge from "../Components/Badge"
import './AboutUsPage.css'


export default function AboutUsPage() {
    return (
        <>
            <NavBar />
            <div className="about-us-page-container">
                <div className="about-us-page-header">
                    <Badge>
                        ABOUT US
                    </Badge>
                    <div className="about-us-page-header-text">
                        <h2>
                            We connect skills with opportunity
                        </h2>
                        <p>
                            JobConnect was built in Tunisia for job seekers, by job seeker.
                        </p>
                    </div>
                </div>
                
                <div className="about-us-page-content">
                    <div className="about-us-page-content-text">
                        <div className="about-us-page-content-text-left-section">
                            <h2>
                                Our Story
                            </h2>
                            <p>
                                JobConnect started with a simple observation: job seekers spend too much time
                                searching through roles that do not fit, while recruiters spend too much time
                                reviewing applications that do not match their needs. We are building one focused
                                place where a candidate's CV powers a smarter job search and every application is
                                easier to understand.
                            </p>
                        </div>
                        <div className="about-us-page-content-text-right-section">
                        <div className="about-us-principle">
                            <span className="about-us-principle-icon">01</span>
                            <h3>Built around your CV</h3>
                            <p>Upload your CV once and use the skills, experience, and preferences inside it to find more relevant roles.</p>
                        </div>
                        <div className="about-us-principle">
                            <span className="about-us-principle-icon">02</span>
                            <h3>Useful search, less noise</h3>
                            <p>Super search helps you move from a broad job board to offers that make sense for your profile.</p>
                        </div>
                        <div className="about-us-principle">
                            <span className="about-us-principle-icon">03</span>
                            <h3>Fairer recruiter workflows</h3>
                            <p>Recruiters can spend more time on promising applications while AI helps clear irrelevant CVs from the pile.</p>
                        </div>
                        <div className="about-us-principle">
                            <span className="about-us-principle-icon">04</span>
                            <h3>Human decisions stay central</h3>
                            <p>Matching is a starting point. Candidates and recruiters still decide what feels like the right opportunity.</p>
                        </div>
                        </div>  
                    </div>
                </div>
            </div>
        </>
    )
}