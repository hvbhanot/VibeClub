import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Zap } from 'lucide-react';

type AuthResult = { success: boolean; error?: string };

interface AuthFormProps {
  onLogin: (username: string, password: string) => AuthResult | Promise<AuthResult>;
  onRegister: (username: string, password: string, email: string) => AuthResult | Promise<AuthResult>;
  initialMode?: 'login' | 'register';
  onSuccess?: () => void;
}

const ALLOWED_DOMAINS = ['islander.tamucc.edu', 'tamucc.edu'];

function isAllowedEmail(email: string): boolean {
  return ALLOWED_DOMAINS.some(d => email.endsWith(`@${d}`));
}

export function AuthForm({ onLogin, onRegister, initialMode = 'login', onSuccess }: AuthFormProps) {
  const [isLogin, setIsLogin] = useState(initialMode === 'login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await onLogin(username, password);
    if (!result.success) {
      setError(result.error || 'An error occurred');
    } else if (onSuccess) {
      onSuccess();
    }
    setIsLoading(false);
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const trimmedEmail = email.trim().toLowerCase();
    if (!isAllowedEmail(trimmedEmail)) {
      setError('Please use your @islander.tamucc.edu or @tamucc.edu email');
      return;
    }

    setIsLoading(true);
    const result = await onRegister(username, password, trimmedEmail);
    if (!result.success) {
      setError(result.error || 'An error occurred');
    } else if (onSuccess) {
      onSuccess();
    }
    setIsLoading(false);
  };

  const switchToRegister = () => {
    setIsLogin(false);
    setError('');
    setEmail('');
    setUsername('');
    setPassword('');
  };

  const switchToLogin = () => {
    setIsLogin(true);
    setError('');
    setUsername('');
    setPassword('');
  };

  // ---- LOGIN FORM ----
  if (isLogin) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 grid-bg">
        <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

        <Card className="w-full max-w-md glass-card relative z-10">
          <CardHeader className="text-center space-y-6">
            <div className="flex justify-center">
              <img
                src="/logo.png"
                alt="VibeClub"
                className="w-24 h-24 object-contain drop-shadow-[0_0_20px_rgba(168,85,247,0.5)]"
              />
            </div>
            <div>
              <CardTitle className="text-4xl font-bold gradient-text mb-2">VibeClub</CardTitle>
              <CardDescription className="text-gray-400 text-lg">Welcome back, Islander</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLoginSubmit} className="space-y-5">
              {error && (
                <Alert className="bg-red-500/10 border-red-500/30 text-red-400">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Username</label>
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="bg-black/30 border-purple-500/30 text-white placeholder:text-gray-600 focus:border-purple-500 focus:ring-purple-500/20"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Password</label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="bg-black/30 border-purple-500/30 text-white placeholder:text-gray-600 focus:border-purple-500 focus:ring-purple-500/20"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 via-purple-500 to-cyan-500 hover:from-purple-500 hover:via-cyan-500 hover:to-cyan-400 text-white font-semibold btn-glow transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? (
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Signing in...</>
                ) : (
                  'Enter the Club'
                )}
              </Button>

              <div className="text-center pt-2">
                <button type="button" onClick={switchToRegister} className="text-sm text-purple-400 hover:text-cyan-400 transition-colors">
                  New here? Join with your Islander email
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ---- REGISTER FORM ----
  return (
    <div className="min-h-screen flex items-center justify-center p-4 grid-bg">
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      <Card className="w-full max-w-md glass-card relative z-10">
        <CardHeader className="text-center space-y-6">
          <div className="flex justify-center">
            <img
              src="/logo.png"
              alt="VibeClub"
              className="w-24 h-24 object-contain drop-shadow-[0_0_20px_rgba(168,85,247,0.5)]"
            />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-white mb-2">Join VibeClub</CardTitle>
            <CardDescription className="text-gray-400">
              Exclusively for TAMUCC students
            </CardDescription>
            <div className="flex items-center justify-center gap-2 mt-3">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-cyan-400">140 Problems &bull; 3 Modes &bull; TAMUCC Only</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegisterSubmit} className="space-y-5">
            {error && (
              <Alert className="bg-red-500/10 border-red-500/30 text-red-400">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Islander Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="yourname@islander.tamucc.edu"
                className="bg-black/30 border-purple-500/30 text-white placeholder:text-gray-600 focus:border-purple-500 focus:ring-purple-500/20"
                required
              />
              <p className="text-xs text-gray-600">@islander.tamucc.edu or @tamucc.edu</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Username</label>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Choose a username"
                className="bg-black/30 border-purple-500/30 text-white placeholder:text-gray-600 focus:border-purple-500 focus:ring-purple-500/20"
                required
                minLength={3}
              />
              <p className="text-xs text-gray-600">At least 3 characters</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Choose a password"
                className="bg-black/30 border-purple-500/30 text-white placeholder:text-gray-600 focus:border-purple-500 focus:ring-purple-500/20"
                required
                minLength={6}
              />
              <p className="text-xs text-gray-600">At least 6 characters</p>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 via-purple-500 to-cyan-500 hover:from-purple-500 hover:via-cyan-500 hover:to-cyan-400 text-white font-semibold btn-glow transition-all duration-300"
              disabled={isLoading}
            >
              {isLoading ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Creating account...</>
              ) : (
                'Join the Club'
              )}
            </Button>

            <div className="text-center pt-2">
              <button type="button" onClick={switchToLogin} className="text-sm text-purple-400 hover:text-cyan-400 transition-colors">
                Already have an account? Sign in
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
