import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ChevronRight, Terminal, Eye, BookOpen, RefreshCw, Shield, Gauge, Bug, Layers, Code2, Sparkles } from 'lucide-react';
import { AuthForm } from './AuthForm';

type AuthResult = { success: boolean; error?: string };

interface LandingPageProps {
  onRegister: (username: string, password: string, email: string) => AuthResult | Promise<AuthResult>;
  onLogin: (username: string, password: string) => AuthResult | Promise<AuthResult>;
  onSendVerification: (email: string) => Promise<AuthResult>;
  onVerifyCode: (email: string, code: string) => Promise<AuthResult>;
}

const codeLines = [
  { num: 1, text: 'def calculate_total(items):', color: 'text-blue-400' },
  { num: 2, text: '    total = 0', color: 'text-white/80' },
  { num: 3, text: '    for item in items:', color: 'text-white/80' },
  { num: 4, text: '        total += item["price"]', color: 'text-white/80', bug: true },
  { num: 5, text: '        if item["discount"]:', color: 'text-white/80' },
  { num: 6, text: '            total =- item["discount"]', color: 'text-red-400', bug: true },
  { num: 7, text: '    return total', color: 'text-white/80' },
];

export function LandingPage({ onLogin, onRegister, onSendVerification, onVerifyCode }: LandingPageProps) {
  const navigate = useNavigate();
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [visibleLines, setVisibleLines] = useState(0);
  const [showBugHighlight, setShowBugHighlight] = useState(false);

  useEffect(() => {
    const lineTimer = setInterval(() => {
      setVisibleLines(prev => {
        if (prev >= codeLines.length) {
          clearInterval(lineTimer);
          setTimeout(() => setShowBugHighlight(true), 600);
          return prev;
        }
        return prev + 1;
      });
    }, 200);
    return () => clearInterval(lineTimer);
  }, []);

  const handleRegisterClick = () => {
    setAuthMode('register');
    setShowAuth(true);
  };

  const handleLoginClick = () => {
    setAuthMode('login');
    setShowAuth(true);
  };

  const handleAuthSuccess = () => {
    setShowAuth(false);
    window.location.reload();
  };

  if (showAuth) {
    return (
      <AuthForm
        onLogin={onLogin}
        onRegister={onRegister}
        onSendVerification={onSendVerification}
        onVerifyCode={onVerifyCode}
        initialMode={authMode}
        onSuccess={handleAuthSuccess}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `
              linear-gradient(rgba(168, 85, 247, 0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(168, 85, 247, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            transform: 'perspective(500px) rotateX(60deg) translateY(-100px) scale(2)',
            transformOrigin: 'center top',
          }}
        />
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px]" />
        <div className="absolute top-20 right-1/4 w-[400px] h-[400px] bg-cyan-600/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-green-600/5 rounded-full blur-[100px]" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-6 md:px-12 py-5 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="VibeClub" className="w-9 h-9 object-contain" />
          <span className="text-xl font-bold text-white tracking-tight">VibeClub</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => navigate('/problems')}
            variant="ghost"
            className="text-gray-400 hover:text-white hidden sm:inline-flex"
          >
            Problems
          </Button>
          <Button
            onClick={() => navigate('/tips')}
            variant="ghost"
            className="text-gray-400 hover:text-white hidden sm:inline-flex"
          >
            Vibe Tips
          </Button>
          <div className="w-px h-6 bg-white/10 mx-1 hidden sm:block" />
          <Button
            onClick={handleLoginClick}
            variant="ghost"
            className="text-gray-400 hover:text-white"
          >
            Log In
          </Button>
          <Button
            onClick={handleRegisterClick}
            className="bg-white text-black hover:bg-gray-200 font-medium px-5"
          >
            Get Started
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-16 md:pt-24 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/25 mb-8">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span className="text-xs font-medium text-purple-300 tracking-wide uppercase">140 Challenges &middot; 3 Modes &middot; 12 Categories</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-[1.1] tracking-tight">
              <span className="text-white">Learn to </span>
              <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-green-400 bg-clip-text text-transparent">vibe code</span>
              <br />
              <span className="text-white">by reading </span>
              <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">real bugs</span>
            </h1>

            <p className="text-lg text-gray-400 mb-8 leading-relaxed max-w-lg">
              Find bugs, fix them, and write solutions from scratch. The fastest way to build the intuition you need to ship real code.
            </p>

            <div className="flex flex-wrap items-center gap-3 mb-10">
              <Button
                onClick={handleRegisterClick}
                className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white text-base px-7 py-5 h-auto font-semibold group rounded-xl shadow-lg shadow-purple-500/20"
              >
                Start for Free
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                onClick={() => navigate('/problems')}
                variant="ghost"
                className="text-gray-400 hover:text-white text-base px-6 py-5 h-auto"
              >
                Browse Problems
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>

            {/* Stats row */}
            <div className="flex items-center gap-8 text-sm">
              <div>
                <div className="text-2xl font-bold text-white">140</div>
                <div className="text-gray-500">Problems</div>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div>
                <div className="text-2xl font-bold text-white">3</div>
                <div className="text-gray-500">Modes</div>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div>
                <div className="text-2xl font-bold text-white">12</div>
                <div className="text-gray-500">Categories</div>
              </div>
            </div>
          </div>

          {/* Right: Code Preview */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/10 via-cyan-500/10 to-green-500/10 rounded-3xl blur-2xl" />
            <div className="relative rounded-2xl border border-white/10 overflow-hidden bg-[#1a1a2e]/80 backdrop-blur-sm shadow-2xl shadow-purple-500/5">
              {/* Window chrome */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/[0.02]">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
                <span className="ml-3 text-xs text-gray-500 font-mono">bug_challenge.py</span>
              </div>
              {/* Code content */}
              <div className="p-5 font-mono text-sm leading-7">
                {codeLines.map((line, i) => (
                  <div
                    key={line.num}
                    className={`flex transition-all duration-300 rounded-md px-2 -mx-2 ${
                      i < visibleLines ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                    } ${showBugHighlight && line.bug ? 'bg-red-500/10' : ''}`}
                  >
                    <span className="w-8 text-gray-600 select-none flex-shrink-0">{line.num}</span>
                    <span className={`${showBugHighlight && line.bug ? 'text-red-400' : line.color}`}>
                      {line.text}
                    </span>
                    {showBugHighlight && line.bug && line.num === 6 && (
                      <span className="ml-3 text-xs text-red-400/80 self-center animate-pulse">
                        &larr; =- should be -=
                      </span>
                    )}
                  </div>
                ))}
              </div>
              {/* Bottom bar */}
              {showBugHighlight && (
                <div className="px-5 py-3 border-t border-white/5 bg-red-500/5 flex items-center gap-2 animate-in fade-in duration-500">
                  <Bug className="w-4 h-4 text-red-400" />
                  <span className="text-xs text-red-300">Bug found on line 6 — assignment operator error</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mode Cards — Three Ways to Learn */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-24">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">Three Ways to Learn</h2>
          <p className="text-gray-400 max-w-lg mx-auto">
            Each problem can be tackled in different modes to build different skills
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {[
            {
              icon: Eye,
              step: '01',
              title: 'Find the Bug',
              desc: 'Read real Python code and spot the buggy lines. Train your eye to catch issues before they hit production.',
              border: 'border-purple-500/20 hover:border-purple-500/40',
              iconBg: 'bg-purple-500/15',
              iconColor: 'text-purple-400',
              stepColor: 'text-purple-500/40',
              glow: 'hover:shadow-purple-500/5',
            },
            {
              icon: Terminal,
              step: '02',
              title: 'Fix the Bug',
              desc: 'Edit the code directly in our built-in editor and submit your fix. Learn by doing — the best way to understand code.',
              border: 'border-green-500/20 hover:border-green-500/40',
              iconBg: 'bg-green-500/15',
              iconColor: 'text-green-400',
              stepColor: 'text-green-500/40',
              glow: 'hover:shadow-green-500/5',
            },
            {
              icon: RefreshCw,
              step: '03',
              title: 'Recall from Scratch',
              desc: 'Start with a blank page and write the full solution. Your code is validated against real test cases.',
              border: 'border-amber-500/20 hover:border-amber-500/40',
              iconBg: 'bg-amber-500/15',
              iconColor: 'text-amber-400',
              stepColor: 'text-amber-500/40',
              glow: 'hover:shadow-amber-500/5',
            },
          ].map((mode) => (
            <div
              key={mode.step}
              onClick={() => navigate('/problems')}
              className={`group relative glass-card rounded-2xl p-7 border ${mode.border} transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${mode.glow} cursor-pointer`}
            >
              <div className={`absolute top-6 right-6 text-4xl font-black ${mode.stepColor} select-none`}>
                {mode.step}
              </div>
              <div className={`w-12 h-12 rounded-xl ${mode.iconBg} flex items-center justify-center mb-5`}>
                <mode.icon className={`w-6 h-6 ${mode.iconColor}`} />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{mode.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{mode.desc}</p>
              <div className="mt-5 flex items-center gap-1 text-xs font-medium text-gray-500 group-hover:text-white/60 transition-colors">
                Try it out <ChevronRight className="w-3 h-3" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories Strip */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight">12 Problem Categories</h2>
          <p className="text-gray-400 text-sm max-w-md mx-auto">
            From logic bugs to security vulnerabilities, concurrency issues to algorithm errors
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          {[
            { name: 'Logic', icon: Code2, color: 'purple' },
            { name: 'Security', icon: Shield, color: 'red' },
            { name: 'Performance', icon: Gauge, color: 'yellow' },
            { name: 'Algorithm', icon: Layers, color: 'green' },
            { name: 'Syntax', icon: Terminal, color: 'blue' },
            { name: 'Edge Cases', icon: Bug, color: 'indigo' },
            { name: 'Scope', icon: Eye, color: 'pink' },
            { name: 'Types', icon: Code2, color: 'cyan' },
            { name: 'Async', icon: RefreshCw, color: 'orange' },
            { name: 'Pitfalls', icon: Bug, color: 'amber' },
            { name: 'OOP', icon: Layers, color: 'teal' },
            { name: 'Advanced', icon: Sparkles, color: 'rose' },
          ].map((cat) => (
            <div
              key={cat.name}
              className={`flex items-center gap-2 px-4 py-2 rounded-full bg-${cat.color}-500/5 border border-${cat.color}-500/15 hover:border-${cat.color}-500/30 transition-colors cursor-default`}
            >
              <cat.icon className={`w-3.5 h-3.5 text-${cat.color}-400`} />
              <span className={`text-xs font-medium text-${cat.color}-300/80`}>{cat.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Vibe Tips Banner */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div
          onClick={() => navigate('/tips')}
          className="group glass-card rounded-2xl p-8 md:p-10 border border-cyan-500/15 hover:border-cyan-500/30 transition-all cursor-pointer flex flex-col md:flex-row items-center gap-6 md:gap-8"
        >
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center flex-shrink-0">
            <BookOpen className="w-7 h-7 text-cyan-400" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-xl font-bold text-white mb-1.5">The Vibe Coding Guide</h3>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xl">
              10 chapters covering how to read code, build mental models, prompt AI effectively,
              debug systematically, and think about security. Free for everyone.
            </p>
          </div>
          <div className="flex items-center gap-2 text-cyan-400 text-sm font-medium group-hover:gap-3 transition-all flex-shrink-0">
            Read the Guide <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-24">
        <div className="relative rounded-3xl overflow-hidden">
          {/* CTA Background glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-cyan-600/10 to-green-600/10" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-purple-500/15 blur-[100px] rounded-full" />

          <div className="relative glass-card rounded-3xl p-12 md:p-16 text-center border border-white/10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">Start building your intuition</h2>
            <p className="text-gray-400 mb-10 max-w-md mx-auto">
              140 problems. 3 modes. No setup required. Free to use.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button
                onClick={handleRegisterClick}
                className="bg-white text-black hover:bg-gray-100 text-base px-8 py-5 h-auto font-semibold rounded-xl"
              >
                Get Started — Free
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                onClick={() => navigate('/problems')}
                variant="outline"
                className="border-white/20 text-white hover:bg-white/5 text-base px-8 py-5 h-auto rounded-xl"
              >
                Explore First
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="VibeClub" className="w-5 h-5 object-contain opacity-50" />
            <span className="text-gray-600 text-sm">VibeClub</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <span onClick={() => navigate('/problems')} className="hover:text-gray-400 cursor-pointer transition-colors">Problems</span>
            <span onClick={() => navigate('/tips')} className="hover:text-gray-400 cursor-pointer transition-colors">Vibe Tips</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
