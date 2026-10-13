import { Link } from "react-router-dom";
import Logo from "../../../components/utils/Logo";

function RegistrationSuccess() {
    return (
        <div className='container'>
            <div className="auth-form" style={{ textAlign: "center" }}>
                <Logo size="large" />
                <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: 'var(--income-bg)',
                    color: 'var(--income)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.8rem',
                    margin: '24px auto 16px'
                }}>
                    <i className="fa-solid fa-circle-check"></i>
                </div>
                <h2>Account Created!</h2>
                <p style={{ color: "var(--text-secondary)", marginBottom: "24px" }}>
                    Congratulations! Your Finova account has been successfully verified and is ready to use.
                </p>
                <Link to='/auth/login' style={{ width: '100%' }}>
                    <button type="button" className="button button-fill" style={{ width: '100%' }}>
                        <span>Proceed to Sign In</span>
                        <i className="fa-solid fa-arrow-right"></i>
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default RegistrationSuccess;