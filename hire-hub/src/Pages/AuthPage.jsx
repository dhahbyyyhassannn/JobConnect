import AuthForm from "../Components/Forms/AuthForm";
import NavBar from "../Layouts/NavBar";
import { GoogleOAuthProvider } from "@react-oauth/google";
export default function AuthPage() {
    return (
        <div>
            <NavBar />
            <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
                <AuthForm />
            </GoogleOAuthProvider>
        </div>
    )
}