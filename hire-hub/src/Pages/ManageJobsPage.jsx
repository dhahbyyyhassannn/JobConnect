import NavBar from "../Layouts/NavBar"
import ManageJobs from "../Layouts/ManageJobs"
import { getCurrentUser } from "../API/AuthAPI"
import { useState, useEffect } from 'react'
import './ManageJobPage.css'

export default function ManageJobsPage() {
    
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        getCurrentUser()
        .then(res => setUser(res?.data || null))
        .catch(err => console.error(err));
    }, [])

    return (
        <>
            <NavBar />
            <div className="manage-job-page-header">
                <h2>
                    welcome {user?.username}!
                </h2>
                <p>
                    here's the job management, you can add a job, delete a job or modify a job
                </p>
            </div>
            <ManageJobs />
        </>
    )
}