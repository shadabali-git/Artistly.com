'use client';

import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Route } from 'lucide-react';

export default function AuthPage() {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const route = useRouter();

  const toggleMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
    setUsername('');
    setPassword('');
  };

  async function handleAuth(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const endpoint = mode === 'login' ? '/api/auth/login' : '/api/auth/signup';

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || 'Something went wrong');
        localStorage.removeItem('isLoggedIn');

      } else {
        toast.success(data.message);
        route.push('/'); // Redirect to home page after successful login/signup
        localStorage.setItem('isLoggedIn', 'true');
        //  as no custom backend auth system is implemented, we are just simulating login
        // In a real application, you would set the user data in localStorage or context
        // localStorage.setItem('user', JSON.stringify(data.user));
        window.dispatchEvent(new Event('auth-change'));
      }

    } catch (err) {
      console.error('Authentication error:', err);
      toast.error('Network error');
      localStorage.removeItem('isLoggedIn');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-muted px-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            {mode === 'login' ? 'Login' : 'Sign Up'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAuth} className="space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                required
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (mode === 'login' ? 'Logging in...' : 'Signing up...') : (mode === 'login' ? 'Login' : 'Sign Up')}
            </Button>

            <div className="text-sm text-center mt-2">
              {mode === 'login' ? (
                <>
                  Don't have an account?{" "}
                  <button type="button" onClick={toggleMode} className="text-blue-600 underline">
                    Sign Up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button type="button" onClick={toggleMode} className="text-blue-600 underline">
                    Login
                  </button>
                </>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
