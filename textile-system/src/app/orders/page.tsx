"use client";
import { useState } from "react";
import { Search, Plus, Eye, Edit, MoreHorizontal } from "lucide-react";
import { recentOrders } from "@/lib/mockData";

const allOrders = [
  ...recentOrders,
  { id: "TXO-2848", customer: "Istanbul Fabric Trading", product: "Viscose Rayon 60s", qty: "2,800 mtrs", amount: "$14,840", date: "22 Jul 2026", status: "completed", priority: "low" },
  { id: "TXO-2847", customer: "Marrakesh Couture", product: "Cotton Lawn 80s", qty: "1,600 mtrs", amount: "$9,600", date: "21 Jul 2026", status: "shipped", priority: "medium" },
  { id: "TXO-2846", customer: "Al-Farouk Textiles", product: "Stretch Denim 12oz", qty: "3,600 mtrs", amount: "$25,200", date: "20 Jul 2026", status: "production", priority: "high" },
];

const statusBadge = (s: string) => {
  const m: Record<string, string> = { pending: "badge badge-warning", production: "badge badge-primary", completed: "badge badge-success", shipped: "badge badge-info" };
  return m[s] ?? "badge badge-secondary";
};
const priorityBadge = (p: string) => {
  const m: Record<string, string> = { high: "badge badge-danger", medium: "badge badge-warning", low: "badge badge-success" };
  return m[p] ?? "badge badge-secondary";
};

export default function OrdersPage() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filtered = allOrders.filter((o) => {
    const matchSearch = o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.product.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || o.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Sales Orders</h1>
          <p className="page-subtitle">Manage all customer fabric and garment orders</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn btn-outline btn-sm">📥 Export</button>
          <button className="btn btn-primary btn-sm"><Plus size={14} /> New Order</button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        {[
          { label: "Total Orders", value: allOrders.length, color: "primary" },
          { label: "Pending", value: allOrders.filter(o => o.status === "pending").length, color: "warning" },
          { label: "In Production", value: allOrders.filter(o => o.status === "production").length, color: "info" },
          { label: "Completed", value: allOrders.filter(o => o.status === "completed").length, color: "success" },
        ].map((s) => (
          <div key={s.label} className={`stat-card ${s.color}`} style={{ padding: "16px 20px" }}>
            <div className="stat-label">{s.label}</div>
            <div className="stat-value" style={{ fontSize: 28 }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-header">
          <div className="card-title">All Sales Orders</div>
          <div style={{ display: "flex", gap: 8 }}>
            <select className="form-control form-select" style={{ width: 150, fontSize: 13, padding: "7px 28px 7px 10px" }} value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="production">In Production</option>
              <option value="completed">Completed</option>
              <option value="shipped">Shipped</option>
            </select>
            <div style={{ position: "relative" }}>
              <Search size={14} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
              <input className="form-control" style={{ paddingLeft: 30, width: 240, fontSize: 13 }} placeholder="Search orders..." value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
          </div>
        </div>
        <div className="data-table-wrapper">
          <table className="data-table">
            <thead>
              <tr><th>Order ID</th><th>Customer</th><th>Product</th><th>Quantity</th><th>Amount</th><th>Date</th><th>Priority</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {filtered.map((o) => (
                <tr key={o.id}>
                  <td><span style={{ fontWeight: 700, color: "var(--primary)" }}>{o.id}</span></td>
                  <td style={{ fontWeight: 500 }}>{o.customer}</td>
                  <td style={{ color: "var(--text-secondary)", maxWidth: 180, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{o.product}</td>
                  <td style={{ fontWeight: 500 }}>{o.qty}</td>
                  <td style={{ fontWeight: 700 }}>{o.amount}</td>
                  <td style={{ color: "var(--text-secondary)", fontSize: 12 }}>{o.date}</td>
                  <td><span className={priorityBadge(o.priority)}>{o.priority}</span></td>
                  <td><span className={statusBadge(o.status)}>{o.status}</span></td>
                  <td>
                    <div style={{ display: "flex", gap: 4 }}>
                      <button className="btn-icon"><Eye size={14} /></button>
                      <button className="btn-icon"><Edit size={14} /></button>
                      <button className="btn-icon"><MoreHorizontal size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
