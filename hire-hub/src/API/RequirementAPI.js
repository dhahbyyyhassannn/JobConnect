import axios from "axios";


export const getRequirementsByJobId = (job_offer_id) => {
    if (!job_offer_id) {
        return Promise.reject(new Error('A job offer id is required.'));
    }
    return axios.get('http://localhost:8000/requirement/requirementByJobId', {
        params: { job_offer_id }
    });
}