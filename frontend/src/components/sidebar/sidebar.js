import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../../services/auth.service';
import '../../assets/styles/sidebar.css';
import SideBarLinks from './sideBarLinks';
import { useState } from 'react';
import AuthVerify from '../../services/auth.verify';
import Logo from '../utils/Logo';

function Sidebar({ activeNavId }) {
    const [isSideBarOpen, setIsSideBarOpen] = useState(false);
    const navigate = useNavigate();

    const logout = () => {
        AuthService.logout_req();
        navigate('/');
        window.location.reload();
    };

    const currentUser = AuthService.getCurrentUser();
    const isAdmin = currentUser && currentUser.roles && currentUser.roles.includes("ROLE_ADMIN");

    return (
        <aside className={isSideBarOpen ? "side-bar open" : "side-bar"}>
            <div className="sidebar-header">
                <Logo size="normal" />
                <button 
                    type="button"
                    className="sidebar-close-btn mobile" 
                    onClick={() => setIsSideBarOpen(false)}
                    aria-label="Close Sidebar"
                >
                    <i className="fa-solid fa-xmark" aria-hidden="true"></i>
                </button>
            </div>

            <div className="sidebar-mobile-toggle mobile">
                <button 
                    type="button"
                    className="menu-hamburger"
                    onClick={() => setIsSideBarOpen(true)}
                    aria-label="Open Sidebar"
                >
                    <i className="fa-solid fa-bars" aria-hidden="true"></i>
                </button>
            </div>

            <div className="sidebar-nav-container">
                <div className="sidebar-group-title">
                    {isAdmin ? "Admin Console" : "Workspace"}
                </div>
                
                <ul className="sidebar-menu">
                    {SideBarLinks
                        .filter(link => currentUser && currentUser.roles && currentUser.roles.includes(link.role))
                        .map((link) => {
                            const isActive = activeNavId === link.id;
                            return (
                                <li key={link.id} className="sidebar-item">
                                    <Link 
                                        className={`sidebar-link ${isActive ? "active" : ""}`} 
                                        to={link.to}
                                        onClick={() => setIsSideBarOpen(false)}
                                    >
                                        <div className="sidebar-icon-wrap">
                                            <i className={link.icon} aria-hidden="true"></i>
                                        </div>
                                        <span className="sidebar-label">{link.name}</span>
                                        {isActive && <span className="active-glow-pill"></span>}
                                    </Link>
                                </li>
                            );
                        })
                    }
                </ul>

                <div className="sidebar-footer">
                    <button type="button" className="sidebar-logout-btn" onClick={logout}>
                        <i className="fa-solid fa-arrow-right-from-bracket" aria-hidden="true"></i>
                        <span>Sign Out</span>
                    </button>
                </div>
            </div>

            <AuthVerify logOut={logout} />
        </aside>
    );
}

export default Sidebar;