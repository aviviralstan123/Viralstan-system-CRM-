import { PageHeader } from "@/components/ui/page-header";
import { dashboardStats } from "@/lib/mock-data";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

const COLORS = ["#F43F5E", "#A855F7", "#3B82F6", "#06B6D4", "#F59E0B"];

export default function AnalyticsPage() {
  return (
    <div className="animate-fade-in space-y-8">
      <PageHeader 
        title="Analytics" 
        description="Deep dive into your agency's business performance and trends." 
      />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Revenue Trend */}
        <div className="rounded-2xl border border-border bg-card p-8 shadow-sm hover:shadow-xl transition-all duration-500">
          <h3 className="text-lg font-black tracking-tight mb-8">Revenue Trend</h3>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dashboardStats.monthlyRevenue}>
                <defs>
                  <linearGradient id="aGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#F43F5E" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" vertical={false} />
                <XAxis 
                  dataKey="month" 
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12, fontWeight: 700 }} 
                  axisLine={false}
                  tickLine={false}
                  dy={10}
                />
                <YAxis 
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12, fontWeight: 700 }} 
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
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#F43F5E" 
                  strokeWidth={4} 
                  fill="url(#aGrad)" 
                  animationDuration={2500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Leads by Source */}
        <div className="rounded-2xl border border-border bg-card p-8 shadow-sm hover:shadow-xl transition-all duration-500">
          <h3 className="text-lg font-black tracking-tight mb-8">Leads by Source</h3>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie 
                  data={dashboardStats.leadsBySource} 
                  dataKey="count" 
                  nameKey="source" 
                  cx="50%" 
                  cy="50%" 
                  innerRadius={80}
                  outerRadius={120} 
                  paddingAngle={8}
                  label={({ source }) => source}
                  animationDuration={2000}
                >
                  {dashboardStats.leadsBySource.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} strokeWidth={0} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))', 
                    borderRadius: '16px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue by Service */}
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-8 shadow-sm hover:shadow-xl transition-all duration-500">
          <h3 className="text-lg font-black tracking-tight mb-8">Revenue by Service</h3>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dashboardStats.revenueByService}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" vertical={false} />
                <XAxis 
                  dataKey="service" 
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12, fontWeight: 700 }} 
                  axisLine={false}
                  tickLine={false}
                  dy={10}
                />
                <YAxis 
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12, fontWeight: 700 }} 
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
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                  }} 
                />
                <Bar dataKey="revenue" fill="url(#brandGradient)" radius={[10, 10, 0, 0]} animationDuration={2000}>
                  {dashboardStats.revenueByService.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
