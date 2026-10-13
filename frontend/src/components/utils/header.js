import { memo, useContext, useEffect, useState } from "react";
import AuthService from "../../services/auth.service";
import userPlaceholder from '../../assets/images/user.png';
import useProfileImage from "../../hooks/useProfileImage";
import { ThemeContext } from "../../contexts/ThemeContext";

const Header = memo(({ title, subtitle }) => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [profileImg] = useProfileImage();
    const { isDarkMode, toggleTheme } = useContext(ThemeContext);

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            setEmail(user.email);
            setUsername(user.username);
        }
    }, []);

    const userInitial = username ? username.charAt(0).toUpperCase() : "U";

    return (
        <div className='top-header'>
            <div className="header-title-box">
                <h1 className="header-title">{title}</h1>
                {subtitle && <p className="header-subtitle">{subtitle}</p>}
            </div>

            <div className='header-actions'>
                {/* Theme Toggle Button */}
                <button 
                    type="button"
                    className="theme-toggle-btn"
                    onClick={toggleTheme}
                    title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                    aria-label="Toggle Theme"
                >
                    {isDarkMode ? (
                        <i className="fa-solid fa-sun icon-sun"></i>
                    ) : (
                        <i className="fa-solid fa-moon icon-moon"></i>
                    )}
                </button>

                {/* Profile Pill */}
                <div className='header-profile-card'>
                    <div className="header-avatar-wrap">
                        {profileImg ? (
                            <img src={profileImg} className="header-avatar-img" alt={username || 'User'} />
                        ) : (
                            <div className="header-avatar-initials">
                                {userInitial}
                            </div>
                        )}
                        <span className="online-indicator" title="Active Session"></span>
                    </div>
                    
                    <div className="header-user-meta">
                        <span className="user-name">{username || 'User'}</span>
                        <span className="user-email">{email}</span>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default Header;