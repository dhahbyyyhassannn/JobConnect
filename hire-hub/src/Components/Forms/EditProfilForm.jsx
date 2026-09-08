import { useState, useEffect } from "react";
import TextInputField from "../Inputs/TextInputField";
import logo from '../../Assets/jobConnectLogo.png'
import { getCurrentUser } from "../../API/AuthAPI";

export default function EditProfilForm() {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        getCurrentUser()
            .then(res => setCurrentUser(res.data))
            .catch(err => console.error(err));
    }, []);

    const [formData, setFormData] = useState({
        username: currentUser?.username || "",
        email: currentUser?.email || "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match");
        return;
        }
        console.log("Updated user:", formData);
    };

    return(
        <div>
            <div>
                <img src={ logo } alt="logo" />
                <h3>Time to edit your profil!</h3>
            </div>
            <form onSubmit={ handleSubmit }>
                <TextInputField inputText={ "Username" } type={ "text" } value={ formData.username } onChange={ handleChange } />
                <TextInputField inputText={ "email" } type={ "email" } value={ formData.email } onChange={ handleChange } />
                <TextInputField inputText={ "Password" } type={ "password" } value={ formData.password } onChange={ handleChange } />
                <TextInputField inputText={ "Confirm password" } type={ "password" } value={ formData.confirmPassword } onChange={ handleChange } />
                <div className="col-auto">
                    <button type="submit" className="btn btn-primary">confirm your edits</button>
                </div>
            </form>
        </div>
    )
}