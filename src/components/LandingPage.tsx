import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Code2, Zap, ChevronRight, Terminal, Eye, Brain, Music } from 'lucide-react';
import { AuthForm } from './AuthForm';

type AuthResult = { success: boolean; error?: string };

interface LandingPageProps {
  onRegister: (username: string, password: string) => AuthResult | Promise<AuthResult>;
  onLogin: (username: string, password: string) => AuthResult | Promise<AuthResult>;
}

export function LandingPage({ onLogin, onRegister }: LandingPageProps) {
  const navigate = useNavigate();
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

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
        initialMode={authMode}
        onSuccess={handleAuthSuccess}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Grid */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(168, 85, 247, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(168, 85, 247, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            transform: 'perspective(500px) rotateX(60deg) translateY(-100px) scale(2)',
            transformOrigin: 'center top',
          }}
        />
        {/* Glow effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-purple-600/15 via-cyan-600/10 to-transparent rounded-full blur-[120px]" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-5">
        <div className="flex items-center gap-3">
          <img 
            src="/logo.png" 
            alt="VibeClub" 
            className="w-10 h-10 object-contain"
          />
          <span className="text-xl font-bold text-white">VibeClub</span>
        </div>
        <div className="flex items-center gap-3">
          <Button
            onClick={handleLoginClick}
            variant="ghost"
            className="text-gray-400 hover:text-white"
          >
            Log In
          </Button>
          <Button
            onClick={handleRegisterClick}
            className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white"
          >
            Register Now
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-6 -mt-4">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 mb-8">
          <Music className="w-4 h-4 text-purple-400" />
          <span className="text-sm text-purple-300">100 Python Debugging Challenges</span>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-7xl font-bold text-center mb-6">
          <span className="text-white">Learn to</span>{' '}
          <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-green-400 bg-clip-text text-transparent">
            Vibe Code
          </span>
          <br />
          <span className="text-white">through</span>{' '}
          <span className="bg-gradient-to-r from-green-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Reading
          </span>
        </h1>

        {/* Description */}
        <p className="text-lg text-gray-400 text-center max-w-2xl mb-10 leading-relaxed">
          Master the art of reading and understanding code. Before you can write great code, 
          you need to read great code. 100 real-world bugs waiting to be discovered and fixed.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <Button
            onClick={handleRegisterClick}
            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white text-lg px-8 py-6 h-auto font-semibold group rounded-xl"
          >
            Start Learning
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            onClick={() => navigate('/problems')}
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10 text-lg px-8 py-6 h-auto rounded-xl"
          >
            Explore Problems
          </Button>
        </div>

        {/* Feature Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-purple-500/30 transition-colors cursor-pointer group">
            <Code2 className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-gray-400">100 Python Problems</span>
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-colors cursor-pointer group">
            <Eye className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-gray-400"><span className="text-cyan-400">Find</span> the Bug</span>
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-green-500/30 transition-colors cursor-pointer group">
            <Terminal className="w-4 h-4 text-green-400" />
            <span className="text-sm text-gray-400"><span className="text-green-400">Fix</span> the Bug</span>
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </div>
        </div>
      </div>

      {/* Why Reading Code Matters */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Why Reading Code Matters</h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Vibe coding starts with vibe reading. Understanding code is the foundation of writing great code.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: Eye,
              title: 'Spot the Patterns',
              description: 'Learn to recognize common coding patterns, anti-patterns, and idiomatic Python. The more code you read, the faster you understand.',
              color: 'purple'
            },
            {
              icon: Brain,
              title: 'Build Mental Models',
              description: 'Reading code trains your brain to build mental models of how programs work. Essential for debugging and refactoring.',
              color: 'cyan'
            },
            {
              icon: Zap,
              title: 'Code with Confidence',
              description: 'When you understand what good code looks like, you write better code. Reading is the fastest way to level up.',
              color: 'green'
            }
          ].map((feature, index) => (
            <div 
              key={index}
              className="glass-card rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all hover:-translate-y-1"
            >
              <div className={`w-12 h-12 rounded-xl bg-${feature.color}-500/20 flex items-center justify-center mb-6`}>
                <feature.icon className={`w-6 h-6 text-${feature.color}-400`} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">How It Works</h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Practice reading and debugging code with hands-on challenges
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="glass-card rounded-2xl p-8 border border-purple-500/20">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-xl bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                <Eye className="w-7 h-7 text-purple-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Find the Bug</h3>
                <p className="text-gray-400 leading-relaxed">
                  Read through real Python code and identify the buggy lines. Train your eye to spot issues before they become production problems.
                </p>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-8 border border-green-500/20">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-xl bg-green-500/20 flex items-center justify-center flex-shrink-0">
                <Terminal className="w-7 h-7 text-green-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Fix the Bug</h3>
                <p className="text-gray-400 leading-relaxed">
                  Write the correct solution using our built-in editor. Learn by doing—fixing bugs is the best way to understand code.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24">
        <div className="glass-card rounded-3xl p-12 text-center border border-white/10">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start?</h2>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto">
            Join thousands of developers mastering the art of reading and debugging code.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              onClick={handleRegisterClick}
              className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white text-lg px-8 py-6 h-auto font-semibold"
            >
              Register Now — It's Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-8">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-gray-500 text-sm">
            VibeClub — Learn to read, understand, and debug code like a pro
          </p>
        </div>
      </footer>
    </div>
  );
}
