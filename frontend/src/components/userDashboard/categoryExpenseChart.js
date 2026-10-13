import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

function CategoryExpenseChart({ categorySummary = [] }) {
    // Modern harmonious financial palette
    const COLORS = [
        "#4f46e5", // Indigo
        "#06b6d4", // Cyan
        "#10b981", // Emerald
        "#f59e0b", // Amber
        "#f43f5e", // Rose
        "#8b5cf6", // Violet
        "#ec4899", // Pink
        "#3b82f6", // Blue
        "#64748b"  // Slate
    ];

    const hasData = categorySummary && categorySummary.length > 0;

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const data = payload[0];
            return (
                <div className="chart-custom-tooltip">
                    <p className="tooltip-label">{data.name || data.payload.category}</p>
                    <p className="tooltip-value">${Number(data.value).toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className='chart-card chart'>
            <div className="chart-header">
                <div>
                    <h3 className="chart-title">Expense Breakdown</h3>
                    <p className="chart-subtitle">Distribution by category</p>
                </div>
                <div className="chart-badge">
                    <i className="fa-solid fa-chart-pie"></i>
                </div>
            </div>

            {hasData ? (
                <div className="chart-container-wrap">
                    <ResponsiveContainer width="100%" height={260}>
                        <PieChart>
                            <Pie
                                data={categorySummary}
                                cx="50%"
                                cy="50%"
                                innerRadius={65}
                                outerRadius={95}
                                paddingAngle={3}
                                dataKey="amount"
                                nameKey="category"
                            >
                                {categorySummary.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="transparent" />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                            <Legend 
                                verticalAlign="bottom" 
                                height={36} 
                                iconType="circle"
                                formatter={(value) => <span className="legend-label">{value}</span>}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            ) : (
                <div className="chart-empty-state">
                    <i className="fa-solid fa-receipt"></i>
                    <p>No expense data recorded for this month</p>
                </div>
            )}
        </div>
    );
}

export default CategoryExpenseChart;