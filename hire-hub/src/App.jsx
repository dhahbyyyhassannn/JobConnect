import {Routes, Route} from 'react-router-dom';
import LandingPage from './Pages/LandingPage'
import FindJobsPage from './Pages/FindJobsPage';
import AddJobPage from './Pages/AddJobPage';
import EditProfilPage from './Pages/EditProfilPage';
import AuthPage from './Pages/AuthPage';
import AdminPage from './Pages/AdminPage';
import AboutUsPage from './Pages/AboutUsPage';
import ManageJobsPage from './Pages/ManageJobsPage';
import HowItWorksPage from './Pages/HowItWorksPage';
import ContactPage from './Pages/ContactPage';
import ApplicationPage from './Pages/ApplicationPage';
import RecruiterDashboardPage from './Pages/RecruiterDashboardPage';
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path='/find-jobs' element={ <FindJobsPage /> } />
      <Route path='/add-job' element={ <AddJobPage /> } />
      <Route path="/auth-page" element={ <AuthPage /> } />
      <Route path='/edit-profil' element={ <EditProfilPage /> } />
      <Route path="/admin-page" element={ <AdminPage /> } />
      <Route path="/about-us" element={ <AboutUsPage /> } />
      <Route path="/how-it-works" element={ <HowItWorksPage /> } />
      <Route path="/contact" element={ <ContactPage /> } />
      <Route path="/manage-jobs" element={ <ManageJobsPage /> } />
      <Route path="/recruiter-applications" element={ <ApplicationPage /> } />
      <Route path="/recruiter-dashboard-page" element={ <RecruiterDashboardPage /> } />
    </Routes>
  );
}

export default App;
