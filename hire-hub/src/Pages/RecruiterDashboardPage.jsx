import NavBar from "../Layouts/NavBar"
import RecruiterMenu from "../Layouts/RecruiterMenu"
import { useLocation } from 'react-router-dom';
import AddJobForm from "../Components/Forms/AddJobForm";
import './RecruiterDashboardPage.css';

export default function RecruiterDashboardPage() {
    const { pathname } = useLocation();

    const renderContent = () => {
        if (pathname.endsWith('/add-job')) {
            return <AddJobForm />;
        }

        if (pathname.endsWith('/manage-jobs')) {
            return <div>Manage Jobs Content</div>;
        }

        if (pathname.endsWith('/applications')) {
            return <div>Applications Content</div>;
        }

        if (pathname.endsWith('/profile')) {
            return <div>Profile Content</div>;
        }

        return <div>Dashboard Content</div>;
    };

    return (
        <>
            <NavBar />
            <main className="recruiter-dashboard-main-page">
                <aside className="recruiter-dashboard-sidebar">
                    <RecruiterMenu />
                </aside>
                <section className="recruiter-dashboard-content">
                    {renderContent()}
                </section>
            </main>
        </>
    )

}