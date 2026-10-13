"use client";
import { useState } from "react";
import { Plus, Search, Edit, Eye, MoreHorizontal } from "lucide-react";
import { employees } from "@/lib/mockData";

export default function HRPage() {
  const [search, setSearch] = useState("");
  const filtered = employees.filter(
    (e) => e.name.toLowerCase().includes(search.toLowerCase()) || e.dept.toLowerCase().includes(search.toLowerCase())
  );

  const deptColors: Record<string, string> = {
    Production: "badge-primary", QC: "badge-success", Dyeing: "badge-warning",
    Sales: "badge-info", Warehouse: "badge-orange", Finance: "badge-secondary",
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">HR & Employees</h1>
          <p className="page-subtitle">{employees.length} employees across {new Set(employees.map(e => e.dept)).size} departments</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn btn-outline btn-sm">📥 Export</button>
          <button className="btn btn-primary btn-sm"><Plus size={14} /> Add Employee</button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        {[
          { label: "Total Employees", value: employees.length, color: "primary" },
          { label: "Active", value: employees.filter(e => e.status === "active").length, color: "success" },
          { label: "On Leave", value: employees.filter(e => e.status === "on-leave").length, color: "warning" },
          { label: "Departments", value: new Set(employees.map(e => e.dept)).size, color: "info" },
        ].map((s) => (
          <div key={s.label} className={`stat-card ${s.color}`} style={{ padding: "16px 20px" }}>
            <div className="stat-label">{s.label}</div>
            <div className="stat-value" style={{ fontSize: 28 }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-header">
          <div className="card-title">All Employees</div>
          <div style={{ position: "relative" }}>
            <Search size={14} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
            <input className="form-control" style={{ paddingLeft: 30, width: 240, fontSize: 13 }} placeholder="Search employees..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>
        <div className="data-table-wrapper">
          <table className="data-table">
            <thead>
              <tr><th>ID</th><th>Employee</th><th>Role</th><th>Department</th><th>Salary</th><th>Shift</th><th>Since</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {filtered.map((emp) => {
                const initials = emp.name.split(" ").map(w => w[0]).join("");
                const colors = ["#7C3AED", "#10B981", "#F59E0B", "#3B82F6", "#EF4444", "#F97316", "#8B5CF6", "#06B6D4"];
                const bg = colors[employees.indexOf(emp) % colors.length];
                return (
                  <tr key={emp.id}>
                    <td style={{ fontWeight: 600, color: "var(--primary)" }}>{emp.id}</td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 36, height: 36, borderRadius: "50%", background: bg, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 700, fontSize: 13, flexShrink: 0 }}>
                          {initials}
                        </div>
                        <span style={{ fontWeight: 500 }}>{emp.name}</span>
                      </div>
                    </td>
                    <td style={{ color: "var(--text-secondary)", fontSize: 13 }}>{emp.role}</td>
                    <td><span className={`badge ${deptColors[emp.dept] ?? "badge-secondary"}`}>{emp.dept}</span></td>
                    <td style={{ fontWeight: 700, color: "var(--green)" }}>{emp.salary}</td>
                    <td style={{ fontSize: 12 }}>{emp.shift}</td>
                    <td style={{ fontSize: 12, color: "var(--text-muted)" }}>{emp.join}</td>
                    <td>
                      <span className={emp.status === "active" ? "badge badge-success" : "badge badge-warning"}>
                        {emp.status === "on-leave" ? "On Leave" : emp.status}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: "flex", gap: 4 }}>
                        <button className="btn-icon"><Eye size={14} /></button>
                        <button className="btn-icon"><Edit size={14} /></button>
                        <button className="btn-icon"><MoreHorizontal size={14} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
