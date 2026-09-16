import { useState, useEffect } from 'react'
import { getCurrentUser } from '../API/AuthAPI'
import NavBar from '../Layouts/NavBar'
import JobCard from '../Components/Cards/JobCard'
import { getBookmarks } from '../API/BookmarksAPI'
import { getJobById } from '../API/JobAPI'
import { useNavigate } from 'react-router-dom'
import './BookmarksPage.css'

function BookmarkCard({bookmark}) {
    
    const [job, setJob] = useState(null)
    useEffect(() => {
        if (!bookmark?.job_offer_id) return;

        getJobById(bookmark?.job_offer_id)
        .then(res => setJob(res?.data))
        .catch(err => console.error('error', err))
    }, [bookmark?.job_offer_id])

    return (
        <>
            <JobCard job={ job } />    
        </>
    )
}



export default function BookmarksPage() {
    
    const navigate = useNavigate()

    const [currentUser, setCurrentUser] = useState(null)
    useEffect(() => {
        getCurrentUser()
        .then(res => setCurrentUser(res?.data))
        .catch(err => console.error('error: ', err))
    }, [])

    const [bookmarks, setBookmarks] = useState([])

    useEffect(() => {
        getBookmarks()
        .then(res => setBookmarks(res?.data))
        .catch(err => console.error(err))
    }, [])

    return(
        <div className='bookmarks-page-container'>
            <NavBar />
            <div className='bookmarks-page-header'>
                <h2>
                    Hello {currentUser?.username || 'there'}!
                </h2>
                <p>
                    Take a look at your bookmarked jobs, apply for them, or remove them whenever you want.
                </p>
            </div>
            <div className='bookmarks-page-body'>
                {
                    bookmarks.length > 0 ? (
                        <div className='bookmarks-page-list'>
                            {bookmarks.map(
                                b => (
                                    <BookmarkCard key={b.bookmark_id} bookmark={b} />
                                )
                            )}
                        </div>
                    )
                    :
                    (
                        <div className='bookmarks-page-empty-state'>
                            <p>
                                There are no bookmarks to show yet. Explore jobs and save the ones you like.
                            </p>
                            <button className='bookmarks-page-empty-button' onClick={() => navigate('/find-jobs')}>
                                Explore jobs
                            </button>
                        </div>
                    )
                }
            </div>
        </div>
    )
}