import axios from "axios";

export const addBookmark = (job_offer_id) => {
    const token = localStorage.getItem('token')
    const response = axios.post('http://localhost:8000/bookmarks/createBookmark',
        { job_offer_id },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
    )
    return response
}

export const getBookmarks = () => {
    const token = localStorage.getItem('token')
    const response = axios.get('http://localhost:8000/bookmarks/', {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
    return response
}


export const deleteBookmark = (job_offer_id) => {
    const token = localStorage.getItem('token')
    const response = axios.delete(`http://localhost:8000/bookmarks/${job_offer_id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
    return response
}