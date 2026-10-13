"use client";
import { useState } from "react";
import Link from "next/link";
import { Plus, Search, Filter, Eye, Edit, MoreHorizontal } from "lucide-react";
import { productionOrders } from "@/lib/mockData";

export default function ProductionPage() {
  const [search, setSearch] = useState("");
  const filtered = productionOrders.filter(
    (p) => p.product.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase())
  );

  const statusBadge = (s: string) => {
    const m: Record<string, string> = { "in-progress": "badge badge-primary", completed: "badge badge-success", scheduled: "badge badge-warning" };
    return m[s] ?? "badge badge-secondary";
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Production Orders</h1>
          <p className="page-subtitle">Manage fabric production batches and machine assignments</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn btn-outline btn-sm"><Filter size={14} /> Filter</button>
          <button className="btn btn-primary btn-sm"><Plus size={14} /> New Production Order</button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        {[
          { label: "Total Orders", value: productionOrders.length, color: "primary" },
          { label: "In Progress", value: productionOrders.filter(p => p.status === "in-progress").length, color: "info" },
          { label: "Completed", value: productionOrders.filter(p => p.status === "completed").length, color: "success" },
          { label: "Scheduled", value: productionOrders.filter(p => p.status === "scheduled").length, color: "warning" },
        ].map((s) => (
          <div key={s.label} className={`stat-card ${s.color}`} style={{ padding: "16px 20px" }}>
            <div>
              <div className="stat-label">{s.label}</div>
              <div className="stat-value" style={{ fontSize: 28 }}>{s.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Table Card */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">All Production Orders</div>
          <div style={{ position: "relative" }}>
            <Search size={14} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
            <input className="form-control" style={{ paddingLeft: 30, width: 240, fontSize: 13 }} placeholder="Search orders..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>
        <div className="data-table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Product</th>
                <th>Batch</th>
                <th>Quantity</th>
                <th>Machine</th>
                <th>Assigned To</th>
                <th>Timeline</th>
                <th>Progress</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id}>
                  <td><span style={{ fontWeight: 700, color: "var(--primary)" }}>{p.id}</span></td>
                  <td style={{ fontWeight: 500, maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.product}</td>
                  <td><code style={{ fontSize: 12, background: "var(--bg-page)", padding: "2px 6px", borderRadius: 4 }}>{p.batch}</code></td>
                  <td>{p.qty}</td>
                  <td style={{ fontSize: 12, color: "var(--text-secondary)" }}>{p.machine}</td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div className="avatar" style={{ width: 28, height: 28, background: "var(--primary-light)", color: "var(--primary)", fontSize: 11, fontWeight: 700 }}>
                        {p.worker.split(" ").map(w => w[0]).join("")}
                      </div>
                      <span style={{ fontSize: 13 }}>{p.worker}</span>
                    </div>
                  </td>
                  <td style={{ fontSize: 12, color: "var(--text-secondary)", whiteSpace: "nowrap" }}>{p.start} → {p.deadline}</td>
                  <td style={{ minWidth: 120 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div className="progress-bar" style={{ flex: 1 }}>
                        <div className="progress-fill" style={{
                          width: `${p.progress}%`,
                          background: p.progress === 100 ? "var(--green)" : p.progress > 50 ? "var(--primary)" : "var(--yellow)"
                        }} />
                      </div>
                      <span style={{ fontSize: 11, fontWeight: 700, color: "var(--text-secondary)", width: 28, textAlign: "right" }}>{p.progress}%</span>
                    </div>
                  </td>
                  <td><span className={statusBadge(p.status)}>{p.status}</span></td>
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
