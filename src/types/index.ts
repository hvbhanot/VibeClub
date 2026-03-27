export type Difficulty = 'easy' | 'medium' | 'hard';
export type ProblemType = 'find' | 'fix';
export type Category = 
  | 'logic' 
  | 'scope' 
  | 'type' 
  | 'security' 
  | 'performance' 
  | 'concurrency'
  | 'algorithm'
  | 'syntax'
  | 'edge-case'
  | 'pitfall'
  | 'oop'
  | 'advanced';

export interface Problem {
  id: number;
  title: string;
  difficulty: Difficulty;
  category: Category;
  type: ProblemType;
  description: string;
  code: string;
  bugLines: number[];
  bugExplanations: Record<number, string>;
  hint: string;
  fixedCode?: string;
  expectedOutput?: string;
  hasBugs: boolean;
}

export interface User {
  username: string;
  password: string;
  createdAt: string;
}

export interface ProblemProgress {
  problemId: number;
  bestScore: number;
  attempts: number;
  lastAttempt: string;
  solved: boolean;
  solutionViewed?: boolean;
}

export interface UserProgress {
  username: string;
  problems: Record<number, ProblemProgress>;
}

export interface SubmissionResult {
  score: number;
  passed: boolean;
  correctFinds: number[];
  missedBugs: number[];
  falsePositives: number[];
  explanations: Record<number, string>;
}

export interface VibeCodingTip {
  id: number;
  title: string;
  description: string;
  code?: string;
  tags: string[];
}
