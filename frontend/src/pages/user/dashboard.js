import '../../assets/styles/dashboard.css';
import { useState } from 'react';
import DashboardDetailBox from '../../components/userDashboard/dashboardDetailBox';
import CategoryExpenseChart from '../../components/userDashboard/categoryExpenseChart';
import Header from '../../components/utils/header';
import Budget from '../../components/userDashboard/budget';
import useDashboard from '../../hooks/useDashboard';
import Loading from '../../components/utils/loading';
import Info from '../../components/utils/Info';
import Container from '../../components/utils/Container';
import toast, { Toaster } from 'react-hot-toast';

function Dashboard() {
    const months = getMonths();
    const [currentMonth, setMonth] = useState(months[0]);

    const [
        total_expense, 
        total_income, 
        cash_in_hand, 
        no_of_transactions, 
        categorySummary, 
        budgetAmount,
        saveBudget, 
        isLoading, 
        isError
    ] = useDashboard(currentMonth);

    const onMonthChange = (id) => {
        const month = months.find(m => m.id == id);
        setMonth(month);
    };

    return (
        <Container activeNavId={0}>
            <Header 
                title="Financial Dashboard" 
                subtitle={`Overview for ${currentMonth?.monthName} ${currentMonth?.year}`} 
            />
            <Toaster position="top-right" />

            <div className="dashboard-filter-toolbar">
                <SelectMonth months={months} onMonthChange={onMonthChange} selectedMonthId={currentMonth.id} />
            </div>

            {isLoading && <Loading />}
            
            {isError && toast.error("Failed to fetch information. Try again later!")}

            {!isLoading && !isError && (
                <>
                    <DashboardDetailBox 
                        total_expense={total_expense} 
                        total_income={total_income} 
                        cash_in_hand={cash_in_hand} 
                        no_of_transactions={no_of_transactions} 
                    />

                    {total_expense === 0 && (
                        <Info 
                            title="No Expenses Recorded" 
                            text={`You haven't logged any expenditures for ${currentMonth?.monthName} ${currentMonth?.year}. Start recording to see real-time analytics!`} 
                        />
                    )}

                    {total_expense !== 0 && (
                        <div className='dashboard-chart'>
                            <CategoryExpenseChart categorySummary={categorySummary} />
                            <Budget 
                                totalExpense={total_expense} 
                                budgetAmount={budgetAmount} 
                                saveBudget={saveBudget} 
                                currentMonth={currentMonth} 
                            />
                        </div>
                    )}
                </>
            )}
        </Container>
    );
}

export default Dashboard;

function getMonths() {
    const months = [];
    const current_date = new Date();

    for (let i = 0; i <= 11; i++) {
        const date = new Date(current_date.getFullYear(), current_date.getMonth() - i, 1);
        months.push({
            id: date.getMonth() + 1,
            year: date.getFullYear(),
            monthName: date.toLocaleString('en-US', { month: 'long' })
        });
    }

    return months;
}

function SelectMonth({ months, onMonthChange, selectedMonthId }) {
    return (
        <div className="month-select-wrap">
            <select 
                value={selectedMonthId} 
                onChange={(e) => onMonthChange(e.target.value)}
                aria-label="Filter by month"
            >
                {months.map((m) => (
                    <option value={m.id} key={m.id}>
                        📅 {m.monthName} {m.year}
                    </option>
                ))}
            </select>
        </div>
    );
}