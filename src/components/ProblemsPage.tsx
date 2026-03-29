import { useState, useMemo, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '@/components/ui/button';
import {
  CheckCircle2,
  Circle,
  Shuffle,
  Lock,
  ArrowRight,
  Eye,
  Terminal,
  RefreshCw,
  Search,
  X,
  Filter,
  ChevronDown,
} from 'lucide-react';
import { problems as allProblems } from '@/data/problems';
import type { Problem, Difficulty, UserProgress, Category, ProblemType } from '@/types';

interface ProblemsPageProps {
  userProgress: UserProgress;
  onSelectProblem: (problem: Problem) => void;
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const getCategoryLabel = (category: Category) => {
  const labels: Record<Category, string> = {
    'logic': 'Logic', 'scope': 'Scope', 'type': 'Type', 'security': 'Security',
    'performance': 'Perf', 'concurrency': 'Async', 'algorithm': 'Algo',
    'syntax': 'Syntax', 'edge-case': 'Edge', 'pitfall': 'Pitfall',
    'oop': 'OOP', 'advanced': 'Advanced'
  };
  return labels[category] || category;
};

const typeConfig: Record<ProblemType, { label: string; icon: typeof Eye }> = {
  find: { label: 'Find', icon: Eye },
  fix: { label: 'Fix', icon: Terminal },
  recall: { label: 'Recall', icon: RefreshCw },
};

const allCategories: Category[] = [
  'logic', 'scope', 'type', 'security', 'performance', 'concurrency',
  'algorithm', 'syntax', 'edge-case', 'pitfall', 'oop', 'advanced'
];

export function ProblemsPage({ userProgress, onSelectProblem }: ProblemsPageProps) {
  const [shuffledProblems, setShuffledProblems] = useState<Problem[]>([]);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<Difficulty | 'all'>('all');
  const [typeFilter, setTypeFilter] = useState<ProblemType | 'all'>('all');
  const [categoryFilter, setCategoryFilter] = useState<Category | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'solved' | 'unsolved'>('all');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });
  const categoryBtnRef = useRef<HTMLButtonElement>(null);
  const isLoggedIn = userProgress.username !== '';

  const openCategoryDropdown = () => {
    if (categoryBtnRef.current) {
      const rect = categoryBtnRef.current.getBoundingClientRect();
      setDropdownPos({ top: rect.bottom + 6, left: rect.left });
    }
    setShowCategoryDropdown(prev => !prev);
  };

  useEffect(() => { setShuffledProblems(shuffleArray(allProblems)); }, []);

  const filteredProblems = useMemo(() => {
    return shuffledProblems.filter(p => {
      if (searchQuery && !p.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (difficultyFilter !== 'all' && p.difficulty !== difficultyFilter) return false;
      if (typeFilter !== 'all' && p.type !== typeFilter) return false;
      if (categoryFilter !== 'all' && p.category !== categoryFilter) return false;
      if (statusFilter === 'solved' && !userProgress.problems[p.id]?.solved) return false;
      if (statusFilter === 'unsolved' && userProgress.problems[p.id]?.solved) return false;
      return true;
    });
  }, [shuffledProblems, searchQuery, difficultyFilter, typeFilter, categoryFilter, statusFilter, userProgress]);

  const activeFilterCount = [difficultyFilter !== 'all', typeFilter !== 'all', categoryFilter !== 'all', statusFilter !== 'all', searchQuery !== ''].filter(Boolean).length;
  const clearAllFilters = () => { setSearchQuery(''); setDifficultyFilter('all'); setTypeFilter('all'); setCategoryFilter('all'); setStatusFilter('all'); };

  const handleProblemClick = (problem: Problem) => {
    if (isLoggedIn) onSelectProblem(problem);
    else setShowLoginPrompt(true);
  };

  const stats = useMemo(() => {
    const count = (d: Difficulty) => allProblems.filter(p => p.difficulty === d).length;
    const solved = (d: Difficulty) => Object.values(userProgress.problems).filter(
      p => allProblems.find(prob => prob.id === p.problemId)?.difficulty === d && p.solved
    ).length;
    return {
      easy: { solved: solved('easy'), total: count('easy') },
      medium: { solved: solved('medium'), total: count('medium') },
      hard: { solved: solved('hard'), total: count('hard') },
      total: { solved: solved('easy') + solved('medium') + solved('hard'), total: allProblems.length },
    };
  }, [userProgress]);

  const progressPercent = stats.total.total > 0 ? Math.round((stats.total.solved / stats.total.total) * 100) : 0;

  return (
    <div className="min-h-screen pb-16">
      <div className="max-w-5xl mx-auto px-6 pt-10">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-[#12141A] rounded-xl p-5 border border-white/[0.06]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[13px] text-white/50">Progress</span>
              <span className="text-base font-bold text-[#4ADE80] font-mono">{progressPercent}%</span>
            </div>
            <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
              <div className="h-full bg-[#4ADE80] rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }} />
            </div>
            <p className="text-[13px] text-white/30 mt-3 font-mono">{stats.total.solved} / {stats.total.total}</p>
          </div>

          {([
            { key: 'easy' as const, label: 'Easy', color: '#4ADE80' },
            { key: 'medium' as const, label: 'Medium', color: '#FBBF24' },
            { key: 'hard' as const, label: 'Hard', color: '#F87171' },
          ]).map(d => (
            <div
              key={d.key}
              onClick={() => setDifficultyFilter(difficultyFilter === d.key ? 'all' : d.key)}
              className={`rounded-xl p-5 cursor-pointer transition-all border ${
                difficultyFilter === d.key
                  ? 'bg-white/[0.04] border-white/[0.12]'
                  : 'bg-[#12141A] border-white/[0.06] hover:border-white/[0.1]'
              }`}
            >
              <div className="text-[13px] text-white/50 mb-1">{d.label}</div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold font-mono" style={{ color: d.color }}>{stats[d.key].solved}</span>
                <span className="text-sm text-white/25 font-mono">/ {stats[d.key].total}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
            <input
              type="text"
              placeholder="Search problems..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#12141A] border border-white/[0.06] rounded-xl pl-10 pr-4 py-2.5 text-[14px] text-white/90 placeholder-white/30 focus:outline-none focus:border-[#4ADE80]/40 focus:ring-1 focus:ring-[#4ADE80]/20 transition-all"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-1 bg-[#12141A] border border-white/[0.06] rounded-xl p-1">
            {(['find', 'fix', 'recall'] as ProblemType[]).map(type => {
              const cfg = typeConfig[type];
              const Icon = cfg.icon;
              const active = typeFilter === type;
              return (
                <button
                  key={type}
                  onClick={() => setTypeFilter(active ? 'all' : type)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[13px] font-medium transition-all ${
                    active ? 'bg-white/[0.08] text-white' : 'text-white/40 hover:text-white/70'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {cfg.label}
                </button>
              );
            })}
          </div>

          <button
            ref={categoryBtnRef}
            onClick={openCategoryDropdown}
            className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-[13px] font-medium border transition-all ${
              categoryFilter !== 'all'
                ? 'bg-[#4ADE80]/10 border-[#4ADE80]/20 text-[#4ADE80]'
                : 'bg-[#12141A] border-white/[0.06] text-white/40 hover:text-white/70'
            }`}
          >
            <Filter className="w-3.5 h-3.5" />
            {categoryFilter !== 'all' ? getCategoryLabel(categoryFilter) : 'Category'}
            <ChevronDown className="w-3.5 h-3.5" />
          </button>

          {isLoggedIn && (
            <div className="flex items-center gap-1 bg-[#12141A] border border-white/[0.06] rounded-xl p-1">
              <button
                onClick={() => setStatusFilter(statusFilter === 'solved' ? 'all' : 'solved')}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[13px] font-medium transition-all ${
                  statusFilter === 'solved' ? 'bg-white/[0.08] text-[#4ADE80]' : 'text-white/40 hover:text-white/70'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                Solved
              </button>
              <button
                onClick={() => setStatusFilter(statusFilter === 'unsolved' ? 'all' : 'unsolved')}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[13px] font-medium transition-all ${
                  statusFilter === 'unsolved' ? 'bg-white/[0.08] text-white' : 'text-white/40 hover:text-white/70'
                }`}
              >
                <Circle className="w-3.5 h-3.5" />
                Unsolved
              </button>
            </div>
          )}

          {activeFilterCount > 0 && (
            <button onClick={clearAllFilters} className="px-3 py-2.5 rounded-xl text-[13px] text-white/40 hover:text-white/70 hover:bg-white/[0.04] transition-all">
              <X className="w-3.5 h-3.5 inline mr-1" />Clear ({activeFilterCount})
            </button>
          )}

          <Button variant="ghost" size="sm" onClick={() => setShuffledProblems(shuffleArray(allProblems))} className="text-white/30 hover:text-[#4ADE80] h-10 w-10 p-0 rounded-xl">
            <Shuffle className="w-4 h-4" />
          </Button>
        </div>

        {/* Count */}
        <div className="flex items-center justify-between mb-3 px-1">
          <span className="text-[13px] text-white/30">
            {filteredProblems.length === allProblems.length ? `${allProblems.length} problems` : `${filteredProblems.length} of ${allProblems.length}`}
          </span>
        </div>

        {/* Problem list */}
        <div className="space-y-1.5">
          {filteredProblems.length > 0 ? (
            filteredProblems.map((problem, index) => {
              const progress = userProgress.problems[problem.id];
              const isSolved = progress?.solved;
              const tc = typeConfig[problem.type];

              return (
                <div
                  key={problem.id}
                  onClick={() => handleProblemClick(problem)}
                  className={`flex items-center gap-4 px-5 py-4 rounded-xl cursor-pointer transition-all group ${
                    isSolved
                      ? 'bg-[#4ADE80]/[0.03] hover:bg-[#4ADE80]/[0.06] border border-[#4ADE80]/[0.06]'
                      : 'bg-[#12141A] hover:bg-[#171920] border border-white/[0.04] hover:border-white/[0.08]'
                  }`}
                >
                  {/* Status */}
                  <div className="w-6 flex-shrink-0">
                    {isSolved ? (
                      <CheckCircle2 className="w-5 h-5 text-[#4ADE80]" />
                    ) : (
                      <Circle className="w-5 h-5 text-white/10 group-hover:text-white/20 transition-colors" />
                    )}
                  </div>

                  {/* Number */}
                  <span className="text-[13px] font-mono text-white/20 w-8 flex-shrink-0">
                    {String(index + 1).padStart(3, '0')}
                  </span>

                  {/* Title */}
                  <span className={`flex-1 text-[15px] font-medium ${
                    isSolved ? 'text-white/50' : 'text-white/80 group-hover:text-white'
                  } transition-colors`}>
                    {problem.title}
                  </span>

                  {/* Category */}
                  <span className="text-[12px] text-white/30 bg-white/[0.04] px-2.5 py-1 rounded-md flex-shrink-0">
                    {getCategoryLabel(problem.category)}
                  </span>

                  {/* Mode */}
                  <span className="text-[12px] text-white/30 flex items-center gap-1 w-16 flex-shrink-0">
                    <tc.icon className="w-3 h-3" />
                    {tc.label}
                  </span>

                  {/* Difficulty */}
                  <span className={`text-[12px] font-medium px-2.5 py-1 rounded-full border flex-shrink-0 ${
                    problem.difficulty === 'easy' ? 'badge-easy' :
                    problem.difficulty === 'medium' ? 'badge-medium' : 'badge-hard'
                  }`}>
                    {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
                  </span>
                </div>
              );
            })
          ) : (
            <div className="py-20 text-center">
              <p className="text-white/30 mb-3">No problems match your filters</p>
              <button onClick={clearAllFilters} className="text-[#4ADE80] text-sm hover:underline">Clear all filters</button>
            </div>
          )}
        </div>
      </div>

      {/* Login prompt */}
      {showLoginPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="rounded-2xl bg-[#12141A] border border-white/[0.08] p-10 max-w-sm w-full text-center">
            <Lock className="w-10 h-10 text-[#4ADE80] mx-auto mb-5" />
            <h3 className="text-xl font-bold text-white mb-2">Sign in to start</h3>
            <p className="text-white/50 text-[15px] mb-8">Create a free account to solve problems and track your progress.</p>
            <div className="flex gap-3 justify-center">
              <Button onClick={() => window.location.href = '/'} className="bg-[#4ADE80] hover:bg-[#22C55E] text-black font-semibold px-6 h-11 rounded-xl text-sm">
                Sign in <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="ghost" onClick={() => setShowLoginPrompt(false)} className="text-white/50 hover:text-white hover:bg-white/[0.06] h-11 rounded-xl text-sm">
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Category dropdown */}
      {showCategoryDropdown && createPortal(
        <>
          <div className="fixed inset-0" style={{ zIndex: 9998 }} onClick={() => setShowCategoryDropdown(false)} />
          <div
            className="fixed w-48 rounded-xl border border-white/[0.08] py-1.5 bg-[#12141A] shadow-2xl shadow-black/40 max-h-[400px] overflow-y-auto"
            style={{ zIndex: 9999, top: dropdownPos.top, left: dropdownPos.left }}
          >
            <button
              onClick={() => { setCategoryFilter('all'); setShowCategoryDropdown(false); }}
              className={`w-full text-left px-4 py-2.5 text-[13px] hover:bg-white/[0.06] transition-colors ${categoryFilter === 'all' ? 'text-white' : 'text-white/50'}`}
            >
              All Categories
            </button>
            {allCategories.map(cat => (
              <button
                key={cat}
                onClick={() => { setCategoryFilter(cat); setShowCategoryDropdown(false); }}
                className={`w-full text-left px-4 py-2.5 text-[13px] hover:bg-white/[0.06] transition-colors ${categoryFilter === cat ? 'text-white' : 'text-white/50'}`}
              >
                {getCategoryLabel(cat)}
              </button>
            ))}
          </div>
        </>,
        document.body
      )}
    </div>
  );
}
