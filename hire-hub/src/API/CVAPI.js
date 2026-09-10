import axios from "axios"


export const getCvByUserId = (user_id) => {
    try {
        const response = axios.get('http://localhost:8000/cv/getCvByUserId',
            { params: {user_id} }
        )
        return response
    }
    catch(err) {
        console.error('error: ', err)
    }
}