import { useState, useEffect } from 'react'
import NavBar from "../Layouts/NavBar"
import Badge from '../Components/Badge'
import { getCurrentUser } from "../API/AuthAPI"
import { getApplicationsByUserId } from '../API/ApplicationAPI'
import { ApplicationReview } from '../API/ApplicationAPI'
import { getJobById } from '../API/JobAPI'
import './ApplicationsPage.css'

export default function ApplicationsPage() {

    const [user, setUser] = useState(null);

    useEffect(() => {
        getCurrentUser()
        .then(res => setUser(res?.data || null))
        .catch(err => console.error(err));
    }, [])

    const [applications, setApplications] = useState([]);
    useEffect(() => {
        if (!user?.user_id) return;

        getApplicationsByUserId(user?.user_id)
        .then(res => setApplications(res?.data || []))
        .catch(err => console.error(err));
    }, [user?.user_id])

    const [jobs, setJobs] = useState({});
    useEffect(() => {
        if (!applications.length) return;

        applications.forEach((application) => {
            getJobById(application.job_offer_id)
            .then(res => {
                setJobs(prev => ({ ...prev, [application.job_offer_id]: res?.data }));
            })
            .catch(err => console.error(err));
        });
    }, [applications])

    // Results keyed by application_id, so every card keeps its own result
    const [result, setResult] = useState({});
    // Tracks which application is currently being analyzed, per card
    const [analyzingId, setAnalyzingId] = useState(null);
    // Tracks per-application errors, so a failed call is visible instead of silent
    const [errorId, setErrorId] = useState({});

    const handleAnalyze = async (application_id) => {
        setAnalyzingId(application_id);
        setErrorId(prev => ({ ...prev, [application_id]: null }));
        try {
            const response = await ApplicationReview(application_id);
            setResult(prev => ({ ...prev, [application_id]: response?.data }));
        }
        catch (err) {
            console.log('error', err);
            setErrorId(prev => ({ ...prev, [application_id]: 'Something went wrong while analyzing this application.' }));
        }
        finally {
            setAnalyzingId(null);
        }
    }

    return (
        <>
            <NavBar />
            <div className="application-page-container">
                <div className="application-page-header">
                    <Badge>MY APPLICATIONS</Badge>
                    <div className="application-page-header-text">
                        <h2>
                            Welcome {user?.username}!
                        </h2>
                        <p>
                            Review every application you submitted, keep track of roles you are interested in,
                            and discover the AI opinion about each candidacy.
                        </p>
                    </div>
                </div>

                <div className="application-page-body">
                    {applications.length === 0 ? (
                        <div className="application-page-empty-state">
                            You do not have any applications yet. Start exploring jobs and apply to your next opportunity.
                        </div>
                    ) : (
                        applications.map((application) => {
                            const applicationResult = result[application.application_id];
                            const isAnalyzing = analyzingId === application.application_id;
                            const applicationError = errorId[application.application_id];

                            return (
                                <div className="application-page-job-card" key={application.application_id}>
                                    <div className="application-page-job-card-top">
                                        <div>
                                            <p className="application-page-job-label">Application</p>
                                            <h3>{jobs[application.job_offer_id]?.title || 'Job offer'}</h3>
                                        </div>
                                        <span className="application-page-status">Active</span>
                                    </div>

                                    <div className="application-page-job-meta">
                                        <span>{jobs[application.job_offer_id]?.company || 'Hiring team'}</span>
                                        <span>{jobs[application.job_offer_id]?.location || 'Remote'}</span>
                                    </div>

                                    <button
                                        type="button"
                                        className="application-page-review-btn"
                                        onClick={() => handleAnalyze(application.application_id)}
                                        disabled={isAnalyzing}
                                    >
                                        {isAnalyzing ? 'Analyzing...' : 'AI Review'}
                                    </button>

                                    {applicationError && (
                                        <p className="application-page-error">{applicationError}</p>
                                    )}

                                    {applicationResult && (
                                        <div className="application-page-result-panel">
                                            <h4>AI review</h4>
                                            <p><strong>Score:</strong> {applicationResult.score}</p>
                                            <p><strong>Match:</strong> {applicationResult.matched ? 'Yes' : 'No'}</p>
                                            <p><strong>Explanation:</strong> {applicationResult.explanation}</p>
                                            {applicationResult.matching_skills?.length > 0 && (
                                                <p>
                                                    <strong>Matching skills:</strong>{' '}
                                                    {applicationResult.matching_skills.join(', ')}
                                                </p>
                                            )}
                                            {applicationResult.missing_requirements?.length > 0 && (
                                                <p>
                                                    <strong>Missing requirements:</strong>{' '}
                                                    {applicationResult.missing_requirements.join(', ')}
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </>
    )
}