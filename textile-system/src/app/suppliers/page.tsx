"use client";
import { useState } from "react";
import { Plus, Search, Star, Edit, Eye } from "lucide-react";
import { suppliers } from "@/lib/mockData";

export default function SuppliersPage() {
  const [search, setSearch] = useState("");
  const filtered = suppliers.filter(
    (s) => s.name.toLowerCase().includes(search.toLowerCase()) || s.product.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Suppliers</h1>
          <p className="page-subtitle">Manage raw material suppliers and vendor relationships</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn btn-outline btn-sm">📥 Export</button>
          <button className="btn btn-primary btn-sm"><Plus size={14} /> Add Supplier</button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 24 }}>
        {[
          { label: "Total Suppliers", value: suppliers.length, color: "primary" },
          { label: "Active", value: suppliers.filter(s => s.status === "active").length, color: "success" },
          { label: "Avg Rating", value: (suppliers.reduce((a, s) => a + s.rating, 0) / suppliers.length).toFixed(1) + " ⭐", color: "warning" },
        ].map((s) => (
          <div key={s.label} className={`stat-card ${s.color}`} style={{ padding: "16px 20px" }}>
            <div className="stat-label">{s.label}</div>
            <div className="stat-value" style={{ fontSize: 26 }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-header">
          <div className="card-title">All Suppliers</div>
          <div style={{ position: "relative" }}>
            <Search size={14} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
            <input className="form-control" style={{ paddingLeft: 30, width: 240, fontSize: 13 }} placeholder="Search suppliers..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>
        <div className="data-table-wrapper">
          <table className="data-table">
            <thead>
              <tr><th>ID</th><th>Supplier</th><th>Contact</th><th>Product Category</th><th>Country</th><th>Rating</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.id}>
                  <td style={{ fontWeight: 600, color: "var(--primary)" }}>{s.id}</td>
                  <td style={{ fontWeight: 600 }}>{s.name}</td>
                  <td>
                    <div style={{ fontSize: 13 }}>{s.contact}</div>
                    <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{s.email}</div>
                  </td>
                  <td><span className="badge badge-primary">{s.product}</span></td>
                  <td>{s.country}</td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <Star size={13} style={{ fill: "var(--yellow)", color: "var(--yellow)" }} />
                      <span style={{ fontWeight: 700 }}>{s.rating}</span>
                    </div>
                  </td>
                  <td><span className="badge badge-success">{s.status}</span></td>
                  <td>
                    <div style={{ display: "flex", gap: 4 }}>
                      <button className="btn-icon"><Eye size={14} /></button>
                      <button className="btn-icon"><Edit size={14} /></button>
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
