import { useEffect, useState } from "react";
import AdminService from "../../services/adminService";
import Header from "../../components/utils/header";
import Loading from "../../components/utils/loading";
import Search from "../../components/utils/search";
import PageInfo from "../../components/utils/pageInfo";
import usePagination from "../../hooks/usePagination";
import Info from "../../components/utils/Info";
import Container from "../../components/utils/Container";
import toast, { Toaster } from "react-hot-toast";

function AdminTransactionsManagement() {
    const [data, setData] = useState([]);
    const [isFetching, setIsFetching] = useState(true);

    const {
        pageSize, pageNumber, noOfPages, searchKey,
        onNextClick, onPrevClick, setNoOfPages, setNoOfRecords, setSearchKey, getPageInfo
    } = usePagination();

    const getTransactions = async () => {
        try {
            const response = await AdminService.getAllTransactions(pageNumber, pageSize, searchKey);
            if (response.data.status === 'SUCCESS') {
                setData(response.data.response.data || []);
                setNoOfPages(response.data.response.totalNoOfPages);
                setNoOfRecords(response.data.response.totalNoOfRecords);
            }
        } catch (error) {
            toast.error("Failed to fetch all transactions: Try again later!");
        } finally {
            setIsFetching(false);
        }
    };

    useEffect(() => {
        getTransactions();
    }, [searchKey, pageNumber]);

    return (
        <Container activeNavId={4}>
            <Header 
                title="System Transactions" 
                subtitle="Cross-platform audit ledger of user transactions"
            />
            <Toaster position="top-right" />

            <div className="utils page" style={{ margin: "16px 0 24px" }}>
                <Search onChange={(val) => setSearchKey(val)} placeholder="Search by user email or note..." />
                <PageInfo 
                    info={getPageInfo()} 
                    onPrevClick={onPrevClick} 
                    onNextClick={onNextClick}
                    pageNumber={pageNumber} 
                    noOfPages={noOfPages}
                />
            </div>

            {isFetching && <Loading />}

            {!isFetching && (
                <>
                    {data.length === 0 ? (
                        <Info title="No Transactions Logged" text="No recorded transactions match the filter criteria." />
                    ) : (
                        <div style={{ width: '100%', overflowX: 'auto' }}>
                            <table>
                                <thead>
                                    <TransactionsTableHeader />
                                </thead>
                                <tbody>
                                    <TransactionsTableBody data={data} />
                                </tbody>
                            </table>
                        </div>
                    )}
                </>
            )}
        </Container>
    );
}

export default AdminTransactionsManagement;

function TransactionsTableHeader() {
    return (
        <tr>
            <th>Tx ID</th>
            <th>User Account</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Timestamp</th>
        </tr>
    );
}

function TransactionsTableBody({ data = [] }) {
    return data.map((item) => {
        const isExpense = item.transactionType === 1;
        return (
            <tr key={item.transactionId}>
                <td style={{ fontFamily: "var(--font-display)", fontWeight: "600", color: "var(--text-muted)" }}>
                    {"#TX" + String(item.transactionId).padStart(5, '0')}
                </td>
                <td style={{ color: "var(--text-secondary)" }}>
                    {item.userEmail}
                </td>
                <td>
                    <strong style={{ color: "var(--text-primary)" }}>{item.description || "General entry"}</strong>
                </td>
                <td className={`t-amount-tag ${isExpense ? 'negative' : 'positive'}`} style={{ fontSize: '0.95rem' }}>
                    {isExpense ? "- " : "+ "}${Number(item.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </td>
                <td>
                    <span className="logo-tag">
                        {item.categoryName}
                    </span>
                </td>
                <td style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
                    {new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                </td>
            </tr>
        );
    });
}