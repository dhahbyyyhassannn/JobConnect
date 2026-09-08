import { useState } from 'react';
import NavBar from '../Layouts/NavBar';
import { Search } from 'lucide-react';
import FindJobs from '../Components/FindJobs';
import Badge from '../Components/Badge';
import './FindJobsPage.css';

export default function FindJobsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const handleSearchChange = (query) => {
        setSearchQuery(query);
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    return (
        <div>
            <NavBar />
            
            <div className="find-jobs-page-container">
                <div className="find-jobs-page-header">
                    <Badge>
                        JOB BOARD
                    </Badge>
                    <div className="find-jobs-page-header-text">
                        <h2>
                            Find the job your CV was made for
                        </h2>
                        <p>
                            Every listing is scored against your profile so you always know where you stand 
                            <br />
                            before you apply.
                        </p>
                    </div>   
                </div>
                
                <div className="find-jobs-content">
                    <div className="find-jobs-page-searchbar">
                        <Search className="search-icon" />
                        <input 
                            type="text"
                            placeholder="Search by title, company, or location..."
                            className="search-input"
                        />
                        <hr className="search-divider" />
                        <div className="find-jobs-page-searchbar-btn">
                            Search
                        </div>
                    </div>
                    <FindJobs 
                        searchQuery={searchQuery}
                        selectedCategory={selectedCategory}
                    />
                </div>
            </div>
        </div>
    );
}
