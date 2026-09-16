import axios from "axios";

export const getAllJobs = async () => {
    const token = localStorage.getItem('token');
    try {
        return axios.get('http://localhost:8000/job/allJobs',
            { headers: { Authorization: `Bearer ${token}` }
        })
    }
    catch(err) {
        console.error('error', err)
    }
}


export const getJobById = async (job_offer_id) => {
    const token = localStorage.getItem('token');
    try {
        return axios.get('http://localhost:8000/job/getJobById', {
            params: { job_offer_id },
            headers: { Authorization: `Bearer ${token}` }
    })
    }
    catch(err) {
        console.error('error', err)
    }
    
}


export const addJob = (recruiter_id, title, description, job_category, requirements, location) => {
    const token = localStorage.getItem('token')
    return axios.post('http://localhost:8000/job/createJobOffer',
    { recruiter_id, title, description, job_category, requirements, location },
    { headers: { Authorization: `Bearer ${token}` }}
    )
}

export const getJobs = async () => {
    try {
        const response = await axios.get('http://localhost:8000/job/jobOffers')
        return response
    }
    catch(err) {
        console.log('error', err)
    }
}

export const getJobsByRecruiterId = (recruiter_id) => {
    if (!recruiter_id) {
        return Promise.reject(new Error('A user id is required to fetch jobs.'));
    }

    const token = localStorage.getItem('token');
    return axios.get(`http://localhost:8000/job/getJobsByRecruiterId/`, {
        params: { recruiter_id },
        headers: { Authorization: `Bearer ${token}` }
    });
}

export const deleteJob = (job_offer_id) => {

    const token = localStorage.getItem('token');

    return axios.delete('http://localhost:8000/job/deleteJobById', {
        params: { job_offer_id },
        headers: { Authorization: `Bearer ${token}` }
    });
}