import { useNavigate } from "react-router-dom";

function Logo({ showTag = true, size = "normal" }) {
    const navigate = useNavigate();

    return (
        <h1 
            className={`logo ${size === "large" ? "logo-lg" : ""}`} 
            onClick={() => navigate('/')}
            title="Finova - Financial Intelligence"
        >
            <div className="logo-badge">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
            <span className="logo-text">Finova</span>
            {showTag && <span className="logo-tag">Finance</span>}
        </h1>
    );
}

export default Logo;