"use client";
import { useState } from "react";
import { Plus, Search, Eye, Edit, Download, Printer } from "lucide-react";
import { invoices } from "@/lib/mockData";
import Link from "next/link";

export default function InvoicesPage() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filtered = invoices.filter((inv) => {
    const matchSearch = inv.id.toLowerCase().includes(search.toLowerCase()) ||
      inv.customer.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || inv.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const totalPaid = invoices.filter(i => i.status === "paid").reduce((s, i) => s + parseFloat(i.total.replace(/[$,]/g, "")), 0);
  const totalPending = invoices.filter(i => i.status === "pending").reduce((s, i) => s + parseFloat(i.total.replace(/[$,]/g, "")), 0);
  const totalOverdue = invoices.filter(i => i.status === "overdue").reduce((s, i) => s + parseFloat(i.total.replace(/[$,]/g, "")), 0);

  const statusBadge = (s: string) => {
    const m: Record<string, string> = { paid: "badge badge-success", pending: "badge badge-warning", overdue: "badge badge-danger" };
    return m[s] ?? "badge badge-secondary";
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Invoices</h1>
          <p className="page-subtitle">Manage and track all customer invoices</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn btn-outline btn-sm"><Download size={14} /> Export</button>
          <Link href="/invoices/create" className="btn btn-primary btn-sm"><Plus size={14} /> Create Invoice</Link>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        <div className="stat-card primary" style={{ padding: "16px 20px" }}>
          <div><div className="stat-label">Total Invoices</div><div className="stat-value" style={{ fontSize: 26 }}>{invoices.length}</div></div>
        </div>
        <div className="stat-card success" style={{ padding: "16px 20px" }}>
          <div><div className="stat-label">Paid</div><div className="stat-value" style={{ fontSize: 26 }}>${totalPaid.toLocaleString()}</div></div>
        </div>
        <div className="stat-card warning" style={{ padding: "16px 20px" }}>
          <div><div className="stat-label">Pending</div><div className="stat-value" style={{ fontSize: 26 }}>${totalPending.toLocaleString()}</div></div>
        </div>
        <div className="stat-card danger" style={{ padding: "16px 20px" }}>
          <div><div className="stat-label">Overdue</div><div className="stat-value" style={{ fontSize: 26 }}>${totalOverdue.toLocaleString()}</div></div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="card-title">All Invoices</div>
          <div style={{ display: "flex", gap: 8 }}>
            <select
              className="form-control form-select"
              style={{ width: 140, fontSize: 13, padding: "7px 28px 7px 10px" }}
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="overdue">Overdue</option>
            </select>
            <div style={{ position: "relative" }}>
              <Search size={14} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
              <input className="form-control" style={{ paddingLeft: 30, width: 220, fontSize: 13 }} placeholder="Search invoices..." value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
          </div>
        </div>
        <div className="data-table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Invoice #</th><th>Customer</th><th>Amount</th><th>Tax</th>
                <th>Total</th><th>Date</th><th>Due Date</th><th>Status</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((inv) => (
                <tr key={inv.id}>
                  <td><span style={{ fontWeight: 700, color: "var(--primary)" }}>{inv.id}</span></td>
                  <td style={{ fontWeight: 500 }}>{inv.customer}</td>
                  <td>{inv.amount}</td>
                  <td style={{ color: "var(--text-secondary)" }}>{inv.tax}</td>
                  <td style={{ fontWeight: 700 }}>{inv.total}</td>
                  <td style={{ color: "var(--text-secondary)", fontSize: 12 }}>{inv.date}</td>
                  <td style={{ color: inv.status === "overdue" ? "var(--red)" : "var(--text-secondary)", fontSize: 12, fontWeight: inv.status === "overdue" ? 600 : 400 }}>{inv.due}</td>
                  <td><span className={statusBadge(inv.status)}>{inv.status}</span></td>
                  <td>
                    <div style={{ display: "flex", gap: 4 }}>
                      <button className="btn-icon" title="View"><Eye size={14} /></button>
                      <button className="btn-icon" title="Print"><Printer size={14} /></button>
                      <button className="btn-icon" title="Download"><Download size={14} /></button>
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
