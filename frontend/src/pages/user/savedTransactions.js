import { useEffect, useState } from 'react';
import UserService from '../../services/userService';
import Header from '../../components/utils/header';
import Loading from '../../components/utils/loading';
import { Link, useLocation } from 'react-router-dom';
import Info from '../../components/utils/Info.js';
import Container from '../../components/utils/Container.js';
import toast, { Toaster } from 'react-hot-toast';

function SavedTransactions() {
    const [userTransactions, setUserTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation();

    const getTransactions = async () => {
        setIsLoading(true);
        try {
            const response = await UserService.getSavedTransactions();
            if (response.data.status === "SUCCESS") {
                setUserTransactions(response.data.response || []);
            }
        } catch (error) {
            toast.error("Failed to fetch recurring transactions: Try again later!");
        } finally {
            setIsLoading(false);
        }
    };

    const saveTransaction = async (id) => {
        setIsLoading(true);
        try {
            const response = await UserService.addSavedTransaction(id);
            toast.success(response.data.response || "Transaction recorded successfully!");
            getTransactions();
        } catch (error) {
            toast.error("Failed to record transaction: Try again later!");
        } finally {
            setIsLoading(false);
        }
    };

    const skipTransaction = async (id) => {
        setIsLoading(true);
        try {
            const response = await UserService.skipSavedTransaction(id);
            toast.success(response.data.response || "Transaction skipped!");
            getTransactions();
        } catch (error) {
            toast.error("Failed to skip transaction: Try again later!");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getTransactions();
    }, []);

    useEffect(() => {
        if (location.state && location.state.text) {
            toast.success(location.state.text);
            location.state = null;
        }
    }, [location]);

    return (
        <Container activeNavId={11}>
            <Header 
                title="Recurring & Saved Plans" 
                subtitle="Track subscriptions, recurring bills, and scheduled commitments"
            />
            <Toaster position="top-right" />

            <div className='st-top'>
                <div>
                    <h2>Scheduled & Recurring Obligations</h2>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginTop: "2px" }}>
                        Confirm recurring entries once paid, or skip scheduled occurrences
                    </p>
                </div>
                <Link to='/user/savedTransactions/new'>
                    <button type="button" className="button button-fill">
                        <i className="fa-solid fa-plus"></i>
                        <span>New Recurring Plan</span>
                    </button>
                </Link>
            </div>

            {isLoading && <Loading />}

            {!isLoading && (
                <>
                    {userTransactions.length === 0 ? (
                        <Info 
                            title="No Recurring Plans" 
                            text="You have no saved or scheduled transactions. Add your monthly rent, utility bills, or subscriptions to track them effortlessly!" 
                        />
                    ) : (
                        <SavedTransactionList 
                            list={userTransactions} 
                            saveTransaction={saveTransaction} 
                            skipTransaction={skipTransaction}
                        />
                    )}
                </>
            )}
        </Container>
    );
}

export default SavedTransactions;

function SavedTransactionList({ list = [], saveTransaction, skipTransaction }) {
    return (
        <div className='st-list'>
            {list.map(t => {
                if (!t.dueInformation) return null;
                const isExpense = t.transactionType === 1;
                const isOverdue = t.dueInformation.toLowerCase().includes('overdue');
                const isToday = t.dueInformation.toLowerCase().includes('today');

                return (
                    <div className='st-card' key={t.planId}>
                        <div className='topic'>
                            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                <div className={`t-category-badge ${isExpense ? 'expense' : 'income'}`} style={{ width: "36px", height: "36px" }}>
                                    <i className={isExpense ? "fa-solid fa-arrow-up-right-from-square" : "fa-solid fa-arrow-down-left-and-up-right-to-center"}></i>
                                </div>
                                <div>
                                    <h3>{t.categoryName}</h3>
                                    <small style={{ color: "var(--text-muted)", textTransform: "capitalize" }}>{t.frequency?.toLowerCase()}</small>
                                </div>
                            </div>
                            <h3 className={`t-amount-tag ${isExpense ? 'negative' : 'positive'}`}>
                                {isExpense ? "- " : "+ "}${Number(t.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                            </h3>
                        </div>

                        <p style={{ color: "var(--text-secondary)", fontSize: "0.88rem" }}>
                            {t.description || "Recurring schedule"}
                        </p>

                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <span className={isOverdue ? 'due overdue' : (isToday ? 'due today' : 'due')} style={{ fontSize: "0.82rem", fontWeight: "600" }}>
                                <i className={isOverdue ? "fa-solid fa-triangle-exclamation" : "fa-regular fa-clock"} style={{ marginRight: "6px" }}></i>
                                {t.dueInformation}
                            </span>
                        </div>

                        <div style={{ display: "flex", gap: "8px", marginTop: "8px", flexWrap: "wrap" }}>
                            <button 
                                type="button"
                                className="button button-fill"
                                style={{ padding: "6px 14px", fontSize: "0.82rem", minWidth: "unset" }}
                                onClick={() => saveTransaction(t.planId)}
                            >
                                <i className="fa-solid fa-check"></i>
                                <span>Record Now</span>
                            </button>
                            <button 
                                type="button"
                                className='button outline'
                                style={{ padding: "6px 12px", fontSize: "0.82rem", minWidth: "unset" }}
                                onClick={() => skipTransaction(t.planId)}
                            >
                                Skip
                            </button>
                            <Link to={`/user/editSavedTransaction/${t.planId}`}>
                                <button 
                                    type="button" 
                                    className='button outline'
                                    style={{ padding: "6px 12px", fontSize: "0.82rem", minWidth: "unset" }}
                                >
                                    <i className="fa-solid fa-pen"></i>
                                </button>
                            </Link>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}