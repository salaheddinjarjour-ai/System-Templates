"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Package, ShoppingCart, Users, FileText,
  TrendingUp, CreditCard, Settings, MessageSquare, BarChart2,
  ChevronDown, Factory, Scissors, Layers, Truck, Search,
  LogOut, HelpCircle, Bell, Zap, UserCheck, DollarSign,
} from "lucide-react";

const menuItems = [
  {
    title: "MAIN",
    items: [
      { label: "Dashboard", icon: LayoutDashboard, href: "/" },
    ],
  },
  {
    title: "PRODUCTION",
    items: [
      {
        label: "Production", icon: Factory, href: "/production",
        sub: [
          { label: "Production Orders", href: "/production" },
          { label: "Work Orders", href: "/production/work-orders" },
          { label: "Quality Control", href: "/production/qc" },
        ],
      },
      { label: "Dyeing & Processing", icon: Layers, href: "/production/dyeing" },
      { label: "Weaving / Knitting", icon: Scissors, href: "/production/weaving" },
    ],
  },
  {
    title: "INVENTORY & STOCK",
    items: [
      {
        label: "Inventory", icon: Package, href: "/inventory",
        sub: [
          { label: "Raw Materials", href: "/inventory" },
          { label: "Finished Goods", href: "/inventory/finished" },
          { label: "Warehouse", href: "/inventory/warehouse" },
          { label: "Stock Alerts", href: "/inventory/alerts" },
        ],
      },
    ],
  },
  {
    title: "SALES & ORDERS",
    items: [
      {
        label: "Customers", icon: Users, href: "/customers",
        sub: [
          { label: "All Customers", href: "/customers" },
          { label: "Customer Groups", href: "/customers/groups" },
        ],
      },
      { label: "Sales Orders", icon: ShoppingCart, href: "/orders" },
      { label: "Quotations", icon: FileText, href: "/quotations" },
      {
        label: "Invoices", icon: CreditCard, href: "/invoices",
        sub: [
          { label: "All Invoices", href: "/invoices" },
          { label: "Create Invoice", href: "/invoices/create" },
          { label: "Recurring", href: "/invoices/recurring" },
        ],
      },
      { label: "Delivery", icon: Truck, href: "/delivery" },
    ],
  },
  {
    title: "PURCHASES",
    items: [
      { label: "Suppliers", icon: UserCheck, href: "/suppliers" },
      { label: "Purchase Orders", icon: ShoppingCart, href: "/purchases" },
      { label: "Bills & Payments", icon: CreditCard, href: "/bills" },
    ],
  },
  {
    title: "FINANCE",
    items: [
      {
        label: "Finance", icon: DollarSign, href: "/finance",
        sub: [
          { label: "Expenses", href: "/finance" },
          { label: "Incomes", href: "/finance/incomes" },
          { label: "Payments", href: "/finance/payments" },
          { label: "Banking", href: "/finance/banking" },
        ],
      },
    ],
  },
  {
    title: "PEOPLE",
    items: [
      {
        label: "HR & Teams", icon: Users, href: "/hr",
        sub: [
          { label: "Employees", href: "/hr" },
          { label: "Departments", href: "/hr/departments" },
          { label: "Attendance", href: "/hr/attendance" },
          { label: "Payroll", href: "/hr/payroll" },
        ],
      },
    ],
  },
  {
    title: "ANALYTICS",
    items: [
      { label: "Reports", icon: BarChart2, href: "/reports" },
      { label: "Sales Analytics", icon: TrendingUp, href: "/analytics" },
    ],
  },
  {
    title: "COMMUNICATION",
    items: [
      { label: "Team Chat", icon: MessageSquare, href: "/chat" },
    ],
  },
  {
    title: "SYSTEM",
    items: [
      { label: "Settings", icon: Settings, href: "/settings" },
    ],
  },
];

const miniIcons = [
  { icon: LayoutDashboard, href: "/", label: "Dashboard" },
  { icon: Factory, href: "/production", label: "Production" },
  { icon: Package, href: "/inventory", label: "Inventory" },
  { icon: ShoppingCart, href: "/orders", label: "Orders" },
  { icon: CreditCard, href: "/invoices", label: "Invoices" },
  { icon: Users, href: "/customers", label: "Customers" },
  { icon: DollarSign, href: "/finance", label: "Finance" },
  { icon: MessageSquare, href: "/chat", label: "Chat" },
  { icon: BarChart2, href: "/reports", label: "Reports" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  const toggleMenu = (label: string) => {
    setOpenMenus((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mini Icon Rail */}
      <div className="sidebar-mini">
        <div className="mini-logo">T</div>
        {miniIcons.map(({ icon: Icon, href, label }) => (
          <Link
            key={href}
            href={href}
            className={`mini-icon-btn ${isActive(href) ? "active" : ""}`}
            title={label}
          >
            <Icon size={18} />
          </Link>
        ))}
        <div className="mini-bottom">
          <button className="mini-icon-btn" title="Help">
            <HelpCircle size={18} />
          </button>
          <button className="mini-icon-btn" title="Notifications">
            <Bell size={18} />
          </button>
          <Link href="/settings" className="mini-icon-btn" title="Settings">
            <Settings size={18} />
          </Link>
          <button className="mini-icon-btn" title="Logout">
            <LogOut size={18} />
          </button>
        </div>
      </div>

      {/* Full Sidebar */}
      <div className="sidebar-full">
        <div className="sidebar-header">
          <div className="sidebar-search">
            <Search className="search-icon" />
            <input type="text" placeholder="Search..." />
          </div>
        </div>

        <div className="sidebar-nav">
          {menuItems.map((section) => (
            <div key={section.title}>
              <div className="sidebar-menu-title">{section.title}</div>
              {section.items.map((item) => {
                const Icon = item.icon;
                const hasSubmenu = item.sub && item.sub.length > 0;
                const isOpen = openMenus.includes(item.label);
                const active = isActive(item.href);

                return (
                  <div key={item.label}>
                    {hasSubmenu ? (
                      <div
                        className={`sidebar-nav-item ${active ? "active" : ""}`}
                        onClick={() => toggleMenu(item.label)}
                      >
                        <Icon className="nav-icon" size={18} />
                        <span>{item.label}</span>
                        <ChevronDown
                          size={14}
                          className={`menu-arrow ${isOpen ? "open" : ""}`}
                        />
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className={`sidebar-nav-item ${active ? "active" : ""}`}
                      >
                        <Icon className="nav-icon" size={18} />
                        <span>{item.label}</span>
                      </Link>
                    )}

                    {hasSubmenu && (
                      <div className={`sidebar-submenu ${isOpen ? "open" : ""}`}>
                        {item.sub!.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className={`sidebar-submenu-item ${pathname === sub.href ? "active" : ""}`}
                          >
                            <span className="submenu-dot" />
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <div className="sidebar-footer">
          <div className="sidebar-upgrade-card">
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <Zap size={16} style={{ color: "#F59E0B" }} />
              <span style={{ color: "white", fontWeight: 600, fontSize: 13 }}>Upgrade Plan</span>
            </div>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 12, marginBottom: 10 }}>
              Unlock advanced reports & integrations
            </p>
            <button className="btn btn-primary btn-sm" style={{ width: "100%", justifyContent: "center" }}>
              Upgrade Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
