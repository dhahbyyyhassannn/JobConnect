import { useState, useEffect } from 'react'
import NavBar from '../Layouts/NavBar'
import JobDetailsDialog from '../Components/Dialog/JobDetailsDialog'
import ApplicantsDialog from '../Components/Dialog/ApplicantsDialog'
import { getCurrentUser } from '../API/AuthAPI'
import { getJobsByRecruiterId } from '../API/JobAPI'
import './ApplicationPage.css'

export default function ApplicationPage() {
    
    const [currentUser, setCurrentUser] = useState(null)
    useEffect(() => {
        getCurrentUser()
        .then(res => setCurrentUser(res?.data))
        .catch(err => console.error('error', err))
    }, [])


    const [recruiterJobs, setRecruiterJobs] = useState([])
    useEffect(() => {
        if (!currentUser?.user_id) return;

        getJobsByRecruiterId(currentUser?.user_id)
        .then(res => {
            console.log('APPLICATIONS: ', res?.data)
            setRecruiterJobs(res?.data)
        })
        .catch(err => console.error('error: ', err))
    }, [currentUser?.user_id])

    const [viewingJobId, setViewingJobId] = useState(null)
    const [viewingApplicantsJob, setViewingApplicantsJob] = useState(null)


    return (
        <>
            <NavBar />
            <main className="application-page-container">
            <header className="application-page-header">
                <p className="application-page-eyebrow">RECRUITER WORKSPACE</p>
                <h2>
                    Welcome {currentUser?.username || 'recruiter'}!
                </h2>
                <p>
                    Review your job offers, see who applied, and keep every hiring decision in one focused workspace.
                </p>
            </header>
            <section className="application-page-body" aria-label="Your job applications">
                {recruiterJobs.length === 0 ? (
                    <div className="application-page-empty-state">No applications found for your job offers yet.</div>
                ) : recruiterJobs.map(job => (
                        <article className="application-page-card" key={job.job_offer_id}>
                            <div className="application-page-card-copy">
                                <p className="application-page-card-label">JOB OFFER</p>
                            <h3>
                                {job?.title || 'Loading job...'}
                            </h3>
                                <p>
                                    {job?.location || 'Location not specified'}
                                </p>
                            </div>
                            <div className="application-page-buttons">
                                <button type="button" className="application-page-secondary-button" onClick={() => setViewingJobId(job.job_offer_id)}>See the job</button>
                                <button
                                    type="button"
                                    className="application-page-primary-button"
                                    onClick={() => setViewingApplicantsJob(job)}
                                >
                                    See applicants
                                </button>
                            </div>
                        </article>  
                    ))}
            </section>
            </main>
            {viewingJobId && (
                <JobDetailsDialog job_offer_id={viewingJobId} onClose={() => setViewingJobId(null)} />
            )}
            {viewingApplicantsJob && (
                <ApplicantsDialog
                    app={viewingApplicantsJob}
                    recruiterId={currentUser?.user_id}
                    onClose={() => setViewingApplicantsJob(null)}
                />
            )}
        </>
    )
}