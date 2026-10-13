"use client";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import {
  DollarSign, ShoppingCart, Factory, Package, FileText, Users,
  TrendingUp, TrendingDown, AlertTriangle, ArrowRight, Eye,
} from "lucide-react";
import Link from "next/link";
import {
  dashboardStats, revenueData, orderStatusData, productionData,
  recentOrders, lowStockItems, topCustomers,
} from "@/lib/mockData";

const iconMap: Record<string, React.ElementType> = {
  dollar: DollarSign, cart: ShoppingCart, factory: Factory,
  package: Package, file: FileText, users: Users,
};

const statusBadge = (status: string) => {
  const map: Record<string, string> = {
    pending: "badge badge-warning",
    production: "badge badge-primary",
    completed: "badge badge-success",
    shipped: "badge badge-info",
  };
  return map[status] ?? "badge badge-secondary";
};

const priorityBadge = (priority: string) => {
  const map: Record<string, string> = { high: "badge badge-danger", medium: "badge badge-warning", low: "badge badge-success" };
  return map[priority] ?? "badge badge-secondary";
};

export default function DashboardPage() {
  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Admin Dashboard</h1>
          <p className="page-subtitle">Welcome back, Ahmed — here's what's happening at TexFlow today.</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn btn-outline btn-sm">📥 Export Report</button>
          <Link href="/production" className="btn btn-primary btn-sm">+ New Production Order</Link>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 24 }}>
        {dashboardStats.map((stat) => {
          const Icon = iconMap[stat.icon];
          return (
            <div key={stat.label} className={`stat-card ${stat.color}`}>
              <div className={`stat-icon ${stat.color}`}>
                <Icon size={22} />
              </div>
              <div className="stat-info">
                <div className="stat-label">{stat.label}</div>
                <div className="stat-value">{stat.value}</div>
                <div className={`stat-change ${stat.up ? "up" : "down"}`}>
                  {stat.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  {stat.change} vs last month
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 20, marginBottom: 20 }}>
        {/* Revenue Chart */}
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Revenue vs Expenses</div>
              <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 2 }}>Full year 2026 overview</div>
            </div>
            <select className="form-control form-select" style={{ width: 120, padding: "5px 28px 5px 10px", fontSize: 12 }}>
              <option>2026</option>
              <option>2025</option>
            </select>
          </div>
          <div className="card-body" style={{ paddingTop: 12 }}>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={revenueData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--text-muted)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "var(--text-muted)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(v: number) => [`$${v.toLocaleString()}`, ""]} contentStyle={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: 8, fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 12, paddingTop: 12 }} />
                <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#7C3AED" strokeWidth={2.5} fill="url(#revGrad)" />
                <Area type="monotone" dataKey="expenses" name="Expenses" stroke="#EF4444" strokeWidth={2} fill="url(#expGrad)" strokeDasharray="4 2" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Order Status Pie */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">Order Status</div>
          </div>
          <div className="card-body" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={orderStatusData} cx="50%" cy="50%" innerRadius={52} outerRadius={78} paddingAngle={3} dataKey="value">
                  {orderStatusData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => [`${v}%`, ""]} contentStyle={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: 8, fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 8 }}>
              {orderStatusData.map((item) => (
                <div key={item.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ width: 10, height: 10, borderRadius: 3, background: item.color, display: "inline-block" }} />
                    <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>{item.name}</span>
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)" }}>{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Production Chart */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 20, marginBottom: 20 }}>
        <div className="card">
          <div className="card-header">
            <div className="card-title">Production Output by Fabric Type (mtrs)</div>
          </div>
          <div className="card-body" style={{ paddingTop: 12 }}>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={productionData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--text-muted)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "var(--text-muted)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                <Tooltip contentStyle={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: 8, fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
                <Bar dataKey="denim" name="Denim" fill="#7C3AED" radius={[3, 3, 0, 0]} />
                <Bar dataKey="cotton" name="Cotton" fill="#10B981" radius={[3, 3, 0, 0]} />
                <Bar dataKey="silk" name="Silk" fill="#F59E0B" radius={[3, 3, 0, 0]} />
                <Bar dataKey="wool" name="Wool" fill="#3B82F6" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="card">
          <div className="card-header">
            <div className="card-title" style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <AlertTriangle size={16} style={{ color: "var(--red)" }} />
              Low Stock Alerts
            </div>
            <span className="badge badge-danger">{lowStockItems.length}</span>
          </div>
          <div className="card-body" style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: 14 }}>
            {lowStockItems.map((item) => {
              const pct = Math.round((item.current / item.min) * 100);
              return (
                <div key={item.name}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text-primary)" }}>{item.name}</div>
                    <span className={`badge ${pct < 30 ? "badge-danger" : "badge-warning"}`} style={{ fontSize: 10 }}>
                      {item.current} {item.unit}
                    </span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${Math.min(pct, 100)}%`, background: pct < 30 ? "var(--red)" : "var(--yellow)" }} />
                  </div>
                  <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 3 }}>Min: {item.min} {item.unit}</div>
                </div>
              );
            })}
            <Link href="/inventory/alerts" className="btn btn-outline btn-sm" style={{ marginTop: 4, justifyContent: "center" }}>
              View All Alerts
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 20 }}>
        {/* Recent Orders Table */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">Recent Orders</div>
            <Link href="/orders" className="btn btn-outline btn-sm">
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <div className="data-table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Product</th>
                  <th>Qty</th>
                  <th>Amount</th>
                  <th>Priority</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td><span style={{ fontWeight: 600, color: "var(--primary)" }}>{order.id}</span></td>
                    <td style={{ fontWeight: 500 }}>{order.customer}</td>
                    <td style={{ color: "var(--text-secondary)", maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{order.product}</td>
                    <td style={{ fontWeight: 500 }}>{order.qty}</td>
                    <td style={{ fontWeight: 700 }}>{order.amount}</td>
                    <td><span className={priorityBadge(order.priority)}>{order.priority}</span></td>
                    <td><span className={statusBadge(order.status)}>{order.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Customers */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">Top Customers</div>
            <Link href="/customers" className="btn btn-outline btn-sm">View All</Link>
          </div>
          <div className="card-body" style={{ padding: 0 }}>
            {topCustomers.map((c, i) => (
              <div key={c.name} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderBottom: i < topCustomers.length - 1 ? "1px solid var(--border-color)" : "none" }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: "var(--primary-light)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>
                  {c.flag}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 13, color: "var(--text-primary)" }}>{c.name}</div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{c.orders} orders</div>
                </div>
                <div style={{ fontWeight: 700, fontSize: 13, color: "var(--text-primary)", textAlign: "right" }}>
                  {c.revenue}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
