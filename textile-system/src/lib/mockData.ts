// Mock data for the Textile Company Management System

export const dashboardStats = [
  { label: "Total Revenue", value: "$284,950", change: "+12.4%", up: true, color: "primary", icon: "dollar" },
  { label: "Active Orders", value: "142", change: "+8.2%", up: true, color: "success", icon: "cart" },
  { label: "Production (mtrs)", value: "48,200", change: "+5.1%", up: true, color: "info", icon: "factory" },
  { label: "Raw Stock (kg)", value: "12,840", change: "-3.7%", up: false, color: "warning", icon: "package" },
  { label: "Pending Invoices", value: "$38,420", change: "+2.1%", up: true, color: "danger", icon: "file" },
  { label: "Active Employees", value: "247", change: "0%", up: true, color: "orange", icon: "users" },
];

export const revenueData = [
  { month: "Jan", revenue: 42000, expenses: 28000 },
  { month: "Feb", revenue: 38000, expenses: 25000 },
  { month: "Mar", revenue: 55000, expenses: 32000 },
  { month: "Apr", revenue: 48000, expenses: 30000 },
  { month: "May", revenue: 62000, expenses: 38000 },
  { month: "Jun", revenue: 58000, expenses: 35000 },
  { month: "Jul", revenue: 72000, expenses: 42000 },
  { month: "Aug", revenue: 68000, expenses: 40000 },
  { month: "Sep", revenue: 78000, expenses: 45000 },
  { month: "Oct", revenue: 85000, expenses: 50000 },
  { month: "Nov", revenue: 91000, expenses: 52000 },
  { month: "Dec", revenue: 95000, expenses: 55000 },
];

export const orderStatusData = [
  { name: "Completed", value: 42, color: "#10B981" },
  { name: "In Production", value: 28, color: "#7C3AED" },
  { name: "Pending", value: 18, color: "#F59E0B" },
  { name: "Shipped", value: 12, color: "#3B82F6" },
];

export const productionData = [
  { month: "Jan", denim: 8200, cotton: 5400, silk: 2100, wool: 1800 },
  { month: "Feb", denim: 7800, cotton: 6200, silk: 1900, wool: 2100 },
  { month: "Mar", denim: 9400, cotton: 7100, silk: 2400, wool: 2300 },
  { month: "Apr", denim: 8900, cotton: 6800, silk: 2200, wool: 1900 },
  { month: "May", denim: 10200, cotton: 7400, silk: 2600, wool: 2500 },
  { month: "Jun", denim: 9800, cotton: 7800, silk: 2800, wool: 2200 },
];

export const recentOrders = [
  { id: "TXO-2854", customer: "Al-Farouk Textiles", product: "Denim Fabric 14oz", qty: "2,400 mtrs", amount: "$18,240", date: "27 Jul 2026", status: "pending", priority: "high" },
  { id: "TXO-2853", customer: "Nile Garments Co.", product: "Cotton Poplin 40s", qty: "5,800 mtrs", amount: "$34,800", date: "26 Jul 2026", status: "production", priority: "medium" },
  { id: "TXO-2852", customer: "Gulf Fashion Group", product: "Silk Chiffon", qty: "1,200 mtrs", amount: "$42,000", date: "25 Jul 2026", status: "completed", priority: "low" },
  { id: "TXO-2851", customer: "Euro Brands Ltd.", product: "Wool Tweed 350g", qty: "900 mtrs", amount: "$22,500", date: "24 Jul 2026", status: "shipped", priority: "medium" },
  { id: "TXO-2850", customer: "Cairo Clothing", product: "Linen Canvas", qty: "3,200 mtrs", amount: "$19,200", date: "24 Jul 2026", status: "completed", priority: "low" },
  { id: "TXO-2849", customer: "Premium Wear House", product: "Jersey Knit 180g", qty: "4,500 mtrs", amount: "$27,000", date: "23 Jul 2026", status: "production", priority: "high" },
];

export const lowStockItems = [
  { name: "Cotton Yarn Grade A", current: 180, min: 500, unit: "kg", category: "Raw Material" },
  { name: "Reactive Dye (Blue)", current: 12, min: 50, unit: "kg", category: "Chemicals" },
  { name: "Warp Beam Thread", current: 8, min: 30, unit: "rolls", category: "Accessories" },
  { name: "Polyester Yarn 150D", current: 240, min: 800, unit: "kg", category: "Raw Material" },
];

export const topCustomers = [
  { name: "Al-Farouk Textiles", orders: 38, revenue: "$284,400", flag: "🇸🇦" },
  { name: "Nile Garments Co.", orders: 29, revenue: "$198,200", flag: "🇪🇬" },
  { name: "Gulf Fashion Group", orders: 24, revenue: "$176,800", flag: "🇦🇪" },
  { name: "Euro Brands Ltd.", orders: 18, revenue: "$142,000", flag: "🇩🇪" },
  { name: "Cairo Clothing", orders: 15, revenue: "$98,400", flag: "🇪🇬" },
];

export const productionOrders = [
  { id: "PRD-1201", product: "Denim Fabric 14oz", batch: "BATCH-A291", qty: "12,000 mtrs", machine: "Loom #4, #5", worker: "Hassan M.", start: "25 Jul", deadline: "02 Aug", progress: 65, status: "in-progress" },
  { id: "PRD-1200", product: "Cotton Poplin 40s", batch: "BATCH-A290", qty: "8,400 mtrs", machine: "Loom #2, #3", worker: "Ibrahim K.", start: "23 Jul", deadline: "30 Jul", progress: 90, status: "in-progress" },
  { id: "PRD-1199", product: "Silk Chiffon 12mm", batch: "BATCH-A289", qty: "2,800 mtrs", machine: "Jacquard #1", worker: "Fatima A.", start: "20 Jul", deadline: "27 Jul", progress: 100, status: "completed" },
  { id: "PRD-1198", product: "Wool Tweed 350g", batch: "BATCH-A288", qty: "3,600 mtrs", machine: "Circular #7", worker: "Omar S.", start: "18 Jul", deadline: "26 Jul", progress: 100, status: "completed" },
  { id: "PRD-1197", product: "Jersey Knit 180g", batch: "BATCH-A287", qty: "9,000 mtrs", machine: "Circular #3, #4", worker: "Sara N.", start: "28 Jul", deadline: "05 Aug", progress: 10, status: "scheduled" },
  { id: "PRD-1196", product: "Linen Canvas 280g", batch: "BATCH-A286", qty: "5,200 mtrs", machine: "Rapier #2", worker: "Ali H.", start: "01 Aug", deadline: "10 Aug", progress: 0, status: "scheduled" },
];

export const rawMaterials = [
  { id: "RM-001", name: "Cotton Yarn Grade A", sku: "CY-A-30S", category: "Yarn", qty: 180, unit: "kg", minStock: 500, maxStock: 5000, cost: "$2.40/kg", supplier: "Delta Fibers", status: "low" },
  { id: "RM-002", name: "Polyester Yarn 150D", sku: "PY-150D", category: "Yarn", qty: 240, unit: "kg", minStock: 800, maxStock: 8000, cost: "$1.80/kg", supplier: "SynFiber Co.", status: "low" },
  { id: "RM-003", name: "Wool Roving", sku: "WR-MER-64", category: "Fiber", qty: 1240, unit: "kg", minStock: 300, maxStock: 3000, cost: "$12.50/kg", supplier: "Australian Wool", status: "normal" },
  { id: "RM-004", name: "Silk Filament 20D", sku: "SF-20D", category: "Fiber", qty: 380, unit: "kg", minStock: 200, maxStock: 2000, cost: "$28.00/kg", supplier: "Silk Road Imports", status: "normal" },
  { id: "RM-005", name: "Reactive Dye (Blue)", sku: "DY-REACT-BL", category: "Chemicals", qty: 12, unit: "kg", minStock: 50, maxStock: 500, cost: "$18.50/kg", supplier: "ColorChem Ltd.", status: "critical" },
  { id: "RM-006", name: "Reactive Dye (Red)", sku: "DY-REACT-RD", category: "Chemicals", qty: 68, unit: "kg", minStock: 50, maxStock: 500, cost: "$19.20/kg", supplier: "ColorChem Ltd.", status: "normal" },
  { id: "RM-007", name: "Sodium Carbonate", sku: "CH-SODA-ASH", category: "Chemicals", qty: 840, unit: "kg", minStock: 200, maxStock: 2000, cost: "$0.45/kg", supplier: "Industrial Chemicals", status: "normal" },
  { id: "RM-008", name: "Warp Beam Thread", sku: "ACC-WBT-20", category: "Accessories", qty: 8, unit: "rolls", minStock: 30, maxStock: 200, cost: "$45.00/roll", supplier: "Thread Masters", status: "critical" },
];

export const finishedGoods = [
  { id: "FG-001", name: "Denim Fabric 14oz Raw", sku: "FG-DEN-14", category: "Denim", qty: 4200, unit: "mtrs", cost: "$6.80/m", salePrice: "$8.50/m", warehouse: "WH-A", status: "available" },
  { id: "FG-002", name: "Cotton Poplin 40s White", sku: "FG-CPW-40", category: "Cotton", qty: 8800, unit: "mtrs", cost: "$4.20/m", salePrice: "$5.80/m", warehouse: "WH-A", status: "available" },
  { id: "FG-003", name: "Silk Chiffon Navy", sku: "FG-SC-NV", category: "Silk", qty: 320, unit: "mtrs", cost: "$18.00/m", salePrice: "$28.00/m", warehouse: "WH-B", status: "reserved" },
  { id: "FG-004", name: "Wool Tweed Charcoal", sku: "FG-WT-CH", category: "Wool", qty: 1400, unit: "mtrs", cost: "$22.00/m", salePrice: "$32.00/m", warehouse: "WH-B", status: "available" },
  { id: "FG-005", name: "Jersey Knit Ivory", sku: "FG-JK-IV", category: "Knit", qty: 0, unit: "mtrs", cost: "$5.40/m", salePrice: "$7.20/m", warehouse: "WH-A", status: "out-of-stock" },
];

export const customers = [
  { id: "CUS-001", name: "Al-Farouk Textiles", contact: "Mr. Yusuf Al-Farouk", email: "yusuf@alfarouk.sa", phone: "+966 50 123 4567", country: "Saudi Arabia", flag: "🇸🇦", totalOrders: 38, totalSpend: "$284,400", status: "active" },
  { id: "CUS-002", name: "Nile Garments Co.", contact: "Ms. Dina Saleh", email: "d.saleh@nileg.eg", phone: "+20 10 234 5678", country: "Egypt", flag: "🇪🇬", totalOrders: 29, totalSpend: "$198,200", status: "active" },
  { id: "CUS-003", name: "Gulf Fashion Group", contact: "Mr. Khalid Al-Mansouri", email: "khalid@gulfashion.ae", phone: "+971 50 345 6789", country: "UAE", flag: "🇦🇪", totalOrders: 24, totalSpend: "$176,800", status: "active" },
  { id: "CUS-004", name: "Euro Brands Ltd.", contact: "Ms. Elena Weber", email: "e.weber@eurobrands.de", phone: "+49 89 456 7890", country: "Germany", flag: "🇩🇪", totalOrders: 18, totalSpend: "$142,000", status: "active" },
  { id: "CUS-005", name: "Cairo Clothing", contact: "Mr. Tarek Hassan", email: "tarek@cairoclothing.eg", phone: "+20 11 567 8901", country: "Egypt", flag: "🇪🇬", totalOrders: 15, totalSpend: "$98,400", status: "active" },
  { id: "CUS-006", name: "Premium Wear House", contact: "Mr. Rami Darwish", email: "rami@premiumwear.jo", phone: "+962 79 678 9012", country: "Jordan", flag: "🇯🇴", totalOrders: 12, totalSpend: "$74,800", status: "active" },
  { id: "CUS-007", name: "Istanbul Fabric Trading", contact: "Mr. Kemal Aydin", email: "k.aydin@istfabric.tr", phone: "+90 532 789 0123", country: "Turkey", flag: "🇹🇷", totalOrders: 9, totalSpend: "$58,200", status: "inactive" },
  { id: "CUS-008", name: "Marrakesh Couture", contact: "Ms. Amina Benali", email: "amina@marrakesh.ma", phone: "+212 66 890 1234", country: "Morocco", flag: "🇲🇦", totalOrders: 7, totalSpend: "$42,600", status: "active" },
];

export const invoices = [
  { id: "INV-0928", customer: "Al-Farouk Textiles", amount: "$18,240", tax: "$1,824", total: "$20,064", date: "27 Jul 2026", due: "10 Aug 2026", status: "pending" },
  { id: "INV-0927", customer: "Nile Garments Co.", amount: "$34,800", tax: "$3,480", total: "$38,280", date: "26 Jul 2026", due: "09 Aug 2026", status: "pending" },
  { id: "INV-0926", customer: "Gulf Fashion Group", amount: "$42,000", tax: "$4,200", total: "$46,200", date: "24 Jul 2026", due: "07 Aug 2026", status: "paid" },
  { id: "INV-0925", customer: "Euro Brands Ltd.", amount: "$22,500", tax: "$2,250", total: "$24,750", date: "22 Jul 2026", due: "05 Aug 2026", status: "overdue" },
  { id: "INV-0924", customer: "Cairo Clothing", amount: "$19,200", tax: "$1,920", total: "$21,120", date: "20 Jul 2026", due: "03 Aug 2026", status: "paid" },
  { id: "INV-0923", customer: "Premium Wear House", amount: "$27,000", tax: "$2,700", total: "$29,700", date: "18 Jul 2026", due: "01 Aug 2026", status: "paid" },
  { id: "INV-0922", customer: "Istanbul Fabric", amount: "$14,800", tax: "$1,480", total: "$16,280", date: "15 Jul 2026", due: "29 Jul 2026", status: "overdue" },
  { id: "INV-0921", customer: "Marrakesh Couture", amount: "$9,600", tax: "$960", total: "$10,560", date: "12 Jul 2026", due: "26 Jul 2026", status: "paid" },
];

export const employees = [
  { id: "EMP-001", name: "Hassan Mohammed", role: "Production Manager", dept: "Production", salary: "$2,800", join: "Mar 2019", status: "active", shift: "Morning" },
  { id: "EMP-002", name: "Ibrahim Khalil", role: "Lead Weaver", dept: "Production", salary: "$1,600", join: "Jul 2020", status: "active", shift: "Morning" },
  { id: "EMP-003", name: "Fatima Al-Zahra", role: "Quality Inspector", dept: "QC", salary: "$1,400", join: "Jan 2021", status: "active", shift: "Morning" },
  { id: "EMP-004", name: "Omar Saleh", role: "Dye Technician", dept: "Dyeing", salary: "$1,500", join: "Sep 2020", status: "active", shift: "Evening" },
  { id: "EMP-005", name: "Sara Nasser", role: "Sales Executive", dept: "Sales", salary: "$1,800", join: "Feb 2022", status: "active", shift: "Morning" },
  { id: "EMP-006", name: "Ali Hassan", role: "Warehouse Supervisor", dept: "Warehouse", salary: "$1,700", join: "Nov 2019", status: "active", shift: "Morning" },
  { id: "EMP-007", name: "Noura Abdullah", role: "Accountant", dept: "Finance", salary: "$2,000", join: "Apr 2021", status: "active", shift: "Morning" },
  { id: "EMP-008", name: "Mahmoud Faris", role: "Machine Operator", dept: "Production", salary: "$1,200", join: "Aug 2022", status: "on-leave", shift: "Evening" },
];

export const chatChannels = [
  { id: "general", name: "general", unread: 0, members: 24 },
  { id: "production", name: "production", unread: 3, members: 12 },
  { id: "sales-team", name: "sales-team", unread: 1, members: 8 },
  { id: "warehouse", name: "warehouse", unread: 0, members: 6 },
  { id: "management", name: "management", unread: 0, members: 5 },
  { id: "quality-control", name: "quality-control", unread: 2, members: 7 },
];

export const chatDMs = [
  { id: "hassan", name: "Hassan Mohammed", role: "Production Manager", online: true, unread: 1 },
  { id: "sara", name: "Sara Nasser", role: "Sales Executive", online: true, unread: 0 },
  { id: "fatima", name: "Fatima Al-Zahra", role: "QC Inspector", online: false, unread: 0 },
  { id: "ali", name: "Ali Hassan", role: "Warehouse Supervisor", online: true, unread: 2 },
  { id: "noura", name: "Noura Abdullah", role: "Accountant", online: false, unread: 0 },
];

export const channelMessages: Record<string, Array<{id: number; sender: string; initials: string; text: string; time: string; mine?: boolean}>> = {
  general: [
    { id: 1, sender: "Hassan Mohammed", initials: "HM", text: "Good morning team! Production batch PRD-1200 is at 90% — should complete by tonight.", time: "08:14 AM" },
    { id: 2, sender: "Sara Nasser", initials: "SN", text: "Great news Hassan! I have a new order inquiry from Gulf Fashion for 3,000 meters of denim. Can we fit it in next week?", time: "08:22 AM" },
    { id: 3, sender: "You", initials: "AK", text: "Sara, check with Hassan on capacity first. Also please send them a quotation draft today.", time: "08:30 AM", mine: true },
    { id: 4, sender: "Ali Hassan", initials: "AH", text: "Warehouse note: Cotton yarn stock is critically low — 180kg left, we need to reorder ASAP.", time: "08:45 AM" },
    { id: 5, sender: "Noura Abdullah", initials: "NA", text: "I'll process the purchase order for cotton yarn now. @Ali can you confirm the quantity needed?", time: "09:02 AM" },
    { id: 6, sender: "Ali Hassan", initials: "AH", text: "We need at least 2,000 kg to cover next month's production plan.", time: "09:05 AM" },
    { id: 7, sender: "You", initials: "AK", text: "Good. Noura please fast-track the PO and get Delta Fibers to confirm delivery within 3 days.", time: "09:10 AM", mine: true },
  ],
  production: [
    { id: 1, sender: "Hassan Mohammed", initials: "HM", text: "Looms #4 and #5 are running the denim batch. Target speed: 220 picks/min.", time: "07:30 AM" },
    { id: 2, sender: "Ibrahim Khalil", initials: "IK", text: "Confirmed. Warp tension is set. We're hitting 215 picks/min on average — adjusting now.", time: "07:45 AM" },
    { id: 3, sender: "Fatima Al-Zahra", initials: "FA", text: "First QC check done on batch PRD-1199 (Silk Chiffon). 3 defects found in roll #7 — marking for rework.", time: "08:00 AM" },
    { id: 4, sender: "You", initials: "AK", text: "Thanks Fatima. Make sure rework is completed before delivery tomorrow.", time: "08:12 AM", mine: true },
  ],
  "sales-team": [
    { id: 1, sender: "Sara Nasser", initials: "SN", text: "Quotation for Al-Farouk has been sent — waiting for approval on pricing.", time: "Yesterday 04:20 PM" },
    { id: 2, sender: "You", initials: "AK", text: "Good. Follow up if no response by noon today.", time: "Yesterday 04:35 PM", mine: true },
    { id: 3, sender: "Sara Nasser", initials: "SN", text: "Al-Farouk confirmed! Order TXO-2854 placed for 2,400 mtrs denim. 🎉", time: "09:15 AM" },
  ],
};

export const expenses = [
  { id: "EXP-001", category: "Raw Materials", description: "Cotton Yarn Order - Delta Fibers", amount: "$12,480", date: "25 Jul 2026", paymentMethod: "Bank Transfer", status: "paid" },
  { id: "EXP-002", category: "Utilities", description: "July Electricity Bill - Factory", amount: "$3,240", date: "24 Jul 2026", paymentMethod: "Auto Debit", status: "paid" },
  { id: "EXP-003", category: "Maintenance", description: "Loom #3 Overhaul - MachineServ", amount: "$1,800", date: "22 Jul 2026", paymentMethod: "Cheque", status: "pending" },
  { id: "EXP-004", category: "Chemicals", description: "Reactive Dye Batch - ColorChem Ltd.", amount: "$2,160", date: "20 Jul 2026", paymentMethod: "Bank Transfer", status: "paid" },
  { id: "EXP-005", category: "Logistics", description: "Delivery to Nile Garments", amount: "$480", date: "19 Jul 2026", paymentMethod: "Cash", status: "paid" },
  { id: "EXP-006", category: "HR & Payroll", description: "July Staff Salaries", amount: "$42,800", date: "01 Jul 2026", paymentMethod: "Bank Transfer", status: "paid" },
];

export const suppliers = [
  { id: "SUP-001", name: "Delta Fibers Ltd.", contact: "Mr. Rami Darwish", email: "rami@deltafibers.eg", phone: "+20 12 345 6789", product: "Cotton Yarn", country: "Egypt", status: "active", rating: 4.8 },
  { id: "SUP-002", name: "SynFiber Co.", contact: "Mr. Ahmed Yilmaz", email: "ahmed@synfiber.tr", phone: "+90 532 234 5678", product: "Polyester Yarn", country: "Turkey", status: "active", rating: 4.5 },
  { id: "SUP-003", name: "Australian Wool Board", contact: "Ms. Claire Thompson", email: "claire@awboard.com.au", phone: "+61 2 3456 7890", product: "Merino Wool", country: "Australia", status: "active", rating: 4.9 },
  { id: "SUP-004", name: "ColorChem Ltd.", contact: "Mr. Prakash Mehta", email: "p.mehta@colorchem.in", phone: "+91 98 4567 8901", product: "Dyes & Chemicals", country: "India", status: "active", rating: 4.3 },
  { id: "SUP-005", name: "Thread Masters", contact: "Mr. Liu Wei", email: "lwei@threadmasters.cn", phone: "+86 21 5678 9012", product: "Thread & Accessories", country: "China", status: "active", rating: 4.6 },
];
