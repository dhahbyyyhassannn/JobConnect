import axios from "axios";


export const getUserById = (user_id) => {
    const response = axios.get('http://localhost:8000/user/getUserById', {
        params: { user_id }
    })
    return response
}