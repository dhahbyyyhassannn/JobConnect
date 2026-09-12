import { useState, useEffect } from "react";
import TextInputField from "../Inputs/TextInputField";
import { getCurrentUser } from "../../API/AuthAPI";
import { User, Mail, Lock } from "lucide-react";
import "./AuthForm.css";

export default function EditProfilForm() {
    const [currentUser, setCurrentUser] = useState(null);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        getCurrentUser()
            .then(res => setCurrentUser(res.data))
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        if (!currentUser) return;

        setFormData(previousForm => ({
            ...previousForm,
            username: currentUser.username || "",
            email: currentUser.email || "",
        }));
    }, [currentUser]);

    const handleChange = (e) => {
        setFormData(previousForm => ({
            ...previousForm,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setSuccess("Profile changes are ready to be saved.");
    };

    return(
        <div className="auth-form-container">
            <div>
                <h2 className="header-auth-form-container-h2">Edit your profile</h2>
                <p className="header-auth-form-container-p">Keep your account details up to date.</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="text-input-field-container">
                    <TextInputField
                        icon={<User />}
                        label="Your username:"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                    <TextInputField
                        icon={<Mail />}
                        label="Your email:"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <TextInputField
                        icon={<Lock />}
                        label="New password:"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <TextInputField
                        icon={<Lock />}
                        label="Confirm new password:"
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                </div>
                {error && <div className="auth-form-error">{error}</div>}
                {success && <div className="add-job-success">{success}</div>}
                <button type="submit" className="auth-form-auth-button">Confirm your edits</button>
            </form>
        </div>
    )
}