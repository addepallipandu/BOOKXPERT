import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuthContext } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Mail, Lock, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { login, isAuthenticated } = useAuthContext();
  const navigate = useNavigate();
  const { toast } = useToast();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await login(email, password);

    if (result.success) {
      toast({
        title: 'Welcome back!',
        description: 'You have successfully logged in.',
      });
      navigate('/dashboard');
    } else {
      setError(result.error || 'Login failed');
    }

    setIsLoading(false);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Panel - Branding */}
      <div className="hidden w-1/2 bg-primary lg:flex lg:flex-col lg:items-center lg:justify-center lg:p-12">
        <div className="max-w-md text-center">
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-muted shadow-glow">
            <img
              src="/logo.svg"
              alt="BookXpert logo"
              className="h-34 w-34 object-contain"
            />
          </div>
          <h1 className="mb-4 text-4xl font-bold text-primary-foreground">
            BookXpert
          </h1>
          <p className="text-lg text-primary-foreground/80">
            Streamline your workforce management with our modern employee dashboard. Track, manage, and grow your team efficiently.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-3 gap-8 text-primary-foreground/60">
          <div className="text-center">
            <p className="text-3xl font-bold text-accent">500+</p>
            <p className="text-sm">Employees</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-accent">50+</p>
            <p className="text-sm">Departments</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-accent">99%</p>
            <p className="text-sm">Uptime</p>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex w-full items-center justify-center bg-background p-8 lg:w-1/2">
        <div className="w-full max-w-md animate-fade-in">
          {/* Mobile Logo */}
          <div className="mb-8 flex flex-col items-center lg:hidden">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary">
              <img src="/logo.svg" alt="BookXpert logo" className="h-7 w-7 object-contain rounded-md" />
            </div>
            <h1 className="mt-4 text-2xl font-bold text-foreground">BookXpert</h1>
          </div>

          <div className="space-y-2 text-center lg:text-left">
            <h2 className="text-2xl font-bold text-foreground">Welcome back</h2>
            <p className="text-muted-foreground">
              Enter your credentials to access your dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {error && (
              <div className="flex items-center gap-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive animate-scale-in">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@bookxpert.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign in'
              )}
            </Button>
          </form>

          <div className="mt-8 rounded-lg bg-muted p-4">
            <p className="text-xs font-medium text-muted-foreground mb-2">Demo Credentials</p>
            <p className="text-sm text-foreground">
              <strong>Email:</strong> admin@bookxpert.com
            </p>
            <p className="text-sm text-foreground">
              <strong>Password:</strong> admin123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
