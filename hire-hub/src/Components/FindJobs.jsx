import JobCard from './Cards/JobCard';
import { useState, useEffect } from 'react';
import './FindJobs.css';
import { getAllJobs } from '../API/JobAPI';


export default function FindJobs() {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        getAllJobs()
        .then(res => setJobs(res?.data))
        .catch(err => console.error('error', err))
    }, [])

    return (
        <div className="find-jobs-container">
            <div className="jobs-grid">
                {jobs.length > 0 ? (
                    jobs.map(job => (
                        <JobCard key={job.job_offer_id} job={job} />
                    ))
                ) : (
                    <div className="no-jobs">
                        <p>No jobs found matching your criteria.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
