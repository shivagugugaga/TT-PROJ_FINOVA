import { useForm } from 'react-hook-form';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function SavedTransactionForm({ categories = [], onSubmit, isDeleting, isSaving, transaction, onDelete }) {
    const { register, handleSubmit, watch, reset, formState } = useForm();
    const date = useRef({});
    date.current = watch('date');
    const navigate = useNavigate();

    useEffect(() => {
        if (transaction && transaction.planId) {
            reset({
                category: String(transaction.categoryId),
                frequency: transaction.frequency,
                description: transaction.description,
                amount: transaction.amount,
                date: transaction.upcomingDate.split('T')[0]
            });
        }
    }, [reset, transaction]);

    const deleteTransaction = (e, id) => {
        e.preventDefault();
        onDelete(id);
    };

    const cancelProcess = (e) => {
        e.preventDefault();
        navigate("/user/savedTransactions");
    };

    return (
        <form className="auth-form t-form" onSubmit={handleSubmit(onSubmit)}>
            <div className='input-box'>
                <label>Transaction Category</label>
                <div className='radio'>
                    {categories.filter(cat => cat.enabled).map((cat) => (
                        <span key={cat.categoryId}>
                            <input
                                type='radio'
                                id={`saved-cat-${cat.categoryId}`}
                                value={cat.categoryId}
                                {...register('category', {
                                    required: "Category selection is required!"
                                })}
                            />
                            <label htmlFor={`saved-cat-${cat.categoryId}`}>
                                {cat.categoryName}
                            </label>
                        </span>
                    ))}
                </div>
                {formState.errors.category && <small>{formState.errors.category.message}</small>}
            </div>

            <div className='input-box'>
                <label>Description / Note</label>
                <input
                    type='text'
                    placeholder='e.g. Netflix Monthly Subscription, Rent, Cloud VPS'
                    {...register('description', {
                        maxLength: {
                            value: 50,
                            message: "Description can have at most 50 characters!"
                        }
                    })}
                />
                {formState.errors.description && <small>{formState.errors.description.message}</small>}
            </div>

            <div className='input-box'>
                <label>Amount ($)</label>
                <input
                    type='text'
                    placeholder='0.00'
                    {...register('amount', {
                        required: "Amount is required!",
                        pattern: { value: /^[0-9]+(\.[0-9]{1,2})?$/g, message: "Enter a valid positive number!" }
                    })}
                />
                {formState.errors.amount && <small>{formState.errors.amount.message}</small>}
            </div>

            <div className='input-box'>
                <label>Recurrence Frequency</label>
                <select {...register('frequency')}>
                    <option value="ONE_TIME">One-Time Upcoming</option>
                    <option value="DAILY">Daily Recurring</option>
                    <option value="MONTHLY">Monthly Recurring</option>
                </select>
                {formState.errors.frequency && <small>{formState.errors.frequency.message}</small>}
            </div>

            <div className='input-box'>
                <label>Upcoming / Next Due Date</label>
                <input
                    type='date'
                    defaultValue={new Date().toISOString().split('T')[0]}
                    {...register('date')}
                />
                {formState.errors.date && <small>{formState.errors.date.message}</small>}
            </div>

            <div className='t-btn'>
                <button 
                    type='submit' 
                    disabled={isSaving}
                    className={isSaving ? "button button-fill loading" : "button button-fill"}
                >
                    <i className="fa-solid fa-check"></i>
                    <span>{isSaving ? "Saving..." : 'Save Recurring Plan'}</span>
                </button>
                <button 
                    type='button' 
                    className='button outline' 
                    onClick={cancelProcess}
                >
                    Cancel
                </button>
            </div>

            {transaction && transaction.planId && (
                <div className='t-btn' style={{ marginTop: '8px' }}>
                    <button
                        type="button"
                        disabled={isDeleting}
                        className={isDeleting ? "button delete loading" : "button delete"}
                        onClick={(e) => deleteTransaction(e, transaction.planId)} 
                    >
                        <i className="fa-solid fa-trash-can"></i>
                        <span>{isDeleting ? "Deleting..." : 'Delete Recurring Plan'}</span>
                    </button>
                </div>
            )}
        </form>
    );
}

export default SavedTransactionForm;