import { Link } from 'react-router-dom';
export default function Sidebar() {
    return (
        <nav>
            <ul>
                <li>Logo</li>
                <li>User</li>
                <li><Link to='/home'>Home</Link></li>
                <li>Shop</li>
                <li>Account</li>
                <li>About</li>
            </ul>
        </nav>
    )
}