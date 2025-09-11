import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Truck, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export function SimpleTestLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();

  const handleQuickDemo = async (role: 'admin' | 'user') => {
    setLoading(true);
    
    const demoCredentials = {
      admin: { email: "admin@fleetpro.demo", password: "password123" },
      user: { email: "user@fleetpro.demo", password: "password123" }
    };

    const creds = demoCredentials[role];
    
    try {
      // Try to create account first
      await signUp(creds.email, creds.password, `Test ${role}`);
      
      // Then sign in
      const { error } = await signIn(creds.email, creds.password);
      
      if (error && !error.message.includes('User already registered')) {
        toast({
          title: "Demo Login Failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Demo Login Success",
          description: `Logged in as ${role}`,
        });
      }
    } catch (error) {
      console.error('Demo login error:', error);
    }
    
    setLoading(false);
  };

  const handleManualLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    
    setLoading(true);
    
    try {
      const { error } = await signIn(email, password);
      if (error) {
        toast({
          title: "Login Failed",
          description: error.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Login error:', error);
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" 
         style={{
           background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 50%, #0891b2 100%)'
         }}>
      <Card className="w-full max-w-md" style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
      }}>
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full" style={{
              background: 'linear-gradient(to right, #3b82f6, #06b6d4)'
            }}>
              <Truck className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold" style={{
            background: 'linear-gradient(to right, #2563eb, #0891b2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            FleetPro Dashboard
          </CardTitle>
          <CardDescription>
            Test the Supabase connection
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <Button 
              onClick={() => handleQuickDemo('admin')}
              disabled={loading}
              className="w-full"
              style={{
                background: 'linear-gradient(to right, #3b82f6, #06b6d4)',
                color: 'white'
              }}
            >
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Quick Demo Admin
            </Button>
            
            <Button 
              onClick={() => handleQuickDemo('user')}
              disabled={loading}
              className="w-full"
              style={{
                background: 'linear-gradient(to right, #10b981, #059669)',
                color: 'white'
              }}
            >
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Quick Demo User
            </Button>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or manual login</span>
            </div>
          </div>
          
          <form onSubmit={handleManualLogin} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                style={{
                  backgroundColor: 'white',
                  border: '2px solid #e5e7eb',
                  color: '#374151'
                }}
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                style={{
                  backgroundColor: 'white',
                  border: '2px solid #e5e7eb',
                  color: '#374151'
                }}
              />
            </div>
            <Button 
              type="submit" 
              className="w-full"
              disabled={loading}
              style={{
                background: 'linear-gradient(to right, #7c3aed, #a855f7)',
                color: 'white'
              }}
            >
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Sign In
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
