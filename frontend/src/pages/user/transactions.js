import { useEffect, useState } from 'react';
import UserService from '../../services/userService';
import AuthService from '../../services/auth.service';
import Header from '../../components/utils/header';
import Loading from '../../components/utils/loading';
import Search from '../../components/utils/search';
import usePagination from '../../hooks/usePagination';
import PageInfo from '../../components/utils/pageInfo';
import TransactionList from '../../components/userTransactions/transactionList.js';
import { useLocation } from 'react-router-dom';
import Info from '../../components/utils/Info.js';
import Container from '../../components/utils/Container.js';
import toast, { Toaster } from 'react-hot-toast';

function Transactions() {
    const [userTransactions, setUserTransactions] = useState([]);
    const [isFetching, setIsFetching] = useState(true);
    const [transactionType, setTransactionType] = useState('');
    const location = useLocation();

    const {
        pageSize, pageNumber, noOfPages, sortField, sortDirec, searchKey,
        onNextClick, onPrevClick, setNoOfPages, setNoOfRecords, setSearchKey, getPageInfo
    } = usePagination('date');

    const getTransactions = async () => {
        try {
            const response = await UserService.get_transactions(
                AuthService.getCurrentUser().email, pageNumber,
                pageSize, searchKey, sortField, sortDirec, transactionType
            );
            if (response.data.status === "SUCCESS") {
                setUserTransactions(response.data.response.data);
                setNoOfPages(response.data.response.totalNoOfPages);
                setNoOfRecords(response.data.response.totalNoOfRecords);
            }
        } catch (error) {
            toast.error("Failed to fetch transactions. Try again later!");
        } finally {
            setIsFetching(false);
        }
    };

    useEffect(() => {
        getTransactions();
    }, [pageNumber, searchKey, transactionType, sortDirec, sortField]);

    useEffect(() => {
        if (location.state && location.state.text) {
            toast.success(location.state.text);
            location.state = null;
        }
    }, [location]);

    return (
        <Container activeNavId={1}>
            <Header 
                title="Transaction History" 
                subtitle="Complete audit log of your financial inflows & outflows"
            />
            <Toaster position="top-right" />

            <div className='utils'>
                <Filter 
                    transactionType={transactionType}
                    setTransactionType={(val) => setTransactionType(val)} 
                />
                <div className='page'>
                    <Search
                        onChange={(val) => setSearchKey(val)}
                        placeholder="Search by description or category..."
                    />
                    <PageInfo
                        info={getPageInfo()}
                        onPrevClick={onPrevClick}
                        onNextClick={onNextClick}
                        pageNumber={pageNumber}
                        noOfPages={noOfPages}
                    />
                </div>
            </div>

            {isFetching && <Loading />}

            {!isFetching && (
                <>
                    {userTransactions.length === 0 ? (
                        <Info 
                            title="No Transactions Found" 
                            text="Try adjusting your search query, type filter, or add a new transaction." 
                        />
                    ) : (
                        <TransactionList list={userTransactions} />
                    )}
                </>
            )}
        </Container>
    );
}

export default Transactions;

function Filter({ transactionType, setTransactionType }) {
    return (
        <div className="type-select">
            <div 
                className={transactionType === '' ? 'active' : ''} 
                onClick={() => setTransactionType('')}
            >
                All
            </div>
            <div 
                className={transactionType === 'expense' ? 'active' : ''} 
                onClick={() => setTransactionType('expense')}
            >
                Expenses
            </div>
            <div 
                className={transactionType === 'income' ? 'active' : ''} 
                onClick={() => setTransactionType('income')}
            >
                Income
            </div>
        </div>
    );
}
