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

export const getApplicationsByUserId = (user_id) => {
    const response = axios.get(`http://localhost:8000/applications/user/${user_id}`)
    return response;
}