import { useState } from 'react'
import { Trash, BarChart3 } from 'lucide-react'
import EditJobDialog from '../Dialog/EditJobDialog'
import JobApplicationsDialog from '../Dialog/JobApplicationsDialog'
import './ManageJobCard.css';

export default function ManageJobCard({jobName, job, onDelete}) {
    const [isStatisticsOpen, setIsStatisticsOpen] = useState(false)

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
                    <button type="button" className="manage-job-card-statistics-button" onClick={() => setIsStatisticsOpen(true)}>
                        <BarChart3 size={17} />
                        <span>See statistics</span>
                    </button>
                    <div className="delete-job-button-container" onClick={() => onDelete(job.job_offer_id)}>
                        <Trash size={17} />
                        <span>Delete job</span>
                    </div>
                </div>
            </div>
            {isStatisticsOpen && (
                <JobApplicationsDialog job={job} onClose={() => setIsStatisticsOpen(false)} />
            )}
        </>
    )
}