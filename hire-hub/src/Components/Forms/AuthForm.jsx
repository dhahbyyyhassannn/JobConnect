import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { User } from "lucide-react";
import { Mail } from 'lucide-react';
import { Lock } from 'lucide-react';
import TextInputField from '../Inputs/TextInputField';
import AuthPageButton from '../Buttons/AuthPageButton';
import { register, logIn } from '../../API/AuthAPI';
import './AuthForm.css'


export default function AuthForm() {
    const navigate = useNavigate();
    const [mode, setMode] = useState("signin");
    const [role, setRole] = useState("job_seeker");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [form, setForm] = useState({ username: "", email: "", password: "", confirmPassword: "", cv_file: null })
    const isSignin = mode === "signin";
    const passwordType = showPassword ? "text" : "password";
    const backendRole = role === 'recruiter' ? 'recruiter' : 'user';

    const handleChange = (field) => (event) => {
        const value = event.target.value;
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleFileChange = (event) => {
        setForm((prev) => ({ ...prev, cv_file: event.target.files[0] }));
    };

    const formatErrorMessage = (value) => {
        if (!value) return 'Authentication failed.';
        if (typeof value === 'string') return value;
        if (Array.isArray(value)) {
            return value
                .map((item) => typeof item === 'string' ? item : item?.msg || item?.message || JSON.stringify(item))
                .filter(Boolean)
                .join(', ');
        }
        if (typeof value === 'object') {
            if (value.detail) return formatErrorMessage(value.detail);
            if (value.msg) return value.msg;
            if (value.message) return value.message;
            return JSON.stringify(value);
        }
        return String(value);
    };

    const handleSubmit = async () => {
        try {
            setError("");

            if (isSignin) {
                const response = await logIn(form.email, form.password);
                const token = response.data?.token || response.data?.access_token || response.data?.accessToken;
                if (token) {
                    localStorage.setItem('token', token);
                }
                navigate('/');
                return;
            }

            if (!form.username || !form.email || !form.password) {
                setError('Please fill in all required fields.');
                return;
            }

            if (form.password !== form.confirmPassword) {
                setError('Passwords do not match.');
                return;
            }

            if (!form.cv_file) {
                setError('Please upload your CV.');
                return;
            }

            const response = await register(form.username, form.email, form.password, backendRole, form.cv_file);
            const token = response.data?.token || response.data?.access_token || response.data?.accessToken;
            if (token) {
                localStorage.setItem('token', token);
            }
            navigate('/');
        } catch (err) {
            const rawError = err?.response?.data?.detail ?? err?.response?.data?.message ?? err?.message ?? 'Authentication failed.';
            setError(formatErrorMessage(rawError));
        }
    };
    
    return (
        <div className='auth-form-container'>
            <div>
                <h2 className='header-auth-form-container-h2'>
                    {isSignin ? "Welcome back!"
                    : "Create your account"}
                </h2>
                <p className='header-auth-form-container-p'>
                    {!isSignin ? "It takes under a minute — no CV required to start."  
                    : "Pick up where you left off with your matches." }
                </p>
            </div>
            <div className='auth-form-button-container'>
                <AuthPageButton
                    buttonName="Sign in"
                    active={isSignin}
                    onClick={() => setMode("signin")}
                />
                <AuthPageButton
                    buttonName="Sign up"
                    active={!isSignin}
                    onClick={() => setMode("signup")}
                />
            </div>
            {!isSignin && (
                <div className='roles-container'>
                    <div
                        className={`role-container ${role === 'job_seeker' ? 'selected' : ''}`}
                        onClick={() => setRole('job_seeker')}
                    >
                        I'm looking for a job
                    </div>
                    <div
                        className={`role-container ${role === 'recruiter' ? 'selected' : ''}`}
                        onClick={() => setRole('recruiter')}
                    >
                        I'm hiring
                    </div>
                </div>
            )}
            <div>
                {isSignin &&
                    <div className='text-input-field-container'>
                        <TextInputField
                            icon={ <Mail /> }
                            label={"Your email:"}
                            type="email"
                            value={form.email}
                            onChange={handleChange('email')}
                        />
                        <TextInputField
                            icon={ <Lock /> }
                            type={ passwordType }
                            label={"Your password: "}
                            value={form.password}
                            onChange={handleChange('password')}
                        />
                        <label className='show-password-row'>
                            <input
                                type="checkbox"
                                checked={showPassword}
                                onChange={() => setShowPassword(!showPassword)}
                            />
                            <span>Show password</span>
                        </label>
                    </div>
                }

                {!isSignin &&
                    <div className='text-input-field-container'>
                        <TextInputField
                            icon={ <User /> }
                            label={"Your username: "}
                            value={form.username}
                            onChange={handleChange('username')}
                        />
                        <TextInputField
                            icon={ <Mail /> }
                            label={"Your email: "}
                            type="email"
                            value={form.email}
                            onChange={handleChange('email')}
                        />
                        <TextInputField
                            icon={ <Lock /> }
                            type={ passwordType }
                            label={"Your password: "}
                            value={form.password}
                            onChange={handleChange('password')}
                        />
                        <TextInputField
                            icon={ <Lock /> }
                            type={ passwordType }
                            label={"Confirm password: "}
                            value={form.confirmPassword}
                            onChange={handleChange('confirmPassword')}
                        />
                        <label className='show-password-row'>
                            <input
                                type="checkbox"
                                checked={showPassword}
                                onChange={() => setShowPassword(!showPassword)}
                            />
                            <span>Show password</span>
                        </label>
                        <TextInputField
                            type={ "file" }
                            label={"Your CV:"}
                            accept={".pdf,.doc,.docx"}
                            onChange={handleFileChange}
                        />
                    </div>
                }
            </div>
            {error && <div className='auth-form-error'>{error}</div>}
            <div>
                <button type='button' className='auth-form-auth-button' onClick={handleSubmit}>
                    {isSignin ? "Sign in" : "Create account"}
                </button>
            </div>
            <div className='continue-with-container'>
                <div>
                    <hr />
                </div>
                <div style={{ textAlign: 'center' }}>
                    Or continue with
                </div>
                <div>
                    <hr />
                </div>
            </div>
            <div className='o-auth-2-container'>
                <div className='o-auth-2-link-container'>
                    Google
                </div>
                <div className='o-auth-2-link-container'>
                    LinkedIn
                </div>
            </div>
        </div>
    )
}
