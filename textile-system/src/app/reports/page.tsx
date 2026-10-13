"use client";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend, LineChart, Line,
} from "recharts";

const salesByProduct = [
  { product: "Denim", revenue: 98400, orders: 42 },
  { product: "Cotton", revenue: 76200, orders: 38 },
  { product: "Wool", revenue: 54800, orders: 19 },
  { product: "Silk", revenue: 42000, orders: 11 },
  { product: "Synthetic", revenue: 31200, orders: 24 },
  { product: "Linen", revenue: 28400, orders: 17 },
];

const monthlyTrend = [
  { month: "Jan", revenue: 42000, orders: 18 }, { month: "Feb", revenue: 38000, orders: 15 },
  { month: "Mar", revenue: 55000, orders: 22 }, { month: "Apr", revenue: 48000, orders: 20 },
  { month: "May", revenue: 62000, orders: 27 }, { month: "Jun", revenue: 58000, orders: 24 },
  { month: "Jul", revenue: 72000, orders: 31 },
];

const qcData = [
  { month: "Jan", passRate: 96.2, defects: 38 }, { month: "Feb", passRate: 97.1, defects: 29 },
  { month: "Mar", passRate: 95.8, defects: 44 }, { month: "Apr", passRate: 98.0, defects: 20 },
  { month: "May", passRate: 97.4, defects: 26 }, { month: "Jun", passRate: 98.5, defects: 15 },
  { month: "Jul", passRate: 97.9, defects: 21 },
];

export default function ReportsPage() {
  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Reports & Analytics</h1>
          <p className="page-subtitle">Business insights across sales, production, and finance</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <select className="form-control form-select" style={{ width: 140, fontSize: 13 }}>
            <option>July 2026</option><option>June 2026</option><option>Q2 2026</option>
          </select>
          <button className="btn btn-primary btn-sm">📥 Export PDF</button>
        </div>
      </div>

      {/* KPI Summary */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 14, marginBottom: 24 }}>
        {[
          { label: "Total Revenue (Jul)", value: "$284,950", sub: "+12.4% vs Jun", color: "primary" },
          { label: "Orders Processed", value: "142", sub: "+8 vs Jun", color: "success" },
          { label: "Production Output", value: "48,200 m", sub: "+5.1%", color: "info" },
          { label: "QC Pass Rate", value: "97.9%", sub: "-0.6% vs Jun", color: "warning" },
          { label: "Active Customers", value: "24", sub: "+2 new", color: "orange" },
        ].map((s) => (
          <div key={s.label} className={`stat-card ${s.color}`} style={{ padding: "14px 16px" }}>
            <div className="stat-label">{s.label}</div>
            <div className="stat-value" style={{ fontSize: 20, marginTop: 4 }}>{s.value}</div>
            <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Revenue Trend */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
        <div className="card">
          <div className="card-header"><div className="card-title">Monthly Revenue Trend</div></div>
          <div className="card-body" style={{ paddingTop: 12 }}>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={monthlyTrend} margin={{ left: -20, top: 0 }}>
                <defs>
                  <linearGradient id="revGrad2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--text-muted)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "var(--text-muted)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} />
                <Tooltip contentStyle={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: 8, fontSize: 12 }} formatter={(v: number) => [`$${v.toLocaleString()}`, "Revenue"]} />
                <Area type="monotone" dataKey="revenue" stroke="#7C3AED" strokeWidth={2.5} fill="url(#revGrad2)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <div className="card-header"><div className="card-title">Revenue by Product Type</div></div>
          <div className="card-body" style={{ paddingTop: 12 }}>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={salesByProduct} layout="vertical" margin={{ left: 0, right: 20, top: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11, fill: "var(--text-muted)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} />
                <YAxis dataKey="product" type="category" tick={{ fontSize: 12, fill: "var(--text-secondary)" }} axisLine={false} tickLine={false} width={60} />
                <Tooltip contentStyle={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: 8, fontSize: 12 }} formatter={(v: number) => [`$${v.toLocaleString()}`, "Revenue"]} />
                <Bar dataKey="revenue" fill="#7C3AED" radius={[0, 4, 4, 0]} opacity={0.85} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* QC Report */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">Quality Control Report — Pass Rate vs Defects</div>
        </div>
        <div className="card-body" style={{ paddingTop: 12 }}>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={qcData} margin={{ left: -10, right: 20, top: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--text-muted)" }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="left" domain={[94, 100]} tick={{ fontSize: 11, fill: "var(--text-muted)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11, fill: "var(--text-muted)" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: 8, fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Line yAxisId="left" type="monotone" dataKey="passRate" name="Pass Rate (%)" stroke="#10B981" strokeWidth={2.5} dot={{ r: 4, fill: "#10B981" }} />
              <Line yAxisId="right" type="monotone" dataKey="defects" name="Defects (count)" stroke="#EF4444" strokeWidth={2} dot={{ r: 4, fill: "#EF4444" }} strokeDasharray="4 2" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
