import { useNavigate } from "react-router-dom";
import Logo from "../../components/utils/Logo";

function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <main className="error-page-main">
            <Logo size="large" />
            <div className="error-badge">404 Error</div>
            <h1>Page Not Found</h1>
            <h3>The page you requested does not exist or has been relocated. Return to the home screen or your dashboard.</h3>
            <button
                type="button"
                className="button button-fill"
                onClick={() => navigate("/")}
            >
                <i className="fa-solid fa-house"></i>
                <span>Return to Home</span>
            </button>
        </main>
    );
}

export default NotFoundPage;