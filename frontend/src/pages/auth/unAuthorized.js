import { useNavigate } from "react-router-dom";
import Logo from "../../components/utils/Logo";

function UnAuthorizedAccessPage() {
    const navigate = useNavigate();

    return (
        <main className="error-page-main">
            <Logo size="large" />
            <div className="error-badge warning">401 Access Restricted</div>
            <h1>Unauthorized Access</h1>
            <h3>You do not have the required role or authentication permissions to view this protected resource.</h3>
            <button
                type="button"
                className="button button-fill"
                onClick={() => navigate("/")}
            >
                <i className="fa-solid fa-arrow-left"></i>
                <span>Return to Home</span>
            </button>
        </main>
    );
}

export default UnAuthorizedAccessPage;