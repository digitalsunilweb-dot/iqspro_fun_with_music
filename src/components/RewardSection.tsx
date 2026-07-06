import React, { useState } from 'react';
import { 
  Gift, 
  Coins, 
  Sparkles, 
  Award, 
  Lock, 
  Unlock, 
  CheckCircle, 
  RotateCcw,
  Sparkle,
  ArrowRight,
  ShieldAlert,
  ChevronRight,
  Star,
  Tv
} from 'lucide-react';
import { UserProgress, Badge } from '../types';

interface RewardSectionProps {
  progress: UserProgress;
  badges: Badge[];
  onClaimDailyBonus: (coins: number, xp: number, type: 'daily' | 'weekly' | 'monthly') => void;
  onSpinReward: (coins: number, xp: number, diamonds: number) => void;
}

const SPIN_SECTORS = [
  { text: '+50 Coins', color: 'bg-indigo-500', coins: 50, xp: 0, d: 0 },
  { text: '+20 Diamonds', color: 'bg-purple-500', coins: 0, xp: 0, d: 20 },
  { text: '+100 XP Spark', color: 'bg-pink-500', coins: 0, xp: 100, d: 0 },
  { text: 'Try Again', color: 'bg-slate-400', coins: 0, xp: 0, d: 0 },
  { text: '+200 Coins Jack', color: 'bg-amber-500', coins: 200, xp: 0, d: 0 },
  { text: '+50 XP Boost', color: 'bg-indigo-400', coins: 0, xp: 50, d: 0 },
  { text: '+50 Diamonds Grand', color: 'bg-emerald-500', coins: 0, xp: 0, d: 50 },
  { text: 'Lucky Star Box', color: 'bg-rose-500', coins: 100, xp: 50, d: 10 }
];

export default function RewardSection({ progress, badges, onClaimDailyBonus, onSpinReward }: RewardSectionProps) {
  // Spin wheel states
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinDeg, setSpinDeg] = useState(0);
  const [spinWinner, setSpinWinner] = useState<string | null>(null);
  
  // Mystery box states
  const [isChestOpen, setIsChestOpen] = useState(false);
  const [chestLoot, setChestLoot] = useState<string | null>(null);
  const [isChestShaking, setIsChestShaking] = useState(false);

  // Claims tracker
  const [dailyClaimed, setDailyClaimed] = useState(false);
  const [weeklyClaimed, setWeeklyClaimed] = useState(false);
  const [monthlyClaimed, setMonthlyClaimed] = useState(false);

  // Trigger Spin Wheel animation
  const handleSpinWheel = () => {
    if (isSpinning) return;
    
    // Validate cost
    if (progress.coins < 50) {
      alert("You need at least 50 coins to spin!");
      return;
    }

    setIsSpinning(true);
    setSpinWinner(null);

    // Randomize winning sector
    const sectorIndex = Math.floor(Math.random() * SPIN_SECTORS.length);
    const degreePerSector = 360 / SPIN_SECTORS.length;
    
    // Add extra rotations for speed effect, alignments
    const extraRotations = 5 * 360; 
    const finalDegree = extraRotations + (360 - (sectorIndex * degreePerSector));
    
    setSpinDeg(finalDegree);

    setTimeout(() => {
      setIsSpinning(false);
      const winner = SPIN_SECTORS[sectorIndex];
      setSpinWinner(winner.text);
      
      // Credit
      onSpinReward(winner.coins, winner.xp, winner.d);
    }, 4000);
  };

  // Trigger Mystery box shake & open
  const openMysteryChest = () => {
    if (isChestOpen) {
      // Close/reset
      setIsChestOpen(false);
      setChestLoot(null);
      return;
    }

    if (progress.coins < 100) {
      alert("You need at least 100 coins to unlock the Mystery Chest!");
      return;
    }

    setIsChestShaking(true);

    setTimeout(() => {
      setIsChestShaking(false);
      setIsChestOpen(true);
      
      // Determine random chest loot
      const loots = [
        "👑 Cosmic Crown Avatar Symbol (+150 Coins)",
        "🌟 Star Overlord Badge & 100 XP Boost",
        "💎 50 Rare Blue Diamonds Pack!",
        "🔥 Double Streak Saver Safeguard token!"
      ];
      const randomLoot = loots[Math.floor(Math.random() * loots.length)];
      setChestLoot(randomLoot);

      // Credit rewards
      onClaimDailyBonus(150, 100, 'daily');
    }, 1200);
  };

  // Handle Claims
  const handleClaim = (type: 'daily' | 'weekly' | 'monthly') => {
    if (type === 'daily') {
      if (dailyClaimed) return;
      setDailyClaimed(true);
      onClaimDailyBonus(50, 20, 'daily');
    } else if (type === 'weekly') {
      if (weeklyClaimed) return;
      setWeeklyClaimed(true);
      onClaimDailyBonus(250, 100, 'weekly');
    } else {
      if (monthlyClaimed) return;
      setMonthlyClaimed(true);
      onClaimDailyBonus(1000, 300, 'monthly');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12 text-left relative overflow-hidden">
      
      {/* Decorative vectors */}
      <div className="absolute top-1/4 right-0 w-72 h-72 bg-amber-200/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-72 h-72 bg-indigo-200/10 rounded-full blur-3xl pointer-events-none" />

      {/* Hero Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 text-xs font-heading font-black uppercase px-3 py-1 rounded-full shadow-xs">
          <Gift className="h-4 w-4 animate-bounce" />
          <span>IQS REWARD HUB</span>
        </div>
        <h1 className="font-heading font-black text-2xl sm:text-3xl text-slate-900 tracking-tight leading-none">
          Spin, Win, & Earn Badges!
        </h1>
        <p className="text-slate-500 text-xs">
          Spend your study coins to spin the wheel of fortune, open mystery chests, or lock in your milestone trophies.
        </p>
      </div>

      {/* ================= REWARD ENGINES GRID (SPIN & CHEST) ================= */}
      <div className="grid md:grid-cols-12 gap-4 items-start">
        
        {/* SPIN THE WHEEL PORTAL (COL-SPAN-7) */}
        <div className="md:col-span-7 bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs flex flex-col md:flex-row items-center gap-6 relative overflow-hidden">
          
          <div className="absolute top-4 left-4 bg-indigo-50 text-indigo-800 text-[10px] font-bold px-3 py-1 rounded-full uppercase">
            Spins of Fortune
          </div>

          {/* Graphical circular Spin Wheel */}
          <div className="relative w-64 h-64 shrink-0 flex items-center justify-center">
            
            {/* Center Pointer indicator */}
            <div className="absolute top-[-8px] left-1/2 -translate-x-1/2 z-20 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[20px] border-t-indigo-600 drop-shadow-md" />

            {/* The Wheel element itself */}
            <div 
              className="w-full h-full rounded-full border-8 border-indigo-950 shadow-xl overflow-hidden relative transition-transform duration-4000 cubic-bezier(0.1, 0.8, 0.3, 1) ease-out bg-slate-900"
              style={{ 
                transform: `rotate(${spinDeg}deg)`,
                backgroundImage: 'conic-gradient(#4f46e5 0% 12.5%, #a855f7 12.5% 25%, #ec4899 25% 37.5%, #f43f5e 37.5% 50%, #f59e0b 50% 62.5%, #06b6d4 62.5% 75%, #10b981 75% 87.5%, #64748b 87.5% 100%)'
              }}
            >
              {/* Render labels within sectors using SVG overlay or absolute rotators */}
              {SPIN_SECTORS.map((sector, idx) => (
                <div 
                  key={idx}
                  className="absolute top-0 left-0 w-full h-full text-white text-[9px] font-bold text-center pt-5 origin-center"
                  style={{ transform: `rotate(${idx * 45}deg)` }}
                >
                  <span className="inline-block bg-indigo-950/80 px-2 py-0.5 rounded-full select-none shadow-xs">
                    {sector.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Center golden trigger node */}
            <button
              disabled={isSpinning || progress.coins < 50}
              onClick={handleSpinWheel}
              className="absolute w-16 h-16 rounded-full bg-amber-400 border-4 border-white text-amber-950 font-poppins font-black text-xs uppercase flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95 disabled:bg-slate-200 disabled:text-slate-400 cursor-pointer z-10 animate-pulse-soft"
            >
              SPIN
            </button>
          </div>

          {/* Description & Rewards recap */}
          <div className="space-y-4 flex-1 text-left">
            <h3 className="font-poppins font-extrabold text-slate-800 text-lg leading-tight">
              Fortune Wheel Spin
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              For only <strong className="text-amber-600">50 Coins</strong>, test your luck to win high-tier XP blocks, valuable diamonds, and extra coins!
            </p>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
              <span className="text-[10px] text-slate-400 font-bold block uppercase mb-1">CURRENT WALLET</span>
              <div className="flex gap-4">
                <span className="font-heading font-black text-amber-600 flex items-center gap-1">
                  <Coins className="h-4 w-4" /> {progress.coins} Coins
                </span>
                <span className="font-heading font-black text-indigo-600 flex items-center gap-1">
                  💎 {progress.diamonds} Diamonds
                </span>
              </div>
            </div>

            {spinWinner && (
              <div className="bg-emerald-50 border border-emerald-100 text-emerald-800 p-3 rounded-xl flex items-center gap-2 animate-bounce">
                <Sparkles className="h-4 w-4 text-emerald-600" />
                <span className="text-xs font-bold font-heading">
                  Congratulations! You won: <strong>{spinWinner}</strong>
                </span>
              </div>
            )}
          </div>

        </div>

        {/* LUCKY MYSTERY CHEST (COL-SPAN-5) */}
        <div className="md:col-span-5 bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs flex flex-col justify-between items-center text-center h-full relative overflow-hidden min-h-[290px]">
          
          <div className="absolute top-4 left-4 bg-amber-50 text-amber-800 text-[10px] font-bold px-3 py-1 rounded-full uppercase">
            Lucky Box Loot
          </div>

          {/* Graphical Chest */}
          <div className="py-6 relative flex flex-col justify-center items-center">
            
            {/* The Chest Box Container with shakes */}
            <div 
              onClick={openMysteryChest}
              className={`text-7xl cursor-pointer select-none transition-transform duration-300 ${
                isChestShaking ? 'animate-bounce' : 'hover:scale-110 active:scale-95'
              }`}
            >
              {isChestOpen ? '🔓🎁' : '🔒🎁'}
            </div>

            {isChestShaking && (
              <p className="text-xs text-amber-500 font-bold animate-pulse mt-4">Unlocking chest code...</p>
            )}
          </div>

          <div className="space-y-4 w-full">
            <div>
              <h3 className="font-poppins font-extrabold text-slate-800 text-base">
                {isChestOpen ? 'Loot Box Opened!' : 'Mystery Loot Box'}
              </h3>
              <p className="text-xs text-slate-400 max-w-xs mx-auto mt-1">
                Open for <strong className="text-indigo-600">100 Coins</strong> to secure top-tier certified badges and double point multipliers!
              </p>
            </div>

            {chestLoot && (
              <div className="bg-indigo-50 border border-indigo-100 text-indigo-900 p-3 rounded-xl text-xs font-heading font-black">
                {chestLoot}
              </div>
            )}

            <button
              onClick={openMysteryChest}
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-heading font-black text-xs rounded-xl transition-all cursor-pointer shadow-xs"
            >
              {isChestOpen ? 'Reset Chest Box' : 'Unlock Loot Chest'}
            </button>
          </div>

        </div>

      </div>

      {/* ================= CLAIMABLE BONUSES ================= */}
      <div>
        <h2 className="text-xl font-heading font-black text-slate-900 mb-4">
          Daily, Weekly, & Monthly Login Bonuses
        </h2>

        <div className="grid sm:grid-cols-3 gap-4">
          
          {/* Daily */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col justify-between items-start space-y-3 hover:shadow-2xs transition-all">
            <div className="flex justify-between items-start w-full">
              <span className="bg-orange-100 text-orange-800 text-[10px] font-black uppercase px-2 py-0.5 rounded-md">
                DAILY CLAIM
              </span>
              <span className="text-xs text-slate-400 font-bold">24h Loop</span>
            </div>
            
            <div className="space-y-1">
              <h4 className="font-heading font-black text-slate-800 text-base">Daily Starters</h4>
              <p className="text-xs text-slate-500">Claim and secure base coins to spend in playground.</p>
            </div>

            <div className="flex gap-3 text-xs font-heading font-extrabold text-slate-700">
              <span className="flex items-center gap-1"><Coins className="h-4 w-4 text-amber-500" /> +50</span>
              <span className="flex items-center gap-1"><Sparkles className="h-4 w-4 text-indigo-500" /> +20 XP</span>
            </div>

            <button
              disabled={dailyClaimed}
              onClick={() => handleClaim('daily')}
              className={`w-full py-2.5 rounded-xl text-xs font-heading font-black transition-all ${
                dailyClaimed 
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer shadow-sm shadow-indigo-100'
              }`}
            >
              {dailyClaimed ? 'Claimed ✓' : 'Claim Daily +50'}
            </button>
          </div>

          {/* Weekly */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col justify-between items-start space-y-3 hover:shadow-2xs transition-all">
            <div className="flex justify-between items-start w-full">
              <span className="bg-indigo-100 text-indigo-800 text-[10px] font-black uppercase px-2 py-0.5 rounded-md">
                WEEKLY CHALLENGE
              </span>
              <span className="text-xs text-slate-400 font-bold">Every Sunday</span>
            </div>
            
            <div className="space-y-1">
              <h4 className="font-heading font-black text-slate-800 text-base">Weekly Legends</h4>
              <p className="text-xs text-slate-500">Awarded for active streaks of 5+ days.</p>
            </div>

            <div className="flex gap-3 text-xs font-heading font-extrabold text-slate-700">
              <span className="flex items-center gap-1"><Coins className="h-4 w-4 text-amber-500" /> +250</span>
              <span className="flex items-center gap-1"><Sparkles className="h-4 w-4 text-indigo-500" /> +100 XP</span>
            </div>

            <button
              disabled={weeklyClaimed}
              onClick={() => handleClaim('weekly')}
              className={`w-full py-2.5 rounded-xl text-xs font-heading font-black transition-all ${
                weeklyClaimed 
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer shadow-sm shadow-indigo-100'
              }`}
            >
              {weeklyClaimed ? 'Claimed ✓' : 'Claim Weekly +250'}
            </button>
          </div>

          {/* Monthly */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col justify-between items-start space-y-3 hover:shadow-2xs transition-all">
            <div className="flex justify-between items-start w-full">
              <span className="bg-purple-100 text-purple-800 text-[10px] font-black uppercase px-2 py-0.5 rounded-md">
                MONTHLY GRAND
              </span>
              <span className="text-xs text-slate-400 font-bold">30d Mark</span>
            </div>
            
            <div className="space-y-1">
              <h4 className="font-heading font-black text-slate-800 text-base">Monthly Emperor</h4>
              <p className="text-xs text-slate-500">Unlocks standard diamond vault boxes for elite custom profiles.</p>
            </div>

            <div className="flex gap-3 text-xs font-heading font-extrabold text-slate-700">
              <span className="flex items-center gap-1"><Coins className="h-4 w-4 text-amber-500" /> +1000</span>
              <span className="flex items-center gap-1">💎 +30 Diamonds</span>
            </div>

            <button
              disabled={monthlyClaimed}
              onClick={() => handleClaim('monthly')}
              className={`w-full py-2.5 rounded-xl text-xs font-heading font-black transition-all ${
                monthlyClaimed 
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer shadow-sm shadow-indigo-100'
              }`}
            >
              {monthlyClaimed ? 'Claimed ✓' : 'Claim Monthly +1000'}
            </button>
          </div>

        </div>
      </div>

      {/* ================= THE BADGE CABINET ================= */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-heading font-black text-slate-900">
              Your Badge Cabinet
            </h2>
            <p className="text-slate-400 text-xs mt-0.5">
              Complete subject requirements, maintain high answer accuracy, and unlock printable milestone certificates.
            </p>
          </div>

          <div className="text-right">
            <span className="text-[9px] text-slate-400 font-bold block uppercase leading-none">UNLOCKED STATUS</span>
            <span className="text-sm font-heading font-black text-indigo-600">
              {badges.filter(b => b.isUnlocked).length} / {badges.length} Badges
            </span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {badges.map((badge) => {
            return (
              <div
                key={badge.id}
                className={`p-4 rounded-xl border text-left flex items-start gap-3 transition-all relative overflow-hidden ${
                  badge.isUnlocked
                    ? 'bg-white border-slate-200 shadow-2xs'
                    : 'bg-slate-50 border-slate-200 opacity-60'
                }`}
              >
                {/* Visual badge icon */}
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-sm shrink-0 transition-transform ${
                  badge.isUnlocked ? 'bg-indigo-50 text-indigo-600 scale-100' : 'bg-slate-100 text-slate-400'
                }`}>
                  {badge.iconName}
                </div>

                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-heading font-black text-slate-800 text-sm leading-tight">
                      {badge.name}
                    </h4>
                    {badge.isUnlocked ? (
                      <Unlock className="h-3.5 w-3.5 text-indigo-600 shrink-0" />
                    ) : (
                      <Lock className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    )}
                  </div>
                  
                  <p className="text-[11px] text-slate-400 leading-normal">
                    {badge.description}
                  </p>

                  <span className="text-[9px] font-black uppercase text-indigo-500 bg-indigo-50/60 px-2 py-0.5 rounded-md inline-block mt-2">
                    {badge.reqText}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
