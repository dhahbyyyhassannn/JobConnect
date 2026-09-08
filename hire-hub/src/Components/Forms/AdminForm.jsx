import './AuthForm.css'
import TextInputField from '../Inputs/TextInputField'
import { Mail } from 'lucide-react'
import { Lock } from 'lucide-react'

export default function AdminForm() {
    return (
        <>
            <div className='auth-form-container'>
                <div>
                    <h2 className='header-auth-form-container-h2'>
                        Hello Admin!
                    </h2>
                    <p className='header-auth-form-container-p'>
                        Log in and manage your web app!
                    </p>
                </div>
                <div className='text-input-field-container'>
                    <TextInputField label={ "email" } type="email" icon={<Mail />} />
                    <TextInputField label={"password"} type={ "password" } icon={<Lock />} />
                </div>
                <div className='auth-form-auth-button'>
                    Log in
                </div>
            </div>
        </>
    )
}