/**
 * Types and interfaces for IQS Fun Board Games (IQS Pro)
 */

export type ClassGroupId = 'preschool' | 'primary' | 'middle' | 'secondary' | 'senior_secondary';

export interface ClassGroup {
  id: ClassGroupId;
  name: string;
  ageRange: string;
  classes: string[];
  colorTheme: string; // 'pink' | 'blue' | 'green' | 'orange' | 'purple'
  studentCount: number;
  illustration: string;
}

export type SubjectId = 'math' | 'english' | 'science' | 'computer' | 'gk' | 'reasoning' | 'coding' | 'art';

export interface Subject {
  id: SubjectId;
  name: string;
  iconName: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  gamesAvailable: number;
  progress: number; // 0 to 100
  color: string;
}

export interface Game {
  id: string;
  name: string;
  type: 'board' | 'word' | 'memory' | 'puzzle';
  description: string;
  subjectId: SubjectId;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  estimatedTime: string;
  xpReward: number;
  coinsReward: number;
  image: string;
  isFavorite?: boolean;
}

export interface QuizQuestion {
  id: string;
  subjectId: SubjectId;
  gradeGroup: ClassGroupId;
  question: string;
  options: string[];
  correctAnswer: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  hint: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  iconName: string;
  category: 'academic' | 'social' | 'special';
  dateUnlocked?: string;
  isUnlocked: boolean;
  reqText: string;
}

export interface Certificate {
  id: string;
  title: string;
  subject: string;
  grade: string;
  dateEarned: string;
  verificationCode: string;
  score: number;
}

export interface UserProgress {
  displayName: string;
  avatar: string; // Avatar code
  classGroupId: ClassGroupId | null;
  selectedClass: string | null;
  level: number;
  xp: number;
  xpToNextLevel: number;
  coins: number;
  diamonds: number;
  stars: number;
  streak: number;
  totalStudyTime: number; // in minutes
  totalGamesPlayed: number;
  accuracy: number; // percentage
  unlockedBadges: string[]; // Badge IDs
  recentGames: string[]; // Game IDs
  favorites: string[]; // Game IDs
  email?: string | null;
  gender?: string | null;
  state?: string | null;
  district?: string | null;
  city?: string | null;
  isLoggedIn?: boolean;
  authMethod?: 'email' | 'google' | 'guest' | null;
  language?: 'en' | 'hi';
}

export type LeaderboardScope = 'school' | 'district' | 'state' | 'country' | 'friends';
export type LeaderboardPeriod = 'weekly' | 'monthly';

export interface LeaderboardEntry {
  id: string;
  name: string;
  avatar: string;
  rank: number;
  score: number;
  level: number;
  school: string;
  state: string;
  isCurrentUser?: boolean;
}

export interface GameState {
  currentPosition: number; // 0 to 20
  diceRolled: boolean;
  isMoving: boolean;
  currentDiceValue: number;
  questionsAnswered: number;
  correctAnswers: number;
  earnedCoins: number;
  earnedXP: number;
  gameOver: boolean;
  activeQuestion: QuizQuestion | null;
  selectedAnswer: string | null;
  isAnswerSubmitted: boolean;
  isAnswerCorrect: boolean | null;
  hintUsed: boolean;
  timerSeconds: number;
  isPaused: boolean;
}
