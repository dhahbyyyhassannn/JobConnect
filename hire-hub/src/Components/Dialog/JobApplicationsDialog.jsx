import { useEffect, useState } from 'react';
import { ApplicationReview, getApplicationsByRecruiterId } from '../../API/ApplicationAPI';
import './JobApplicationsDialog.css';

function getApplications(response) {
    const payload = response?.data;
    if (Array.isArray(payload)) return payload;
    return payload?.applications || payload?.results || payload?.data || [];
}

function getApplicantName(application) {
    return application.applicant?.username
        || application.user?.username
        || application.username
        || application.candidate_name
        || 'Candidate';
}

export default function JobApplicationsDialog({ job, onClose }) {
    const [applications, setApplications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState('');
    const [analysisById, setAnalysisById] = useState({});
    const [analyzingId, setAnalyzingId] = useState(null);

    useEffect(() => {
        let isCurrent = true;

        getApplicationsByRecruiterId(job.recruiter_id)
            .then(response => {
                const recruiterApplications = getApplications(response);
                const jobApplications = recruiterApplications.filter(application => (
                    application.job_offer_id === job.job_offer_id
                ));
                if (isCurrent) setApplications(jobApplications);
            })
            .catch(error => {
                console.error('Failed to load applications:', error);
                if (isCurrent) setLoadError(error?.response?.data?.detail || 'Unable to load applications.');
            })
            .finally(() => {
                if (isCurrent) setIsLoading(false);
            });

        return () => { isCurrent = false; };
    }, [job.job_offer_id, job.recruiter_id]);

    const handleAnalyze = async (application) => {
        const applicationId = application.application_id || application.id;
        if (!applicationId) return;

        setAnalyzingId(applicationId);
        try {
            const response = await ApplicationReview(applicationId);
            setAnalysisById(previous => ({ ...previous, [applicationId]: response?.data }));
        } catch (error) {
            console.error('Failed to analyze application:', error);
            setAnalysisById(previous => ({
                ...previous,
                [applicationId]: { error: 'CV analysis failed. Please try again.' }
            }));
        } finally {
            setAnalyzingId(null);
        }
    };

    return (
        <div className="job-dialog-backdrop" role="presentation" onClick={onClose}>
            <div className="job-applications-dialog" role="dialog" aria-modal="true" aria-labelledby="job-applications-title" onClick={event => event.stopPropagation()}>
                <div className="job-dialog-header">
                    <div>
                        <p className="job-dialog-eyebrow">Recruiter statistics</p>
                        <h2 id="job-applications-title">{job.title}</h2>
                    </div>
                    <button type="button" className="job-dialog-close" onClick={onClose} aria-label="Close applications dialog">&times;</button>
                </div>

                {isLoading && <p className="job-applications-state">Loading applicants...</p>}
                {loadError && <p className="job-applications-error">{loadError}</p>}
                {!isLoading && !loadError && applications.length === 0 && (
                    <p className="job-applications-state">No applications have been submitted for this job yet.</p>
                )}

                {!isLoading && !loadError && applications.length > 0 && (
                    <div className="job-applications-list">
                        {applications.map((application, index) => {
                            const applicationId = application.application_id || application.id || index;
                            const analysis = analysisById[applicationId];
                            const isAnalyzing = analyzingId === applicationId;

                            return (
                                <div className="job-applicant-row" key={applicationId}>
                                    <div>
                                        <h3>{getApplicantName(application)}</h3>
                                        <p>Application #{application.application_id || application.id || index + 1}</p>
                                    </div>
                                    <button type="button" className="job-statistics-button" onClick={() => handleAnalyze(application)} disabled={isAnalyzing}>
                                        {isAnalyzing ? 'Analyzing CV...' : 'Analyze CV'}
                                    </button>
                                    {analysis && (
                                        <div className={`job-applicant-analysis ${analysis.error ? 'job-applications-error' : ''}`}>
                                            {analysis.error ? analysis.error : (
                                                <>
                                                    <strong>Score: {analysis.score ?? 'Not available'}</strong>
                                                    {analysis.explanation && <p>{analysis.explanation}</p>}
                                                    {analysis.matching_skills?.length > 0 && <p><strong>Matching skills:</strong> {analysis.matching_skills.join(', ')}</p>}
                                                    {analysis.missing_requirements?.length > 0 && <p><strong>Missing requirements:</strong> {analysis.missing_requirements.join(', ')}</p>}
                                                </>
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
