import { Link, useLocation } from 'react-router-dom';
import { Code2, Lightbulb, Zap, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavigationProps {
  currentUser: string;
  totalPoints: number;
  onLogout: () => void;
}

export function Navigation({ currentUser, totalPoints, onLogout }: NavigationProps) {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/problems', label: 'Problems', icon: Code2 },
    { path: '/tips', label: 'Vibe Tips', icon: Lightbulb },
  ];

  return (
    <header className="sticky top-0 z-50 glass-card border-b border-purple-500/20">
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/problems" className="flex items-center gap-3 group">
            <img 
              src="/logo.png" 
              alt="VibeClub" 
              className="w-10 h-10 object-contain"
            />
            <span className="text-xl font-bold gradient-text">VibeClub</span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive(item.path)
                    ? 'bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-white border border-purple-500/30'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon className={`w-4 h-4 ${isActive(item.path) ? 'text-cyan-400' : ''}`} />
                {item.label}
              </Link>
            ))}
          </nav>

          {/* User Stats & Logout */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-sm">
                <span className="text-cyan-400 font-semibold">{totalPoints}</span>
                <span className="text-gray-500"> pts</span>
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-400">{currentUser}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={onLogout}
                className="text-gray-400 hover:text-white hover:bg-white/10"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
