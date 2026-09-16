import { useState } from "react"
import NavBar from "../Layouts/NavBar"
import RecruiterDashboardLink from "../Components/Links/RecruiterDashboardLink"
import { ChartNoAxesCombined, BriefcaseBusiness, Dock, PlusCircle } from "lucide-react"
import AddJobForm from '../Components/Forms/AddJobForm'
import './RecruiterDashboardPage.css'
import ManageJobs from "../Layouts/ManageJobs"


export default function RecruiterDashboardPage() {
    const [selected, setSelected] = useState('statistics')
    
    return (
       <>
        <NavBar />
        <main className="recruiter-page-container">
        <header className="recruiter-page-heading">
            <h1>Recruiter dashboard</h1>
            <p>Manage your hiring workflow, publish opportunities, and review the people applying to your jobs.</p>
        </header>
        <nav className="recruiter-page-menu" aria-label="Recruiter dashboard sections">
            <ul>
                <li>
                    <RecruiterDashboardLink linkName={ 'statistics' } Icon={ ChartNoAxesCombined } onClick={ () => setSelected('statistics') } />
                </li>
                <li>
                    <RecruiterDashboardLink linkName={ 'manage jobs' } Icon={ BriefcaseBusiness } onClick={ () => setSelected('manage jobs') }/>
                </li>
                <li>
                    <RecruiterDashboardLink linkName={ 'applications' } Icon={ Dock } onClick={ () => setSelected('applications') }/>
                </li>
                <li>
                    <RecruiterDashboardLink linkName={ 'post a job' } Icon={ PlusCircle } onClick={ () => setSelected('post a job') }/>
                </li>
            </ul>
        </nav>
        <div className="recruiter-page-rendering">
            { selected === 'post a job' && <AddJobForm /> }
            { selected === 'manage jobs' && <ManageJobs /> }
        </div>
        </main>
       </>
    )

}