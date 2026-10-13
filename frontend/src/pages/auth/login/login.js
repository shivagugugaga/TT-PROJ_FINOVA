import { useEffect, useState } from 'react';
import '../../../assets/styles/register.css';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../../../services/auth.service';
import Logo from '../../../components/utils/Logo';

function Login() {
    const navigate = useNavigate();

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user && user.roles.includes("ROLE_USER")) {
            navigate("/user/dashboard");
        } else if (user && user.roles.includes("ROLE_ADMIN")) {
            navigate("/admin/transactions");
        }
    }, [navigate]);

    const { register, handleSubmit, formState } = useForm();
    const [response_error, setResponseError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data) => {
        setIsLoading(true);        
        try {
            await AuthService.login_req(data.email, data.password);
            setResponseError("");
            localStorage.setItem("message", JSON.stringify({ status: "SUCCESS", text: "Login successful!" }));
            
            const currentUser = AuthService.getCurrentUser();
            if (currentUser && currentUser.roles.includes("ROLE_ADMIN")) {
                navigate("/admin/transactions");
            } else {
                navigate("/user/dashboard");
            }
        } catch (error) {
            const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            if (resMessage === "Bad credentials") {
                setResponseError("Invalid email or password!");
            } else {
                setResponseError("Something went wrong. Please try again later!");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='container'>
            <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
                <Logo size="large" />
                <h2>Sign In to Finova</h2>
                
                {response_error !== "" && (
                    <p className="error-alert">
                        <i className="fa-solid fa-circle-exclamation"></i>
                        <span>{response_error}</span>
                    </p>
                )}
                
                <div className='input-box'>
                    <label>Email Address</label>
                    <input 
                        type='text'
                        placeholder='name@example.com'
                        {...register('email', {
                            required: "Email is required!",
                            pattern: { value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g, message: "Invalid email address format!" }
                        })}
                    />
                    {formState.errors.email && <small>{formState.errors.email.message}</small>}
                </div>
                
                <div className='input-box'>
                    <label>Password</label>
                    <input 
                        type='password'
                        placeholder='••••••••'
                        {...register('password', {
                            required: 'Password is required!'
                        })}
                    />
                    {formState.errors.password && <small>{formState.errors.password.message}</small>}
                </div>

                <div className='msg' style={{ textAlign: 'right', marginBottom: '8px' }}>
                    <Link to={'/auth/forgetpassword/verifyEmail'} className='inline-link'>
                        Forgot password?
                    </Link>
                </div>
                
                <div className='input-box'>
                    <input 
                        type='submit' 
                        value={isLoading ? "Signing in..." : 'Sign In'}
                        disabled={isLoading}
                        className={isLoading ? "button button-fill loading" : "button button-fill"}
                    />
                </div>

                <div className='msg' style={{ marginTop: '16px' }}>
                    New to Finova? <Link to='/auth/register' className='inline-link'>Create an Account</Link>
                </div>
            </form>
        </div>
    );
}

export default Login;