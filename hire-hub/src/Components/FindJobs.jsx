import JobCard from './Cards/JobCard';
import { useState } from 'react';
import jobsData from '../Data/jobs.json';
import './FindJobs.css';

export default function FindJobs({ searchQuery, selectedCategory }) {
    const [jobs, setJobs] = useState(jobsData);

    const filteredJobs = jobs.filter(job => {
        const matchesSearch = 
            job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.location.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesCategory = !selectedCategory || job.category === selectedCategory;
        
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="find-jobs-container">
            <div className="jobs-grid">
                {filteredJobs.length > 0 ? (
                    filteredJobs.map(job => (
                        <JobCard key={job.id} job={job} />
                    ))
                ) : (
                    <div className="no-jobs">
                        <p>No jobs found matching your criteria.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
