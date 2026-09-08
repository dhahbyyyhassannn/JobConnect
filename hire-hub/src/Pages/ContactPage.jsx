import { useState } from 'react';
import NavBar from '../Layouts/NavBar';
import Badge from '../Components/Badge';
import './ContactPage.css';

export default function ContactPage() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmitted(true);
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
                            <p>This form is currently a local, no-API contact placeholder.</p>
                        </div>
                    </div>
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <label htmlFor="contact-name">Your name</label>
                        <input id="contact-name" name="name" type="text" required />
                        <label htmlFor="contact-email">Email address</label>
                        <input id="contact-email" name="email" type="email" required />
                        <label htmlFor="contact-message">Message</label>
                        <textarea id="contact-message" name="message" rows="6" required />
                        <button type="submit">Send message</button>
                        {submitted && <p className="contact-success" role="status">Thanks. Your message is ready to be connected to a contact service later.</p>}
                    </form>
                </section>
            </main>
        </>
    );
}
