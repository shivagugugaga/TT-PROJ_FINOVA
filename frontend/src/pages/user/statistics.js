import { useEffect } from 'react';
import IncomeVsExpenseChart from "../../components/userDashboard/incomeVsExpenseChart";
import Header from "../../components/utils/header";
import Loading from '../../components/utils/loading';
import useExpenseVsIncomeSummary from '../../hooks/useExpenseVsIncomeSummary';
import Info from "../../components/utils/Info";
import Container from "../../components/utils/Container";
import toast, { Toaster } from "react-hot-toast";

function UserStatistics() {
    const months = getMonths();
    const [data, isLoading, isError] = useExpenseVsIncomeSummary(months);

    useEffect(() => {
        if (isError) {
            toast.error("Failed to fetch financial statistics. Try again later!");
        }
    }, [isError]);

    return (
        <Container activeNavId={9}>
            <Header 
                title="Analytics & Trends" 
                subtitle="12-Month Cashflow Trajectory & Performance"
            />
            <Toaster position="top-right" />
            
            {isLoading && <Loading />}
            
            {!isLoading && isError && (
                <Info title="Data Unavailable" text="Unable to load cash flow statistics at this time." />
            )}
            
            {!isLoading && !isError && data && data.length > 0 && (
                <IncomeVsExpenseChart data={data} />
            )}

            {!isLoading && !isError && (!data || data.length === 0) && (
                <Info title="No Historical Data" text="Record transactions over multiple months to see trend analysis." />
            )}
        </Container>
    );
}

export default UserStatistics;

function getMonths() {
    const months = [];
    const current_date = new Date();

    for (let i = 11; i >= 0; i--) {
        const date = new Date(current_date.getFullYear(), current_date.getMonth() - i, 1);
        months.push({
            id: date.getMonth() + 1,
            year: date.getFullYear(),
            monthName: date.toLocaleString('en-US', { month: 'short' })
        });
    }

    return months;
}