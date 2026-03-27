import { 
  Music, 
  Eye, 
  Brain, 
  Zap, 
  Code2, 
  Target, 
  Lightbulb,
  Terminal,
  BookOpen,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  MessageSquare,
  Layers,
  Cpu
} from 'lucide-react';

export function TipsPage() {
  const sections = [
    {
      icon: Music,
      title: 'What is Vibe Coding?',
      color: 'purple',
      content: [
        {
          subtitle: 'The Philosophy',
          text: 'Vibe coding is about getting into a flow state where you intuitively understand and create code. It is not about memorizing syntax—it is about developing a deep, intuitive sense of how code works.'
        },
        {
          subtitle: 'The Core Principle',
          text: 'Before you can write great code, you must read great code. Reading builds the mental models that allow you to code with confidence and creativity.'
        },
        {
          subtitle: 'Why It Works',
          text: 'Just like musicians learn by listening to music before composing, developers learn by reading code before writing. This natural progression builds true understanding.'
        }
      ]
    },
    {
      icon: Eye,
      title: 'How to Read Code Effectively',
      color: 'cyan',
      content: [
        {
          subtitle: 'Start with the Big Picture',
          text: 'Before diving into details, understand what the code is supposed to do. Read the function names, class names, and comments to get the overall structure.'
        },
        {
          subtitle: 'Trace the Flow',
          text: 'Follow the execution path. Where does the data come from? How is it transformed? Where does it go? Understanding data flow is key to understanding any codebase.'
        },
        {
          subtitle: 'Look for Patterns',
          text: 'Recognize common patterns: loops, conditionals, error handling, data structures. The more patterns you recognize, the faster you can read code.'
        },
        {
          subtitle: 'Question Everything',
          text: 'Ask yourself: Why was this written this way? What problem does it solve? Is there a better way? Critical thinking while reading accelerates learning.'
        }
      ]
    },
    {
      icon: Brain,
      title: 'Building Mental Models',
      color: 'green',
      content: [
        {
          subtitle: 'What is a Mental Model?',
          text: 'A mental model is your internal representation of how code works. When you read code, you are not just seeing text—you are building a picture in your mind of what is happening.'
        },
        {
          subtitle: 'How to Build Them',
          text: 'Read code actively. Visualize the data structures. Imagine the execution flow. Draw diagrams if needed. The more senses you engage, the stronger your mental model becomes.'
        },
        {
          subtitle: 'Why They Matter',
          text: 'Strong mental models let you predict what code will do before running it. They help you spot bugs, optimize performance, and write cleaner code yourself.'
        }
      ]
    },
    {
      icon: Zap,
      title: 'The Vibe Coding Workflow',
      color: 'yellow',
      content: [
        {
          subtitle: '1. Read First',
          text: 'Always start by reading existing code. Understand the patterns, conventions, and architecture before writing anything new.'
        },
        {
          subtitle: '2. Comprehend Deeply',
          text: 'Do not just skim. Really understand why each line exists. If something is unclear, research it until it clicks.'
        },
        {
          subtitle: '3. Visualize the Solution',
          text: 'Before typing, imagine what your solution will look like. How does it fit with the existing code? What patterns will you use?'
        },
        {
          subtitle: '4. Write with Confidence',
          text: 'Now write your code. Because you have read and understood the codebase, your code will naturally fit in and follow established patterns.'
        },
        {
          subtitle: '5. Review and Refine',
          text: 'Read your own code critically. Does it make sense? Is it clear? Would someone else understand it? Refine until it feels right.'
        }
      ]
    },
    {
      icon: Target,
      title: 'Debugging as a Skill',
      color: 'red',
      content: [
        {
          subtitle: 'Bugs Teach You the Most',
          text: 'Every bug is a lesson. When you find and fix a bug, you learn something about how code can go wrong. This knowledge makes you a better coder.'
        },
        {
          subtitle: 'The Debugging Mindset',
          text: 'Approach bugs with curiosity, not frustration. Ask: What assumption did I make that was wrong? What do I not understand yet?'
        },
        {
          subtitle: 'Systematic Debugging',
          text: 'Do not guess. Isolate the problem. Test your hypotheses. Verify your fix. Good debugging is scientific method applied to code.'
        },
        {
          subtitle: 'Learn from Others\' Bugs',
          text: 'Reading about common bugs and how they were fixed teaches you patterns to watch for in your own code. This is why VibeClub exists!'}
      ]
    },
    {
      icon: Code2,
      title: 'Practical Tips for Daily Coding',
      color: 'purple',
      content: [
        {
          subtitle: 'Read Before You Write',
          text: 'Spend 10 minutes reading code before you start writing. This context will make your code better integrated and more maintainable.'
        },
        {
          subtitle: 'Read Code You Admire',
          text: 'Find well-written open source projects in your language. Read them regularly. You will absorb good patterns and practices naturally.'
        },
        {
          subtitle: 'Review Others\' Code',
          text: 'Code reviews are learning opportunities. When reviewing, ask questions. When being reviewed, listen carefully. Both sides learn.'
        },
        {
          subtitle: 'Explain Code Out Loud',
          text: 'Rubber duck debugging works for learning too. Explain code out loud to yourself or others. If you cannot explain it clearly, you do not understand it fully.'
        },
        {
          subtitle: 'Take Notes',
          text: 'Keep a coding journal. Write down interesting patterns you discover, bugs you fixed, and insights you gained. Review it periodically.'
        }
      ]
    }
  ];

  const getColorClass = (color: string) => {
    const colors: Record<string, string> = {
      purple: 'text-purple-400 bg-purple-500/20 border-purple-500/30',
      cyan: 'text-cyan-400 bg-cyan-500/20 border-cyan-500/30',
      green: 'text-green-400 bg-green-500/20 border-green-500/30',
      yellow: 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30',
      red: 'text-red-400 bg-red-500/20 border-red-500/30',
    };
    return colors[color] || colors.purple;
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-transparent to-transparent" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 mb-6">
            <BookOpen className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-300">Master the Art of Vibe Coding</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-green-400 bg-clip-text text-transparent">
              Vibe Coding Guide
            </span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Learn the philosophy and practice of vibe coding. Read, comprehend, and create code with confidence and flow.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 pb-20">
        <div className="space-y-8">
          {sections.map((section, index) => (
            <div 
              key={index}
              className="glass-card rounded-2xl border border-white/10 overflow-hidden"
            >
              {/* Section Header */}
              <div className={`p-6 border-b border-white/10 ${getColorClass(section.color)}`}>
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-black/30`}>
                    <section.icon className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">{section.title}</h2>
                </div>
              </div>

              {/* Section Content */}
              <div className="p-6 space-y-6">
                {section.content.map((item, itemIndex) => (
                  <div key={itemIndex} className="space-y-2">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-cyan-400" />
                      {item.subtitle}
                    </h3>
                    <p className="text-gray-400 leading-relaxed pl-6">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Tips Grid */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Quick Vibe Coding Tips</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: Eye, text: 'Read 10 minutes before you write' },
              { icon: Brain, text: 'Build mental models of how code works' },
              { icon: Target, text: 'Debug systematically, not randomly' },
              { icon: MessageSquare, text: 'Explain code out loud to yourself' },
              { icon: Layers, text: 'Look for patterns in code you read' },
              { icon: Cpu, text: 'Visualize data flow through the system' },
              { icon: CheckCircle2, text: 'Review your own code critically' },
              { icon: Terminal, text: 'Test your understanding with small experiments' },
              { icon: Lightbulb, text: 'Learn from every bug you encounter' },
            ].map((tip, index) => (
              <div 
                key={index}
                className="glass-card rounded-xl p-4 border border-white/10 hover:border-purple-500/30 transition-all flex items-center gap-3"
              >
                <tip.icon className="w-5 h-5 text-purple-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">{tip.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="glass-card rounded-2xl p-8 border border-purple-500/30">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Practice?</h3>
            <p className="text-gray-400 mb-6">
              Put these principles into action. Start reading and debugging code on VibeClub.
            </p>
            <a 
              href="/problems"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-semibold rounded-xl transition-all"
            >
              Start Debugging
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
