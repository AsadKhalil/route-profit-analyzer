import { useState } from "react";
import { LoginForm } from "@/components/ui/login-form";
import { AdminDashboard } from "@/components/dashboard/admin-dashboard";
import { UserDashboard } from "@/components/dashboard/user-dashboard";

type UserRole = 'admin' | 'user' | null;

const Index = () => {
  const [userRole, setUserRole] = useState<UserRole>(null);

  const handleLogin = (role: UserRole) => {
    setUserRole(role);
  };

  const handleLogout = () => {
    setUserRole(null);
  };

  if (!userRole) {
    return <LoginForm onLogin={handleLogin} />;
  }

  if (userRole === 'admin') {
    return <AdminDashboard onLogout={handleLogout} />;
  }

  return <UserDashboard onLogout={handleLogout} />;
};

export default Index;
