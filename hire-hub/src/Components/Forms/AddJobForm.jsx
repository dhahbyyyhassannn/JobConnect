import { useState, useEffect } from 'react'
import { addJob } from '../../API/JobAPI';
import TextInputField from '../Inputs/TextInputField';
import { Briefcase, Map, ChartBarStacked } from 'lucide-react';
import { getCurrentUser } from '../../API/AuthAPI';
import { getCategories } from '../../API/CategoriesAPI';
import './AddJobForm.css';


export default function AddJobForm() {
    const [categories, setCategories] = useState([]);
    const [requirements, setRequirements] = useState([]);
    const [requirementInput, setRequirementInput] = useState('');
    const [customCategory, setCustomCategory] = useState('');
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [form, setForm] = useState({
        title: '',
        description: '',
        location: '',
        jobCategory: ''
    });

    useEffect(() => {
        getCategories()
            .then(res => setCategories(res?.data || []))
            .catch(err => console.error(err));

        getCurrentUser()
            .then(res => setUser(res.data))
            .catch(err => console.error(err));
    }, []);

    const handleChange = (field) => (event) => {
        setForm((previousForm) => ({
            ...previousForm,
            [field]: event.target.value
        }));
    };

    const handleCategoryChange = (event) => {
        setForm((previousForm) => ({
            ...previousForm,
            jobCategory: event.target.value
        }));
        if (event.target.value !== '__other__') {
            setCustomCategory('');
        }
    };

    const handleAddRequirement = () => {
        const trimmed = requirementInput.trim();
        if (!trimmed) return;
        setRequirements((previousRequirements) => [...previousRequirements, trimmed]);
        setRequirementInput('');
    };

    const handleRemoveRequirement = (index) => {
        setRequirements((previousRequirements) => previousRequirements.filter((_, i) => i !== index));
    };

    const handleRequirementKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleAddRequirement();
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setSuccess('');

        const category = form.jobCategory === '__other__'
            ? customCategory.trim()
            : form.jobCategory;

        if (!form.title || !form.description || !form.location || !category) {
            setError('Please fill in all job details.');
            return;
        }

        if (requirements.length === 0) {
            setError('Please add at least one requirement.');
            return;
        }

        const recruiter_id = user?.user_id;
        const formattedRequirements = requirements.map(req => ({ requirement: req })); // ✅ fix 1

        try {
            await addJob(recruiter_id, form.title, form.description, category, formattedRequirements, form.location); // ✅ use formattedRequirements
            setSuccess('Job offer created successfully.');
            setForm({ title: '', description: '', location: '', jobCategory: '' });
            setCustomCategory('');
            setRequirements([]);
        } catch (err) {
            const detail = err?.response?.data?.detail; // ✅ fix 2
            if (Array.isArray(detail)) {
                setError(detail.map(d => d.msg).join(', '));
            } else if (typeof detail === 'string') {
                setError(detail);
            } else {
                setError('Unable to create the job offer.');
            }
        }
    };

    return(
        <div className="add-job-form-container">
            <div>
                <h2 className="add-job-form-heading">
                    Hello {user?.username || 'recruiter'}, add a new job
                </h2>
                <p className="add-job-form-subheading">
                    Share the details candidates need to find the right opportunity.
                </p>
            </div>

            <form className="add-job-form" onSubmit={handleSubmit}>
                <div className="text-input-field-container">
                    <TextInputField
                        icon={<Briefcase />}
                        label="Job title"
                        placeholder="Ex: Full-stack web developer"
                        value={form.title}
                        onChange={handleChange('title')}
                    />
                    <label className="text-input-label" htmlFor="job-description">Job description</label>
                    <textarea
                        id="job-description"
                        className="add-job-textarea"
                        placeholder="Describe the role and its responsibilities..."
                        value={form.description}
                        onChange={handleChange('description')}
                        rows="5"
                    />
                    <TextInputField
                        icon={<Map />}
                        label="Job location"
                        placeholder="Ex: Bizerte, Tunisia"
                        value={form.location}
                        onChange={handleChange('location')}
                    />
                    <label className="text-input-label" htmlFor="job-category">Job category</label>
                    <div className="input-field-container">
                        <div className="input-icon"><ChartBarStacked /></div>
                        <select
                            id="job-category"
                            className="input-style add-job-select"
                            value={form.jobCategory}
                            onChange={handleCategoryChange}
                        >
                            <option value="">Choose a category</option>
                            {categories.map((category) => (
                                <option key={category.job_category_id} value={category.job_category_name}>
                                    {category.category_name}
                                </option>
                            ))}
                            <option value="__other__">Other</option>
                        </select>
                    </div>
                    {form.jobCategory === '__other__' && (
                        <TextInputField
                            icon={<ChartBarStacked />}
                            label="Custom category"
                            placeholder="Ex: Product management"
                            value={customCategory}
                            onChange={(event) => setCustomCategory(event.target.value)}
                        />
                    )}
                </div>

                <div className="requirements-section">
                    <label className="text-input-label" htmlFor="requirement-input">Job requirements</label>
                    <div className="requirements-input">
                        <input
                            id="requirement-input"
                            type="text"
                            placeholder="Ex: 2 years of React experience"
                            value={requirementInput}
                            onChange={(event) => setRequirementInput(event.target.value)}
                            onKeyDown={handleRequirementKeyDown}
                        />
                        <button type="button" className="requirement-add-button" onClick={handleAddRequirement}>
                            Add
                        </button>
                    </div>
                    {requirements.length > 0 && (
                        <ul className="requirements-list">
                            {requirements.map((requirement, index) => (
                                <li key={`${requirement}-${index}`}>
                                    <span>{requirement}</span>
                                    <button type="button" onClick={() => handleRemoveRequirement(index)} aria-label={`Remove ${requirement}`}>
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {error && <div className="auth-form-error">{error}</div>}
                {success && <div className="add-job-success">{success}</div>}
                <button type="submit" className="auth-form-auth-button">
                    Create job offer
                </button>
            </form>
        </div>
    )
}