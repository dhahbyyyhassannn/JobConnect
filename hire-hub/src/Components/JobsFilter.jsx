import { useState } from 'react';
import './JobsFilter.css';

export default function JobsFilter({ onSearchChange, onCategoryChange }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const categories = [
        'All Categories',
        'Frontend',
        'Backend',
        'Full Stack',
        'Design',
        'DevOps',
        'Mobile',
        'Data Science',
        'QA'
    ];

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        onSearchChange(query);
    };

    const handleCategoryChange = (e) => {
        const category = e.target.value;
        setSelectedCategory(category === 'All Categories' ? '' : category);
        onCategoryChange(category === 'All Categories' ? '' : category);
    };

    return (
        <div className="jobs-filter-container">
            <div className="filter-section">
                <h3 className="filter-title">Search Jobs</h3>
                
                <div className="search-box">
                    <i className="bi bi-search"></i>
                    <input
                        type="text"
                        placeholder="Search by title, company, or location..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="search-input"
                    />
                </div>
            </div>

            <div className="filter-section">
                <h3 className="filter-title">Category</h3>
                
                <select 
                    value={selectedCategory || 'All Categories'} 
                    onChange={handleCategoryChange}
                    className="category-select"
                >
                    {categories.map(category => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>

            <div className="filter-section">
                <h3 className="filter-title">Quick Filters</h3>
                
                <div className="quick-filters">
                    <button 
                        className="filter-tag"
                        onClick={() => {
                            onCategoryChange('Frontend');
                            setSelectedCategory('Frontend');
                        }}
                    >
                        <i className="bi bi-code-square"></i> Frontend
                    </button>
                    
                    <button 
                        className="filter-tag"
                        onClick={() => {
                            onCategoryChange('Backend');
                            setSelectedCategory('Backend');
                        }}
                    >
                        <i className="bi bi-server"></i> Backend
                    </button>
                    
                    <button 
                        className="filter-tag"
                        onClick={() => {
                            onCategoryChange('Full Stack');
                            setSelectedCategory('Full Stack');
                        }}
                    >
                        <i className="bi bi-stack"></i> Full Stack
                    </button>
                    
                    <button 
                        className="filter-tag"
                        onClick={() => {
                            onCategoryChange('Design');
                            setSelectedCategory('Design');
                        }}
                    >
                        <i className="bi bi-palette"></i> Design
                    </button>
                    
                    <button 
                        className="filter-tag"
                        onClick={() => {
                            onCategoryChange('Data Science');
                            setSelectedCategory('Data Science');
                        }}
                    >
                        <i className="bi bi-graph-up"></i> Data Science
                    </button>
                </div>
            </div>

            <button className="clear-filters-btn" onClick={() => {
                setSearchQuery('');
                setSelectedCategory('');
                onSearchChange('');
                onCategoryChange('');
            }}>
                Clear Filters
            </button>
        </div>
    );
}
