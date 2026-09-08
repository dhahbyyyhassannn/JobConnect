import { Link } from "react-router-dom"
import './MenuLink.css'

export default function MenuLink({ linkPath, linkName, bootstrapIcon }) {
    return(
        <div>
            <Link to={ linkPath } className="link">
                <i className={ bootstrapIcon }></i>
                <span>
                    { linkName }
                </span>
            </Link>
        </div>
    )
}