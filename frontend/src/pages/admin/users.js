import { useEffect, useState } from "react";
import AdminService from "../../services/adminService";
import Header from "../../components/utils/header";
import Loading from "../../components/utils/loading";
import usePagination from "../../hooks/usePagination";
import Search from "../../components/utils/search";
import PageInfo from "../../components/utils/pageInfo";
import Info from "../../components/utils/Info";
import Container from "../../components/utils/Container";
import toast, { Toaster } from "react-hot-toast";

function AdminUsersManagement() {
    const [data, setData] = useState([]);
    const [isFetching, setIsFetching] = useState(true);

    const {
        pageSize, pageNumber, noOfPages, searchKey,
        onNextClick, onPrevClick, setNoOfPages, setNoOfRecords, setSearchKey, getPageInfo
    } = usePagination();

    const getUsers = async () => {
        try {
            const response = await AdminService.getAllUsers(pageNumber, pageSize, searchKey);
            if (response.data.status === 'SUCCESS') {
                setData(response.data.response.data || []);
                setNoOfPages(response.data.response.totalNoOfPages);
                setNoOfRecords(response.data.response.totalNoOfRecords);
            } else {
                toast.error("Failed to fetch users: Try again later!");
            }
        } catch (error) {
            toast.error("Failed to fetch users: Try again later!");
        } finally {
            setIsFetching(false);
        }
    };

    const disableOrEnable = async (userId) => {
        try {
            const response = await AdminService.disableOrEnableUser(userId);
            if (response.data.status === 'SUCCESS') {
                window.location.reload();
            } else {
                toast.error("Failed to update user status!");
            }
        } catch (error) {
            toast.error("Failed to update user status!");
        }
    };

    useEffect(() => {
        getUsers();
    }, [searchKey, pageNumber]);

    return (
        <Container activeNavId={5}>
            <Header 
                title="User Accounts" 
                subtitle="Directory of registered users, platform usage & status"
            />
            <Toaster position="top-right" />

            <div className="utils page" style={{ margin: "16px 0 24px" }}>
                <Search onChange={(val) => setSearchKey(val)} placeholder="Search by username or email..." />
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
                        <Info title="No Users Found" text="No accounts match your current search criteria." />
                    ) : (
                        <div style={{ width: '100%', overflowX: 'auto' }}>
                            <table>
                                <thead>
                                    <UsersTableHeader />
                                </thead>
                                <tbody>
                                    <UsersTableBody data={data} disableOrEnable={disableOrEnable} />
                                </tbody>
                            </table>
                        </div>
                    )}
                </>
            )}
        </Container>
    );
}

export default AdminUsersManagement;

function UsersTableHeader() {
    return (
        <tr>
            <th>User ID</th>
            <th>Account Name</th>
            <th>Email</th>
            <th>Expenses ($)</th>
            <th>Income ($)</th>
            <th>Activities</th>
            <th>Status</th>
            <th>Actions</th>
        </tr>
    );
}

function UsersTableBody({ data = [], disableOrEnable }) {
    return (
        data.map((item) => (
            <tr key={item.id}>
                <td style={{ fontFamily: "var(--font-display)", fontWeight: "600", color: "var(--text-muted)" }}>
                    {"#U" + String(item.id).padStart(4, '0')}
                </td>
                <td>
                    <strong style={{ color: "var(--text-primary)" }}>{item.username}</strong>
                </td>
                <td style={{ color: "var(--text-secondary)" }}>
                    {item.email}
                </td>
                <td style={{ color: "var(--expense)", fontWeight: "700" }}>
                    ${Number(item.expense || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </td>
                <td style={{ color: "var(--income)", fontWeight: "700" }}>
                    ${Number(item.income || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </td>
                <td>
                    <span className="logo-tag">{item.noOfTransactions || 0} logs</span>
                </td>
                <td>
                    {item.enabled ? (
                        <span className="account-status-pill">Active</span>
                    ) : (
                        <span className="due overdue" style={{ fontSize: '0.78rem' }}>Suspended</span>
                    )}
                </td>
                <td>
                    <button
                        type="button"
                        className={`button ${item.enabled ? 'delete' : 'button-fill'}`}
                        style={{ padding: '6px 14px', fontSize: '0.8rem', minWidth: 'unset' }}
                        onClick={() => disableOrEnable(item.id)}
                    >
                        <span>{item.enabled ? 'Suspend' : 'Activate'}</span>
                    </button>
                </td>
            </tr>
        ))
    );
}