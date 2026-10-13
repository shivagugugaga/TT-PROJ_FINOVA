import { useForm } from 'react-hook-form';
import { useRef, useState } from 'react';
import UserService from '../../services/userService';
import toast from 'react-hot-toast';

function ChangePassword({ email }) {
    const { register, handleSubmit, watch, reset, formState } = useForm();
    const password = useRef({});
    password.current = watch('newPassword', "");
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data) => {
        setIsLoading(true);     
        try {
            const response = await UserService.settingsResetPassword(email, data.currentPassword, data.newPassword);
            if (response.data.status === "SUCCESS") {
                toast.success(response.data.response || "Password updated successfully!");
                reset({ currentPassword: "", newPassword: "", cpassword: "" });
            }
        } catch (error) {
            if (error.response && error.response.data) {
                toast.error(error.response.data.response || "Failed to update password!");
            } else {
                toast.error("Failed to update password. Try again later!");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form className="auth-form t-form" onSubmit={handleSubmit(onSubmit)} style={{ marginTop: '24px' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Security & Password</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '16px' }}>
                Ensure your account is using a long, random password to stay secure.
            </p>

            <div className='input-box'>
                <label>Current Password</label>
                <input 
                    type='password'
                    placeholder='Enter current password'
                    {...register('currentPassword', {
                        required: 'Current password is required!',
                        minLength: {
                            value: 8,
                            message: "Password must have at least 8 characters"
                        }
                    })}
                />
                {formState.errors.currentPassword && <small>{formState.errors.currentPassword.message}</small>}
            </div>

            <div className='input-box'>
                <label>New Password</label>
                <input 
                    type='password'
                    placeholder='Enter new password'
                    {...register('newPassword', {
                        required: 'New password is required!',
                        minLength: {
                            value: 8,
                            message: "Password must have at least 8 characters"
                        }
                    })}
                />
                {formState.errors.newPassword && <small>{formState.errors.newPassword.message}</small>}
            </div>
                
            <div className='input-box'>
                <label>Confirm New Password</label>
                <input 
                    type='password'
                    placeholder='Confirm new password'
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

            <div className='t-btn'>
                <button 
                    type='submit' 
                    disabled={isLoading}
                    className={isLoading ? "button button-fill loading" : "button button-fill"}
                >
                    <i className="fa-solid fa-key"></i>
                    <span>{isLoading ? "Updating..." : 'Update Password'}</span>
                </button>
            </div>
        </form>
    );
}

export default ChangePassword;