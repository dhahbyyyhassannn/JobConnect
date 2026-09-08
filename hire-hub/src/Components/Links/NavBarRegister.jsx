import './NavBarRegister.css';


export default function NavBarRegister({linkName, path, registerStyle, registerContainer}) {
    return (
        <div className={registerContainer}>
            <a href={path} className={registerStyle}>
                {linkName}
            </a>
        </div>
        
    )
}