import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { 
  UserProgress, 
  Subject, 
  Game, 
  Badge, 
  QuizQuestion, 
  ClassGroupId 
} from './types';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ClassSelector from './components/ClassSelector';
import Dashboard from './components/Dashboard';
import GameBoardPlay from './components/GameBoardPlay';
import WordPlay from './components/WordPlay';
import RewardSection from './components/RewardSection';
import Leaderboard from './components/Leaderboard';
import StudentProfile from './components/StudentProfile';
import AdminPanel from './components/AdminPanel';
import AuthScreen from './components/AuthScreen';
import { QUESTION_BANK } from './data/questions';

// Base list of subjects as specified in the prompt (STEP 3)
const INITIAL_SUBJECTS: Subject[] = [
  { id: 'math', name: 'Mathematics', iconName: '📐', difficulty: 'Beginner', gamesAvailable: 3, progress: 35, color: 'from-blue-500 to-indigo-500' },
  { id: 'english', name: 'English Grammar', iconName: '📚', difficulty: 'Beginner', gamesAvailable: 2, progress: 20, color: 'from-pink-500 to-rose-500' },
  { id: 'science', name: 'General Science', iconName: '🧪', difficulty: 'Intermediate', gamesAvailable: 2, progress: 50, color: 'from-emerald-500 to-teal-500' },
  { id: 'computer', name: 'Computer Sci', iconName: '💻', difficulty: 'Intermediate', gamesAvailable: 1, progress: 0, color: 'from-cyan-500 to-blue-500' },
  { id: 'coding', name: 'Coding Logic', iconName: '👾', difficulty: 'Advanced', gamesAvailable: 2, progress: 10, color: 'from-purple-500 to-pink-500' },
  { id: 'gk', name: 'GK Trivia', iconName: '🌍', difficulty: 'Beginner', gamesAvailable: 2, progress: 40, color: 'from-amber-500 to-orange-500' },
  { id: 'reasoning', name: 'Logical Reasoning', iconName: '🧠', difficulty: 'Intermediate', gamesAvailable: 2, progress: 15, color: 'from-violet-500 to-fuchsia-500' }
];

// Base list of games as specified in the prompt (STEP 4)
const INITIAL_GAMES: Game[] = [
  { id: 'math_race_1', name: 'Math Race', type: 'board', description: 'Roll the virtual dice and answer curriculum math questions to outpace rival tokens on the track.', subjectId: 'math', difficulty: 'Easy', estimatedTime: '5 Mins', xpReward: 150, coinsReward: 100, image: '🏎️', isFavorite: false },
  { id: 'word_builder_1', name: 'Word Builder Quest', type: 'word', description: 'Unscramble mixed-up letters based on vocabulary clues to spell words.', subjectId: 'english', difficulty: 'Medium', estimatedTime: '4 Mins', xpReward: 120, coinsReward: 80, image: '🔤', isFavorite: false },
  { id: 'reasoning_game_1', name: 'Mind Bender (Reasoning)', type: 'board', description: 'Test your logic, pattern recognition, coding/decoding, and family tree puzzles with dice boards.', subjectId: 'reasoning', difficulty: 'Medium', estimatedTime: '8 Mins', xpReward: 180, coinsReward: 120, image: '🧩', isFavorite: true },
  { id: 'treasure_hunt_1', name: 'Treasure Hunt', type: 'board', description: 'Navigate paths using general knowledge trivia to uncover hidden star chests.', subjectId: 'gk', difficulty: 'Hard', estimatedTime: '8 Mins', xpReward: 200, coinsReward: 150, image: '🗺️', isFavorite: true },
  { id: 'coding_challenge_1', name: 'Coding Challenge', type: 'board', description: 'Trace logical computer commands, identify algorithms, and escape programming loops.', subjectId: 'coding', difficulty: 'Hard', estimatedTime: '10 Mins', xpReward: 220, coinsReward: 180, image: '👾', isFavorite: false },
  { id: 'science_explorer_1', name: 'Science Explorer', type: 'board', description: 'Solve physics gravity, chemistry compounds, and biology cells to advance.', subjectId: 'science', difficulty: 'Medium', estimatedTime: '6 Mins', xpReward: 150, coinsReward: 100, image: '🔬', isFavorite: false },
  { id: 'animal_kingdom_1', name: 'Animal Kingdom Quest', type: 'board', description: 'Identify species groups, habitat zones, and ecology facts to move forward.', subjectId: 'science', difficulty: 'Easy', estimatedTime: '3 Mins', xpReward: 100, coinsReward: 50, image: '🦁', isFavorite: false },
  { id: 'shape_master_1', name: 'Shape Master Race', type: 'board', description: 'Categorize angles, count corners, and trace geometry tracks with dice.', subjectId: 'math', difficulty: 'Easy', estimatedTime: '4 Mins', xpReward: 110, coinsReward: 60, image: '📐', isFavorite: false },
  { id: 'reasoning_game_2', name: 'Logic Board Quest', type: 'board', description: 'Challenge yourself with high-level direction senses, mental clocks, calendars, and series sequences.', subjectId: 'reasoning', difficulty: 'Hard', estimatedTime: '10 Mins', xpReward: 240, coinsReward: 160, image: '🔮', isFavorite: false }
];

// Base lists of game badges
const INITIAL_BADGES: Badge[] = [
  { id: 'first_victory', name: 'First Victory', description: 'Completed your very first IQS educational board track.', iconName: '🏆', category: 'special', isUnlocked: false, reqText: 'Solve 1 Game' },
  { id: 'academic_champ', name: 'Academic Champ', description: 'Solved quiz answers with a spectacular 80%+ accuracy rate.', iconName: '🧠', category: 'academic', isUnlocked: false, reqText: '80% Game Accuracy' },
  { id: 'linguist', name: 'Linguist Guru', description: 'Unscrambled all spelling words correctly inside Word Builder.', iconName: '✍️', category: 'academic', isUnlocked: false, reqText: 'Solve English Word' },
  { id: 'spin_master', name: 'Lucky Spinner', description: 'Spun the wheel of fortune to earn bonus diamonds and stars.', iconName: '🎡', category: 'social', isUnlocked: false, reqText: 'Spin Wheel once' },
  { id: 'streak_hero', name: 'Active Streak', description: 'Maintained a daily learning check-in streak of 3+ days.', iconName: '🔥', category: 'social', isUnlocked: false, reqText: '3 Days Login' }
];

const STORAGE_KEY_PROGRESS = 'iqs_board_games_progress';
const STORAGE_KEY_QUESTIONS = 'iqs_board_games_questions';

const DEFAULT_PROGRESS: UserProgress = {
  displayName: 'Guest Explorer',
  avatar: '🤠',
  classGroupId: null,
  selectedClass: null,
  level: 1,
  xp: 0,
  xpToNextLevel: 100,
  coins: 150,
  diamonds: 10,
  stars: 5,
  streak: 3,
  totalStudyTime: 12,
  totalGamesPlayed: 0,
  accuracy: 84,
  unlockedBadges: [],
  recentGames: [],
  favorites: ['treasure_hunt_1'],
  authMethod: 'guest',
  isLoggedIn: false
};

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [activeGame, setActiveGame] = useState<Game | null>(null);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [pendingGameId, setPendingGameId] = useState<string | null>(null);

  // Core App states loaded from localStorage
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PROGRESS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (!parsed.authMethod) {
          parsed.authMethod = 'guest';
          parsed.isLoggedIn = false;
        }
        return parsed;
      }
      return DEFAULT_PROGRESS;
    } catch {
      return DEFAULT_PROGRESS;
    }
  });

  const [questions, setQuestions] = useState<QuizQuestion[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_QUESTIONS);
      return saved ? JSON.parse(saved) : QUESTION_BANK;
    } catch {
      return QUESTION_BANK;
    }
  });

  const [subjects, setSubjects] = useState<Subject[]>(INITIAL_SUBJECTS);
  const [games, setGames] = useState<Game[]>(INITIAL_GAMES);
  
  const [badges, setBadges] = useState<Badge[]>(() => {
    // Sync loaded unlockedBadges IDs to badges array
    return INITIAL_BADGES.map(b => ({
      ...b,
      isUnlocked: progress.unlockedBadges.includes(b.id)
    }));
  });

  // Save Progress to Local Storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(progress));
    } catch (e) {
      console.warn("Storage limits or blocked in iframe.", e);
    }
  }, [progress]);

  // Save Questions to Local Storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_QUESTIONS, JSON.stringify(questions));
    } catch (e) {
      console.warn("Storage limits or blocked in iframe.", e);
    }
  }, [questions]);

  // Handle Class selection
  const handleSelectClass = (groupId: ClassGroupId, selectedClass: string) => {
    setProgress(prev => ({
      ...prev,
      classGroupId: groupId,
      selectedClass: selectedClass
    }));
  };

  // Reset/Change Class Group selection
  const handleClassGroupReset = () => {
    setProgress(prev => ({
      ...prev,
      classGroupId: null,
      selectedClass: null
    }));
    setActiveGame(null);
    setCurrentTab('home');
  };

  // Toggling game Favorites
  const handleToggleFavorite = (gameId: string) => {
    setProgress(prev => {
      const isFav = prev.favorites.includes(gameId);
      const updated = isFav 
        ? prev.favorites.filter(id => id !== gameId)
        : [...prev.favorites, gameId];
      return {
        ...prev,
        favorites: updated
      };
    });
  };

  // Select game launcher
  const handleSelectGame = (gameId: string) => {
    const selected = games.find(g => g.id === gameId);
    if (selected) {
      if (progress.isLoggedIn) {
        setActiveGame(selected);
      } else {
        setPendingGameId(gameId);
        setShowAuthModal(true);
      }
    }
  };

  // Auth Complete from Modal popup
  const handleAuthCompleteFromModal = (updatedFields: Partial<UserProgress>) => {
    setProgress(prev => {
      const nextClass = updatedFields.selectedClass || prev.selectedClass;
      const nextClassGroup = updatedFields.classGroupId || prev.classGroupId;

      return {
        ...prev,
        ...updatedFields,
        selectedClass: nextClass,
        classGroupId: nextClassGroup
      };
    });
    
    setShowAuthModal(false);

    // Launch the game!
    if (pendingGameId) {
      const selected = games.find(g => g.id === pendingGameId);
      if (selected) {
        setActiveGame(selected);
      }
      setPendingGameId(null);
    }
  };

  // Update Avatar emoji
  const handleUpdateAvatar = (avatar: string) => {
    setProgress(prev => ({
      ...prev,
      avatar: avatar
    }));
  };

  // Update Display Name
  const handleUpdateName = (name: string) => {
    setProgress(prev => ({
      ...prev,
      displayName: name
    }));
  };

  // Update multiple profile fields
  const handleUpdateProfile = (updatedFields: Partial<UserProgress>) => {
    setProgress(prev => ({
      ...prev,
      ...updatedFields
    }));
  };

  // Logout handler
  const handleLogout = () => {
    setProgress(prev => ({
      ...prev,
      displayName: 'Guest Explorer',
      email: null,
      authMethod: 'guest',
      isLoggedIn: false
    }));
    setCurrentTab('home');
  };

  // Add Question to pool (Admin)
  const handleAddQuestion = (newQ: QuizQuestion) => {
    setQuestions(prev => [newQ, ...prev]);
  };

  // Delete Question (Admin)
  const handleDeleteQuestion = (qId: string) => {
    setQuestions(prev => prev.filter(q => q.id !== qId));
  };

  // Claim Daily/Weekly/Monthly Bonus check-in
  const handleClaimBonus = (coins: number, xp: number, type: 'daily' | 'weekly' | 'monthly') => {
    setProgress(prev => {
      let updatedXP = prev.xp + xp;
      let updatedLevel = prev.level;
      let nextLevelXP = prev.xpToNextLevel;

      if (updatedXP >= nextLevelXP) {
        updatedXP -= nextLevelXP;
        updatedLevel += 1;
        nextLevelXP = Math.round(nextLevelXP * 1.5);
      }

      // Check if unlocked streak badges
      let updatedBadges = [...prev.unlockedBadges];
      if (type === 'weekly' && !updatedBadges.includes('streak_hero')) {
        updatedBadges.push('streak_hero');
        unlockBadgeLocal('streak_hero');
      }

      return {
        ...prev,
        coins: prev.coins + coins,
        xp: updatedXP,
        level: updatedLevel,
        xpToNextLevel: nextLevelXP,
        unlockedBadges: updatedBadges
      };
    });
  };

  // Helper local badge unlocker
  const unlockBadgeLocal = (badgeId: string) => {
    setBadges(prev => 
      prev.map(b => b.id === badgeId ? { ...b, isUnlocked: true } : b)
    );
  };

  // Credit rewards from Spin Wheel
  const handleSpinReward = (coins: number, xp: number, diamonds: number) => {
    setProgress(prev => {
      let updatedXP = prev.xp + xp;
      let updatedLevel = prev.level;
      let nextLevelXP = prev.xpToNextLevel;

      if (updatedXP >= nextLevelXP) {
        updatedXP -= nextLevelXP;
        updatedLevel += 1;
        nextLevelXP = Math.round(nextLevelXP * 1.5);
      }

      // Unlock Spin master badge
      let updatedBadges = [...prev.unlockedBadges];
      if (!updatedBadges.includes('spin_master')) {
        updatedBadges.push('spin_master');
        unlockBadgeLocal('spin_master');
      }

      return {
        ...prev,
        coins: Math.max(0, prev.coins - 50 + coins), // subtract 50 cost
        diamonds: prev.diamonds + diamonds,
        xp: updatedXP,
        level: updatedLevel,
        xpToNextLevel: nextLevelXP,
        unlockedBadges: updatedBadges
      };
    });
  };

  // Core callback when a board game finishes
  const handleFinishGame = (earnedCoins: number, earnedXP: number, wonBadgeId?: string, earnedCertificate?: boolean) => {
    setProgress(prev => {
      let updatedXP = prev.xp + earnedXP;
      let updatedLevel = prev.level;
      let nextLevelXP = prev.xpToNextLevel;

      // Level up arithmetic
      if (updatedXP >= nextLevelXP) {
        updatedXP -= nextLevelXP;
        updatedLevel += 1;
        nextLevelXP = Math.round(nextLevelXP * 1.5);
      }

      // Unlocks
      let updatedBadges = [...prev.unlockedBadges];
      
      // Default first play badge
      if (prev.totalGamesPlayed === 0 && !updatedBadges.includes('first_victory')) {
        updatedBadges.push('first_victory');
        unlockBadgeLocal('first_victory');
      }

      // Optional won badges
      if (wonBadgeId && !updatedBadges.includes(wonBadgeId)) {
        updatedBadges.push(wonBadgeId);
        unlockBadgeLocal(wonBadgeId);
      }

      return {
        ...prev,
        totalGamesPlayed: prev.totalGamesPlayed + 1,
        totalStudyTime: prev.totalStudyTime + 5, // added mock game time
        coins: prev.coins + earnedCoins,
        xp: updatedXP,
        level: updatedLevel,
        xpToNextLevel: nextLevelXP,
        unlockedBadges: updatedBadges,
        accuracy: Math.min(100, Math.round((prev.accuracy * prev.totalGamesPlayed + 90) / (prev.totalGamesPlayed + 1)))
      };
    });

    // Close Game State & return to dashboard tab
    setActiveGame(null);
    setCurrentTab('home');
  };

  // Generic reward updater for extra coins/XP (e.g. Daily Missions)
  const handleReward = (coins: number, xp: number) => {
    setProgress(prev => {
      let updatedXP = prev.xp + xp;
      let updatedLevel = prev.level;
      let nextLevelXP = prev.xpToNextLevel;

      if (updatedXP >= nextLevelXP) {
        updatedXP -= nextLevelXP;
        updatedLevel += 1;
        nextLevelXP = Math.round(nextLevelXP * 1.5);
      }

      return {
        ...prev,
        coins: prev.coins + coins,
        xp: updatedXP,
        level: updatedLevel,
        xpToNextLevel: nextLevelXP
      };
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between w-full max-w-full overflow-x-hidden">
      
      {/* ================= IF NOT LOGGED IN / GUEST MODE NOT CHOSEN ================= */}
      {!progress.authMethod ? (
        <AuthScreen
          onAuthComplete={handleUpdateProfile}
          language={progress.language || 'en'}
          onLanguageChange={(lang) => handleUpdateProfile({ language: lang })}
        />
      ) : (
        <>
          {/* ================= IF IN INTERACTIVE PLAY MODE ================= */}
          {activeGame ? (
            activeGame.type === 'word' ? (
              <WordPlay
                game={activeGame}
                progress={progress}
                onFinishGame={handleFinishGame}
                onQuit={() => setActiveGame(null)}
              />
            ) : (
              <GameBoardPlay
                game={activeGame}
                progress={progress}
                onFinishGame={handleFinishGame}
                onQuit={() => setActiveGame(null)}
              />
            )
          ) : (
            /* ================= GENERAL PLATFORM PORTAL NAVIGATION LAYOUT ================= */
            <>
              <Navbar 
                currentTab={currentTab} 
                setCurrentTab={setCurrentTab} 
                progress={progress}
                onClassGroupReset={handleClassGroupReset}
              />

              <main className="flex-1 pb-16 w-full max-w-full overflow-x-hidden">
                {!progress.selectedClass ? (
                  /* STEP 1: CHOOSE AGE GROUP */
                  <ClassSelector onSelectClass={handleSelectClass} language={progress.language || 'en'} />
                ) : (
                  /* DASHBOARD VIEWS CHANGER */
                  <>
                    {currentTab === 'home' && (
                      <Dashboard
                        progress={progress}
                        onSelectGame={handleSelectGame}
                        subjects={subjects}
                        games={games}
                        onToggleFavorite={handleToggleFavorite}
                        onReward={handleReward}
                      />
                    )}

                    {currentTab === 'rewards' && (
                      <RewardSection
                        progress={progress}
                        badges={badges}
                        onClaimDailyBonus={handleClaimBonus}
                        onSpinReward={handleSpinReward}
                      />
                    )}

                    {currentTab === 'leaderboard' && (
                      <Leaderboard progress={progress} />
                    )}

                    {currentTab === 'profile' && (
                      <StudentProfile
                        progress={progress}
                        badges={badges}
                        recommendedGames={games}
                        onUpdateAvatar={handleUpdateAvatar}
                        onUpdateName={handleUpdateName}
                        onUpdateProfile={handleUpdateProfile}
                        onSelectGame={handleSelectGame}
                        onLogout={handleLogout}
                      />
                    )}

                    {currentTab === 'admin' && (
                      <AdminPanel
                        questions={questions}
                        onAddQuestion={handleAddQuestion}
                        onDeleteQuestion={handleDeleteQuestion}
                      />
                    )}
                  </>
                )}
              </main>
 
               <Footer />
             </>
           )}
         </>
       )}
 
       {/* ================= LOGIN/SIGNUP MODAL ON GAME PLAY ================= */}
       {showAuthModal && (
         <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[99] flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200 text-left">
           <div className="relative max-w-md w-full bg-white rounded-3xl shadow-2xl">
             {/* Close button */}
             <button
               onClick={() => {
                 setShowAuthModal(false);
                 setPendingGameId(null);
               }}
               className="absolute top-3 right-3 bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-950 p-1.5 rounded-full z-[100] border border-slate-200 hover:scale-105 active:scale-95 transition-all cursor-pointer"
               title="Close"
             >
               <X className="h-4 w-4" />
             </button>
             
             <AuthScreen
               onAuthComplete={handleAuthCompleteFromModal}
               language={progress.language || 'en'}
               onLanguageChange={(lang) => handleUpdateProfile({ language: lang })}
               isModal={true}
             />
           </div>
         </div>
       )}
 
     </div>
   );
 }
