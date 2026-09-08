import {MapPin, Wallet, Clock, Bookmark} from 'lucide-react';
import './JobCard.css';

export default function JobCard({ job }) {

    return (
        <>
            <div className="job-card-container">
                <div className="job-card-header">
                    <div className="job-card-header-top">
                        <h3 className="job-title">{job.title}</h3>
                        <Bookmark className="bookmark-icon" />
                    </div>
                    <div className="job-company">
                        {job.company}
                    </div>
                </div>
                <div className="job-card-body">
                    <MapPin className="map-pin-icon" />
                    <span className="job-location">{job.location}</span>
                    <Wallet className="wallet-icon" />
                    <span className="job-salary">{job.salary}</span>
                    <Clock className="clock-icon" />
                    <span className="job-type">2 days ago</span>
                </div>
                <div className="job-tags">
                    {job.tags && job.tags.map((tag, idx) => (
                        <div key={idx} className="job-tag">
                            {tag}
                        </div>
                    ))}
                </div>
                <hr />
                <div className="job-card-footer">
                    <div className="score-match">
                        85% Match
                    </div>
                    <div>
                        <div className="apply-btn">
                            Apply Now
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}