import { DollarSign, Users, Target, Receipt, TrendingUp, Clock, FileText, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { StatCard } from "@/components/ui/stat-card";
import { StatusBadge, getInvoiceStatusVariant } from "@/components/ui/status-badge";
import { dashboardStats, activityLogs, invoices, clients, leads } from "@/lib/mock-data";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

export default function DashboardPage() {
  const recentInvoices = invoices.slice(0, 4);
  const recentLeads = leads.filter(l => l.status === "new" || l.status === "contacted").slice(0, 4);
  const recentActivity = activityLogs.slice(0, 5);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-sm text-muted-foreground mt-1">Viralstan Admin · Business Overview</p>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value={`$${(dashboardStats.totalRevenue / 1000).toFixed(1)}K`}
          change={`+${dashboardStats.revenueGrowth}%`}
          changeType="positive"
          icon={DollarSign}
        />
        <StatCard
          title="Active Clients"
          value={String(clients.filter(c => c.status === "active").length)}
          change={`${clients.length} total`}
          changeType="positive"
          icon={Users}
        />
        <StatCard
          title="Open Leads"
          value={String(leads.filter(l => l.status !== "won" && l.status !== "lost").length)}
          change={`$${leads.filter(l => l.status !== "won" && l.status !== "lost").reduce((s, l) => s + l.value, 0).toLocaleString()} pipeline`}
          changeType="positive"
          icon={Target}
        />
        <StatCard
          title="Pending Invoices"
          value={String(invoices.filter(i => i.status !== "paid").length)}
          change={`$${invoices.filter(i => i.status !== "paid").reduce((s, i) => s + i.amount, 0).toLocaleString()} outstanding`}
          changeType="negative"
          icon={Receipt}
        />
      </div>

      {/* Revenue Chart */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-xl transition-all duration-500">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-black tracking-tight">Revenue Trend</h3>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Monthly Performance Analytics</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[#F43F5E]" />
            <span className="text-xs font-bold">Revenue ($)</span>
          </div>
        </div>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={dashboardStats.monthlyRevenue}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F43F5E" stopOpacity={0.2} />
                  <stop offset="50%" stopColor="#A855F7" stopOpacity={0.1} />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" vertical={false} />
              <XAxis 
                dataKey="month" 
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12, fontWeight: 600 }} 
                axisLine={false}
                tickLine={false}
                dy={10}
              />
              <YAxis 
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12, fontWeight: 600 }} 
                tickFormatter={(v) => `$${v / 1000}k`}
                axisLine={false}
                tickLine={false}
                dx={-10}
              />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))', 
                  borderRadius: '16px',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                  padding: '12px'
                }}
                itemStyle={{ color: 'hsl(var(--foreground))', fontWeight: 700 }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, "Revenue"]}
              />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke="#F43F5E" 
                strokeWidth={4} 
                fillOpacity={1} 
                fill="url(#revenueGradient)" 
                animationDuration={2000}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom: Recent Leads + Recent Invoices + Activity */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent Leads */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-xl transition-all duration-500">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-black tracking-tight">New Leads</h3>
            <Link to="/leads" className="text-xs font-bold text-primary hover:underline flex items-center gap-1 group">
              View all <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="space-y-4">
            {recentLeads.map(lead => (
              <div key={lead.id} className="flex items-center justify-between rounded-xl p-3 hover:bg-muted/50 transition-all duration-300 group">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary font-black group-hover:gradient-primary group-hover:text-white transition-all">
                    {lead.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-bold">{lead.name}</p>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{lead.company}</p>
                  </div>
                </div>
                <span className="text-sm font-black text-primary group-hover:scale-110 transition-transform">${lead.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Invoices */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-xl transition-all duration-500">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-black tracking-tight">Recent Invoices</h3>
            <Link to="/billing/invoices" className="text-xs font-bold text-primary hover:underline flex items-center gap-1 group">
              View all <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="space-y-4">
            {recentInvoices.map(inv => (
              <div key={inv.id} className="flex items-center justify-between rounded-xl p-3 hover:bg-muted/50 transition-all duration-300">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Receipt className="h-5 w-5 text-accent-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-mono font-bold tracking-tighter">{inv.invoiceNumber}</p>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{inv.clientName}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black">${inv.amount.toLocaleString()}</p>
                  <StatusBadge label={inv.status} variant={getInvoiceStatusVariant(inv.status)} className="scale-75 origin-right -mt-1" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-xl transition-all duration-500">
          <h3 className="text-lg font-black tracking-tight mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map(log => (
              <div key={log.id} className="flex items-start gap-4 rounded-xl p-3 hover:bg-muted/50 transition-all duration-300">
                <div className="mt-1 rounded-xl bg-muted p-2.5 shrink-0">
                  {log.type === "invoice" && <Receipt className="h-4 w-4 text-primary" />}
                  {log.type === "client" && <Users className="h-4 w-4 text-purple-500" />}
                  {log.type === "lead" && <Target className="h-4 w-4 text-blue-500" />}
                  {log.type === "payment" && <DollarSign className="h-4 w-4 text-green-500" />}
                  {log.type === "blog" && <FileText className="h-4 w-4 text-rose-500" />}
                  {log.type === "service" && <TrendingUp className="h-4 w-4 text-cyan-500" />}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold leading-snug">{log.action}</p>
                  <p className="text-[10px] font-black text-muted-foreground flex items-center gap-1.5 mt-1.5 uppercase tracking-widest">
                    <Clock className="h-3 w-3" />{new Date(log.timestamp).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
