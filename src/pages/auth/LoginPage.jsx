import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);
      
      const response = await fetch('https://brainbuzz-backend-1.onrender.com/token', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Login failed');
      }
      
      const data = await response.json();
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('user_role', data.role);
      
      // Redirect based on role
      if (data.role === 'student') {
        navigate('/student/dashboard');
      } else if (data.role === 'teacher') {
        navigate('/teacher/dashboard');
      } else if (data.role === 'admin') {
        navigate('/admin/dashboard');
      }
      
      toast({
        title: 'Login successful',
        description: `Welcome back, ${username}!`,
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Login failed',
        description: 'Invalid username or password',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full flex bg-white rounded-xl shadow-xl overflow-hidden">
        {/* Left side with image */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-800 p-12 flex-col justify-center">
          <h2 className="text-3xl font-bold text-white mb-4">Welcome to BrainBuzz</h2>
          <p className="text-blue-100">
            Unlock your potential with our interactive learning platform. Access courses, get AI support,
            and connect with your peers and instructors.
          </p>
        </div>
        
        {/* Right side with login form */}
        <div className="w-full md:w-1/2 p-8">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Sign in to your account</h1>
            </div>
            
            <Card className="border-0 shadow-none">
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>Enter your credentials to access your account</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
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
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                        Forgot password?
                      </a>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Signing in...' : 'Sign in'}
                  </Button>
                </form>
                
                <div className="mt-6 text-center text-sm text-gray-600">
                  Don't have an account?{' '}
                  <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                    Sign up
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
