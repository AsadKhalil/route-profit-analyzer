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
  LogOut, Users, Calendar, Clock, Activity, AlertTriangle,
  TrendingDown, Package, Loader2
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useTripAnalytics, useTrips } from "@/hooks/useTrips";

export function EnhancedAdminDashboard() {
  const { profile, signOut } = useAuth();
  const { data: analytics, isLoading: analyticsLoading } = useTripAnalytics();
  const { trips, isLoading: tripsLoading } = useTrips();

  if (analyticsLoading || tripsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  const kpiCards = [
    {
      title: "Total Revenue",
      value: `₹${analytics?.totalRevenue?.toLocaleString('en-IN') || '0'}`,
      change: "+12.5%",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Active Trips",
      value: analytics?.totalTrips?.toString() || '0',
      change: `${analytics?.totalTrips || 0} total`,
      icon: Truck,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Total Profit",
      value: `₹${analytics?.totalProfit?.toLocaleString('en-IN') || '0'}`,
      change: "+18.2%",
      icon: TrendingUp,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50"
    },
    {
      title: "On-Time Rate",
      value: `${analytics?.onTimePercentage?.toFixed(1) || '0'}%`,
      change: analytics?.onTimePercentage && analytics.onTimePercentage > 85 ? "Excellent" : "Needs Improvement",
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    }
  ];

  // Fleet utilization mock data (you can extend this with real vehicle data)
  const fleetUtilizationData = [
    { vehicle: 'Active', value: 75, color: '#3b82f6' },
    { vehicle: 'Maintenance', value: 15, color: '#f59e0b' },
    { vehicle: 'Idle', value: 10, color: '#ef4444' },
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
            <Badge variant="outline">{profile?.full_name || profile?.email}</Badge>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-sm text-muted-foreground flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>{new Date().toLocaleDateString('en-IN')}</span>
            </div>
            <Button variant="outline" onClick={signOut} className="hover-shadow">
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
          {/* Monthly Revenue Trend */}
          {analytics?.monthlyData && analytics.monthlyData.length > 0 && (
            <Card className="card-shadow hover-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <span>Monthly Revenue Trend</span>
                </CardTitle>
                <CardDescription>Revenue and fuel costs over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={analytics.monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`₹${Number(value).toLocaleString()}`, '']} />
                    <Area type="monotone" dataKey="revenue" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                    <Area type="monotone" dataKey="fuel" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          )}

          {/* Top Profitable Routes */}
          {analytics?.topRoutes && analytics.topRoutes.length > 0 && (
            <Card className="card-shadow hover-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Route className="h-5 w-5 text-secondary" />
                  <span>Top Profitable Routes</span>
                </CardTitle>
                <CardDescription>Highest profit generating routes</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analytics.topRoutes}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="lane" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip formatter={(value) => [`₹${Number(value).toLocaleString()}`, 'Profit']} />
                    <Bar dataKey="profit" fill="#10b981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          )}

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

          {/* Performance Metrics */}
          <Card className="card-shadow hover-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-green-600" />
                <span>Performance Overview</span>
              </CardTitle>
              <CardDescription>Key performance indicators</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center space-x-3">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium">Total Distance</p>
                      <p className="text-sm text-muted-foreground">{analytics?.totalDistance?.toLocaleString()} km</p>
                    </div>
                  </div>
                  <Badge variant="default">Good</Badge>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center space-x-3">
                    <Fuel className="h-5 w-5 text-orange-600" />
                    <div>
                      <p className="font-medium">Fuel Efficiency</p>
                      <p className="text-sm text-muted-foreground">
                        {analytics?.totalDistance && analytics?.totalFuelCost ? 
                          (analytics.totalDistance / (analytics.totalFuelCost / 100)).toFixed(2) : 0} km/₹100
                      </p>
                    </div>
                  </div>
                  <Badge variant="secondary">Average</Badge>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Profit Margin</p>
                      <p className="text-sm text-muted-foreground">
                        {analytics?.totalRevenue && analytics?.totalProfit ? 
                          ((analytics.totalProfit / analytics.totalRevenue) * 100).toFixed(1) : 0}%
                      </p>
                    </div>
                  </div>
                  <Badge variant="default">Good</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Trips */}
        <Card className="card-shadow hover-shadow">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-primary" />
              <span>Recent Trips</span>
            </CardTitle>
            <CardDescription>Latest trip entries from users</CardDescription>
          </CardHeader>
          <CardContent>
            {trips && trips.length > 0 ? (
              <div className="space-y-4">
                {trips.slice(0, 5).map((trip, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center space-x-4">
                      <MapPin className="h-4 w-4 text-primary" />
                      <div>
                        <p className="font-medium">{trip.booking_id}</p>
                        <p className="text-sm text-muted-foreground">
                          {trip.origin_location} → {trip.destination_location}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={trip.on_time === true ? 'default' : trip.on_time === false ? 'destructive' : 'secondary'}>
                        {trip.on_time === true ? 'On Time' : trip.on_time === false ? 'Delayed' : 'In Progress'}
                      </Badge>
                      <p className="text-sm text-muted-foreground mt-1">
                        {trip.vehicle_no || 'No vehicle assigned'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No trips found. Users can start adding trip data.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
