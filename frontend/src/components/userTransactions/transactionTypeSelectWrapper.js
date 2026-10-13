function TransactionTypeSelectWrapper({ transactionTypes = [], setTransactionType, activeTransactionType }) {
    return (
        <div className='type-select form'>
            {transactionTypes.map((type) => {
                const isActive = activeTransactionType == type.id;
                const isExpense = type.name.toLowerCase() === 'expense';
                return (
                    <div 
                        key={type.id} 
                        className={isActive ? 'active' : ''} 
                        onClick={() => setTransactionType(type.id)}
                    >
                        <i className={isExpense ? "fa-solid fa-arrow-up-right-from-square" : "fa-solid fa-arrow-down-left-and-up-right-to-center"} style={{ marginRight: '8px' }}></i>
                        {type.name}
                    </div>
                );
            })}
        </div>
    );
}

export default TransactionTypeSelectWrapper;