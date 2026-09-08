import { useState, useEffect } from 'react'
import { getJobsById } from "../API/JobAPI"
import ManageJobCard from '../Components/Cards/ManageJobCard';
import { getCurrentUser } from '../API/AuthAPI';
import { deleteJob } from '../API/JobAPI';


export default function ManageJobs() {

    const handleDelete = (job_offer_id) => {
        deleteJob(job_offer_id)
            .then(() => {
                setJobs(prevJobs => prevJobs.filter(job => job.job_offer_id !== job_offer_id));
            })
            .catch(err => console.error(err));
    };

    const [jobs, setJobs] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (!user?.user_id) return;

        getJobsById(user.user_id)
        .then(res => setJobs(res?.data || []))
        .catch(err => console.error(err));
    }, [user?.user_id])

    useEffect(() => {
        getCurrentUser()
        .then(res => setUser(res?.data || null))
        .catch(err => console.error(err));
    }, [])
    
    return (
        <>
            <div className="manage-jobs-list">
                {jobs.length > 0 ? (
                    jobs.map(
                        job => (
                            <ManageJobCard key={ job.job_offer_id } jobName={job.title} job={job} onDelete={ handleDelete } />
                        )
                    )
                ) :
                (
                    <div className="manage-jobs-empty">
                        no jobs found
                    </div>
                )
            }
            </div>
        </>
    )
}