import { useState, useEffect } from 'react';
import NavBarLink from '../Components/Links/NavBarLink';
import './NavBar.css';
import { getCurrentUser } from '../API/AuthAPI';
import SignInButton from '../Components/Buttons/SignInButton';
import DropdownMenu from '../Components/DropdownMenu';
import LogoBrand from '../Components/LogoBrand';




export default function NavBar() {

    const token = localStorage.getItem("token");
    
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (token) {
            getCurrentUser().then(res => setUser(res.data))
            .catch(err => console.error(err));
        }
    }, [token]);

    

    return (
        <div style={{backgroundColor: "white", zIndex: "1000", top: "0", position: "sticky"}}>
            <div className="navbar-container">
                <LogoBrand />
                <div className="nav-links-wrapper">
                    <ul className="link-container">
                        <li>
                            <NavBarLink LinkName={ "find jobs" } path={"/find-jobs"}/>
                        </li>
                        <li>
                            <NavBarLink LinkName={ "About us" } path={"/about-us"}/>
                        </li>
                        <li>
                            <NavBarLink LinkName={ "How it works" } path={"/how-it-works"}/>
                        </li>
                        <li>
                            <NavBarLink LinkName={ "Contact" } path={"/contact"}/>
                        </li>
                    </ul>
                </div>
                <div>
                    {token && user ? <DropdownMenu /> : <SignInButton />}
                </div>         
            </div>
            <hr />
        </div>
        
    );
}