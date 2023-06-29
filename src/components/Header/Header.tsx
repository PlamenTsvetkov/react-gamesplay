import { Link } from 'react-router-dom';
import style from './Header.module.css';
import AuthContext, { AuthContextType } from '../../contexts/AuthContext';
import { useContext } from 'react';

const Header = () => {
    const { isAuthenticated, username }: AuthContextType = useContext(AuthContext);

    return (
        <header>
            {/* Navigation  */}
            <h1><Link className={style.home} to="/">GamesPlay</Link></h1>
            <nav>
                <Link to="/all-games">All games</Link>
                {isAuthenticated ? (
                    // Logged-in users
                    <div id="user">
                        <Link to="/create">Create Game</Link>
                        <Link id="logoutBtn" to="/logout">
                            Logout
                        </Link>
                    </div>
                ) : (
                    // Guest users
                    <div id="guest">
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </div>
                )}
            </nav>
        </header >
    );
}

export default Header;