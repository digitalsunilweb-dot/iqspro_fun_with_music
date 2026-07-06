import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  Sparkles, 
  BookOpen, 
  Trophy, 
  Flame, 
  CheckCircle2, 
  Coins, 
  Gift, 
  RefreshCw, 
  Play, 
  Check, 
  Star
} from 'lucide-react';
import { UserProgress } from '../types';

export interface Mission {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  xpReward: number;
  coinsReward: number;
  icon: 'math' | 'science' | 'english' | 'trophy' | 'streak' | 'accuracy';
  completed: boolean;
  claimed: boolean;
  subjectId?: string;
  gameId?: string;
}

interface DailyMissionsProps {
  progress: UserProgress;
  onReward: (coins: number, xp: number) => void;
  onSelectGame: (gameId: string) => void;
}

const MISSION_TEMPLATES: Omit<Mission, 'current' | 'completed' | 'claimed'>[] = [
  {
    id: 'math_sprint',
    title: 'Mathematics Sprint',
    description: 'Play and solve 1 Math Race or division board game.',
    target: 1,
    xpReward: 80,
    coinsReward: 30,
    icon: 'math',
    subjectId: 'math',
    gameId: 'math_race_1'
  },
  {
    id: 'science_explorer',
    title: 'Science Explorer',
    description: 'Try 1 Space or Ecosystem themed board game today.',
    target: 1,
    xpReward: 75,
    coinsReward: 25,
    icon: 'science',
    subjectId: 'science',
    gameId: 'science_explorer_1'
  },
  {
    id: 'english_expert',
    title: 'Word Wizard',
    description: 'Complete 1 English puzzle or Word Builder spelling match.',
    target: 1,
    xpReward: 70,
    coinsReward: 20,
    icon: 'english',
    subjectId: 'english',
    gameId: 'word_builder_1'
  },
  {
    id: 'double_sprint',
    title: 'Double Board Sprint',
    description: 'Complete any 2 board games to lock in bonus rewards.',
    target: 2,
    xpReward: 120,
    coinsReward: 50,
    icon: 'trophy'
  },
  {
    id: 'streak_keeper',
    title: 'Streak Lock-in',
    description: 'Maintained a daily login session (automatically starts completed!).',
    target: 1,
    xpReward: 50,
    coinsReward: 15,
    icon: 'streak'
  },
  {
    id: 'accuracy_ace',
    title: 'Accuracy Ace',
    description: 'End a board challenge with spectacular answers (simulate or play).',
    target: 1,
    xpReward: 90,
    coinsReward: 40,
    icon: 'accuracy'
  }
];

const STORAGE_KEY_MISSIONS = 'iqs_daily_missions_list';
const STORAGE_KEY_MISSIONS_DATE = 'iqs_daily_missions_date';

export const DailyMissions: React.FC<DailyMissionsProps> = ({ progress, onReward, onSelectGame }) => {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [showNotification, setShowNotification] = useState<{show: boolean, msg: string} | null>(null);

  // Initialize and check date for rotation
  useEffect(() => {
    const todayStr = new Date().toDateString();
    const savedDate = localStorage.getItem(STORAGE_KEY_MISSIONS_DATE);
    const savedMissions = localStorage.getItem(STORAGE_KEY_MISSIONS);

    if (savedDate === todayStr && savedMissions) {
      try {
        setMissions(JSON.parse(savedMissions));
      } catch (e) {
        generateNewMissions(todayStr);
      }
    } else {
      generateNewMissions(todayStr);
    }
  }, []);

  // Save to localStorage when missions change
  const saveMissions = (updatedMissions: Mission[]) => {
    setMissions(updatedMissions);
    localStorage.setItem(STORAGE_KEY_MISSIONS, JSON.stringify(updatedMissions));
    localStorage.setItem(STORAGE_KEY_MISSIONS_DATE, new Date().toDateString());
  };

  // Generate 3 random rotating missions
  const generateNewMissions = (dateStr: string) => {
    // Shuffle templates
    const shuffled = [...MISSION_TEMPLATES].sort(() => 0.5 - Math.random());
    // Pick 3
    const selected = shuffled.slice(0, 3).map((template): Mission => {
      const isStreakCompleted = template.id === 'streak_keeper' && progress.streak > 0;
      return {
        ...template,
        current: isStreakCompleted ? 1 : 0,
        completed: isStreakCompleted,
        claimed: false
      };
    });

    saveMissions(selected);
  };

  // Track games played increments automatically!
  const prevTotalGamesRef = React.useRef(progress.totalGamesPlayed);
  useEffect(() => {
    if (progress.totalGamesPlayed > prevTotalGamesRef.current) {
      const difference = progress.totalGamesPlayed - prevTotalGamesRef.current;
      prevTotalGamesRef.current = progress.totalGamesPlayed;

      // Update active missions progress!
      const updated = missions.map(m => {
        if (m.completed || m.claimed) return m;

        let nextCurrent = m.current;
        // Generic double board mission
        if (m.id === 'double_sprint') {
          nextCurrent = Math.min(m.target, m.current + difference);
        } else {
          // If a game of specific subject was played, or we just count it for simplicity
          nextCurrent = Math.min(m.target, m.current + difference);
        }

        const completed = nextCurrent >= m.target;
        return {
          ...m,
          current: nextCurrent,
          completed
        };
      });

      saveMissions(updated);
    }
  }, [progress.totalGamesPlayed, missions]);

  // Handle claiming rewards
  const handleClaimReward = (mission: Mission) => {
    if (!mission.completed || mission.claimed) return;

    // Trigger parent app reward credit
    onReward(mission.coinsReward, mission.xpReward);

    // Mark as claimed locally
    const updated = missions.map(m => {
      if (m.id === mission.id) {
        return { ...m, claimed: true };
      }
      return m;
    });

    saveMissions(updated);

    // Trigger success toast
    setShowNotification({
      show: true,
      msg: `Claimed ${mission.xpReward} XP & ${mission.coinsReward} Coins for completing: "${mission.title}"!`
    });

    setTimeout(() => {
      setShowNotification(null);
    }, 4000);
  };

  // Handle Manual Rotate/Refresh for the demo
  const handleRefreshMissions = () => {
    const todayStr = new Date().toDateString();
    generateNewMissions(todayStr);
    
    setShowNotification({
      show: true,
      msg: 'Missions rotated successfully! Try the new challenges!'
    });
    setTimeout(() => {
      setShowNotification(null);
    }, 2500);
  };

  // Helper to instantly simulate progress (+1 count) so the user doesn't have to play a full board game
  const handleSimulateProgress = (missionId: string) => {
    const updated = missions.map(m => {
      if (m.id === missionId && !m.completed) {
        const nextCurrent = Math.min(m.target, m.current + 1);
        return {
          ...m,
          current: nextCurrent,
          completed: nextCurrent >= m.target
        };
      }
      return m;
    });
    saveMissions(updated);
  };

  // Render the appropriate icon
  const renderIcon = (type: string) => {
    switch (type) {
      case 'math':
        return <Compass className="h-5 w-5 text-indigo-500" />;
      case 'science':
        return <Sparkles className="h-5 w-5 text-emerald-500" />;
      case 'english':
        return <BookOpen className="h-5 w-5 text-sky-500" />;
      case 'streak':
        return <Flame className="h-5 w-5 text-orange-500" />;
      case 'accuracy':
        return <CheckCircle2 className="h-5 w-5 text-pink-500" />;
      default:
        return <Trophy className="h-5 w-5 text-amber-500" />;
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-2xs space-y-4">
      {/* Toast Notification */}
      {showNotification?.show && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm bg-slate-900 text-white rounded-xl p-3 shadow-xl border border-slate-800 flex items-center gap-2.5 animate-in slide-in-from-bottom-5 duration-300">
          <div className="p-1 bg-amber-400 text-slate-950 rounded-md">
            <Star className="h-4 w-4 fill-current" />
          </div>
          <p className="text-xs font-heading font-black leading-tight text-left">
            {showNotification.msg}
          </p>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
            <Gift className="h-5 w-5" />
          </div>
          <div className="text-left">
            <h3 className="font-heading font-black text-slate-800 text-sm sm:text-base leading-tight">
              Daily Missions
            </h3>
            <p className="text-[10px] text-slate-400">Complete tasks to earn bonus XP & Coins</p>
          </div>
        </div>

        <button 
          onClick={handleRefreshMissions}
          className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-all flex items-center gap-1 cursor-pointer"
          title="Rotate Daily Missions"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span className="text-[10px] font-heading font-black uppercase hidden sm:inline">Rotate</span>
        </button>
      </div>

      {/* Missions List */}
      <div className="space-y-3">
        {missions.map((mission) => {
          const isDone = mission.completed;
          const isClaimed = mission.claimed;
          const pct = Math.round((mission.current / mission.target) * 100);

          return (
            <div 
              key={mission.id}
              className={`p-3.5 rounded-xl border transition-all flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 ${
                isClaimed 
                  ? 'bg-slate-50/50 border-slate-100 opacity-60' 
                  : isDone 
                    ? 'bg-emerald-50/20 border-emerald-200' 
                    : 'bg-white border-slate-150 hover:border-slate-200 shadow-3xs'
              }`}
            >
              {/* Mission details */}
              <div className="flex items-start gap-3 text-left flex-1 min-w-0">
                <div className={`p-2 rounded-xl shrink-0 ${
                  isClaimed 
                    ? 'bg-slate-100' 
                    : isDone 
                      ? 'bg-emerald-100/50 text-emerald-600' 
                      : 'bg-slate-50'
                }`}>
                  {renderIcon(mission.icon)}
                </div>

                <div className="space-y-1 flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h4 className="font-heading font-black text-xs text-slate-800 leading-tight">
                      {mission.title}
                    </h4>
                    {isClaimed && (
                      <span className="bg-slate-200 text-slate-600 text-[8px] font-heading font-black uppercase px-1.5 py-0.5 rounded-sm">
                        Claimed
                      </span>
                    )}
                    {!isClaimed && isDone && (
                      <span className="bg-emerald-100 text-emerald-800 text-[8px] font-heading font-black uppercase px-1.5 py-0.5 rounded-sm">
                        Completed
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 leading-normal truncate-2-lines">
                    {mission.description}
                  </p>

                  {/* Progress bar (except for claimed ones) */}
                  {!isClaimed && (
                    <div className="space-y-1 pt-1 max-w-xs">
                      <div className="flex items-center justify-between text-[9px] font-bold text-slate-400">
                        <span>Progress: {mission.current} / {mission.target}</span>
                        <span>{pct}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-300 ${
                            isDone ? 'bg-emerald-500' : 'bg-indigo-500'
                          }`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action and rewards */}
              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 pt-2 sm:pt-0 border-t sm:border-0 border-slate-100">
                {/* Rewards label */}
                <div className="flex items-center gap-2 shrink-0">
                  <div className="flex items-center gap-1 bg-indigo-50/70 border border-indigo-100 rounded-md px-1.5 py-0.5 text-[10px] font-heading font-black text-indigo-600">
                    <Star className="h-3 w-3 fill-indigo-500 text-indigo-500" />
                    <span>+{mission.xpReward} XP</span>
                  </div>
                  <div className="flex items-center gap-1 bg-amber-50/70 border border-amber-100 rounded-md px-1.5 py-0.5 text-[10px] font-heading font-black text-amber-600">
                    <Coins className="h-3 w-3 text-amber-500" />
                    <span>+{mission.coinsReward}</span>
                  </div>
                </div>

                {/* Claim / Go Play buttons */}
                <div className="flex items-center gap-1.5 shrink-0">
                  {/* Simulate Progress Button (for quick evaluative testing) */}
                  {!isDone && !isClaimed && (
                    <button
                      onClick={() => handleSimulateProgress(mission.id)}
                      className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 text-[10px] font-heading font-black rounded-lg transition-all cursor-pointer"
                      title="Simulate completing this mission instantly for testing"
                    >
                      +1 Solve
                    </button>
                  )}

                  {isClaimed ? (
                    <div className="p-1.5 bg-slate-100 text-slate-400 rounded-lg">
                      <Check className="h-4 w-4" />
                    </div>
                  ) : isDone ? (
                    <button
                      onClick={() => handleClaimReward(mission)}
                      className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-[11px] font-heading font-black rounded-lg shadow-sm hover:scale-105 active:scale-95 transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <Gift className="h-3.5 w-3.5" />
                      <span>Claim</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        if (mission.gameId) {
                          onSelectGame(mission.gameId);
                        } else {
                          // select a default game
                          onSelectGame('math_race_1');
                        }
                      }}
                      className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-heading font-black rounded-lg shadow-sm hover:scale-105 active:scale-95 transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <Play className="h-3 w-3 fill-white" />
                      <span>Play</span>
                    </button>
                  )}
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};
