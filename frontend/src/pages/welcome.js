import { Link } from 'react-router-dom';
import '../assets/styles/welcome.css';
import Logo from '../components/utils/Logo';

function Welcome() {
    return (
        <div className="welcome-page">
            {/* Top Navigation */}
            <header className="welcome-nav">
                <div className="welcome-nav-container">
                    <Logo size="large" />
                    <div className="welcome-nav-actions">
                        <Link to='/auth/login' className="nav-btn-ghost">
                            Sign In
                        </Link>
                        <Link to='/auth/register' className="nav-btn-primary">
                            Get Started <i className="fa-solid fa-arrow-right"></i>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <main className="hero-wrapper">
                <div className="hero-grid">
                    <div className="hero-content">
                        <div className="hero-pill">
                            <span className="pill-dot"></span>
                            <span>Next-Gen Financial Intelligence</span>
                        </div>
                        
                        <h1 className="hero-title">
                            Master Your Money, <br/>
                            <span className="gradient-text">Shape Your Future.</span>
                        </h1>
                        
                        <p className="hero-subtitle">
                            Finova provides complete visibility into your income, expenses, and monthly budgets. 
                            Track recurring obligations, uncover spending trends, and take control of your financial journey.
                        </p>

                        <div className="hero-cta-group">
                            <Link to='/auth/register' className="btn-hero-primary">
                                <span>Create Free Account</span>
                                <i className="fa-solid fa-arrow-right"></i>
                            </Link>
                            <Link to='/auth/login' className="btn-hero-secondary">
                                <i className="fa-solid fa-lock"></i>
                                <span>Sign In</span>
                            </Link>
                        </div>

                        {/* Trust & Highlights */}
                        <div className="hero-highlights">
                            <div className="highlight-item">
                                <i className="fa-solid fa-shield-halved"></i>
                                <div>
                                    <h4>JWT Secured</h4>
                                    <p>Encrypted multi-role auth</p>
                                </div>
                            </div>
                            <div className="highlight-item">
                                <i className="fa-solid fa-chart-pie"></i>
                                <div>
                                    <h4>Visual Analytics</h4>
                                    <p>Category & cashflow charts</p>
                                </div>
                            </div>
                            <div className="highlight-item">
                                <i className="fa-solid fa-bell"></i>
                                <div>
                                    <h4>Smart Budgets</h4>
                                    <p>Real-time spend tracking</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Hero Visual Card */}
                    <div className="hero-visual">
                        <div className="hero-card-glow"></div>
                        <div className="hero-card glass-panel">
                            <div className="card-header">
                                <div className="card-user-info">
                                    <div className="card-avatar">
                                        <i className="fa-solid fa-wallet"></i>
                                    </div>
                                    <div>
                                        <h3>Monthly Balance</h3>
                                        <span className="badge-live">Live Analytics</span>
                                    </div>
                                </div>
                                <span className="card-month">October 2026</span>
                            </div>

                            <div className="card-balance-box">
                                <span className="balance-label">Cash In Hand</span>
                                <div className="balance-amount">$8,450.00</div>
                                <div className="balance-trend positive">
                                    <i className="fa-solid fa-arrow-trend-up"></i>
                                    <span>+14.2% from last month</span>
                                </div>
                            </div>

                            <div className="card-stats-row">
                                <div className="stat-pill income">
                                    <div className="stat-icon"><i className="fa-solid fa-arrow-down-left"></i></div>
                                    <div>
                                        <span>Income</span>
                                        <h4>$12,500.00</h4>
                                    </div>
                                </div>
                                <div className="stat-pill expense">
                                    <div className="stat-icon"><i className="fa-solid fa-arrow-up-right"></i></div>
                                    <div>
                                        <span>Expenses</span>
                                        <h4>$4,050.00</h4>
                                    </div>
                                </div>
                            </div>

                            <div className="card-budget-bar">
                                <div className="budget-info">
                                    <span>Budget Utilized</span>
                                    <span>48%</span>
                                </div>
                                <div className="progress-track">
                                    <div className="progress-fill" style={{ width: '48%' }}></div>
                                </div>
                            </div>

                            <div className="card-transactions-preview">
                                <div className="preview-row">
                                    <div className="preview-left">
                                        <div className="category-icon salary"><i className="fa-solid fa-building-columns"></i></div>
                                        <div>
                                            <strong>Monthly Salary</strong>
                                            <small>Direct Deposit</small>
                                        </div>
                                    </div>
                                    <span className="preview-amt positive">+$6,250.00</span>
                                </div>
                                <div className="preview-row">
                                    <div className="preview-left">
                                        <div className="category-icon grocery"><i className="fa-solid fa-cart-shopping"></i></div>
                                        <div>
                                            <strong>Groceries & Supplies</strong>
                                            <small>Supermarket</small>
                                        </div>
                                    </div>
                                    <span className="preview-amt negative">-$142.50</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <section className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon"><i className="fa-solid fa-chart-line"></i></div>
                        <h3>Interactive Visualizations</h3>
                        <p>Track cash flow over time with dynamic line charts and category expense breakdowns powered by Recharts.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon"><i className="fa-solid fa-piggy-bank"></i></div>
                        <h3>Budget Limits & Guardrails</h3>
                        <p>Set monthly spending boundaries and monitor real-time balance metrics to protect your savings goals.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon"><i className="fa-solid fa-repeat"></i></div>
                        <h3>Recurring Payments</h3>
                        <p>Manage subscriptions and upcoming scheduled commitments effortlessly with one-click saved transactions.</p>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Welcome;