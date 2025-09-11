import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Truck, UserPlus, LogIn, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export function AuthenticatedLoginForm() {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({ email: "", password: "", fullName: "", confirmPassword: "" });
  const [loginLoading, setLoginLoading] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    
    try {
      const { error } = await signIn(loginData.email, loginData.password);
      
      if (error) {
        toast({
          title: "Login Failed",
          description: error.message || "Invalid credentials",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Login Successful",
          description: "Welcome to FleetPro Dashboard!",
        });
      }
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
    
    setLoginLoading(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (signupData.password !== signupData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    if (signupData.password.length < 6) {
      toast({
        title: "Password Too Short",
        description: "Password must be at least 6 characters long",
        variant: "destructive",
      });
      return;
    }

    setSignupLoading(true);
    
    try {
      const { error } = await signUp(signupData.email, signupData.password, signupData.fullName);
      
      if (error) {
        toast({
          title: "Signup Failed",
          description: error.message || "Failed to create account",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Account Created",
          description: "Please check your email to verify your account",
        });
        // Reset form
        setSignupData({ email: "", password: "", fullName: "", confirmPassword: "" });
      }
    } catch (error) {
      toast({
        title: "Signup Failed",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
    
    setSignupLoading(false);
  };

  const handleDemoLogin = async (role: 'admin' | 'user') => {
    setLoginLoading(true);
    
    // Demo credentials
    const demoCredentials = {
      admin: { email: "admin@fleetpro.com", password: "admin123" },
      user: { email: "user@fleetpro.com", password: "user123" }
    };

    try {
      // First try to sign in
      let { error } = await signIn(
        demoCredentials[role].email, 
        demoCredentials[role].password
      );
      
      // If user doesn't exist, create the account first
      if (error && error.message?.includes('Invalid login credentials')) {
        toast({
          title: "Creating Demo Account",
          description: `Creating ${role} demo account...`,
        });

        const { error: signUpError } = await signUp(
          demoCredentials[role].email,
          demoCredentials[role].password,
          `Demo ${role.charAt(0).toUpperCase() + role.slice(1)}`
        );

        if (signUpError) {
          toast({
            title: "Demo Account Creation Failed",
            description: signUpError.message || "Failed to create demo account",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Demo Account Created",
            description: `Demo ${role} account created. You can now login with: ${demoCredentials[role].email}`,
          });
        }
      } else if (error) {
        toast({
          title: "Demo Login Failed",
          description: error.message || "Please try again",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Demo Login Successful",
          description: `Welcome to FleetPro as ${role}!`,
        });
      }
    } catch (error) {
      toast({
        title: "Demo Login Failed",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
    
    setLoginLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 login-gradient">
      <Card className="w-full max-w-md glass-effect card-shadow hover-shadow">
        <CardHeader className="text-center pb-6">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg">
              <Truck className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            FleetPro Dashboard
          </CardTitle>
          <CardDescription className="text-slate-600">
            Logistics management system with real-time analytics
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="login" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="Enter your email"
                    value={loginData.email}
                    onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                    required
                    className="transition-all focus:scale-[1.02]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="Enter your password"
                    value={loginData.password}
                    onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                    required
                    className="transition-all focus:scale-[1.02]"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transform hover:scale-[1.02] transition-all duration-200"
                  disabled={loginLoading}
                >
                  {loginLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      <LogIn className="mr-2 h-4 w-4" />
                      Sign In
                    </>
                  )}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">Full Name</Label>
                  <Input
                    id="signup-name"
                    type="text"
                    placeholder="Enter your full name"
                    value={signupData.fullName}
                    onChange={(e) => setSignupData(prev => ({ ...prev, fullName: e.target.value }))}
                    required
                    className="transition-all focus:scale-[1.02]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="Enter your email"
                    value={signupData.email}
                    onChange={(e) => setSignupData(prev => ({ ...prev, email: e.target.value }))}
                    required
                    className="transition-all focus:scale-[1.02]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="Enter your password (min 6 chars)"
                    value={signupData.password}
                    onChange={(e) => setSignupData(prev => ({ ...prev, password: e.target.value }))}
                    required
                    minLength={6}
                    className="transition-all focus:scale-[1.02]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-confirm">Confirm Password</Label>
                  <Input
                    id="signup-confirm"
                    type="password"
                    placeholder="Confirm your password"
                    value={signupData.confirmPassword}
                    onChange={(e) => setSignupData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    required
                    className="transition-all focus:scale-[1.02]"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transform hover:scale-[1.02] transition-all duration-200"
                  disabled={signupLoading}
                >
                  {signupLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    <>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Create Account
                    </>
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm text-slate-600">
            Demo Accounts (for testing)
          </div>
          <div className="flex space-x-2 w-full">
            <Button 
              variant="outline" 
              onClick={() => handleDemoLogin('admin')}
              disabled={loginLoading}
              className="flex-1 border-blue-200 text-blue-600 hover:bg-blue-50"
            >
              Demo Admin
            </Button>
            <Button 
              variant="outline" 
              onClick={() => handleDemoLogin('user')}
              disabled={loginLoading}
              className="flex-1 border-green-200 text-green-600 hover:bg-green-50"
            >
              Demo User
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
