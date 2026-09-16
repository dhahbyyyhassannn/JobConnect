import './RecruiterDashboardLink.css'

export default function RecruiterDashboardLink({ linkName, Icon, onClick }) {
    return (
        <div className="recruiter-dashboard-link-container" onClick={ onClick }>
            <Icon />
            <p>
                { linkName }
            </p>
        </div>
    )
}