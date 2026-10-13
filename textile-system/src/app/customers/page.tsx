"use client";
import { useState } from "react";
import { Plus, Search, Eye, Edit, MoreHorizontal, Mail, Phone } from "lucide-react";
import { customers } from "@/lib/mockData";

export default function CustomersPage() {
  const [search, setSearch] = useState("");
  const filtered = customers.filter(
    (c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.country.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Customers</h1>
          <p className="page-subtitle">{customers.length} registered customers across {new Set(customers.map(c => c.country)).size} countries</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn btn-outline btn-sm">📥 Export</button>
          <button className="btn btn-primary btn-sm"><Plus size={14} /> Add Customer</button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        {[
          { label: "Total Customers", value: customers.length, color: "primary" },
          { label: "Active", value: customers.filter(c => c.status === "active").length, color: "success" },
          { label: "Inactive", value: customers.filter(c => c.status === "inactive").length, color: "warning" },
          { label: "Countries", value: new Set(customers.map(c => c.country)).size, color: "info" },
        ].map((s) => (
          <div key={s.label} className={`stat-card ${s.color}`} style={{ padding: "16px 20px" }}>
            <div className="stat-label">{s.label}</div>
            <div className="stat-value" style={{ fontSize: 28 }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-header">
          <div className="card-title">All Customers</div>
          <div style={{ position: "relative" }}>
            <Search size={14} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
            <input className="form-control" style={{ paddingLeft: 30, width: 260, fontSize: 13 }} placeholder="Search customers..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>
        <div className="data-table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th><th>Company</th><th>Contact</th><th>Country</th>
                <th>Total Orders</th><th>Total Spend</th><th>Status</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id}>
                  <td style={{ fontWeight: 600, color: "var(--primary)" }}>{c.id}</td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 34, height: 34, borderRadius: 8, background: "var(--primary-light)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{c.flag}</div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 13 }}>{c.name}</div>
                        <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{c.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 500 }}>{c.contact}</div>
                      <div style={{ fontSize: 11, color: "var(--text-muted)", display: "flex", gap: 6, marginTop: 2 }}>
                        <span style={{ display: "flex", alignItems: "center", gap: 3 }}><Phone size={10} />{c.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td style={{ color: "var(--text-secondary)", fontSize: 13 }}>{c.country}</td>
                  <td style={{ fontWeight: 700, textAlign: "center" }}>{c.totalOrders}</td>
                  <td style={{ fontWeight: 700, color: "var(--green)" }}>{c.totalSpend}</td>
                  <td>
                    <span className={c.status === "active" ? "badge badge-success" : "badge badge-secondary"}>
                      {c.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: 4 }}>
                      <button className="btn-icon"><Eye size={14} /></button>
                      <button className="btn-icon"><Mail size={14} /></button>
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
