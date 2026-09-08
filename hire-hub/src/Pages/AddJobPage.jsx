import { useState, useEffect } from "react";
import NavBar from "../Layouts/NavBar";
import AddJobForm from "../Components/Forms/AddJobForm";
import { getCurrentUser } from '../API/AuthAPI';


export default function AddJobPage() {

    const token = localStorage.getItem("token");
    
    const [user, setUser] = useState(null);

    useEffect(() => {
        getCurrentUser()
            .then(res => setUser(res.data))
            .catch(err => console.error(err));
    }, []);

    if(!token || !user || user.role !== 'recruiter') {
        <p>
            You must be logged in as a recruiter to access this page.
        </p>
    }
    return(
        <div>
            <NavBar />
            <AddJobForm />
        </div>
    )
}