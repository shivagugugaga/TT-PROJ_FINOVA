import userPlaceholder from '../../assets/images/user.png';
import useProfileImage from '../../hooks/useProfileImage';
import Loading from "../utils/loading";

function ProfileCard({ username = "User", email = "" }) {
    const [profileImg, isLoading, uploadProfileImage, removeProfileImage] = useProfileImage();

    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0];
        const maxSize = 10 * 1024 * 1024;
        if (selectedFile && selectedFile.size > maxSize) {
            return;
        }
        await uploadProfileImage(selectedFile);
    };

    const initial = username ? username.charAt(0).toUpperCase() : "U";

    return (
        <div className='profile-overview-card'>
            {isLoading ? (
                <Loading />
            ) : (
                <div className="profile-card-content">
                    <div className="profile-avatar-large-wrap">
                        {profileImg ? (
                            <img src={profileImg} className="profile-avatar-large" alt={username} />
                        ) : (
                            <div className="profile-initials-large">
                                {initial}
                            </div>
                        )}
                        
                        <div className="avatar-actions-bar">
                            <label className="btn-avatar-upload">
                                <i className="fa-solid fa-camera"></i>
                                <span>Change Photo</span>
                                <input type="file" onChange={handleFileChange} accept=".jpg, .jpeg, .png" style={{ display: 'none' }} />
                            </label>
                            {profileImg && (
                                <button type="button" className="btn-avatar-remove" onClick={removeProfileImage} title="Remove Photo">
                                    <i className="fa-solid fa-trash-can"></i>
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="profile-info-details">
                        <h2 className="profile-name">{username}</h2>
                        <p className="profile-email-badge">
                            <i className="fa-regular fa-envelope"></i>
                            <span>{email}</span>
                        </p>
                        <span className="account-status-pill">
                            <span className="status-dot"></span>
                            Verified Account
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProfileCard;