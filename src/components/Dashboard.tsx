import React, { useState } from 'react';
import { 
  Award, 
  BookOpen, 
  CheckCircle, 
  Coins, 
  Flame, 
  Gamepad2, 
  Search, 
  Sparkles, 
  Star, 
  Trophy, 
  Heart,
  ArrowRight,
  Filter,
  Lightbulb,
  Clock,
  Compass
} from 'lucide-react';
import { UserProgress, Subject, SubjectId, Game } from '../types';
import { translations } from '../lib/translations';
import { DailyMissions } from './DailyMissions';

interface DashboardProps {
  progress: UserProgress;
  onSelectGame: (gameId: string) => void;
  subjects: Subject[];
  games: Game[];
  onToggleFavorite: (gameId: string) => void;
  onReward: (coins: number, xp: number) => void;
}

export default function Dashboard({ progress, onSelectGame, subjects, games, onToggleFavorite, onReward }: DashboardProps) {
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<SubjectId | 'all'>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | 'Easy' | 'Medium' | 'Hard'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModalSubject, setSelectedModalSubject] = useState<Subject | null>(null);

  const lang = progress.language || 'en';
  const t = translations[lang];

  // Daily challenge data
  const dailyChallenge = {
    title: "Math Race Sprint",
    subject: "Mathematics",
    description: "Roll 3 correct answers in a single Math Race game!",
    reward: "150 Coins + 50 XP",
    progress: "1 / 3 solved",
    gameId: "math_race_1"
  };

  // Filter games based on search, subject, and difficulty
  const filteredGames = games.filter(game => {
    const matchesSubject = selectedSubjectFilter === 'all' || game.subjectId === selectedSubjectFilter;
    const matchesDifficulty = difficultyFilter === 'all' || game.difficulty === difficultyFilter;
    const matchesSearch = game.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          game.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSubject && matchesDifficulty && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 py-6 md:py-8 space-y-6 md:space-y-8 text-left">
      
      {/* ================= STEP 2: WELCOME BANNER & GENERAL STATS ================= */}
      <div className="relative overflow-hidden bg-slate-900 text-white rounded-2xl p-5 sm:p-6 md:p-8 shadow-xs border border-slate-800">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:12px_12px]" />
        
        <div className="relative z-10 grid md:grid-cols-12 gap-6 items-center">
          
          {/* Welcome Text */}
          <div className="md:col-span-7 space-y-3.5">
            <div className="inline-flex items-center gap-1.5 bg-slate-800 border border-slate-700 px-3 py-1 rounded-full text-[10px] font-bold text-slate-300 uppercase tracking-wider">
              <Sparkles className="h-3 w-3 text-amber-400" />
              <span>Ready for today's quest, {progress.displayName || 'Hero'}?</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-heading font-black leading-none uppercase tracking-tight">
              Class <span className="text-indigo-400">{progress.selectedClass || '5'}</span> Dashboard
            </h1>
            
            <p className="text-slate-400 font-sans text-xs max-w-lg leading-relaxed">
              Solve board game levels and build a strong streak! Win badges and master educational topics with real interactive quests.
            </p>

            {/* EXP Bar */}
            <div className="space-y-1.5 pt-1">
              <div className="flex justify-between text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <span>XP Progress to Level {progress.level + 1}</span>
                <span className="font-mono text-white">{progress.xp} / {progress.xpToNextLevel} XP</span>
              </div>
              <div className="h-3 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
                <div 
                  className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                  style={{ width: `${(progress.xp / progress.xpToNextLevel) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Core Stat Boxes */}
          <div className="md:col-span-5 grid grid-cols-2 gap-3.5">
            
            <div className="bg-slate-950/80 p-3 sm:p-4 rounded-xl border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase">Total Coins</span>
                <div className="p-1 bg-amber-400/20 text-amber-400 rounded-md">
                  <Coins className="h-3.5 w-3.5" />
                </div>
              </div>
              <div className="mt-2 leading-none">
                <span className="text-xl sm:text-2xl font-heading font-black text-white">{progress.coins}</span>
                <p className="text-[9px] text-slate-500 mt-1 uppercase font-bold tracking-wider">Spend in rewards</p>
              </div>
            </div>

            <div className="bg-slate-950/80 p-3 sm:p-4 rounded-xl border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase">Streak</span>
                <div className="p-1 bg-orange-500/20 text-orange-400 rounded-md">
                  <Flame className="h-3.5 w-3.5" />
                </div>
              </div>
              <div className="mt-2 leading-none">
                <span className="text-xl sm:text-2xl font-heading font-black text-white">{progress.streak} Days</span>
                <p className="text-[9px] text-slate-500 mt-1 uppercase font-bold tracking-wider">Log in daily!</p>
              </div>
            </div>

            <div className="bg-slate-950/80 p-3 sm:p-4 rounded-xl border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase">Accuracy</span>
                <div className="p-1 bg-cyan-500/20 text-cyan-400 rounded-md">
                  <CheckCircle className="h-3.5 w-3.5" />
                </div>
              </div>
              <div className="mt-2 leading-none">
                <span className="text-xl sm:text-2xl font-heading font-black text-white">{progress.accuracy}%</span>
                <p className="text-[9px] text-slate-500 mt-1 uppercase font-bold tracking-wider">Correct answers</p>
              </div>
            </div>

            <div className="bg-slate-950/80 p-3 sm:p-4 rounded-xl border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase">Study Time</span>
                <div className="p-1 bg-purple-500/20 text-purple-400 rounded-md">
                  <Clock className="h-3.5 w-3.5" />
                </div>
              </div>
              <div className="mt-2 leading-none">
                <span className="text-xl sm:text-2xl font-heading font-black text-white">{progress.totalStudyTime} Min</span>
                <p className="text-[9px] text-slate-500 mt-1 uppercase font-bold tracking-wider">Active power</p>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* ================= TODAY'S CHALLENGE ================= */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-500 text-amber-950 rounded-xl shadow-xs shrink-0">
            <Trophy className="h-5 w-5" />
          </div>
          <div className="text-left space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="bg-amber-100 text-amber-900 text-[8px] font-heading font-black uppercase px-2 py-0.5 rounded-sm">
                TODAY'S CHALLENGE
              </span>
              <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1">
                <Clock className="h-3 w-3" /> 23h left
              </span>
            </div>
            <h3 className="font-heading font-black text-slate-800 text-sm md:text-base leading-tight">
              {dailyChallenge.title} - {dailyChallenge.subject}
            </h3>
            <p className="text-[11px] text-slate-400">{dailyChallenge.description}</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
          <div className="text-center sm:text-right w-full sm:w-auto">
            <span className="text-[8px] text-slate-400 font-bold block uppercase leading-none mb-0.5 sm:mb-0">REWARD</span>
            <span className="text-xs font-heading font-black text-amber-600">{dailyChallenge.reward}</span>
          </div>
          <button
            onClick={() => onSelectGame(dailyChallenge.gameId)}
            className="w-full sm:w-auto px-4 py-2.5 bg-slate-900 hover:bg-slate-800 font-heading font-black text-xs text-white rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
          >
            <span>Play Challenge</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* ================= DAILY ROTATING MISSIONS ================= */}
      <DailyMissions 
        progress={progress} 
        onReward={onReward} 
        onSelectGame={onSelectGame} 
      />

      {/* ================= STEP 3: SUBJECT SELECTION ================= */}
      <div className="pt-2">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-2 mb-4">
          <div>
            <div className="inline-block bg-slate-900 text-white text-[8px] font-heading font-black uppercase px-2 py-0.5 rounded-sm mb-1">
              STEP 3
            </div>
            <h2 className="text-xl md:text-2xl font-heading font-black text-slate-900 tracking-tight leading-none">
              Select Your Subject Focus
            </h2>
            <p className="text-slate-400 text-[11px] mt-0.5">Filter the games library or start a learning sprint in a specific category.</p>
          </div>
          
          {selectedSubjectFilter !== 'all' && (
            <button 
              onClick={() => setSelectedSubjectFilter('all')}
              className="text-xs font-bold text-indigo-600 hover:underline cursor-pointer"
            >
              Show All Subjects
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {subjects.map((sub) => {
            const isSelected = selectedSubjectFilter === sub.id;
            return (
              <button
                key={sub.id}
                onClick={() => {
                  setSelectedSubjectFilter(sub.id);
                  setSelectedModalSubject(sub);
                }}
                className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all duration-200 relative overflow-hidden cursor-pointer group ${
                  isSelected 
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs' 
                    : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800'
                }`}
              >
                <div className="relative z-10 flex justify-between items-start">
                  <div className={`text-2xl p-1.5 rounded-lg bg-slate-50 ${isSelected ? 'bg-indigo-700 text-white' : 'text-slate-800'}`}>
                    {sub.iconName}
                  </div>
                  <span className={`text-[8px] font-bold uppercase px-1.5 py-0.5 rounded-sm ${
                    isSelected ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {sub.difficulty}
                  </span>
                </div>

                <div className="relative z-10 mt-4 leading-none">
                  <h4 className="font-heading font-black text-xs tracking-tight leading-tight">
                    {sub.name}
                  </h4>
                  <p className={`text-[9px] mt-1 ${isSelected ? 'text-indigo-200' : 'text-slate-400'}`}>
                    {sub.gamesAvailable} Board Games
                  </p>

                  {/* Tiny progress dot */}
                  <div className="mt-2.5 flex items-center gap-1">
                    <div className={`h-1 flex-1 rounded-full overflow-hidden ${isSelected ? 'bg-indigo-700' : 'bg-slate-100'}`}>
                      <div 
                        className={`h-full rounded-full ${isSelected ? 'bg-white' : 'bg-indigo-500'}`}
                        style={{ width: `${sub.progress}%` }}
                      />
                    </div>
                    <span className="text-[9px] font-bold shrink-0">{sub.progress}%</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ================= STEP 4: GAMES GRID DIRECTORY ================= */}
      <div className="pt-2">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-3 mb-4">
          <div>
            <div className="inline-block bg-slate-900 text-white text-[8px] font-heading font-black uppercase px-2 py-0.5 rounded-sm mb-1">
              STEP 4
            </div>
            <h2 className="text-xl md:text-2xl font-heading font-black text-slate-900 tracking-tight leading-none">
              Interactive Educational Games
            </h2>
            <p className="text-slate-400 text-[11px] mt-0.5">Launch to play on a customized interactive board.</p>
          </div>

        {/* Search and Filters Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
          {/* Search Input */}
          <div className="relative flex-1 sm:w-64 md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search board games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 hover:border-slate-300 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-hidden pl-9 pr-4 py-2 rounded-xl text-xs font-medium transition-all shadow-sm"
            />
          </div>

          {/* Difficulty Filter */}
          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 justify-between sm:justify-start overflow-hidden">
            {(['all', 'Easy', 'Medium', 'Hard'] as const).map((dif) => (
              <button
                key={dif}
                onClick={() => setDifficultyFilter(dif)}
                className={`flex-1 sm:flex-initial px-2 sm:px-3.5 py-1 sm:py-1.5 text-[10px] sm:text-[11px] font-heading font-black rounded-lg transition-all cursor-pointer ${
                  difficultyFilter === dif
                    ? 'bg-white text-indigo-600 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {dif === 'all' ? 'All' : dif}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Games Library */}
      {filteredGames.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredGames.map((game) => {
            const isFav = progress.favorites.includes(game.id);
            const matchingSubject = subjects.find(s => s.id === game.subjectId);
            
            return (
              <div
                key={game.id}
                className="bg-white border border-slate-200 hover:border-indigo-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-1 active:scale-[0.99] transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Game Thumbnail Cover */}
                <div className="bg-slate-50 h-32 relative flex items-center justify-center text-4xl overflow-hidden border-b border-slate-100">
                  {/* Game Cover Emoji/Illustration */}
                  <div className="transform group-hover:scale-110 transition-transform duration-300 z-10">
                    {game.image}
                  </div>

                  {/* Tag of subject */}
                  {matchingSubject && (
                    <span className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-xs border border-slate-200 text-[9px] font-heading font-black px-2 py-0.5 rounded-lg shadow-2xs flex items-center gap-1 text-slate-700">
                      <span>{matchingSubject.iconName}</span>
                      <span>{matchingSubject.name}</span>
                    </span>
                  )}

                  {/* Favorite Button */}
                  <button
                    onClick={() => onToggleFavorite(game.id)}
                    className={`absolute top-2.5 right-2.5 p-1.5 rounded-lg border transition-all shadow-2xs cursor-pointer ${
                      isFav 
                        ? 'bg-rose-50 text-rose-500 border-rose-200' 
                        : 'bg-white text-slate-400 border-slate-200 hover:text-rose-500'
                    }`}
                  >
                    <Heart className="h-3.5 w-3.5 fill-current" />
                  </button>

                  {/* XP Tag */}
                  <div className="absolute bottom-2.5 left-2.5 bg-indigo-600 text-white text-[9px] font-heading font-black px-2 py-0.5 rounded-md shadow-xs">
                    +{game.xpReward} XP
                  </div>
                </div>

                {/* Game Info Details */}
                <div className="p-4 sm:p-5 text-left flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-black uppercase tracking-wider ${
                        game.difficulty === 'Easy' ? 'text-emerald-600' :
                        game.difficulty === 'Medium' ? 'text-amber-600' : 'text-rose-600'
                      }`}>
                        {game.difficulty}
                      </span>
                      <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {game.estimatedTime}
                      </span>
                    </div>
                    
                    <h3 className="font-heading font-black text-slate-800 text-sm sm:text-base leading-tight group-hover:text-indigo-600 transition-colors">
                      {game.name}
                    </h3>
                    
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 sm:line-clamp-3">
                      {game.description}
                    </p>
                  </div>

                  {/* Rewards indicators & Action Button */}
                  <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-600 leading-none">
                      <Coins className="h-4 w-4" />
                      <span className="text-[11px] font-heading font-black">+{game.coinsReward} Coins</span>
                    </div>
                    
                    <button
                      onClick={() => onSelectGame(game.id)}
                      className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-heading font-black text-xs rounded-xl flex items-center gap-1.5 transition-all cursor-pointer shadow-xs hover:shadow-md hover:scale-105 active:scale-95"
                    >
                      <span>Play</span>
                      <Gamepad2 className="h-3.5 w-3.5" />
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
        ) : (
          <div className="bg-white border border-dashed border-slate-200 rounded-xl p-8 text-center max-w-sm mx-auto space-y-3">
            <Compass className="h-10 w-10 text-slate-400 mx-auto animate-bounce" />
            <h3 className="font-heading font-black text-slate-700 text-sm">No Board Games Found</h3>
            <p className="text-[11px] text-slate-400">
              We couldn\'t find any game matching "{searchQuery}". Try updating filters.
            </p>
            <button
              onClick={() => {
                setSelectedSubjectFilter('all');
                setDifficultyFilter('all');
                setSearchQuery('');
              }}
              className="text-xs font-heading font-black text-indigo-600 underline hover:text-indigo-800"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* ================= SUBJECT INSTANT PLAY POPUP MODAL ================= */}
      {selectedModalSubject && (() => {
        const modalGames = games.filter(g => g.subjectId === selectedModalSubject.id);
        const boardGames = modalGames.filter(g => g.type === 'board');
        const wordGames = modalGames.filter(g => g.type === 'word');
        
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <div className="bg-white rounded-2xl w-full max-w-2xl border border-slate-100 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-200">
              
              {/* Modal Header */}
              <div className={`p-5 text-white flex items-center justify-between bg-gradient-to-r ${selectedModalSubject.color || 'from-indigo-600 to-indigo-800'}`}>
                <div className="flex items-center gap-3">
                  <span className="text-3xl p-2 bg-white/20 rounded-xl">
                    {selectedModalSubject.iconName}
                  </span>
                  <div className="text-left">
                    <h3 className="font-heading font-black text-lg md:text-xl leading-none">
                      {selectedModalSubject.name}
                    </h3>
                    <p className="text-white/80 text-[11px] mt-1 uppercase font-bold tracking-wider">
                      {t.selectGameTypeSub}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedModalSubject(null)}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
                >
                  <span className="text-xl leading-none">×</span>
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto space-y-6">
                
                {/* Game Types Grid */}
                <div className="grid md:grid-cols-2 gap-4">
                  
                  {/* Board Game Option */}
                  <div className={`border rounded-xl p-4 flex flex-col justify-between space-y-4 transition-all ${
                    boardGames.length > 0 
                      ? 'bg-slate-50 border-slate-200 hover:border-indigo-300 hover:shadow-xs' 
                      : 'bg-slate-50/50 border-slate-100 opacity-60'
                  }`}>
                    <div className="space-y-2 text-left">
                      <div className="flex items-center justify-between">
                        <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg font-bold text-lg">
                          🎲
                        </div>
                        {boardGames.length > 0 ? (
                          <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                            {boardGames.length} {t.availableGamesCount}
                          </span>
                        ) : (
                          <span className="bg-slate-200 text-slate-500 text-[10px] font-bold px-2 py-0.5 rounded-full">
                            {t.comingSoon}
                          </span>
                        )}
                      </div>
                      <h4 className="font-heading font-black text-slate-800 text-base">
                        {t.boardGameMode}
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {t.boardGameModeDesc}
                      </p>
                    </div>

                    {boardGames.length > 0 ? (
                      <button
                        onClick={() => {
                          onSelectGame(boardGames[0].id);
                          setSelectedModalSubject(null);
                        }}
                        className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-heading font-black text-xs rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                      >
                        <span>{t.playNow} ({boardGames[0].name})</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    ) : (
                      <button
                        disabled
                        className="w-full py-2 bg-slate-100 text-slate-400 font-heading font-black text-xs rounded-lg cursor-not-allowed"
                      >
                        {t.comingSoon}
                      </button>
                    )}
                  </div>

                  {/* Word Game Option */}
                  <div className={`border rounded-xl p-4 flex flex-col justify-between space-y-4 transition-all ${
                    wordGames.length > 0 
                      ? 'bg-slate-50 border-slate-200 hover:border-pink-300 hover:shadow-xs' 
                      : 'bg-slate-50/50 border-slate-100 opacity-60'
                  }`}>
                    <div className="space-y-2 text-left">
                      <div className="flex items-center justify-between">
                        <div className="p-2 bg-pink-50 text-pink-600 rounded-lg font-bold text-lg">
                          🔤
                        </div>
                        {wordGames.length > 0 ? (
                          <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                            {wordGames.length} {t.availableGamesCount}
                          </span>
                        ) : (
                          <span className="bg-slate-200 text-slate-500 text-[10px] font-bold px-2 py-0.5 rounded-full">
                            {t.comingSoon}
                          </span>
                        )}
                      </div>
                      <h4 className="font-heading font-black text-slate-800 text-base">
                        {t.wordGameMode}
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {t.wordGameModeDesc}
                      </p>
                    </div>

                    {wordGames.length > 0 ? (
                      <button
                        onClick={() => {
                          onSelectGame(wordGames[0].id);
                          setSelectedModalSubject(null);
                        }}
                        className="w-full py-2 bg-pink-600 hover:bg-pink-700 text-white font-heading font-black text-xs rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                      >
                        <span>{t.playNow} ({wordGames[0].name})</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    ) : (
                      <button
                        disabled
                        className="w-full py-2 bg-slate-100 text-slate-400 font-heading font-black text-xs rounded-lg cursor-not-allowed"
                      >
                        {t.comingSoon}
                      </button>
                    )}
                  </div>

                </div>

                {/* Specific Games Listing */}
                {modalGames.length > 0 && (
                  <div className="space-y-3 pt-4 border-t border-slate-100">
                    <h4 className="font-heading font-black text-slate-800 text-xs uppercase tracking-wider text-left">
                      {t.orChooseAvailableGames}
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {modalGames.map((game) => (
                        <div 
                          key={game.id}
                          className="p-3 bg-white border border-slate-200 hover:border-slate-300 rounded-lg flex items-center justify-between gap-3 shadow-2xs"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span className="text-2xl p-1.5 bg-slate-50 rounded-md shrink-0">{game.image}</span>
                            <div className="text-left min-w-0">
                              <h5 className="font-heading font-black text-slate-800 text-xs truncate">
                                {game.name}
                              </h5>
                              <div className="flex items-center gap-1.5 mt-0.5 text-[9px] text-slate-400 font-bold">
                                <span className={
                                  game.difficulty === 'Easy' ? 'text-emerald-600' :
                                  game.difficulty === 'Medium' ? 'text-amber-600' : 'text-rose-600'
                                }>
                                  {game.difficulty}
                                </span>
                                <span>•</span>
                                <span>{game.estimatedTime}</span>
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              onSelectGame(game.id);
                              setSelectedModalSubject(null);
                            }}
                            className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-white font-heading font-black text-[10px] rounded-md transition-all cursor-pointer shrink-0"
                          >
                            {t.playNow}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>

              {/* Modal Footer */}
              <div className="bg-slate-50 p-4 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => setSelectedModalSubject(null)}
                  className="px-4 py-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-heading font-bold text-xs rounded-xl transition-all cursor-pointer"
                >
                  {t.close}
                </button>
              </div>

            </div>
          </div>
        );
      })()}

    </div>
  );
}
