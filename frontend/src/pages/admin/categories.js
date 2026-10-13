import AdminService from "../../services/adminService";
import Header from "../../components/utils/header";
import Loading from "../../components/utils/loading";
import useCategories from "../../hooks/useCategories";
import { useNavigate } from "react-router-dom";
import Info from "../../components/utils/Info";
import Container from "../../components/utils/Container";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";

function AdminCategoriesManagement() {
    const [data, isFetching] = useCategories([]);

    const disableOrEnable = async (categoryId) => {
        try {
            const response = await AdminService.disableOrEnableCategory(categoryId);
            if (response.data.status === 'SUCCESS') {
                window.location.reload();
            }
        } catch (error) {
            toast.error("Failed to update category. Try again later!");
        }
    };

    return (
        <Container activeNavId={6}>
            <Header 
                title="Category Management" 
                subtitle="Configure system transaction categories for income and expense classification"
            />
            <Toaster position="top-right" />
            
            {isFetching && <Loading />}
            
            {!isFetching && data.length === 0 && (
                <Info title="No Categories" text="No transaction categories are currently configured." />
            )}
            
            {!isFetching && data.length !== 0 && (
                <div style={{ width: '100%', overflowX: 'auto' }}>
                    <table>
                        <thead>
                            <CategoriesTableHeader />
                        </thead>
                        <tbody>
                            <CategoriesTableBody data={data} disableOrEnable={disableOrEnable} />
                        </tbody>
                    </table>
                </div>
            )}
        </Container>
    );
}

export default AdminCategoriesManagement;

function CategoriesTableHeader() {
    return (
        <tr>
            <th>ID</th>
            <th>Category Name</th>
            <th>Classification</th>
            <th>Status</th>
            <th>Actions</th>
        </tr>
    );
}

function CategoriesTableBody({ data = [], disableOrEnable }) {
    const navigate = useNavigate();

    const onEditClick = (category) => {
        localStorage.setItem("categoryToEdit", JSON.stringify(category));
        navigate(`/admin/editCategory/${category.categoryId}`);
    };

    return (
        data.map((item) => {
            const isExpense = item.transactionType?.transactionTypeName?.toLowerCase() === 'expense';
            return (
                <tr key={item.categoryId}>
                    <td style={{ fontFamily: "var(--font-display)", fontWeight: "600", color: "var(--text-muted)" }}>
                        {"#C" + String(item.categoryId).padStart(4, '0')}
                    </td>

                    <td>
                        <strong style={{ color: "var(--text-primary)" }}>{item.categoryName}</strong>
                    </td>

                    <td>
                        <span className={`stat-pill ${isExpense ? 'expense' : 'income'}`} style={{ display: 'inline-flex', padding: '4px 10px', fontSize: '0.8rem', fontWeight: '600' }}>
                            <span className={isExpense ? 'expense' : 'income'}></span>
                            {item.transactionType?.transactionTypeName}
                        </span>
                    </td>

                    <td>
                        {item.enabled ? (
                            <span className="account-status-pill">Active</span>
                        ) : (
                            <span className="due overdue" style={{ fontSize: '0.78rem' }}>Disabled</span>
                        )}
                    </td>

                    <td>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button
                                type="button"
                                className="button button-fill"
                                style={{ padding: '6px 14px', fontSize: '0.8rem', minWidth: 'unset' }}
                                onClick={() => onEditClick(item)}
                            >
                                <i className="fa-solid fa-pen"></i>
                                <span>Edit</span>
                            </button>
                            <button
                                type="button"
                                className={`button ${item.enabled ? 'delete' : 'outline'}`}
                                style={{ padding: '6px 14px', fontSize: '0.8rem', minWidth: 'unset' }}
                                onClick={() => disableOrEnable(item.categoryId)}
                            >
                                <span>{item.enabled ? 'Disable' : 'Enable'}</span>
                            </button>
                        </div>
                    </td>
                </tr>
            );
        })
    );
}