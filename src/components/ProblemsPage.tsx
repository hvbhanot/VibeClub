import { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  CheckCircle2,
  Search,
  X,
  Lock,
  ArrowRight,
  Trophy,
  TrendingUp,
  Flame,
  ChevronDown,
} from 'lucide-react';
import { problems as allProblems } from '@/data/problems';
import type { Problem, Difficulty, UserProgress, Category } from '@/types';

interface LeaderboardEntry { rank: number; username: string; totalScore: number; solvedCount: number; }

interface ProblemsPageProps {
  userProgress: UserProgress;
  onSelectProblem: (problem: Problem) => void;
  currentUser?: string;
  currentStreak?: number;
  dailyProblem?: Problem | null;
  leaderboard?: LeaderboardEntry[];
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
    'syntax': 'Syntax', 'edge-case': 'Edge Cases', 'pitfall': 'Pitfall',
    'oop': 'OOP', 'advanced': 'Advanced'
  };
  return labels[category] || category;
};

const allCategories: Category[] = [
  'logic', 'scope', 'type', 'security', 'performance', 'concurrency',
  'algorithm', 'syntax', 'edge-case', 'pitfall', 'oop', 'advanced'
];

export function ProblemsPage({ userProgress, onSelectProblem, currentUser, currentStreak = 0, dailyProblem, leaderboard = [] }: ProblemsPageProps) {
  const [shuffledProblems, setShuffledProblems] = useState<Problem[]>([]);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<Difficulty | 'all'>('all');
  const [categoryFilter, setCategoryFilter] = useState<Category | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'solved' | 'unsolved'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const PROBLEMS_PER_PAGE = 15;
  const isLoggedIn = !!currentUser;

  useEffect(() => { setShuffledProblems(shuffleArray(allProblems)); }, []);

  const filteredProblems = useMemo(() => {
    return shuffledProblems.filter(p => {
      if (searchQuery && !p.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (difficultyFilter !== 'all' && p.difficulty !== difficultyFilter) return false;
      if (categoryFilter !== 'all' && p.category !== categoryFilter) return false;
      if (statusFilter === 'solved' && !userProgress.problems[p.id]?.solved) return false;
      if (statusFilter === 'unsolved' && userProgress.problems[p.id]?.solved) return false;
      return true;
    });
  }, [shuffledProblems, searchQuery, difficultyFilter, categoryFilter, statusFilter, userProgress]);

  // Reset page when filters change
  useEffect(() => { setCurrentPage(1); }, [searchQuery, difficultyFilter, categoryFilter, statusFilter]);

  const totalPages = Math.ceil(filteredProblems.length / PROBLEMS_PER_PAGE);
  const paginatedProblems = filteredProblems.slice((currentPage - 1) * PROBLEMS_PER_PAGE, currentPage * PROBLEMS_PER_PAGE);
  const globalIndexOffset = (currentPage - 1) * PROBLEMS_PER_PAGE;

  const handleProblemClick = (problem: Problem) => {
    if (isLoggedIn) onSelectProblem(problem);
    else setShowLoginPrompt(true);
  };

  const stats = useMemo(() => {
    const count = (d: Difficulty) => allProblems.filter(p => p.difficulty === d).length;
    const solved = (d: Difficulty) => Object.values(userProgress.problems).filter(
      p => allProblems.find(prob => prob.id === p.problemId)?.difficulty === d && p.solved
    ).length;
    const totalSolved = solved('easy') + solved('medium') + solved('hard');
    return { easy: { solved: solved('easy'), total: count('easy') }, medium: { solved: solved('medium'), total: count('medium') }, hard: { solved: solved('hard'), total: count('hard') }, total: { solved: totalSolved, total: allProblems.length } };
  }, [userProgress]);

  const topLeaderboard = leaderboard.slice(0, 7);

  return (
    <div className="min-h-screen pb-16">
      <div className="max-w-[1400px] mx-auto px-6 pt-8">
        <div className="flex gap-6">

          {/* ===== LEFT SIDEBAR ===== */}
          {isLoggedIn && (
            <div className="w-[340px] flex-shrink-0 space-y-5">
              {/* Leaderboard */}
              <div className="rounded-xl border border-white/[0.06] bg-[#12141A] p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Trophy className="w-5 h-5 text-[#FBBF24]" />
                  <h2 className="text-[15px] font-semibold text-white/90">Leaderboard</h2>
                </div>

                {/* Header */}
                <div className="grid grid-cols-[30px_1fr_50px_60px] items-center text-[12px] text-white/30 mb-2 px-1">
                  <span>Rank</span><span>User</span><span className="text-right">Solved</span><span className="text-right font-semibold">Points</span>
                </div>

                {/* Rows */}
                <div className="space-y-1">
                  {topLeaderboard.map((entry) => {
                    const isMe = entry.username === currentUser;
                    return (
                      <div key={entry.username} className={`grid grid-cols-[30px_1fr_50px_60px] items-center py-2.5 px-2 rounded-lg ${
                        entry.rank <= 3 ? 'bg-[#FBBF24]/[0.05]' : isMe ? 'bg-[#4ADE80]/[0.05]' : 'hover:bg-white/[0.02]'
                      }`}>
                        <span className={`text-[13px] font-mono ${entry.rank <= 3 ? 'text-[#FBBF24] font-bold' : 'text-white/30'}`}>
                          {entry.rank}
                        </span>
                        <span className={`text-[13px] font-medium truncate ${isMe ? 'text-[#4ADE80]' : 'text-white/70'}`}>
                          {entry.username}
                        </span>
                        <span className="text-[13px] text-white/30 text-right font-mono">{entry.solvedCount}</span>
                        <span className={`text-[13px] text-right font-mono font-bold ${entry.rank <= 3 ? 'text-[#FBBF24]' : 'text-white/70'}`}>
                          {entry.totalScore}
                        </span>
                      </div>
                    );
                  })}
                  {topLeaderboard.length === 0 && <p className="text-white/20 text-sm py-4 text-center">No scores yet</p>}
                </div>

                <div className="mt-3 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[12px] text-white/30">
                  <div className="flex gap-3">
                    <span><span className="inline-block w-2 h-2 rounded-full bg-[#4ADE80] mr-1" />Easy <b className="text-white/50">10</b></span>
                    <span><span className="inline-block w-2 h-2 rounded-full bg-[#FBBF24] mr-1" />Med <b className="text-white/50">20</b></span>
                    <span><span className="inline-block w-2 h-2 rounded-full bg-[#F87171] mr-1" />Hard <b className="text-white/50">30</b></span>
                  </div>
                </div>
              </div>

              {/* Your Progress */}
              <div className="rounded-xl border border-white/[0.06] bg-[#12141A] p-5">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-[#4ADE80]" />
                  <h2 className="text-[15px] font-semibold text-white/90">Your Progress</h2>
                </div>

                <div className="mb-4">
                  <p className="text-[12px] text-white/30 mb-1">Total Solved</p>
                  <p className="text-4xl font-bold font-mono text-[#4ADE80]">{stats.total.solved}</p>
                </div>

                {currentStreak > 0 && (
                  <div className="flex items-center gap-2 mb-4 px-3 py-2 rounded-lg bg-[#F97316]/[0.06] border border-[#F97316]/[0.1]">
                    <Flame className="w-4 h-4 text-[#F97316]" />
                    <span className="text-[13px] font-semibold text-[#F97316]">{currentStreak} day streak</span>
                  </div>
                )}

                <p className="text-[12px] text-white/30 mb-2">Problems</p>
                <div className="grid grid-cols-3 gap-2">
                  {([
                    { label: 'Easy', solved: stats.easy.solved, total: stats.easy.total, color: '#4ADE80' },
                    { label: 'Medium', solved: stats.medium.solved, total: stats.medium.total, color: '#FBBF24' },
                    { label: 'Hard', solved: stats.hard.solved, total: stats.hard.total, color: '#F87171' },
                  ]).map(d => (
                    <div key={d.label} className="bg-white/[0.03] rounded-lg p-3">
                      <p className="text-[11px] text-white/30 mb-1">{d.label}</p>
                      <p className="text-xl font-bold font-mono" style={{ color: d.color }}>{d.solved}</p>
                      <p className="text-[11px] text-white/20 font-mono">/ {d.total}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ===== MAIN CONTENT ===== */}
          <div className="flex-1 min-w-0">
            {/* Daily Challenge */}
            {dailyProblem && isLoggedIn && (
              <div
                onClick={() => handleProblemClick(dailyProblem)}
                className="mb-6 rounded-xl border border-[#FBBF24]/20 bg-[#FBBF24]/[0.04] p-5 cursor-pointer hover:bg-[#FBBF24]/[0.06] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[12px] font-semibold text-[#FBBF24] uppercase tracking-wider mb-1">Problem of the Day</p>
                    <p className="text-[16px] font-semibold text-white/90">{dailyProblem.title}</p>
                    <p className="text-[13px] text-white/40 mt-0.5 flex items-center gap-1">
                      <ArrowRight className="w-3 h-3" /> Give it a try today
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] text-white/40 bg-white/[0.06] px-2.5 py-1 rounded-md">{getCategoryLabel(dailyProblem.category)}</span>
                    <span className={`text-[12px] font-semibold px-3 py-1 rounded-full border ${
                      dailyProblem.difficulty === 'easy' ? 'badge-easy' : dailyProblem.difficulty === 'medium' ? 'badge-medium' : 'badge-hard'
                    }`}>{dailyProblem.difficulty.charAt(0).toUpperCase() + dailyProblem.difficulty.slice(1)}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Category pills */}
            <div className="flex flex-wrap gap-2 mb-5">
              <button
                onClick={() => setCategoryFilter('all')}
                className={`px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-all border ${
                  categoryFilter === 'all'
                    ? 'bg-[#4ADE80] text-black border-[#4ADE80]'
                    : 'text-white/50 border-white/[0.08] hover:border-white/[0.15] hover:text-white/70'
                }`}
              >
                All
              </button>
              {allCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(categoryFilter === cat ? 'all' : cat)}
                  className={`px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-all border ${
                    categoryFilter === cat
                      ? 'bg-[#4ADE80] text-black border-[#4ADE80]'
                      : 'text-white/50 border-white/[0.08] hover:border-white/[0.15] hover:text-white/70'
                  }`}
                >
                  {getCategoryLabel(cat)}
                </button>
              ))}
            </div>

            {/* Search + filters row */}
            <div className="flex items-center gap-3 mb-5">
              <div className="relative flex-1">
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

              {/* Status dropdown */}
              <button
                onClick={() => setStatusFilter(statusFilter === 'all' ? 'solved' : statusFilter === 'solved' ? 'unsolved' : 'all')}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-[13px] font-medium bg-[#12141A] border border-white/[0.06] text-white/50 hover:text-white/70 transition-all"
              >
                Status
                {statusFilter !== 'all' && <span className="text-[#4ADE80]">: {statusFilter}</span>}
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {/* Difficulty dropdown */}
              <button
                onClick={() => setDifficultyFilter(difficultyFilter === 'all' ? 'easy' : difficultyFilter === 'easy' ? 'medium' : difficultyFilter === 'medium' ? 'hard' : 'all')}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-[13px] font-medium bg-[#12141A] border border-white/[0.06] text-white/50 hover:text-white/70 transition-all"
              >
                Difficulty
                {difficultyFilter !== 'all' && <span className={difficultyFilter === 'easy' ? 'text-[#4ADE80]' : difficultyFilter === 'medium' ? 'text-[#FBBF24]' : 'text-[#F87171]'}>: {difficultyFilter}</span>}
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Problem table */}
            <div className="rounded-xl border border-white/[0.06] overflow-hidden bg-[#12141A]">
              {/* Header */}
              <div className="grid grid-cols-[50px_40px_1fr_160px_120px] items-center px-5 py-3 border-b border-white/[0.06] bg-white/[0.02]">
                <span className="text-[13px] font-medium text-white/40">Status</span>
                <span className="text-[13px] font-medium text-white/40"></span>
                <span className="text-[13px] font-medium text-white/40">Problem</span>
                <span className="text-[13px] font-medium text-white/40">Topics</span>
                <span className="text-[13px] font-medium text-white/40 text-right">Difficulty</span>
              </div>

              {/* Rows */}
              {paginatedProblems.length > 0 ? (
                paginatedProblems.map((problem, index) => {
                  const progress = userProgress.problems[problem.id];
                  const isSolved = progress?.solved;

                  return (
                    <div
                      key={problem.id}
                      onClick={() => handleProblemClick(problem)}
                      className="grid grid-cols-[50px_40px_1fr_160px_120px] items-center px-5 py-4 border-b border-white/[0.04] hover:bg-white/[0.03] cursor-pointer transition-colors group"
                    >
                      <div>
                        {isSolved ? (
                          <CheckCircle2 className="w-5 h-5 text-[#4ADE80]" />
                        ) : (
                          <span className="text-white/20 text-sm">—</span>
                        )}
                      </div>
                      <span className="text-[14px] font-mono text-white/25">{globalIndexOffset + index + 1}.</span>
                      <span className={`text-[15px] font-medium pr-4 truncate ${
                        isSolved ? 'text-white/50' : 'text-white/85 group-hover:text-white'
                      } transition-colors`}>
                        {problem.title}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        <span className="text-[12px] text-white/50 bg-white/[0.06] px-2.5 py-1 rounded-md">{getCategoryLabel(problem.category)}</span>
                      </div>
                      <div className="text-right">
                        <span className={`text-[12px] font-semibold px-3 py-1 rounded-full border inline-block ${
                          problem.difficulty === 'easy' ? 'badge-easy' : problem.difficulty === 'medium' ? 'badge-medium' : 'badge-hard'
                        }`}>
                          {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
                        </span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="py-20 text-center">
                  <p className="text-white/30 mb-3">No problems match your filters</p>
                  <button onClick={() => { setSearchQuery(''); setDifficultyFilter('all'); setCategoryFilter('all'); setStatusFilter('all'); }} className="text-[#4ADE80] text-sm hover:underline">Clear all filters</button>
                </div>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-1.5 mt-6">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="w-10 h-10 rounded-lg border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-white hover:border-white/[0.15] disabled:opacity-20 disabled:cursor-not-allowed transition-all"
                >
                  &lt;
                </button>

                {(() => {
                  const pages: (number | '...')[] = [];
                  if (totalPages <= 7) {
                    for (let i = 1; i <= totalPages; i++) pages.push(i);
                  } else {
                    pages.push(1);
                    if (currentPage > 3) pages.push('...');
                    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) pages.push(i);
                    if (currentPage < totalPages - 2) pages.push('...');
                    pages.push(totalPages);
                  }
                  return pages.map((page, i) =>
                    page === '...' ? (
                      <span key={`dots-${i}`} className="w-10 h-10 flex items-center justify-center text-white/20">...</span>
                    ) : (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-10 h-10 rounded-lg border text-[14px] font-medium transition-all ${
                          currentPage === page
                            ? 'bg-[#4ADE80] border-[#4ADE80] text-black font-bold'
                            : 'border-white/[0.08] text-white/50 hover:text-white hover:border-white/[0.15]'
                        }`}
                      >
                        {page}
                      </button>
                    )
                  );
                })()}

                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="w-10 h-10 rounded-lg border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-white hover:border-white/[0.15] disabled:opacity-20 disabled:cursor-not-allowed transition-all"
                >
                  &gt;
                </button>
              </div>
            )}
          </div>
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
    </div>
  );
}
