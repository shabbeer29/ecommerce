import { Link } from "react-router-dom";

export default function About()
{
    return (
        <div>
            <h3>About Page</h3>
            <li>
                <Link to="/reactjs">ReactJS</Link>
            </li>
            <li>
                <Link to="/angular">Angular</Link>
            </li>
        </div>
    )
}