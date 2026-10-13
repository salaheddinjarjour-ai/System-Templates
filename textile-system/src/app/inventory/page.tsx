"use client";
import { useState } from "react";
import { Plus, Search, AlertTriangle, Edit, MoreHorizontal } from "lucide-react";
import { rawMaterials, finishedGoods } from "@/lib/mockData";
import Link from "next/link";

export default function InventoryPage() {
  const [tab, setTab] = useState<"raw" | "finished">("raw");
  const [search, setSearch] = useState("");

  const rawFiltered = rawMaterials.filter(
    (r) => r.name.toLowerCase().includes(search.toLowerCase()) || r.sku.toLowerCase().includes(search.toLowerCase())
  );
  const fgFiltered = finishedGoods.filter(
    (f) => f.name.toLowerCase().includes(search.toLowerCase()) || f.sku.toLowerCase().includes(search.toLowerCase())
  );

  const stockBadge = (status: string) => {
    const m: Record<string, string> = { critical: "badge badge-danger", low: "badge badge-warning", normal: "badge badge-success", available: "badge badge-success", reserved: "badge badge-info", "out-of-stock": "badge badge-danger" };
    return m[status] ?? "badge badge-secondary";
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Inventory Management</h1>
          <p className="page-subtitle">Track raw materials, finished goods and stock levels</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <Link href="/inventory/alerts" className="btn btn-outline btn-sm">
            <AlertTriangle size={14} style={{ color: "var(--red)" }} /> Stock Alerts
          </Link>
          <button className="btn btn-primary btn-sm"><Plus size={14} /> Add Stock</button>
        </div>
      </div>

      {/* Summary Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        {[
          { label: "Raw Materials", value: rawMaterials.length + " items", color: "primary" },
          { label: "Critical Stock", value: rawMaterials.filter(r => r.status === "critical").length + " items", color: "danger" },
          { label: "Finished Goods", value: finishedGoods.length + " SKUs", color: "success" },
          { label: "Out of Stock", value: finishedGoods.filter(f => f.status === "out-of-stock").length + " items", color: "warning" },
        ].map((s) => (
          <div key={s.label} className={`stat-card ${s.color}`} style={{ padding: "16px 20px" }}>
            <div>
              <div className="stat-label">{s.label}</div>
              <div className="stat-value" style={{ fontSize: 24 }}>{s.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="card">
        <div className="card-header" style={{ gap: 16 }}>
          <div style={{ display: "flex", gap: 4, background: "var(--bg-page)", borderRadius: 8, padding: 4 }}>
            {(["raw", "finished"] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)} className="btn btn-sm" style={{
                background: tab === t ? "var(--bg-card)" : "transparent",
                color: tab === t ? "var(--primary)" : "var(--text-secondary)",
                boxShadow: tab === t ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
                border: "none"
              }}>
                {t === "raw" ? "Raw Materials" : "Finished Goods"}
              </button>
            ))}
          </div>
          <div style={{ marginLeft: "auto", position: "relative" }}>
            <Search size={14} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
            <input className="form-control" style={{ paddingLeft: 30, width: 240, fontSize: 13 }} placeholder="Search inventory..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>

        {tab === "raw" ? (
          <div className="data-table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Item ID</th><th>Name</th><th>SKU</th><th>Category</th>
                  <th>In Stock</th><th>Min Stock</th><th>Cost</th><th>Supplier</th><th>Status</th><th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {rawFiltered.map((r) => (
                  <tr key={r.id}>
                    <td><span style={{ fontWeight: 600, color: "var(--primary)" }}>{r.id}</span></td>
                    <td style={{ fontWeight: 500 }}>{r.name}</td>
                    <td><code style={{ fontSize: 12, background: "var(--bg-page)", padding: "2px 6px", borderRadius: 4 }}>{r.sku}</code></td>
                    <td><span className="badge badge-secondary">{r.category}</span></td>
                    <td style={{ fontWeight: 700 }}>{r.qty} {r.unit}</td>
                    <td style={{ color: "var(--text-secondary)" }}>{r.minStock} {r.unit}</td>
                    <td>{r.cost}</td>
                    <td style={{ color: "var(--text-secondary)", fontSize: 12 }}>{r.supplier}</td>
                    <td><span className={stockBadge(r.status)}>{r.status}</span></td>
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
        ) : (
          <div className="data-table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Item ID</th><th>Name</th><th>SKU</th><th>Category</th>
                  <th>Qty (mtrs)</th><th>Cost Price</th><th>Sale Price</th><th>Warehouse</th><th>Status</th><th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {fgFiltered.map((f) => (
                  <tr key={f.id}>
                    <td><span style={{ fontWeight: 600, color: "var(--primary)" }}>{f.id}</span></td>
                    <td style={{ fontWeight: 500 }}>{f.name}</td>
                    <td><code style={{ fontSize: 12, background: "var(--bg-page)", padding: "2px 6px", borderRadius: 4 }}>{f.sku}</code></td>
                    <td><span className="badge badge-secondary">{f.category}</span></td>
                    <td style={{ fontWeight: 700 }}>{f.qty.toLocaleString()}</td>
                    <td>{f.cost}</td>
                    <td style={{ fontWeight: 600, color: "var(--green)" }}>{f.salePrice}</td>
                    <td><span className="badge badge-info">{f.warehouse}</span></td>
                    <td><span className={stockBadge(f.status)}>{f.status}</span></td>
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
        )}
      </div>
    </div>
  );
}
