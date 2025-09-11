import { EnhancedAdminDashboard } from "./enhanced-admin-dashboard";

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

export function AdminDashboard() {
  return <EnhancedAdminDashboard />;
}