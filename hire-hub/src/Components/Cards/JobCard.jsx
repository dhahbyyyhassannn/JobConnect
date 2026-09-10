import { useState, useEffect } from 'react' 
import {MapPin, Bookmark} from 'lucide-react';
import './JobCard.css';
import { getCurrentUser } from '../../API/AuthAPI';
import { createApplication } from '../../API/ApplicationAPI';
import { getRequirementsByJobId } from '../../API/RequirementAPI';
import { getCvByUserId } from '../../API/CVAPI';


export default function JobCard({ job }) {

    const [user, setUser] = useState(null)
    const [requirements, setRequirements] = useState([])
    const [applicationMessage, setApplicationMessage] = useState('')
    const [isApplying, setIsApplying] = useState(false)
    const [cv, setCv] = useState(null)

    useEffect(() => {
        if (!user?.user_id) return;
        
        getCvByUserId(user.user_id)
        .then(res => setCv(res?.data))
        .catch(err => console.error('error: ', err))
    }, [user])

    useEffect(() => {
        getCurrentUser()
        .then(res => setUser(res?.data))
        .catch(err => console.error('error', err))
    }, [])


    useEffect(() => {
        if (!job?.job_offer_id && !job?.id) return;

        getRequirementsByJobId(job.job_offer_id ?? job.id)
        .then(res => setRequirements(res?.data ?? []))
        .catch(err => console.error('error', err))
    }, [job?.job_offer_id, job?.id])

    const handleApply = async () => {
        setApplicationMessage('')

        if (!user?.user_id || !cv?.cv_id || !job?.job_offer_id) {
            setApplicationMessage('Unable to apply. Your profile or CV is missing.')
            return
        }

        setIsApplying(true)
        try {
            await createApplication(user.user_id, cv.cv_id, job.job_offer_id)
            setApplicationMessage('Application sent successfully.')
        } catch (err) {
            console.error('Failed to apply:', err)
            setApplicationMessage(err?.response?.data?.detail || 'Application failed. Please try again.')
        } finally {
            setIsApplying(false)
        }
    };

    return (
        <>
            <div className="job-card-container">
                <div className="job-card-header">
                    <div className="job-card-header-top">
                        <h3 className="job-title">{job.title}</h3>
                        <Bookmark className="bookmark-icon" />
                    </div>
                    <div className="job-company">
                        {job.job_category || job.category || 'Category not specified'}
                    </div>
                </div>
                <div className="job-card-body">
                    <MapPin className="map-pin-icon" />
                    <span className="job-location">{job.location || 'Location not specified'}</span>
                </div>
                <div className="job-tags">
                    {requirements.map((requirement, idx) => (
                        <div key={requirement.job_requirement_id ?? idx} className="job-tag">
                            {typeof requirement === 'string' ? requirement : requirement.requirement}
                        </div>
                    ))}
                </div>
                <hr />
                <div className="job-card-footer">
                    <div className="score-match">
                        85% Match
                    </div>
                    <div>
                        <div
                            className={`apply-btn ${isApplying ? 'apply-btn-disabled' : ''}`}
                            onClick={isApplying ? undefined : handleApply}
                        >
                            {isApplying ? 'Applying...' : 'Apply Now'}
                        </div>
                    </div>
                </div>
                {applicationMessage && (
                    <div className={`application-message ${applicationMessage.includes('successfully') ? 'application-success' : 'application-error'}`}>
                        {applicationMessage}
                    </div>
                )}
            </div>
        </>
    )
}