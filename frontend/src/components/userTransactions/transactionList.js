import '../../assets/styles/transactionList.css';
import { Link } from 'react-router-dom';

function TransactionList({ list = {} }) {
    return (
        <div className="transaction-history-wrap">
            {Object.keys(list).map((date) => (
                <div className='t-date-group' key={date}>
                    <div className='t-date-header'>
                        <i className="fa-regular fa-calendar-check"></i>
                        <span>{formatDate(date)}</span>
                    </div>

                    <div className='t-list-card'>
                        {list[date].map(t => {
                            const isExpense = t.transactionType === 1;
                            return (
                                <Link 
                                    to={`/user/editTransaction/${t.transactionId}`} 
                                    className={`t-row-item ${isExpense ? 'type-expense' : 'type-income'}`} 
                                    key={t.transactionId}
                                >
                                    <div className="t-row-left-content">
                                        <div className={`t-category-badge ${isExpense ? 'expense' : 'income'}`}>
                                            <i className={isExpense ? "fa-solid fa-arrow-up-right-from-square" : "fa-solid fa-arrow-down-left-and-up-right-to-center"}></i>
                                        </div>
                                        <div className='t-row-meta'>
                                            <span className='t-category-name'>{t.categoryName}</span>
                                            <span className='t-description'>{t.description || "General transaction"}</span>
                                        </div>
                                    </div>

                                    <div className='t-row-right-content'>
                                        <div className={`t-amount-tag ${isExpense ? 'negative' : 'positive'}`}>
                                            {isExpense ? "- " : "+ "}₹{Number(t.amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                                        </div>
                                        <i className="fa-solid fa-chevron-right t-row-arrow"></i>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
}

function formatDate(dateString) {
    if (["Today", "Yesterday"].includes(dateString)) {
        return dateString;
    }
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    
    const y = date.getFullYear();
    const m = date.toLocaleDateString('en-US', { month: 'short' });
    const d = date.getDate();
    return `${d} ${m}, ${y}`;
}

export default TransactionList;
