"use client";
import { useState } from "react";
import { Save, Building, Bell, CreditCard, Globe, Shield, Palette, Mail } from "lucide-react";

const tabs = [
  { id: "company", label: "Company", icon: Building },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "finance", label: "Finance", icon: CreditCard },
  { id: "localization", label: "Localization", icon: Globe },
  { id: "security", label: "Security", icon: Shield },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "email", label: "Email", icon: Mail },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("company");
  const [darkMode, setDarkMode] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">System Settings</h1>
          <p className="page-subtitle">Configure your textile company system preferences</p>
        </div>
        <button className="btn btn-primary btn-sm" onClick={handleSave}>
          <Save size={14} /> {saved ? "Saved! ✓" : "Save Changes"}
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 20 }}>
        {/* Settings Nav */}
        <div className="card" style={{ height: "fit-content" }}>
          <div className="card-body" style={{ padding: "8px" }}>
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    width: "100%", display: "flex", alignItems: "center", gap: 10,
                    padding: "9px 12px", borderRadius: 8, border: "none", cursor: "pointer",
                    background: activeTab === tab.id ? "var(--primary-light)" : "transparent",
                    color: activeTab === tab.id ? "var(--primary)" : "var(--text-secondary)",
                    fontWeight: activeTab === tab.id ? 600 : 400, fontSize: 13,
                    marginBottom: 2, textAlign: "left", transition: "all 0.15s",
                  }}
                >
                  <Icon size={16} style={{ flexShrink: 0 }} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Settings Content */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {activeTab === "company" && (
            <>
              <div className="card">
                <div className="card-header"><div className="card-title">Company Information</div></div>
                <div className="card-body">
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div className="form-group">
                      <label className="form-label">Company Name</label>
                      <input className="form-control" defaultValue="TexFlow Manufacturing Ltd." />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Trade Name</label>
                      <input className="form-control" defaultValue="TexFlow" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Registration Number</label>
                      <input className="form-control" defaultValue="TXF-2019-EG-4281" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Tax ID (VAT)</label>
                      <input className="form-control" defaultValue="EG-9284-7612" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Phone</label>
                      <input className="form-control" defaultValue="+20 2 2345 6789" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email</label>
                      <input className="form-control" type="email" defaultValue="info@texflow.com" />
                    </div>
                    <div className="form-group" style={{ gridColumn: "1/-1" }}>
                      <label className="form-label">Address</label>
                      <textarea className="form-control" rows={2} defaultValue="10th Industrial Zone, New Cairo, Egypt" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Industry</label>
                      <select className="form-control form-select" defaultValue="textile">
                        <option value="textile">Textile Manufacturing</option>
                        <option>Garment Manufacturing</option>
                        <option>Fabric Trading</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Founded Year</label>
                      <input className="form-control" defaultValue="2008" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-header"><div className="card-title">Business Hours</div></div>
                <div className="card-body">
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div className="form-group">
                      <label className="form-label">Morning Shift Start</label>
                      <input className="form-control" type="time" defaultValue="07:00" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Morning Shift End</label>
                      <input className="form-control" type="time" defaultValue="15:00" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Evening Shift Start</label>
                      <input className="form-control" type="time" defaultValue="15:00" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Evening Shift End</label>
                      <input className="form-control" type="time" defaultValue="23:00" />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === "finance" && (
            <div className="card">
              <div className="card-header"><div className="card-title">Finance & Accounting Settings</div></div>
              <div className="card-body">
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <div className="form-group">
                    <label className="form-label">Default Currency</label>
                    <select className="form-control form-select">
                      <option>USD — US Dollar</option><option>EGP — Egyptian Pound</option>
                      <option>SAR — Saudi Riyal</option><option>EUR — Euro</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Default Tax Rate (%)</label>
                    <input className="form-control" type="number" defaultValue="10" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Invoice Prefix</label>
                    <input className="form-control" defaultValue="INV-" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Order Prefix</label>
                    <input className="form-control" defaultValue="TXO-" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Invoice Payment Terms (days)</label>
                    <input className="form-control" type="number" defaultValue="14" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Fiscal Year Start</label>
                    <select className="form-control form-select">
                      <option>January</option><option>April</option><option>July</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="card">
              <div className="card-header"><div className="card-title">Notification Preferences</div></div>
              <div className="card-body">
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  {[
                    { label: "New Sales Order", desc: "Get notified when a new customer order is placed", enabled: true },
                    { label: "Low Stock Alert", desc: "Alert when inventory drops below minimum threshold", enabled: true },
                    { label: "Invoice Overdue", desc: "Notify when a customer invoice exceeds due date", enabled: true },
                    { label: "Production Complete", desc: "Alert when a production batch finishes", enabled: false },
                    { label: "New Message", desc: "Notify on new team chat messages", enabled: true },
                    { label: "QC Failure", desc: "Alert when quality control fails a batch", enabled: true },
                    { label: "Payroll Reminder", desc: "Monthly payroll processing reminder", enabled: false },
                  ].map((n) => (
                    <div key={n.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", paddingBottom: 16, borderBottom: "1px solid var(--border-color)" }}>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 14 }}>{n.label}</div>
                        <div style={{ fontSize: 13, color: "var(--text-secondary)", marginTop: 2 }}>{n.desc}</div>
                      </div>
                      <label style={{ position: "relative", display: "inline-block", width: 44, height: 24, flexShrink: 0, cursor: "pointer" }}>
                        <input type="checkbox" defaultChecked={n.enabled} style={{ opacity: 0, width: 0, height: 0, position: "absolute" }} />
                        <span style={{
                          position: "absolute", cursor: "pointer", inset: 0, borderRadius: 24,
                          background: n.enabled ? "var(--primary)" : "var(--border-color)", transition: "0.2s",
                          display: "flex", alignItems: "center", padding: "0 3px",
                        }}>
                          <span style={{
                            width: 18, height: 18, borderRadius: "50%", background: "white",
                            display: "block", transform: n.enabled ? "translateX(20px)" : "translateX(0)", transition: "0.2s",
                            boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                          }} />
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "appearance" && (
            <div className="card">
              <div className="card-header"><div className="card-title">Appearance & Theme</div></div>
              <div className="card-body">
                <div className="form-group">
                  <label className="form-label">Color Theme</label>
                  <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
                    {[
                      { name: "Violet", color: "#7C3AED" }, { name: "Blue", color: "#3B82F6" },
                      { name: "Green", color: "#10B981" }, { name: "Orange", color: "#F97316" },
                      { name: "Rose", color: "#F43F5E" },
                    ].map((t) => (
                      <button key={t.name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer" }}>
                        <div style={{ width: 40, height: 40, borderRadius: 10, background: t.color, border: t.name === "Violet" ? "3px solid var(--text-primary)" : "3px solid transparent", boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }} />
                        <span style={{ fontSize: 11, color: "var(--text-secondary)" }}>{t.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Mode</label>
                  <div style={{ display: "flex", gap: 10 }}>
                    {["Light", "Dark", "System"].map((m) => (
                      <button key={m} style={{
                        padding: "8px 20px", borderRadius: 8, border: "2px solid",
                        borderColor: m === "Light" ? "var(--primary)" : "var(--border-color)",
                        background: m === "Light" ? "var(--primary-light)" : "transparent",
                        color: m === "Light" ? "var(--primary)" : "var(--text-secondary)",
                        fontWeight: m === "Light" ? 600 : 400, fontSize: 13, cursor: "pointer",
                      }}>{m}</button>
                    ))}
                  </div>
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Sidebar Style</label>
                  <div style={{ display: "flex", gap: 10 }}>
                    {["Two Column (Default)", "Single Column", "Mini Only"].map((s) => (
                      <button key={s} style={{
                        padding: "8px 14px", borderRadius: 8, border: "2px solid",
                        borderColor: s.includes("Two") ? "var(--primary)" : "var(--border-color)",
                        background: s.includes("Two") ? "var(--primary-light)" : "transparent",
                        color: s.includes("Two") ? "var(--primary)" : "var(--text-secondary)",
                        fontWeight: s.includes("Two") ? 600 : 400, fontSize: 12, cursor: "pointer",
                      }}>{s}</button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {(activeTab === "localization" || activeTab === "security" || activeTab === "email") && (
            <div className="card">
              <div className="card-header">
                <div className="card-title">{tabs.find(t => t.id === activeTab)?.label} Settings</div>
              </div>
              <div className="card-body">
                <div style={{ padding: "40px 0", textAlign: "center", color: "var(--text-muted)" }}>
                  <div style={{ fontSize: 40, marginBottom: 12 }}>⚙️</div>
                  <div style={{ fontWeight: 600, color: "var(--text-secondary)", fontSize: 15 }}>
                    {tabs.find(t => t.id === activeTab)?.label} settings panel
                  </div>
                  <div style={{ fontSize: 13, marginTop: 6 }}>Configure your {tabs.find(t => t.id === activeTab)?.label.toLowerCase()} preferences here.</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
