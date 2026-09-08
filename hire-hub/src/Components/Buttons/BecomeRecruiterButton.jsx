import { useState } from 'react';
import { becomeRecruiter } from '../API/AuthAPI';


export default function BecomeRecruiterButton() {
    const [message, setMessage] = useState('');

    const handleClick = async () => {
        try {
            await becomeRecruiter();
            setMessage('You are now a recruiter');
        } catch (err) {
            setMessage(err.response?.data?.detail || 'Something went wrong');
        }
    };
    return (
        <div>
            <button onClick={ handleClick }>
                Become A recruiter!
            </button>
            {message &&
                <p>
                    { message }
                </p>}
        </div>
    )
}
