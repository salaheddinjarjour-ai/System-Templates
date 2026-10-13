"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Search, Bell, Sun, Moon, Plus, ChevronRight, X,
  Home, Settings, LogOut, User, FileText, CheckCircle,
  AlertTriangle, TrendingUp, Package,
} from "lucide-react";

const notifications = [
  { id: 1, icon: TrendingUp, color: "success", title: "New Sales Order", desc: "Order #TXO-2854 received from Al-Farouk Textiles", time: "3 min ago", unread: true },
  { id: 2, icon: AlertTriangle, color: "warning", title: "Low Stock Alert", desc: "Cotton Yarn (Grade A) is below reorder point", time: "15 min ago", unread: true },
  { id: 3, icon: CheckCircle, color: "success", title: "Production Complete", desc: "Batch #PRD-1192 finished — 4,200m Denim fabric", time: "1 hr ago", unread: false },
  { id: 4, icon: Package, color: "info", title: "Shipment Dispatched", desc: "Invoice #INV-0923 shipment sent to Nile Garments", time: "2 hr ago", unread: false },
  { id: 5, icon: FileText, color: "primary", title: "Invoice Approved", desc: "Invoice #INV-0918 approved by Finance Manager", time: "Yesterday", unread: false },
];

const pageTitles: Record<string, { title: string; parent?: string }> = {
  "/": { title: "Dashboard" },
  "/production": { title: "Production Orders", parent: "Production" },
  "/production/work-orders": { title: "Work Orders", parent: "Production" },
  "/production/qc": { title: "Quality Control", parent: "Production" },
  "/production/dyeing": { title: "Dyeing & Processing", parent: "Production" },
  "/production/weaving": { title: "Weaving / Knitting", parent: "Production" },
  "/inventory": { title: "Raw Materials", parent: "Inventory" },
  "/inventory/finished": { title: "Finished Goods", parent: "Inventory" },
  "/inventory/warehouse": { title: "Warehouse", parent: "Inventory" },
  "/inventory/alerts": { title: "Stock Alerts", parent: "Inventory" },
  "/customers": { title: "Customers", parent: "Sales & Orders" },
  "/orders": { title: "Sales Orders", parent: "Sales & Orders" },
  "/quotations": { title: "Quotations", parent: "Sales & Orders" },
  "/invoices": { title: "Invoices", parent: "Sales & Orders" },
  "/invoices/create": { title: "Create Invoice", parent: "Invoices" },
  "/delivery": { title: "Delivery Challans", parent: "Sales & Orders" },
  "/suppliers": { title: "Suppliers", parent: "Purchases" },
  "/purchases": { title: "Purchase Orders", parent: "Purchases" },
  "/bills": { title: "Bills & Payments", parent: "Purchases" },
  "/finance": { title: "Expenses", parent: "Finance" },
  "/finance/incomes": { title: "Incomes", parent: "Finance" },
  "/finance/payments": { title: "Payments", parent: "Finance" },
  "/finance/banking": { title: "Banking", parent: "Finance" },
  "/hr": { title: "Employees", parent: "HR & Teams" },
  "/hr/departments": { title: "Departments", parent: "HR & Teams" },
  "/hr/attendance": { title: "Attendance", parent: "HR & Teams" },
  "/hr/payroll": { title: "Payroll", parent: "HR & Teams" },
  "/reports": { title: "Reports", parent: "Analytics" },
  "/analytics": { title: "Sales Analytics", parent: "Analytics" },
  "/chat": { title: "Team Chat" },
  "/settings": { title: "Settings" },
};

export default function Topbar({ darkMode, toggleDark }: { darkMode: boolean; toggleDark: () => void }) {
  const pathname = usePathname();
  const [showNotif, setShowNotif] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const [notifs, setNotifs] = useState(notifications);

  const page = pageTitles[pathname] ?? { title: "Page" };
  const unreadCount = notifs.filter((n) => n.unread).length;

  const dismissNotif = (id: number) => {
    setNotifs((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <header className="topbar">
      {/* Breadcrumb */}
      <div className="topbar-breadcrumb" style={{ flex: 1 }}>
        <Home size={14} />
        <span className="sep"><ChevronRight size={12} /></span>
        {page.parent && (
          <>
            <span>{page.parent}</span>
            <span className="sep"><ChevronRight size={12} /></span>
          </>
        )}
        <span className="current">{page.title}</span>
      </div>

      {/* Search */}
      <div className="topbar-search">
        <Search className="search-icon" size={15} />
        <input type="text" placeholder="Search orders, customers, products..." />
      </div>

      {/* Quick Add */}
      <div style={{ position: "relative" }}>
        <button className="btn btn-primary btn-sm" style={{ gap: 5 }}>
          <Plus size={15} /> Quick Add
        </button>
      </div>

      {/* Dark Mode */}
      <button className="topbar-icon-btn" onClick={toggleDark} title="Toggle Theme">
        {darkMode ? <Sun size={17} /> : <Moon size={17} />}
      </button>

      {/* Notifications */}
      <div style={{ position: "relative" }}>
        <button
          className="topbar-icon-btn"
          onClick={() => { setShowNotif(!showNotif); setShowUser(false); }}
        >
          <Bell size={17} />
          {unreadCount > 0 && <span className="topbar-badge" />}
        </button>

        {showNotif && (
          <div className="notification-panel">
            <div style={{ padding: "14px 16px", borderBottom: "1px solid var(--border-color)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontWeight: 700, fontSize: 14 }}>Notifications</span>
              {unreadCount > 0 && (
                <span className="badge badge-primary">{unreadCount} New</span>
              )}
            </div>
            <div style={{ maxHeight: 340, overflowY: "auto" }}>
              {notifs.map((n) => {
                const Icon = n.icon;
                return (
                  <div
                    key={n.id}
                    style={{
                      padding: "12px 16px",
                      borderBottom: "1px solid var(--border-color)",
                      display: "flex",
                      gap: 10,
                      background: n.unread ? "rgba(124,58,237,0.04)" : "transparent",
                    }}
                  >
                    <div className={`stat-icon ${n.color}`} style={{ width: 36, height: 36, borderRadius: 8, flexShrink: 0 }}>
                      <Icon size={16} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 600, fontSize: 13, color: "var(--text-primary)" }}>{n.title}</div>
                      <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 2, lineHeight: 1.4 }}>{n.desc}</div>
                      <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4 }}>{n.time}</div>
                    </div>
                    <button
                      onClick={() => dismissNotif(n.id)}
                      style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", padding: 2 }}
                    >
                      <X size={13} />
                    </button>
                  </div>
                );
              })}
            </div>
            <div style={{ padding: "10px 16px", textAlign: "center", borderTop: "1px solid var(--border-color)" }}>
              <Link href="#" style={{ fontSize: 13, color: "var(--primary)", fontWeight: 600 }}>
                View All Notifications
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* User */}
      <div style={{ position: "relative" }}>
        <div
          className="topbar-avatar"
          onClick={() => { setShowUser(!showUser); setShowNotif(false); }}
        >
          AK
        </div>

        {showUser && (
          <div className="dropdown-menu" style={{ right: 0, top: "calc(100% + 8px)", position: "absolute", width: 220 }}>
            <div style={{ padding: "10px 12px 10px", borderBottom: "1px solid var(--border-color)", marginBottom: 4 }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: "var(--text-primary)" }}>Ahmed Karimi</div>
              <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>Operations Manager</div>
            </div>
            <Link href="/settings" className="dropdown-item"><User size={14} /> Profile Settings</Link>
            <Link href="/reports" className="dropdown-item"><FileText size={14} /> Reports</Link>
            <Link href="/settings" className="dropdown-item"><Settings size={14} /> System Settings</Link>
            <div style={{ borderTop: "1px solid var(--border-color)", margin: "4px 0" }} />
            <button className="dropdown-item" style={{ width: "100%", border: "none", background: "none", cursor: "pointer", color: "var(--red)" }}>
              <LogOut size={14} /> Sign Out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
