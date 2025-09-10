import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck, Shield, User } from "lucide-react";

interface LoginFormProps {
  onLogin: (role: 'admin' | 'user') => void;
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simple role determination - in real app this would be server-side
    const role = username.toLowerCase() === 'admin' ? 'admin' : 'user';
    onLogin(role);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 logistics-gradient">
      <Card className="w-full max-w-md card-shadow hover-shadow">
        <CardHeader className="text-center pb-6">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-primary/10">
              <Truck className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">FleetPro Dashboard</CardTitle>
          <CardDescription>
            Sign in to your logistics management system
          </CardDescription>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="transition-all focus:scale-[1.02]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="transition-all focus:scale-[1.02]"
              />
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4">
            <Button 
              type="submit" 
              className="w-full logistics-gradient hover:opacity-90 transform hover:scale-[1.02]"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
            
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4" />
                <span>Admin: admin</span>
              </div>
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>User: any other</span>
              </div>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}