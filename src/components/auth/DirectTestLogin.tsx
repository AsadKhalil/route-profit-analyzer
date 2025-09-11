import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Truck, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export function DirectTestLogin() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const testConnection = async () => {
    setLoading(true);
    
    try {
      // Test 1: Basic connection
      console.log('Testing Supabase connection...');
      const { data: testData, error: testError } = await supabase
        .from('customers')
        .select('count')
        .limit(1);
      
      if (testError) {
        console.error('Connection test failed:', testError);
        toast({
          title: "Connection Failed",
          description: testError.message,
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      console.log('Connection test passed:', testData);
      
      // Test 2: Try to create a user with a very simple email
      const testEmail = "testuser123@example.com";
      const testPassword = "password123456";
      
      console.log('Attempting to create user:', testEmail);
      
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: testEmail,
        password: testPassword,
        options: {
          data: {
            full_name: "Test User"
          }
        }
      });

      console.log('Sign up result:', { signUpData, signUpError });

      if (signUpError) {
        if (signUpError.message.includes('User already registered')) {
          // User exists, try to sign in
          console.log('User exists, attempting sign in...');
          
          const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
            email: testEmail,
            password: testPassword
          });

          console.log('Sign in result:', { signInData, signInError });

          if (signInError) {
            toast({
              title: "Sign In Failed",
              description: signInError.message,
              variant: "destructive",
            });
          } else {
            toast({
              title: "Success!",
              description: "Successfully signed in with existing user",
            });
          }
        } else {
          toast({
            title: "Sign Up Failed",
            description: signUpError.message,
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Success!",
          description: "User created successfully. Check if email confirmation is required.",
        });
      }

    } catch (error) {
      console.error('Test failed with exception:', error);
      toast({
        title: "Test Failed",
        description: "Check console for details",
        variant: "destructive",
      });
    }
    
    setLoading(false);
  };

  const checkAuthSettings = async () => {
    setLoading(true);
    
    try {
      // Get current session
      const { data: session, error } = await supabase.auth.getSession();
      console.log('Current session:', { session, error });
      
      if (session?.session) {
        toast({
          title: "Already Logged In",
          description: `User: ${session.session.user.email}`,
        });
      } else {
        toast({
          title: "No Active Session",
          description: "No user is currently logged in",
        });
      }
    } catch (error) {
      console.error('Session check failed:', error);
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
            Supabase Connection Test
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <Button 
            onClick={testConnection}
            disabled={loading}
            className="w-full"
            style={{
              background: 'linear-gradient(to right, #3b82f6, #06b6d4)',
              color: 'white'
            }}
          >
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Test Connection & Create User
          </Button>
          
          <Button 
            onClick={checkAuthSettings}
            disabled={loading}
            className="w-full"
            style={{
              background: 'linear-gradient(to right, #10b981, #059669)',
              color: 'white'
            }}
          >
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Check Current Session
          </Button>

          <div className="text-xs text-gray-600 p-3 bg-gray-50 rounded">
            <p><strong>Instructions:</strong></p>
            <p>1. Click "Test Connection" to verify Supabase works</p>
            <p>2. Check browser console for detailed logs</p>
            <p>3. Look for any error messages in the toast notifications</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
