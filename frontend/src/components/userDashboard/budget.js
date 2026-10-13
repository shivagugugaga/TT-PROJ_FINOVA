import { useState } from "react";
import { useForm } from 'react-hook-form';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import '../../assets/styles/transactionList.css';

function Budget({ totalExpense = 0, budgetAmount = 0, saveBudget, currentMonth }) {
    const { register, handleSubmit, reset, formState } = useForm();
    const [formToggle, setFormToggle] = useState(false);

    const safeBudget = Number(budgetAmount) || 0;
    const safeExpense = Number(totalExpense) || 0;
    const remaining = safeBudget - safeExpense;
    const isOverBudget = remaining < 0;
    const balance = isOverBudget ? 0 : remaining;
    const percentUsed = safeBudget > 0 ? Math.min(Math.round((safeExpense / safeBudget) * 100), 100) : 0;

    const toggleForm = (e) => {
        if (e) e.preventDefault();
        setFormToggle(!formToggle);
        reset({ amount: safeBudget });
    };

    const onSubmit = (formData) => {
        saveBudget(formData);
        setFormToggle(false);
        reset({ amount: safeBudget });
    };

    const dataGauge = [
        { name: 'Spent', value: safeExpense },
        { name: 'Remaining Allowance', value: balance }
    ];

    // Status colors based on budget health
    const spentColor = isOverBudget ? "#f43f5e" : (percentUsed > 80 ? "#f59e0b" : "#4f46e5");
    const remainingColor = "rgba(16, 185, 129, 0.25)";
    const GAUGE_COLORS = [spentColor, remainingColor];

    const isCurrentMonth = currentMonth && (currentMonth.id === (new Date().getMonth() + 1));

    return (
        <>
            <div className='chart-card chart budget-card'>
                <div className="chart-header">
                    <div>
                        <h3 className="chart-title">Monthly Budget Limit</h3>
                        <p className="chart-subtitle">
                            Target: ${safeBudget.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </p>
                    </div>
                    {isCurrentMonth && (
                        <button type="button" className="budget-edit-btn" onClick={toggleForm}>
                            <i className="fa-solid fa-pen-to-square"></i>
                            <span>Edit Target</span>
                        </button>
                    )}
                </div>

                <div className="budget-gauge-wrap">
                    <ResponsiveContainer width="100%" height={190}>
                        <PieChart>
                            <Pie
                                data={dataGauge}
                                cx="50%"
                                cy="85%"
                                startAngle={180}
                                endAngle={0}
                                innerRadius={70}
                                outerRadius={98}
                                paddingAngle={2}
                                dataKey="value"
                            >
                                {dataGauge.map((entry, index) => (
                                    <Cell key={`gauge-cell-${index}`} fill={GAUGE_COLORS[index]} stroke="transparent" />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value) => ['$' + Number(value).toLocaleString('en-US', { minimumFractionDigits: 2 }), 'Amount']} />
                        </PieChart>
                    </ResponsiveContainer>

                    <div className="gauge-center-stat">
                        <span className="gauge-pct">{percentUsed}%</span>
                        <span className="gauge-sub">Spent</span>
                    </div>
                </div>

                <div className="budget-status-panel">
                    <div className={`budget-status-pill ${isOverBudget ? 'danger' : (remaining < safeBudget * 0.2 ? 'warning' : 'safe')}`}>
                        <div className="status-dot"></div>
                        <span>
                            {isOverBudget ? 'Over Budget by ' : 'Remaining: '}
                            <strong>${Math.abs(remaining).toLocaleString('en-US', { minimumFractionDigits: 2 })}</strong>
                        </span>
                    </div>
                </div>
            </div>

            {/* Modal Budget Form */}
            {formToggle && (
                <div className="budget-modal-backdrop" onClick={() => setFormToggle(false)}>
                    <div className="budget-modal-dialog" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <div>
                                <h3>Set Monthly Budget</h3>
                                <p>Define spending ceiling for {currentMonth?.monthName || 'this month'}</p>
                            </div>
                            <button type="button" className="modal-close-icon" onClick={() => setFormToggle(false)}>
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="budget-dialog-form">
                            <div className="input-field-group">
                                <label htmlFor="amount">Budget Amount ($)</label>
                                <div className="input-with-icon">
                                    <i className="fa-solid fa-dollar-sign"></i>
                                    <input
                                        id="amount"
                                        type='text'
                                        placeholder="e.g. 2500"
                                        autoFocus
                                        {...register('amount', {
                                            required: "Budget amount is required!",
                                            pattern: { value: /^[0-9]+(\.[0-9]{1,2})?$/g, message: "Enter a valid positive number!" }
                                        })}
                                    />
                                </div>
                                {formState.errors.amount && (
                                    <small className="field-error-msg">{formState.errors.amount.message}</small>
                                )}
                            </div>

                            <div className="modal-actions-bar">
                                <button type="button" className="btn-modal-cancel" onClick={() => setFormToggle(false)}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn-modal-submit">
                                    <i className="fa-solid fa-check"></i>
                                    <span>Save Budget</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default Budget;