import axios from "axios";


export const ApplicationReview = async (application_id) => {
    const token = localStorage.getItem('token');
    const response = await axios.post(
        `http://localhost:8000/applications/${application_id}/analyze`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
    );
    return response;
}

export const getApplicationsByRecruiterId = (recruiter_id) => {
    const token = localStorage.getItem('token');
    const response = axios.get(`http://localhost:8000/applications/recruiter/${recruiter_id}`, {
        headers: { Authorization: `Bearer ${token}` }
    })
    return response;
}

export const getApplicationsByJobId = (job_offer_id) => {
    const token = localStorage.getItem('token');
    return axios.get(`http://localhost:8000/applications/job/${job_offer_id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
}

export const createApplication = (user_id, cv_id, job_offer_id, recruiter_id) => {
    const response = axios.post('http://localhost:8000/applications/applicationCreate',
        { user_id, cv_id, job_offer_id, recruiter_id }
    )
    return response;
}

export const getApplicantsByAppId = (application_id) => {
    const response = axios.get('http://localhost:8000/applications/getApplicantsByAppId' , {
        application_id
    })
    return response 
}

