import { useState, useEffect, useRef } from "react"
import { getApplicationsByRecruiterId } from "../../API/ApplicationAPI"
import { getUserById } from "../../API/UserAPI"
import { getCvByUserId } from "../../API/CVAPI"
import { X } from "lucide-react"
import './ApplicantsDialog.css'

function Applicant({ applicant }) {

    const [user, setUser] = useState(null)
    useEffect(() => {
        if (!applicant?.user_id) return;

        getUserById(applicant?.user_id)
        .then(res => setUser(res?.data))
        .catch(err => console.error('error', err))
    }, [applicant?.user_id])

    return (
        <div className="applicant-info">
            <p className="applicant-label">Applicant</p>
            <h3>{user?.username || 'Loading applicant...'}</h3>
        </div>
    )
}


function UserCVWindow({applicant, dialogRef}) {
    const [CV, setCV] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!applicant?.user_id) {
            setLoading(false)
            return
        }

        getCvByUserId(applicant?.user_id)
        .then(res => setCV(res?.data))
        .catch(err => console.error('error', err))
        .finally(() => setLoading(false))
    }, [applicant?.user_id])

    return (
        <dialog ref={dialogRef} className="applicant-cv-dialog">
            <div className="applicant-cv-header">
                <div>
                    <p className="applicant-label">Candidate CV</p>
                    <h2>Curriculum vitae</h2>
                </div>
                <button type="button" className="applicant-dialog-close" onClick={() => dialogRef.current?.close()} aria-label="Close CV">
                    <X size={18} />
                </button>
            </div>
            {loading && <p className="applicant-dialog-state">Loading CV...</p>}
            {!loading && !CV && <p className="applicant-dialog-state">CV not found.</p>}
            {!loading && CV && (
                <iframe
                    src={`http://localhost:8000/cv/${CV.cv_id}/pdf`}
                    title="Applicant CV"
                    className="cv-pdf"
                />
            )}
        </dialog>
    )
}


export default function ApplicantsDialog({ app, recruiterId, onClose }) {

    const [applicants, setApplicants] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [loadError, setLoadError] = useState('')
    const [selectedApplicant, setSelectedApplicant] = useState(null)
    const cvDialogRef = useRef(null)


    useEffect(() => {
        if (!app?.job_offer_id) {
            setIsLoading(false)
            return
        }

        setIsLoading(true)
        setLoadError('')
        const currentRecruiterId = app.recruiter_id || recruiterId
        if (!currentRecruiterId) {
            setIsLoading(false)
            setLoadError('Recruiter information is missing.')
            return
        }

        getApplicationsByRecruiterId(currentRecruiterId)
        .then(res => {
            const data = res?.data
            const applications = Array.isArray(data) ? data : data?.applications || data?.results || data?.data || []
            setApplicants(applications.filter(application => application.job_offer_id === app.job_offer_id))
        })
        .catch(err => {
            console.error('error: ', err)
            setLoadError(err?.response?.data?.detail || 'Unable to load applicants.')
        })
        .finally(() => setIsLoading(false))
    }, [app?.job_offer_id, app?.recruiter_id, recruiterId])

    useEffect(() => {
        if (selectedApplicant && cvDialogRef.current && !cvDialogRef.current.open) {
            cvDialogRef.current.showModal()
        }
    }, [selectedApplicant])



    return (
        <div className="applicants-dialog-backdrop" role="presentation" onClick={onClose}>
            <div className="applicants-dialog" role="dialog" aria-modal="true" aria-labelledby="applicants-dialog-title" onClick={event => event.stopPropagation()}>
                <div className="applicants-dialog-header">
                    <div>
                        <p className="applicant-label">Applications</p>
                        <h2 id="applicants-dialog-title">Applicants for this job</h2>
                    </div>
                    <button type="button" className="applicant-dialog-close" onClick={onClose} aria-label="Close applicants">
                        <X size={18} />
                    </button>
                </div>
                <div className="applicants-list">
                    {isLoading ? <p className="applicant-dialog-state">Loading applicants...</p>
                        : loadError ? <p className="applicant-dialog-error">{loadError}</p>
                        : applicants.length === 0 ? <p className="applicant-dialog-state">There are no applicants for this job.</p>
                        :
                        applicants.map(applicant => (
                            <div className="applicant-row" key={applicant?.user_id}>
                                <Applicant applicant={applicant} />
                                <div className="applicant-actions">
                                    <button type="button" className="applicant-secondary-button" onClick={() => {
                                        setSelectedApplicant(applicant)
                                    }}>
                                        See their CV
                                    </button>
                                    <button type="button" className="applicant-primary-button">Analyze their CV</button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            {selectedApplicant && <UserCVWindow applicant={selectedApplicant} dialogRef={cvDialogRef} />}
        </div>
    )
}