import { Link, useLocation } from 'react-router-dom';
import { LogOut, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavigationProps {
  currentUser: string;
  totalPoints: number;
  currentStreak: number;
  onLogout: () => void;
}

export function Navigation({ currentUser, totalPoints, currentStreak, onLogout }: NavigationProps) {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => { onLogout(); window.location.href = '/'; };

  return (
    <header className="sticky top-0 z-50 bg-[#0A0C10]/90 backdrop-blur-md border-b border-white/[0.06]">
      <div className="max-w-[1400px] mx-auto px-6 h-14 flex items-center relative">
        {/* Left — Logo */}
        <Link to="/problems" className="flex items-center gap-2.5">
          <span className="font-mono text-base font-bold text-[#4ADE80]">&lt;v/&gt;</span>
          <span className="text-[15px] font-semibold text-white/90 tracking-tight">vibeclub</span>
        </Link>

        {/* Center — Nav (absolute centered) */}
        <nav className="absolute left-1/2 -translate-x-1/2 flex items-center gap-0.5 bg-white/[0.03] rounded-lg p-1 border border-white/[0.04]">
          <Link
            to="/problems"
            className={`px-4 py-1.5 rounded-md text-[13px] font-medium transition-all ${
              isActive('/problems') || isActive('/')
                ? 'bg-white/[0.08] text-white'
                : 'text-white/40 hover:text-white/70'
            }`}
          >
            Problems
          </Link>
          <Link
            to="/tips"
            className={`px-4 py-1.5 rounded-md text-[13px] font-medium transition-all ${
              isActive('/tips')
                ? 'bg-white/[0.08] text-white'
                : 'text-white/40 hover:text-white/70'
            }`}
          >
            Tips
          </Link>
        </nav>

        {/* Right — User */}
        <div className="ml-auto flex items-center gap-3">
          {currentStreak > 0 && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#F97316]/[0.08] border border-[#F97316]/[0.12]">
              <Flame className="w-3.5 h-3.5 text-[#F97316]" />
              <span className="text-[13px] font-mono font-bold text-[#F97316]">{currentStreak}</span>
            </div>
          )}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#4ADE80]/[0.08] border border-[#4ADE80]/[0.12]">
            <span className="text-[13px] font-mono font-bold text-[#4ADE80]">{totalPoints}</span>
            <span className="text-[12px] text-white/25">pts</span>
          </div>
          <span className="text-[13px] text-white/50 hidden sm:inline">{currentUser}</span>
          <Button variant="ghost" size="icon" onClick={handleLogout} className="text-white/30 hover:text-white hover:bg-white/[0.06] h-8 w-8 rounded-md">
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
