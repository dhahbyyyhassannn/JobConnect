import { useState } from 'react';
import NavBar from '../Layouts/NavBar';
import Badge from '../Components/Badge';
import TextInputField from '../Components/Inputs/TextInputField';
import { Mail, User } from 'lucide-react';
import './ContactPage.css';

export default function ContactPage() {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (field) => (event) => {
        setForm(previousForm => ({ ...previousForm, [field]: event.target.value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setError('');
        setSuccess('');

        if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
            setError('Please fill in all fields before sending your message.');
            return;
        }

        setSuccess('Thanks. Your message has been sent.');
        setForm({ name: '', email: '', message: '' });
    };

    return (
        <>
            <NavBar />
            <main className="contact-page">
                <section className="contact-page-intro">
                    <Badge>CONTACT</Badge>
                    <h1>Tell us what would make your job search better.</h1>
                    <p>
                        Have a question about JobConnect or an idea for improving the experience? Send us a note.
                    </p>
                </section>
                <section className="contact-content">
                    <div className="contact-copy">
                        <h2>Let&apos;s talk about the work.</h2>
                        <p>
                            We are interested in practical feedback from both sides of the hiring process:
                            candidates looking for a better way to search and recruiters trying to reduce noise.
                        </p>
                        <div className="contact-note">
                            <span className="contact-note-mark">01</span>
                            <p>We will use your message to improve the JobConnect experience.</p>
                        </div>
                    </div>
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="text-input-field-container">
                            <TextInputField
                                icon={<User />}
                                label="Your name"
                                name="name"
                                placeholder="Your full name"
                                value={form.name}
                                onChange={handleChange('name')}
                            />
                            <TextInputField
                                icon={<Mail />}
                                label="Email address"
                                name="email"
                                type="email"
                                placeholder="you@example.com"
                                value={form.email}
                                onChange={handleChange('email')}
                            />
                            <label className="text-input-label" htmlFor="contact-message">Your message</label>
                            <textarea
                                id="contact-message"
                                name="message"
                                className="contact-message-input"
                                placeholder="How can we help?"
                                rows="6"
                                value={form.message}
                                onChange={handleChange('message')}
                            />
                        </div>
                        {error && <p className="contact-error" role="alert">{error}</p>}
                        {success && <p className="contact-success" role="status">{success}</p>}
                        <button type="submit" className="auth-form-auth-button">Send message</button>
                    </form>
                </section>
            </main>
        </>
    );
}
