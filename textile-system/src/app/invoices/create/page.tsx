"use client";
import { useState } from "react";
import { Plus, Trash2, Save, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { customers } from "@/lib/mockData";

interface LineItem { id: number; description: string; qty: number; unit: string; price: number; }

export default function CreateInvoicePage() {
  const [items, setItems] = useState<LineItem[]>([
    { id: 1, description: "Denim Fabric 14oz - Raw", qty: 1000, unit: "mtrs", price: 8.5 },
  ]);
  const [taxRate, setTaxRate] = useState(10);

  const addItem = () => setItems((prev) => [...prev, { id: Date.now(), description: "", qty: 1, unit: "mtrs", price: 0 }]);
  const removeItem = (id: number) => setItems((prev) => prev.filter((i) => i.id !== id));
  const updateItem = (id: number, field: keyof LineItem, value: string | number) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, [field]: value } : i)));

  const subtotal = items.reduce((s, i) => s + i.qty * i.price, 0);
  const tax = (subtotal * taxRate) / 100;
  const total = subtotal + tax;

  return (
    <div>
      <div className="page-header">
        <div>
          <Link href="/invoices" className="btn btn-outline btn-sm" style={{ marginBottom: 8 }}>
            <ArrowLeft size={14} /> Back to Invoices
          </Link>
          <h1 className="page-title">Create New Invoice</h1>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn btn-outline btn-sm">Save Draft</button>
          <button className="btn btn-success btn-sm"><Save size={14} /> Save & Send</button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 20 }}>
        {/* Main Form */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Invoice Details */}
          <div className="card">
            <div className="card-header"><div className="card-title">Invoice Details</div></div>
            <div className="card-body">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div className="form-group">
                  <label className="form-label">Invoice Number</label>
                  <input className="form-control" defaultValue="INV-0929" />
                </div>
                <div className="form-group">
                  <label className="form-label">Reference / PO Number</label>
                  <input className="form-control" placeholder="e.g. TXO-2854" />
                </div>
                <div className="form-group">
                  <label className="form-label">Invoice Date</label>
                  <input className="form-control" type="date" defaultValue="2026-07-27" />
                </div>
                <div className="form-group">
                  <label className="form-label">Due Date</label>
                  <input className="form-control" type="date" defaultValue="2026-08-10" />
                </div>
              </div>
            </div>
          </div>

          {/* Bill To */}
          <div className="card">
            <div className="card-header"><div className="card-title">Bill To</div></div>
            <div className="card-body">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div className="form-group" style={{ gridColumn: "1/-1" }}>
                  <label className="form-label">Customer</label>
                  <select className="form-control form-select">
                    <option value="">Select a customer...</option>
                    {customers.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Contact Person</label>
                  <input className="form-control" placeholder="Contact name" />
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input className="form-control" type="email" placeholder="billing@company.com" />
                </div>
                <div className="form-group" style={{ gridColumn: "1/-1" }}>
                  <label className="form-label">Billing Address</label>
                  <textarea className="form-control" rows={2} placeholder="Street, City, Country" />
                </div>
              </div>
            </div>
          </div>

          {/* Line Items */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Line Items</div>
              <button className="btn btn-outline btn-sm" onClick={addItem}><Plus size={13} /> Add Item</button>
            </div>
            <div className="data-table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th style={{ width: "40%" }}>Description</th>
                    <th>Qty</th>
                    <th>Unit</th>
                    <th>Unit Price ($)</th>
                    <th>Amount</th>
                    <th style={{ width: 40 }}></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <input className="form-control" style={{ fontSize: 13 }} value={item.description}
                          onChange={(e) => updateItem(item.id, "description", e.target.value)} placeholder="Product / fabric description" />
                      </td>
                      <td>
                        <input className="form-control" style={{ fontSize: 13, width: 80 }} type="number" value={item.qty}
                          onChange={(e) => updateItem(item.id, "qty", +e.target.value)} />
                      </td>
                      <td>
                        <select className="form-control form-select" style={{ fontSize: 13, width: 90 }} value={item.unit}
                          onChange={(e) => updateItem(item.id, "unit", e.target.value)}>
                          <option>mtrs</option><option>kg</option><option>rolls</option><option>pcs</option>
                        </select>
                      </td>
                      <td>
                        <input className="form-control" style={{ fontSize: 13, width: 100 }} type="number" step="0.01" value={item.price}
                          onChange={(e) => updateItem(item.id, "price", +e.target.value)} />
                      </td>
                      <td style={{ fontWeight: 700 }}>${(item.qty * item.price).toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                      <td>
                        <button className="btn-icon" onClick={() => removeItem(item.id)} style={{ color: "var(--red)" }}>
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="card-body" style={{ paddingTop: 12 }}>
              <div className="form-group">
                <label className="form-label">Notes</label>
                <textarea className="form-control" rows={2} placeholder="Payment terms, delivery instructions, etc." />
              </div>
            </div>
          </div>
        </div>

        {/* Summary Sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="card">
            <div className="card-header"><div className="card-title">Invoice Summary</div></div>
            <div className="card-body">
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                  <span style={{ color: "var(--text-secondary)" }}>Subtotal</span>
                  <span style={{ fontWeight: 600 }}>${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 13 }}>
                  <span style={{ color: "var(--text-secondary)" }}>Tax Rate</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <input type="number" className="form-control" style={{ width: 60, fontSize: 12, padding: "4px 8px" }}
                      value={taxRate} onChange={(e) => setTaxRate(+e.target.value)} />
                    <span style={{ fontSize: 12 }}>%</span>
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                  <span style={{ color: "var(--text-secondary)" }}>Tax Amount</span>
                  <span style={{ color: "var(--text-secondary)" }}>${tax.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
                <div style={{ borderTop: "2px solid var(--border-color)", paddingTop: 12, display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontWeight: 700, fontSize: 16 }}>Total</span>
                  <span style={{ fontWeight: 800, fontSize: 20, color: "var(--primary)" }}>${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header"><div className="card-title">Payment Settings</div></div>
            <div className="card-body">
              <div className="form-group">
                <label className="form-label">Payment Method</label>
                <select className="form-control form-select">
                  <option>Bank Transfer</option><option>Cheque</option><option>Cash</option><option>Online Payment</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Currency</label>
                <select className="form-control form-select">
                  <option>USD — US Dollar</option><option>SAR — Saudi Riyal</option><option>EGP — Egyptian Pound</option><option>EUR — Euro</option>
                </select>
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Status</label>
                <select className="form-control form-select">
                  <option>Draft</option><option>Pending</option><option>Sent</option>
                </select>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <button className="btn btn-primary" style={{ justifyContent: "center" }}><Save size={15} /> Save & Send Invoice</button>
            <button className="btn btn-outline" style={{ justifyContent: "center" }}>Save as Draft</button>
            <button className="btn btn-outline" style={{ justifyContent: "center" }}>🖨️ Preview & Print</button>
          </div>
        </div>
      </div>
    </div>
  );
}
