import axios from "axios";


export const getCategories = async () => {
    try {
        const response = await axios.get('http://localhost:8000/categories/categories')
        return response
    }
    catch(err) {
        console.log('error', err)
    }
}

