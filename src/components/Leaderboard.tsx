import React, { useState } from 'react';
import { 
  Trophy, 
  Sparkles, 
  Search, 
  MapPin, 
  School, 
  Users, 
  Globe, 
  TrendingUp, 
  Flame,
  ChevronRight,
  Sparkle
} from 'lucide-react';
import { UserProgress, LeaderboardScope, LeaderboardPeriod, LeaderboardEntry } from '../types';

interface LeaderboardProps {
  progress: UserProgress;
}

const LEADERBOARD_DATA: Record<LeaderboardScope, LeaderboardEntry[]> = {
  school: [
    { id: 'l1', name: 'Kabir Sharma', avatar: '🦁', rank: 1, score: 2450, level: 8, school: 'IQS Global School', state: 'Delhi' },
    { id: 'l2', name: 'Ananya Iyer', avatar: '🦄', rank: 2, score: 2310, level: 7, school: 'IQS Global School', state: 'Delhi' },
    { id: 'l3', name: 'Rohan Mehta', avatar: '🐼', rank: 3, score: 2180, level: 7, school: 'IQS Global School', state: 'Delhi' },
    { id: 'user', name: 'You (Champion)', avatar: '🤠', rank: 4, score: 1250, level: 5, school: 'IQS Global School', state: 'Delhi', isCurrentUser: true },
    { id: 'l4', name: 'Siddharth Sen', avatar: '🦊', rank: 5, score: 1120, level: 5, school: 'IQS Global School', state: 'Delhi' },
    { id: 'l5', name: 'Diya Kapoor', avatar: '🐨', rank: 6, score: 980, level: 4, school: 'IQS Global School', state: 'Delhi' }
  ],
  district: [
    { id: 'd1', name: 'Zoya Khan', avatar: '🐯', rank: 1, score: 4520, level: 12, school: 'Army Public School', state: 'Delhi' },
    { id: 'd2', name: 'Aarav Gupta', avatar: '🐸', rank: 2, score: 3910, level: 10, school: 'Bal Bharati school', state: 'Delhi' },
    { id: 'l1', name: 'Kabir Sharma', avatar: '🦁', rank: 3, score: 2450, level: 8, school: 'IQS Global School', state: 'Delhi' },
    { id: 'l2', name: 'Ananya Iyer', avatar: '🦄', rank: 4, score: 2310, level: 7, school: 'IQS Global School', state: 'Delhi' },
    { id: 'user', name: 'You (Champion)', avatar: '🤠', rank: 18, score: 1250, level: 5, school: 'IQS Global School', state: 'Delhi', isCurrentUser: true },
    { id: 'd3', name: 'Sneha Roy', avatar: '🐰', rank: 19, score: 1190, level: 5, school: 'DPS Dwarka', state: 'Delhi' }
  ],
  state: [
    { id: 's1', name: 'Aditya Birla', avatar: '🦅', rank: 1, score: 8900, level: 18, school: 'Modern School Barakhamba', state: 'Delhi' },
    { id: 's2', name: 'Meera Deshmukh', avatar: '🦋', rank: 2, score: 7850, level: 15, school: 'Vasant Valley School', state: 'Delhi' },
    { id: 'd1', name: 'Zoya Khan', avatar: '🐯', rank: 3, score: 4520, level: 12, school: 'Army Public School', state: 'Delhi' },
    { id: 'user', name: 'You (Champion)', avatar: '🤠', rank: 54, score: 1250, level: 5, school: 'IQS Global School', state: 'Delhi', isCurrentUser: true },
    { id: 's3', name: 'Ishaan Verma', avatar: '🦥', rank: 55, score: 1210, level: 5, school: 'Ryan International', state: 'Delhi' }
  ],
  country: [
    { id: 'c1', name: 'Pranav Anand', avatar: '🦈', rank: 1, score: 14200, level: 25, school: 'DPS R.K. Puram', state: 'Delhi' },
    { id: 'c2', name: 'Shruti Hegde', avatar: '🐙', rank: 2, score: 12100, level: 22, school: 'Orchids Intl', state: 'Karnataka' },
    { id: 'c3', name: 'Neil Mukherjee', avatar: '🦉', rank: 3, score: 11800, level: 21, school: 'Don Bosco School', state: 'West Bengal' },
    { id: 'user', name: 'You (Champion)', avatar: '🤠', rank: 312, score: 1250, level: 5, school: 'IQS Global School', state: 'Delhi', isCurrentUser: true }
  ],
  friends: [
    { id: 'f1', name: 'Aman (My Bestie)', avatar: '🐨', rank: 1, score: 1850, level: 6, school: 'IQS Global School', state: 'Delhi' },
    { id: 'user', name: 'You (Champion)', avatar: '🤠', rank: 2, score: 1250, level: 5, school: 'IQS Global School', state: 'Delhi', isCurrentUser: true },
    { id: 'f2', name: 'Suhana Classmate', avatar: '🐱', rank: 3, score: 980, level: 4, school: 'IQS Global School', state: 'Delhi' },
    { id: 'f3', name: 'Rahul Neighbor', avatar: '🐶', rank: 4, score: 850, level: 4, school: 'IQS Global School', state: 'Delhi' }
  ]
};

export default function Leaderboard({ progress }: LeaderboardProps) {
  const [scope, setScope] = useState<LeaderboardScope>('school');
  const [period, setPeriod] = useState<LeaderboardPeriod>('weekly');
  const [searchQuery, setSearchQuery] = useState('');

  // Dynamically inject player's live score into the selected leaderboard scope
  const getDynamicRankings = (): LeaderboardEntry[] => {
    const rawList = LEADERBOARD_DATA[scope];
    
    // Adapt scores slightly based on period
    const multiplier = period === 'monthly' ? 4 : 1;

    return rawList.map(entry => {
      if (entry.isCurrentUser) {
        return {
          ...entry,
          score: progress.xp * multiplier,
          level: progress.level,
          avatar: progress.avatar
        };
      }
      return {
        ...entry,
        score: entry.score * multiplier
      };
    }).filter(entry => 
      entry.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      entry.school.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const activeRankings = getDynamicRankings();

  // Helper scopes metadata
  const scopesConfig = [
    { id: 'friends', label: 'My Friends', icon: Users },
    { id: 'school', label: 'My School', icon: School },
    { id: 'district', label: 'District', icon: MapPin },
    { id: 'state', label: 'State-wide', icon: MapPin },
    { id: 'country', label: 'All India', icon: Globe }
  ] as const;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 text-left relative overflow-hidden">
      
      {/* Visual background shapes */}
      <div className="absolute top-10 right-10 w-44 h-44 bg-yellow-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-44 h-44 bg-indigo-200/20 rounded-full blur-3xl pointer-events-none" />

      {/* Header title */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1 bg-amber-100 text-amber-950 text-[9px] font-heading font-black px-2 py-0.5 rounded-sm uppercase mb-1">
            <Trophy className="h-3.5 w-3.5 text-amber-500" />
            <span>GLOBAL STANDINGS</span>
          </div>
          <h1 className="font-heading font-black text-xl md:text-2xl text-slate-900 tracking-tight leading-none">
            Hall of Fame Leaders
          </h1>
          <p className="text-slate-400 text-xs mt-0.5">
            Solve correct answers on game boards to earn XP and top the rankings.
          </p>
        </div>

        {/* Time period filter controls */}
        <div className="flex bg-slate-100 p-1 rounded-xl shrink-0">
          {(['weekly', 'monthly'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-2 text-xs font-heading font-black rounded-lg transition-all capitalize cursor-pointer ${
                period === p
                  ? 'bg-white text-slate-800 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {p} Rank
            </button>
          ))}
        </div>
      </div>

      {/* Grid of leader boards content */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: REGION SCOPES SWITCH (COL-SPAN-3) */}
        <div className="lg:col-span-3 space-y-2">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-3">
            Rank Scopes
          </p>
          <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible gap-2 pb-2 lg:pb-0 scrollbar-none">
            {scopesConfig.map((item) => {
              const IconComp = item.icon;
              const isSelected = scope === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setScope(item.id)}
                  className={`w-full p-3 rounded-xl text-left font-heading font-black text-xs flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap lg:whitespace-normal border ${
                    isSelected
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <IconComp className="h-4.5 w-4.5 shrink-0" />
                  <span className="flex-1">{item.label}</span>
                  <ChevronRight className={`h-4 w-4 hidden lg:block ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: RENDER RANKING LIST (COL-SPAN-9) */}
        <div className="lg:col-span-9 bg-white border border-slate-200 rounded-xl p-4 md:p-6 shadow-2xs space-y-4">
          
          {/* Internal search filter */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search students or schools on board..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-hidden pl-9 pr-4 py-2 rounded-lg text-xs font-medium transition-all"
            />
          </div>

          {/* Table rankings listing */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[500px]">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-bold text-[10px] uppercase tracking-wider">
                  <th className="py-3 px-4 w-16">Rank</th>
                  <th className="py-3 px-4">Student Name</th>
                  <th className="py-3 px-4">IQS Academy School</th>
                  <th className="py-3 px-4 w-24">Level</th>
                  <th className="py-3 px-4 w-32 text-right">XP Points</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {activeRankings.length > 0 ? (
                  activeRankings.map((student) => {
                    // Styles based on positions
                    const isPodium = student.rank <= 3;
                    const isMe = student.isCurrentUser;
                    
                    return (
                      <tr 
                        key={student.id}
                        className={`transition-colors duration-150 ${
                          isMe 
                            ? 'bg-indigo-50/70 hover:bg-indigo-50 text-indigo-900 font-extrabold' 
                            : 'hover:bg-slate-50/50 text-slate-700'
                        }`}
                      >
                        {/* Rank Circle badge */}
                        <td className="py-4 px-4 font-heading font-black text-sm">
                          {isPodium ? (
                            <span className={`inline-flex w-7 h-7 rounded-full items-center justify-center text-xs text-white ${
                              student.rank === 1 ? 'bg-amber-500 shadow-md shadow-amber-100' :
                              student.rank === 2 ? 'bg-slate-400 shadow-md shadow-slate-100' :
                              'bg-orange-400 shadow-md shadow-orange-100'
                            }`}>
                              {student.rank}
                            </span>
                          ) : (
                            <span className="text-slate-400">{student.rank}</span>
                          )}
                        </td>

                        {/* Student profile name and avatar */}
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl" role="img" aria-label="avatar">
                              {student.avatar}
                            </span>
                            <div>
                              <p className="font-heading font-black text-sm text-slate-800">
                                {student.name} {isMe && '⭐'}
                              </p>
                              <p className="text-[10px] text-slate-400">{student.state}</p>
                            </div>
                          </div>
                        </td>

                        {/* School */}
                        <td className="py-4 px-4 text-xs font-medium text-slate-500">
                          {student.school}
                        </td>

                        {/* Level */}
                        <td className="py-4 px-4 text-xs font-heading font-black text-slate-700">
                          Lvl {student.level}
                        </td>

                        {/* Score XP */}
                        <td className="py-4 px-4 text-right">
                          <span className={`font-poppins font-black text-sm ${isMe ? 'text-indigo-600' : 'text-slate-800'}`}>
                            {student.score.toLocaleString()} XP
                          </span>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-slate-400 text-xs">
                      No matching students found in this ranking scope.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Motivational footer banner */}
          <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xl">🔥</span>
              <div className="text-left">
                <h4 className="font-heading font-black text-slate-800 text-xs">You are on rank #4 at School!</h4>
                <p className="text-[11px] text-slate-400">Earn +150 XP today to beat Rohan Mehta and lock in the bronze podium!</p>
              </div>
            </div>
            
            <div className="text-[11px] font-bold text-indigo-600 flex items-center gap-1">
              <TrendingUp className="h-3.5 w-3.5" /> Match progress calculated live
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
