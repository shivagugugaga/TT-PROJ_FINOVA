import incomeImg from '../../assets/images/income.png';
import expenseImg from '../../assets/images/expense.png';
import cashInHandImg from '../../assets/images/cashInHand.png';
import transactionImg from '../../assets/images/transaction.png';

function DashboardDetailBox({ total_income = 0, total_expense = 0, cash_in_hand = 0, no_of_transactions = 0 }) {

    const formatCurrency = (val) => {
        const num = Number(val) || 0;
       return '₹' + num.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    return (
        <div className='dashboard-kpi-grid details'>
            <StatCard 
                type="income"
                title="Total Income" 
                amount={formatCurrency(total_income)} 
                subtitle="Inflows this month"
                icon="fa-solid fa-arrow-trend-up"
                fallbackImg={incomeImg}
            />

            <StatCard 
                type="expense"
                title="Total Expenses" 
                amount={formatCurrency(total_expense)} 
                subtitle="Outflows this month"
                icon="fa-solid fa-arrow-trend-down"
                fallbackImg={expenseImg}
            />

            <StatCard 
                type="balance"
                title="Cash In Hand" 
                amount={formatCurrency(cash_in_hand)} 
                subtitle="Net balance liquidity"
                icon="fa-solid fa-wallet"
                fallbackImg={cashInHandImg}
            />

            <StatCard 
                type="transactions"
                title="Transactions" 
                amount={no_of_transactions} 
                subtitle="Total activities logged"
                icon="fa-solid fa-receipt"
                fallbackImg={transactionImg}
            />
        </div>
    );
}

function StatCard({ type, title, amount, subtitle, icon, fallbackImg }) {
    return (
        <div className={`kpi-card kpi-${type}`}>
            <div className="kpi-card-header">
                <span className="kpi-title">{title}</span>
                <div className={`kpi-icon-badge ${type}`}>
                    <i className={icon} aria-hidden="true"></i>
                </div>
            </div>

            <div className="kpi-card-body">
                <h2 className="kpi-amount">{amount}</h2>
                <p className="kpi-subtitle">{subtitle}</p>
            </div>

            <div className={`kpi-bottom-glow ${type}`}></div>
        </div>
    );
}

export default DashboardDetailBox;