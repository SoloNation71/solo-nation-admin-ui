
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage = ({ onLogin }: LoginPageProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simple authentication for demo purposes
    if (username === 'admin' && password === 'password') {
      setTimeout(() => {
        sessionStorage.setItem('soloNationAuth', 'true');
        sessionStorage.setItem('adminUser', username);
        toast({
          title: "Login successful",
          description: "Welcome to the Solo-Nation Admin Dashboard",
          duration: 3000,
        });
        onLogin();
        setLoading(false);
      }, 1000);
    } else {
      setTimeout(() => {
        toast({
          title: "Login failed",
          description: "Invalid username or password",
          variant: "destructive",
          duration: 3000,
        });
        setLoading(false);
      }, 1000);
    }
  };

  const handleWalletConnect = () => {
    toast({
      title: "Wallet Connect",
      description: "This feature would connect to a crypto wallet",
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="bg-gray-800 text-white text-center">
          <CardTitle className="text-2xl font-bold">Solo-Nation Admin</CardTitle>
          <p className="text-gray-300">Sign in to continue to dashboard</p>
        </CardHeader>
        
        <CardContent className="pt-6">
          <form onSubmit={handleLogin}>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="username" className="font-medium">Username</label>
                <Input 
                  id="username" 
                  type="text" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)} 
                  placeholder="Enter your username" 
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="font-medium">Password</label>
                <Input 
                  id="password" 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder="Enter your password" 
                  required
                />
              </div>
              <div className="flex justify-between">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span>Remember me</span>
                </label>
                <a href="#" className="text-blue-600 hover:underline">Forgot password?</a>
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </div>
          </form>
          
          <div className="mt-6 pt-6 border-t text-center">
            <h3 className="text-sm font-medium text-gray-500">Or authenticate with wallet</h3>
            <Button 
              variant="outline" 
              className="w-full mt-3 bg-gray-800 text-white hover:bg-gray-700"
              onClick={handleWalletConnect}
            >
              Connect Wallet
            </Button>
          </div>
        </CardContent>
        
        <CardFooter className="text-center text-sm text-gray-600 border-t bg-gray-50">
          <p className="w-full">Solo-Nation™ Admin Panel v1.0</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
