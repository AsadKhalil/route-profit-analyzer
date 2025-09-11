import { DirectTestLogin } from "@/components/auth/DirectTestLogin";
import { AdminDashboard } from "@/components/dashboard/admin-dashboard";
import { UserDashboard } from "@/components/dashboard/user-dashboard";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";

const Index = () => {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{
        background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 50%, #0891b2 100%)'
      }}>
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-white" />
          <p className="text-white">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || !profile) {
    return <DirectTestLogin />;
  }

  if (profile.role === 'admin') {
    return <AdminDashboard />;
  }

  return <UserDashboard />;
};

export default Index;
