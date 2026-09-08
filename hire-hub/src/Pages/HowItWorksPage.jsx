import NavBar from '../Layouts/NavBar';
import HowItWorks from '../Components/HowItWorks';
import Badge from '../Components/Badge';
import './HowItWorksPage.css';

export default function HowItWorksPage() {
    return (
        <>
            <NavBar />
            <main className="how-it-works-page">
                <section className="how-it-works-page-intro">
                    <Badge>THE JOBCONNECT LOOP</Badge>
                    <h1>A better path from your CV to your next job.</h1>
                    <p>
                        JobConnect keeps the candidate experience simple while giving recruiters a clearer,
                        more focused set of applications to review.
                    </p>
                </section>
                <HowItWorks />
                <section className="workflow-audience-grid">
                    <article>
                        <span className="workflow-kicker">FOR JOB SEEKERS</span>
                        <h2>Search with context.</h2>
                        <p>
                            Your CV is more than a document. It gives your search useful context so you can
                            find roles that fit your skills and experience, then apply when the opportunity is right.
                        </p>
                    </article>
                    <article>
                        <span className="workflow-kicker">FOR RECRUITERS</span>
                        <h2>Review what matters.</h2>
                        <p>
                            Applications stay in one place, while AI helps clear CVs that do not meet the role's
                            requirements so your team can spend its time on relevant candidates.
                        </p>
                    </article>
                </section>
            </main>
        </>
    );
}
