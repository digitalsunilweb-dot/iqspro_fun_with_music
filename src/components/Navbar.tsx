import React, { useState } from 'react';
import { 
  Trophy, 
  Sparkles, 
  Coins, 
  Flame, 
  User, 
  Settings, 
  Menu, 
  X, 
  Gift, 
  GraduationCap,
  ChevronRight
} from 'lucide-react';
import { UserProgress } from '../types';
import { translations } from '../lib/translations';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  progress: UserProgress;
  onClassGroupReset: () => void;
}

export default function Navbar({ currentTab, setCurrentTab, progress, onClassGroupReset }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lang = progress.language || 'en';
  const t = translations[lang];

  const navItems = [
    { id: 'home', label: t.home, icon: GraduationCap },
    { id: 'rewards', label: t.rewards, icon: Gift },
    { id: 'leaderboard', label: t.leaderboard, icon: Trophy },
    { id: 'profile', label: t.profile, icon: User },
    { id: 'admin', label: t.admin, icon: Settings },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-xs px-3 py-2 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => { setCurrentTab('home'); }} 
          className="flex items-center gap-1.5 sm:gap-2 cursor-pointer group"
        >
          <div className="bg-indigo-600 text-white p-1.5 sm:p-2 rounded-xl shadow-xs border border-indigo-700 transition-all duration-200 group-hover:scale-105">
            <Trophy className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
          <div>
            <div className="flex items-center gap-1 sm:gap-1.5 leading-none">
              <span className="font-heading font-black text-sm sm:text-base md:text-lg tracking-tighter uppercase italic text-indigo-900">
                IQS Pro
              </span>
              <span className="bg-amber-400 text-amber-950 font-mono font-black text-[8px] sm:text-[9px] px-1 sm:px-1.5 py-0.5 rounded-sm">
                GAMES
              </span>
            </div>
            <span className="text-[8px] sm:text-[9px] text-slate-400 font-bold hidden sm:block mt-0.5 tracking-widest uppercase">
              Play • Learn • Grow
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-heading font-black tracking-tight transition-all duration-150 ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
                }`}
              >
                <IconComponent className="h-4 w-4" />
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Gamified Stat Tags (Coins, Diamonds, Level, Streak) */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          
          {/* Compact Pill Statistics Design */}
          <div className="flex items-center gap-2 sm:gap-3 bg-slate-50 border border-slate-200 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs font-bold text-slate-700 shadow-2xs">
            {/* Level Display */}
            <div className="flex items-center gap-0.5 sm:gap-1 hover:text-indigo-600 transition-colors">
              <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-indigo-600" />
              <span className="text-[9px] sm:text-[10px] font-black uppercase text-slate-400 mr-0.5 hidden md:inline">LVL</span>
              <span className="font-heading font-black text-xs sm:text-sm text-indigo-950">{progress.level}</span>
            </div>

            {/* Streak */}
            <div className="border-l border-slate-200 pl-2 sm:pl-3 flex items-center gap-0.5 sm:gap-1 hover:text-orange-600 transition-colors">
              <Flame className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-orange-500" />
              <span className="font-heading font-black text-xs sm:text-sm text-slate-950">{progress.streak}d</span>
            </div>

            {/* Coins */}
            <div className="border-l border-slate-200 pl-2 sm:pl-3 flex items-center gap-0.5 sm:gap-1 hover:text-amber-600 transition-colors">
              <Coins className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-amber-500" />
              <span className="font-heading font-black text-xs sm:text-sm text-slate-950">{progress.coins}</span>
            </div>
          </div>

          {/* Selected Class reset button */}
          {progress.selectedClass && (
            <button
              onClick={onClassGroupReset}
              className="hidden sm:flex items-center gap-1 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-full font-heading font-extrabold transition-all border border-slate-200"
            >
              <GraduationCap className="h-3.5 w-3.5 text-slate-600" />
              <span>{progress.selectedClass}</span>
              <ChevronRight className="h-3 w-3 text-slate-400" />
              <span className="text-slate-500 font-semibold text-[10px] uppercase">Change</span>
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden bg-slate-100 hover:bg-slate-200 text-slate-700 p-1.5 sm:p-2 rounded-xl transition-all border border-slate-200"
          >
            {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMenuOpen && (
        <div className="lg:hidden mt-2 pt-2 border-t border-slate-100 flex flex-col gap-1.5 bg-white rounded-2xl p-2 shadow-xl absolute left-3 right-3 top-[52px] sm:top-[60px] z-50 animate-in fade-in slide-in-from-top-4 duration-200">
          {progress.selectedClass && (
            <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl mb-1">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-indigo-600" />
                <span className="text-sm font-heading font-bold text-slate-700">Class: {progress.selectedClass}</span>
              </div>
              <button 
                onClick={() => { onClassGroupReset(); setIsMenuOpen(false); }}
                className="text-xs text-indigo-600 font-bold hover:underline"
              >
                Change Class
              </button>
            </div>
          )}
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentTab(item.id);
                  setIsMenuOpen(false);
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-heading font-bold transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <IconComponent className="h-5 w-5" />
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </nav>
  );
}
