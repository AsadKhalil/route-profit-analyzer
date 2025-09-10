import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area
} from "recharts";
import {
  Truck, DollarSign, TrendingUp, Fuel, Route, MapPin,
  LogOut, Users, Calendar, Clock
} from "lucide-react";

interface AdminDashboardProps {
  onLogout: () => void;
}

// Sample data for charts
const costPerKmData = [
  { month: 'Jan', cost: 2.5, revenue: 4.2 },
  { month: 'Feb', cost: 2.3, revenue: 4.1 },
  { month: 'Mar', cost: 2.7, revenue: 4.5 },
  { month: 'Apr', cost: 2.4, revenue: 4.3 },
  { month: 'May', cost: 2.6, revenue: 4.6 },
  { month: 'Jun', cost: 2.2, revenue: 4.4 },
];

const profitPerLaneData = [
  { lane: 'Mumbai-Delhi', profit: 15000, trips: 45 },
  { lane: 'Chennai-Bangalore', profit: 12000, trips: 38 },
  { lane: 'Kolkata-Guwahati', profit: 18000, trips: 25 },
  { lane: 'Pune-Hyderabad', profit: 14000, trips: 42 },
  { lane: 'Ahmedabad-Jaipur', profit: 11000, trips: 35 },
];

const fleetUtilizationData = [
  { vehicle: 'Active', value: 75, color: '#3b82f6' },
  { vehicle: 'Maintenance', value: 15, color: '#f59e0b' },
  { vehicle: 'Idle', value: 10, color: '#ef4444' },
];

const fuelTrendData = [
  { month: 'Jan', fuel: 85000, revenue: 180000 },
  { month: 'Feb', fuel: 82000, revenue: 175000 },
  { month: 'Mar', fuel: 88000, revenue: 195000 },
  { month: 'Apr', fuel: 86000, revenue: 185000 },
  { month: 'May', fuel: 91000, revenue: 205000 },
  { month: 'Jun', fuel: 89000, revenue: 200000 },
];

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState('6m');

  const kpiCards = [
    {
      title: "Total Revenue",
      value: "₹12,45,000",
      change: "+12.5%",
      icon: DollarSign,
      color: "text-secondary",
      bgColor: "bg-secondary/10"
    },
    {
      title: "Active Vehicles",
      value: "148",
      change: "+2",
      icon: Truck,
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      title: "Completed Trips",
      value: "2,847",
      change: "+18.2%",
      icon: Route,
      color: "text-accent",
      bgColor: "bg-accent/10"
    },
    {
      title: "Fuel Efficiency",
      value: "8.2 km/L",
      change: "+0.3",
      icon: Fuel,
      color: "text-warning",
      bgColor: "bg-warning/10"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Truck className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold">FleetPro Admin</h1>
            </div>
            <Badge variant="secondary">Administrator</Badge>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-sm text-muted-foreground flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>{new Date().toLocaleDateString('en-IN')}</span>
            </div>
            <Button variant="outline" onClick={onLogout} className="hover-shadow">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6 space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpiCards.map((kpi, index) => (
            <Card key={index} className="card-shadow hover-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{kpi.title}</p>
                    <p className="text-2xl font-bold mt-1">{kpi.value}</p>
                    <Badge variant="secondary" className="mt-2">
                      {kpi.change}
                    </Badge>
                  </div>
                  <div className={`p-3 rounded-full ${kpi.bgColor}`}>
                    <kpi.icon className={`h-6 w-6 ${kpi.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Cost per Kilometre */}
          <Card className="card-shadow hover-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span>Cost per Kilometre</span>
              </CardTitle>
              <CardDescription>Monthly cost vs revenue per km</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={costPerKmData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`₹${value}`, '']} />
                  <Area type="monotone" dataKey="revenue" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="cost" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Profit per Lane */}
          <Card className="card-shadow hover-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Route className="h-5 w-5 text-secondary" />
                <span>Profit per Lane</span>
              </CardTitle>
              <CardDescription>Top performing routes</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={profitPerLaneData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="lane" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip formatter={(value) => [`₹${value}`, 'Profit']} />
                  <Bar dataKey="profit" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Fleet Utilization */}
          <Card className="card-shadow hover-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Truck className="h-5 w-5 text-accent" />
                <span>Fleet Utilization</span>
              </CardTitle>
              <CardDescription>Current vehicle status distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={fleetUtilizationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {fleetUtilizationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, '']} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center space-x-4 mt-4">
                {fleetUtilizationData.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm">{item.vehicle} ({item.value}%)</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Fuel vs Revenue Trends */}
          <Card className="card-shadow hover-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Fuel className="h-5 w-5 text-warning" />
                <span>Fuel Spend vs Revenue</span>
              </CardTitle>
              <CardDescription>Monthly fuel costs against revenue</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={fuelTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, '']} />
                  <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6' }} />
                  <Line type="monotone" dataKey="fuel" stroke="#f59e0b" strokeWidth={3} dot={{ fill: '#f59e0b' }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="card-shadow hover-shadow">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-primary" />
              <span>Recent Trip Updates</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: 'TRP001', route: 'Mumbai → Delhi', status: 'On Time', eta: '14:30' },
                { id: 'TRP002', route: 'Chennai → Bangalore', status: 'Delayed', eta: '16:45' },
                { id: 'TRP003', route: 'Kolkata → Guwahati', status: 'Completed', eta: 'Delivered' },
                { id: 'TRP004', route: 'Pune → Hyderabad', status: 'On Time', eta: '18:20' },
              ].map((trip, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center space-x-4">
                    <MapPin className="h-4 w-4 text-primary" />
                    <div>
                      <p className="font-medium">{trip.id}</p>
                      <p className="text-sm text-muted-foreground">{trip.route}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={trip.status === 'On Time' ? 'default' : trip.status === 'Delayed' ? 'destructive' : 'secondary'}>
                      {trip.status}
                    </Badge>
                    <p className="text-sm text-muted-foreground mt-1">{trip.eta}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}