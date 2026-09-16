// Components/Dialog/JobDetailsDialog.jsx
import { useState, useEffect } from 'react';
import { getJobById } from '../../API/JobAPI';
import './JobDetailsDialog.css';

export default function JobDetailsDialog({ job_offer_id, onClose }) {
    const [job, setJob] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState('');

    useEffect(() => {
        if (!job_offer_id) return;

        setIsLoading(true);
        setLoadError('');

        getJobById(job_offer_id)
        .then(res => setJob(res?.data))
        .catch(err => {
            console.error('error', err);
            setLoadError('Unable to load job details.');
        })
        .finally(() => setIsLoading(false));
    }, [job_offer_id]);

    return (
        <div className="job-dialog-backdrop" role="presentation" onClick={onClose}>
            <div className="job-details-dialog" role="dialog" aria-modal="true" onClick={e => e.stopPropagation()}>
                <div className="job-dialog-header">
                    <h2>{job?.title || 'Job details'}</h2>
                    <button type="button" className="job-dialog-close" onClick={onClose} aria-label="Close">
                        &times;
                    </button>
                </div>

                {isLoading && <p>Loading...</p>}
                {loadError && <p className="job-applications-error">{loadError}</p>}

                {!isLoading && !loadError && job && (
                    <div className="job-details-content">
                        <p><strong>Category:</strong> {job.job_category || 'Not specified'}</p>
                        <p><strong>Location:</strong> {job.location || 'Not specified'}</p>
                        <p><strong>Description:</strong></p>
                        <p>{job.description}</p>
                        {job.requirements?.length > 0 && (
                            <>
                                <p><strong>Requirements:</strong></p>
                                <ul>
                                    {job.requirements.map((req, idx) => (
                                        <li key={req.job_requirement_id ?? idx}>
                                            {typeof req === 'string' ? req : req.requirement}
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}