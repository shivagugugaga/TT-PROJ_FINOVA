import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function IncomeVsExpenseChart({ data = [] }) {
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="chart-custom-tooltip">
                    <p className="tooltip-label">{label}</p>
                    {payload.map((item, idx) => (
                        <div key={idx} className="tooltip-row">
                            <span className="tooltip-dot" style={{ backgroundColor: item.color }}></span>
                            <span className="tooltip-name">{item.name}:</span>
                            <span className="tooltip-amt">
                                ${Number(item.value).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                            </span>
                        </div>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="chart-card analytics-chart-card">
            <div className="chart-header">
                <div>
                    <h3 className="chart-title">Income vs. Expense Trend</h3>
                    <p className="chart-subtitle">12-Month Cashflow Trajectory</p>
                </div>
                <div className="chart-legend-badges">
                    <span className="trend-badge-pill income">
                        <span className="pill-circle"></span> Income Inflow
                    </span>
                    <span className="trend-badge-pill expense">
                        <span className="pill-circle"></span> Expense Outflow
                    </span>
                </div>
            </div>

            <div className="chart-container-wrap">
                <ResponsiveContainer width="100%" height={380}>
                    <AreaChart
                        data={data}
                        margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
                    >
                        <defs>
                            <linearGradient id="incomeArea" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#10b981" stopOpacity={0.0}/>
                            </linearGradient>
                            <linearGradient id="expenseArea" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" vertical={false} />
                        <XAxis 
                            dataKey="monthName" 
                            stroke="var(--text-muted)" 
                            fontSize={12} 
                            tickLine={false} 
                            axisLine={{ stroke: 'var(--border-subtle)' }}
                        />
                        <YAxis 
                            stroke="var(--text-muted)" 
                            fontSize={12} 
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(val) => `$${val >= 1000 ? (val/1000).toFixed(0) + 'k' : val}`}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Area 
                            type="monotone" 
                            dataKey="totalIncome" 
                            name='Income' 
                            stroke="#10b981" 
                            strokeWidth={2.5}
                            fillOpacity={1} 
                            fill="url(#incomeArea)" 
                        />
                        <Area 
                            type="monotone" 
                            dataKey="totalExpense" 
                            name='Expense' 
                            stroke="#f43f5e" 
                            strokeWidth={2.5}
                            fillOpacity={1} 
                            fill="url(#expenseArea)" 
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default IncomeVsExpenseChart;