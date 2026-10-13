"use client";
import { useState } from "react";
import { Plus, Search, Edit, MoreHorizontal } from "lucide-react";
import { expenses } from "@/lib/mockData";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from "recharts";

const monthlyExpenses = [
  { month: "Jan", amount: 58000 }, { month: "Feb", amount: 52000 }, { month: "Mar", amount: 65000 },
  { month: "Apr", amount: 61000 }, { month: "May", amount: 74000 }, { month: "Jun", amount: 70000 },
];

const expenseCategories = [
  { name: "Raw Materials", value: 48, color: "#7C3AED" },
  { name: "Payroll", value: 28, color: "#10B981" },
  { name: "Utilities", value: 10, color: "#F59E0B" },
  { name: "Maintenance", value: 8, color: "#3B82F6" },
  { name: "Logistics", value: 6, color: "#EF4444" },
];

export default function FinancePage() {
  const [search, setSearch] = useState("");
  const filtered = expenses.filter(e =>
    e.description.toLowerCase().includes(search.toLowerCase()) ||
    e.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Finance & Expenses</h1>
          <p className="page-subtitle">Track all company expenses and financial transactions</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn btn-outline btn-sm">📥 Export</button>
          <button className="btn btn-primary btn-sm"><Plus size={14} /> Add Expense</button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        {[
          { label: "Total Expenses (Jul)", value: "$62,960", color: "danger" },
          { label: "Paid", value: "$59,160", color: "success" },
          { label: "Pending", value: "$3,800", color: "warning" },
          { label: "Net Profit (Jul)", value: "$32,040", color: "primary" },
        ].map((s) => (
          <div key={s.label} className={`stat-card ${s.color}`} style={{ padding: "16px 20px" }}>
            <div className="stat-label">{s.label}</div>
            <div className="stat-value" style={{ fontSize: 22 }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 20, marginBottom: 20 }}>
        <div className="card">
          <div className="card-header"><div className="card-title">Monthly Expense Trend</div></div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={monthlyExpenses} margin={{ left: -20, top: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--text-muted)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "var(--text-muted)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} />
                <Tooltip contentStyle={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: 8, fontSize: 12 }} formatter={(v: number) => [`$${v.toLocaleString()}`, "Expenses"]} />
                <Bar dataKey="amount" fill="#EF4444" radius={[4, 4, 0, 0]} opacity={0.85} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <div className="card-header"><div className="card-title">By Category</div></div>
          <div className="card-body" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <ResponsiveContainer width="100%" height={140}>
              <PieChart>
                <Pie data={expenseCategories} cx="50%" cy="50%" innerRadius={38} outerRadius={60} paddingAngle={3} dataKey="value">
                  {expenseCategories.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: 8, fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 6, marginTop: 4 }}>
              {expenseCategories.map((e) => (
                <div key={e.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ width: 8, height: 8, borderRadius: 2, background: e.color, display: "inline-block" }} />
                    <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>{e.name}</span>
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 700 }}>{e.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="card-title">Expense Transactions</div>
          <div style={{ position: "relative" }}>
            <Search size={14} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
            <input className="form-control" style={{ paddingLeft: 30, width: 240, fontSize: 13 }} placeholder="Search expenses..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>
        <div className="data-table-wrapper">
          <table className="data-table">
            <thead>
              <tr><th>ID</th><th>Category</th><th>Description</th><th>Amount</th><th>Date</th><th>Method</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {filtered.map((e) => (
                <tr key={e.id}>
                  <td style={{ fontWeight: 600, color: "var(--primary)" }}>{e.id}</td>
                  <td><span className="badge badge-secondary">{e.category}</span></td>
                  <td style={{ maxWidth: 220, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{e.description}</td>
                  <td style={{ fontWeight: 700 }}>{e.amount}</td>
                  <td style={{ color: "var(--text-secondary)", fontSize: 12 }}>{e.date}</td>
                  <td style={{ fontSize: 12 }}>{e.paymentMethod}</td>
                  <td>
                    <span className={e.status === "paid" ? "badge badge-success" : "badge badge-warning"}>{e.status}</span>
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: 4 }}>
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
