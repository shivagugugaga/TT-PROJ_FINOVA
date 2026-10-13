import { useRef, useState } from 'react';
import '../../../assets/styles/register.css';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import AuthService from '../../../services/auth.service';
import Logo from '../../../components/utils/Logo';

function Register() {
    const navigate = useNavigate();

    const { register, handleSubmit, watch, formState } = useForm();
    const password = useRef({});
    password.current = watch('password', "");

    const [response_error, setResponseError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data) => {
        setIsLoading(true);        
        try {
            const response = await AuthService.register_req(data.username, data.email, data.password);
            if (response.data.status === "SUCCESS") {
                setResponseError("");
                navigate(`/auth/userRegistrationVerfication/${data.email}`);
            } else {
                setResponseError("Registration failed: Something went wrong!");
            }
        } catch (error) {
            if (error.response && error.response.data) {
                const resMessage = error.response.data.response || error.response.data.message;
                setResponseError(resMessage);
            } else {
                setResponseError("Registration failed: Service unavailable!");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='container'>
            <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
                <Logo size="large" />
                <h2>Create Your Finova Account</h2>
                
                {response_error !== "" && (
                    <p className="error-alert">
                        <i className="fa-solid fa-circle-exclamation"></i>
                        <span>{response_error}</span>
                    </p>
                )}

                <div className='input-box'>
                    <label>Username</label>
                    <input 
                        type='text'
                        placeholder='johndoe'
                        {...register('username', {
                            required: "Username is required!"
                        })}
                    />
                    {formState.errors.username && <small>{formState.errors.username.message}</small>}
                </div>
                
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
                        placeholder='Min. 8 characters'
                        {...register('password', {
                            required: 'Password is required!',
                            minLength: {
                                value: 8,
                                message: "Password must have at least 8 characters"
                            }
                        })}
                    />
                    {formState.errors.password && <small>{formState.errors.password.message}</small>}
                </div>
                
                <div className='input-box'>
                    <label>Confirm Password</label>
                    <input 
                        type='password'
                        placeholder='Re-enter your password'
                        {...register('cpassword', {
                            required: 'Confirm password is required!',
                            minLength: {
                                value: 8,
                                message: "Password must have at least 8 characters"
                            },
                            validate: cpass => cpass === password.current || "Passwords do not match!"
                        })}
                    />
                    {formState.errors.cpassword && <small>{formState.errors.cpassword.message}</small>}
                </div>
                
                <div className='input-box'>
                    <input 
                        type='submit' 
                        value={isLoading ? "Creating account..." : 'Get Started'}
                        disabled={isLoading}
                        className={isLoading ? "button button-fill loading" : "button button-fill"}
                    />
                </div>

                <div className='msg' style={{ marginTop: '12px' }}>
                    Already have an account? <Link to='/auth/login' className='inline-link'>Sign In</Link>
                </div>
            </form>
        </div>
    );
}

export default Register;