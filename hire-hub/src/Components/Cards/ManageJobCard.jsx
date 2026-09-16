import { Trash } from 'lucide-react'
import EditJobDialog from '../Dialog/EditJobDialog'
import './ManageJobCard.css';

export default function ManageJobCard({jobName, job, onDelete}) {
    return (
        <>
            <div className="manage-job-card-container">
                <div className="manage-job-card-title-container">
                    <h2>
                        { jobName }
                    </h2>
                </div>
                <div className="manage-job-card-buttons-container">
                    <div className="manage-job-card-edit-button">
                        <EditJobDialog job={job} />
                    </div>
                    <div className="delete-job-button-container" onClick={() => onDelete(job.job_offer_id)}>
                        <Trash size={17} />
                        <span>Delete job</span>
                    </div>
                </div>
            </div>
        </>
    )
}