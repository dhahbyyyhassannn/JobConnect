import mainImage from '../Assets/mainImage.jpg';
import './MainPage.css';
import AICard from './Cards/AICard';
import MainPageCard from './Cards/MainPageCard';
export default function MainPage() {
    return (
        <div className="main-page-container">
            <div className="left-main-page-container">
                <AICard />
                <h2 style={{fontSize: "60px", fontWeight: "bolder"}}>
                    <span>
                        Your next career
                    </span>
                    <br />
                    <span style={{color: "#00C1BD"}}>
                        move, matched <br /> to your CV
                    </span>
                </h2>
                <p className="paragraphe">
                    JobConnect reads your CV, understands your skills, 
                    <br />
                    and connects you directly with recruiters looking for exactly what 
                    <br />
                    you offer. No more endless scrolling.
                </p>
                <div className="cards-container">
                    <MainPageCard phrase={ "Verified recruiters" } iconLink={ "bi bi-person-check" }/>
                    <MainPageCard phrase={ "Free for job seekers" } iconLink={ "bi bi-people" }/>
                </div>
                <hr />
                <div>
                    
                </div>
            </div>
            <div className="right-main-page-container">
                <img src={ mainImage } alt="job seekers" className="image"/>
            </div>
        </div>
    );
}