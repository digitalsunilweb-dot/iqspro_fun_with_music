import React, { useState, useEffect, useRef } from 'react';
import { 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  ArrowLeft, 
  HelpCircle, 
  Play, 
  Pause, 
  Clock, 
  Coins, 
  Sparkles, 
  Star, 
  Check, 
  X, 
  ChevronRight, 
  AlertCircle,
  Award,
  Share2,
  Bookmark,
  CheckCircle2,
  Shuffle,
  Music
} from 'lucide-react';
import { Game, QuizQuestion, GameState, UserProgress } from '../types';
import { getQuestionsByGroupAndSubject } from '../data/questions';
import { translations } from '../lib/translations';
import { Confetti } from './Confetti';

interface GameBoardPlayProps {
  game: Game;
  progress: UserProgress;
  onFinishGame: (earnedCoins: number, earnedXP: number, wonBadgeId?: string, earnedCertificate?: boolean) => void;
  onQuit: () => void;
}

// Visual layout coordinates for 20 board tiles in a beautiful winding "S" shape.
// Grid represents width 1000, height 300
const BOARD_TILES = [
  { id: 0, label: 'Start', x: 60, y: 150, type: 'start', color: 'bg-indigo-500' },
  { id: 1, label: 'Tile 1', x: 130, y: 100, type: 'normal', color: 'bg-indigo-400' },
  { id: 2, label: 'Tile 2', x: 200, y: 70, type: 'normal', color: 'bg-purple-400' },
  { id: 3, label: 'Tile 3', x: 280, y: 80, type: 'normal', color: 'bg-pink-400' },
  { id: 4, label: 'Star Box', x: 350, y: 130, type: 'reward', color: 'bg-amber-400', bonus: 'Double Rewards' },
  { id: 5, label: 'Tile 5', x: 400, y: 210, type: 'normal', color: 'bg-indigo-400' },
  { id: 6, label: 'Tile 6', x: 350, y: 270, type: 'normal', color: 'bg-purple-400' },
  { id: 7, label: 'Tile 7', x: 260, y: 280, type: 'normal', color: 'bg-pink-400' },
  { id: 8, label: 'Warp Boost', x: 180, y: 260, type: 'boost', color: 'bg-emerald-400', bonus: 'Slide +2 Forward' },
  { id: 9, label: 'Tile 9', x: 120, y: 210, type: 'normal', color: 'bg-indigo-400' },
  { id: 10, label: 'Tile 10', x: 160, y: 140, type: 'normal', color: 'bg-purple-400' },
  { id: 11, label: 'Tile 11', x: 230, y: 180, type: 'normal', color: 'bg-pink-400' },
  { id: 12, label: 'Mystery', x: 310, y: 190, type: 'mystery', color: 'bg-cyan-400', bonus: 'Lucky Reward Card' },
  { id: 13, label: 'Tile 13', x: 420, y: 120, type: 'normal', color: 'bg-indigo-400' },
  { id: 14, label: 'Tile 14', x: 500, y: 70, type: 'normal', color: 'bg-purple-400' },
  { id: 15, label: 'Tile 15', x: 580, y: 90, type: 'normal', color: 'bg-pink-400' },
  { id: 16, label: 'Trivia Gate', x: 650, y: 150, type: 'trivia', color: 'bg-rose-400', bonus: 'Trivia Quiz Challenge' },
  { id: 17, label: 'Tile 17', x: 720, y: 220, type: 'normal', color: 'bg-indigo-400' },
  { id: 18, label: 'Tile 18', x: 800, y: 250, type: 'normal', color: 'bg-purple-400' },
  { id: 19, label: 'Finish', x: 890, y: 170, type: 'finish', color: 'bg-gradient-to-tr from-amber-500 to-rose-500' }
];

export default function GameBoardPlay({ game, progress, onFinishGame, onQuit }: GameBoardPlayProps) {
  // Game Play variables
  const [currentPosition, setCurrentPosition] = useState(0);
  const [diceRolled, setDiceRolled] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [currentDiceValue, setCurrentDiceValue] = useState(1);
  const [diceCount, setDiceCount] = useState<number>(1);
  const [rolledDiceValues, setRolledDiceValues] = useState<number[]>([1]);
  const [isMapExpanded, setIsMapExpanded] = useState<boolean>(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState<boolean>(false);

  const lang = progress.language || 'en';
  const t = translations[lang] || translations.en;
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [earnedCoins, setEarnedCoins] = useState(0);
  const [earnedXP, setEarnedXP] = useState(0);
  const [earnedStars, setEarnedStars] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  
  // Timer & Sound states
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showExitModal, setShowExitModal] = useState(false);
  const [showShareNotification, setShowShareNotification] = useState(false);

  // Background Music State & Refs
  const [musicPlaying, setMusicPlaying] = useState<boolean>(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const musicIntervalRef = useRef<any>(null);
  const noteIndexRef = useRef<number>(0);

  const MELODY = [
    261.63, 329.63, 392.00, 440.00, 523.25, 392.00, 329.63, 293.66,
    329.63, 392.00, 440.00, 523.25, 659.25, 523.25, 440.00, 392.00
  ];

  const startMusic = () => {
    if (musicIntervalRef.current) return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioContextRef.current = ctx;
      noteIndexRef.current = 0;

      const playNextNote = () => {
        if (!ctx || ctx.state === 'closed') return;
        if (ctx.state === 'suspended') {
          ctx.resume();
        }
        const idx = noteIndexRef.current;
        const melodyFreq = MELODY[idx % MELODY.length];

        // Melody note
        const oscMelody = ctx.createOscillator();
        const gainMelody = ctx.createGain();
        oscMelody.connect(gainMelody);
        gainMelody.connect(ctx.destination);
        oscMelody.type = 'triangle';
        oscMelody.frequency.setValueAtTime(melodyFreq, ctx.currentTime);
        gainMelody.gain.setValueAtTime(0.012, ctx.currentTime);
        gainMelody.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.22);
        oscMelody.start();
        oscMelody.stop(ctx.currentTime + 0.25);

        // Bass note
        if (idx % 4 === 0) {
          const bassFreqs = [130.81, 164.81, 196.00, 220.00];
          const bassFreq = bassFreqs[Math.floor(idx / 4) % bassFreqs.length];
          const oscBass = ctx.createOscillator();
          const gainBass = ctx.createGain();
          oscBass.connect(gainBass);
          gainBass.connect(ctx.destination);
          oscBass.type = 'sine';
          oscBass.frequency.setValueAtTime(bassFreq, ctx.currentTime);
          gainBass.gain.setValueAtTime(0.025, ctx.currentTime);
          gainBass.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.45);
          oscBass.start();
          oscBass.stop(ctx.currentTime + 0.5);
        }
        noteIndexRef.current = idx + 1;
      };

      playNextNote();
      musicIntervalRef.current = setInterval(playNextNote, 250);
      setMusicPlaying(true);
    } catch (e) {
      console.warn("Failed to start background music", e);
    }
  };

  const stopMusic = () => {
    if (musicIntervalRef.current) {
      clearInterval(musicIntervalRef.current);
      musicIntervalRef.current = null;
    }
    if (audioContextRef.current) {
      try {
        audioContextRef.current.close();
      } catch (e) {}
      audioContextRef.current = null;
    }
    setMusicPlaying(false);
  };

  const toggleMusic = () => {
    if (musicPlaying) {
      stopMusic();
    } else {
      startMusic();
    }
  };

  // Clean up music on unmount
  useEffect(() => {
    return () => {
      if (musicIntervalRef.current) {
        clearInterval(musicIntervalRef.current);
      }
      if (audioContextRef.current) {
        try {
          audioContextRef.current.close();
        } catch (e) {}
      }
    };
  }, []);

  // Active Challenge question states
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [usedQuestionIds, setUsedQuestionIds] = useState<string[]>([]);
  const [activeQuestion, setActiveQuestion] = useState<QuizQuestion | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [hintUsed, setHintUsed] = useState(false);
  const [showBonusOverlay, setShowBonusOverlay] = useState<string | null>(null);

  // Audio Synth triggers
  const playSynthSound = (type: 'correct' | 'wrong' | 'dice' | 'win' | 'boost') => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      if (type === 'correct') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
        osc.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.1); // E5
        osc.frequency.setValueAtTime(783.99, audioCtx.currentTime + 0.2); // G5
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.4);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.45);
      } else if (type === 'wrong') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, audioCtx.currentTime); // A3
        osc.frequency.setValueAtTime(147, audioCtx.currentTime + 0.15); // D3
        gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.35);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.4);
      } else if (type === 'dice') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.25);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.25);
      } else if (type === 'boost') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
        osc.frequency.setValueAtTime(880, audioCtx.currentTime + 0.1); // A5
        gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.35);
      } else if (type === 'win') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
        osc.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.08); // E5
        osc.frequency.setValueAtTime(783.99, audioCtx.currentTime + 0.16); // G5
        osc.frequency.setValueAtTime(1046.50, audioCtx.currentTime + 0.24); // C6
        gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.6);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.7);
      }
    } catch (e) {
      console.warn("Speech/AudioContext is not fully initialized inside frame environment.", e);
    }
  };

  // Fetch Questions
  useEffect(() => {
    const loadedQuestions = getQuestionsByGroupAndSubject(
      progress.classGroupId || 'primary',
      game.subjectId
    );
    setQuestions(loadedQuestions);
    
    // Timer Effect
    const interval = setInterval(() => {
      if (!isPaused && !gameOver) {
        setTimerSeconds(prev => prev + 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [progress.classGroupId, game.subjectId, isPaused, gameOver]);

  // Roll Dice Function
  const rollDice = (countToUse?: number) => {
    if (isMoving || activeQuestion) return;
    
    if (!musicPlaying && soundEnabled) {
      startMusic();
    }
    
    playSynthSound('dice');
    setDiceRolled(true);
    setIsMoving(true);

    const actualCount = countToUse !== undefined ? countToUse : diceCount;
    if (countToUse !== undefined) {
      setDiceCount(countToUse);
    }

    let diceVal = 0;
    const newValues: number[] = [];

    if (actualCount === 1) {
      const val = Math.floor(Math.random() * 4) + 1; // 1 to 4 steps
      diceVal = val;
      newValues.push(val);
    } else if (actualCount === 2) {
      const val1 = Math.floor(Math.random() * 3) + 1; // 1 to 3 steps
      const val2 = Math.floor(Math.random() * 3) + 1; // 1 to 3 steps
      diceVal = val1 + val2;
      newValues.push(val1, val2);
    } else {
      const val1 = Math.floor(Math.random() * 2) + 1; // 1 to 2 steps
      const val2 = Math.floor(Math.random() * 2) + 1; // 1 to 2 steps
      const val3 = Math.floor(Math.random() * 2) + 1; // 1 to 2 steps
      diceVal = val1 + val2 + val3;
      newValues.push(val1, val2, val3);
    }

    setRolledDiceValues(newValues);
    setCurrentDiceValue(diceVal);

    // Simulate dice rolling micro-animations
    setTimeout(() => {
      // Move token smoothly step by step
      let stepCount = 0;
      const moveInterval = setInterval(() => {
        setCurrentPosition(prev => {
          const next = Math.min(prev + 1, BOARD_TILES.length - 1);
          stepCount++;
          if (stepCount >= diceVal || next === BOARD_TILES.length - 1) {
            clearInterval(moveInterval);
            setIsMoving(false);
            setDiceRolled(false);
            
            // Check landing tile challenges
            setTimeout(() => {
              triggerTileAction(next);
            }, 600);
          }
          return next;
        });
      }, 300);
    }, 600);
  };

  // Trigger specific card tile actions on landing
  const triggerTileAction = (tileId: number) => {
    const tile = BOARD_TILES[tileId];

    if (tile.type === 'finish') {
      // Completed!
      setGameOver(true);
      playSynthSound('win');
      return;
    }

    // Pull a random question matching subject without repeats
    if (questions.length > 0) {
      let availableQuestions = questions.filter(q => !usedQuestionIds.includes(q.id));
      
      // If we used all 500 questions (unlikely), reset the used list to start fresh
      if (availableQuestions.length === 0) {
        availableQuestions = questions;
        setUsedQuestionIds([questions[0].id]);
        const randQ = questions[0];
        setActiveQuestion(randQ);
      } else {
        const randQ = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
        setActiveQuestion(randQ);
        setUsedQuestionIds(prev => [...prev, randQ.id]);
      }
      
      setSelectedAnswer(null);
      setIsAnswerSubmitted(false);
      setIsAnswerCorrect(null);
      setHintUsed(false);

      // Trigger Visual Overlay for special tile bonuses
      if (tile.type === 'reward') {
        setShowBonusOverlay('🌟 Star Tile: Correct answers give DOUBLE coins + stars!');
      } else if (tile.type === 'boost') {
        setShowBonusOverlay('🚀 Warp Tile: Solving this correct wraps you +2 tiles forward!');
      } else if (tile.type === 'mystery') {
        setShowBonusOverlay('🎁 Mystery Chest: Earn +50 bonus coins for answering!');
      } else if (tile.type === 'trivia') {
        setShowBonusOverlay('🔥 Trivia Gate: Harder challenge, double XP rewards!');
      } else {
        setShowBonusOverlay(null);
      }
    }
  };

  // Submit Answer Action
  const submitAnswer = () => {
    if (!activeQuestion || !selectedAnswer || isAnswerSubmitted) return;

    const isCorrect = selectedAnswer === activeQuestion.correctAnswer;
    setIsAnswerSubmitted(true);
    setIsAnswerCorrect(isCorrect);
    setQuestionsAnswered(prev => prev + 1);

    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1);
      playSynthSound('correct');

      // Base Rewards
      let baseCoins = game.coinsReward / 3; // divided since there are multiple steps
      let baseXP = game.xpReward / 3;
      let starsReward = 1;

      // Special tile multipliers
      const currentTile = BOARD_TILES[currentPosition];
      if (currentTile.type === 'reward') {
        baseCoins *= 2;
        starsReward += 1;
      } else if (currentTile.type === 'mystery') {
        baseCoins += 50;
      } else if (currentTile.type === 'trivia') {
        baseXP *= 2;
      }

      setEarnedCoins(prev => Math.round(prev + baseCoins));
      setEarnedXP(prev => Math.round(prev + baseXP));
      setEarnedStars(prev => prev + starsReward);

    } else {
      playSynthSound('wrong');
    }
  };

  // Advance on the board after question resolution
  const handleNextTurn = () => {
    const currentTile = BOARD_TILES[currentPosition];

    if (isAnswerCorrect === false) {
      // Slide back 1 tile penalty
      setCurrentPosition(prev => Math.max(0, prev - 1));
    } else if (isAnswerCorrect === true && currentTile.type === 'boost') {
      // Slide forward +2 tiles boost!
      playSynthSound('boost');
      setCurrentPosition(prev => Math.min(BOARD_TILES.length - 1, prev + 2));
    }

    // Reset overlay & active questions
    setActiveQuestion(null);
    setShowBonusOverlay(null);

    // Double check if landing on finish
    const newPos = currentPosition;
    if (newPos === BOARD_TILES.length - 1) {
      setGameOver(true);
      playSynthSound('win');
      stopMusic();
    }
  };

  // Quit and submit earned rewards
  const quitAndSubmit = () => {
    stopMusic();
    const accuracy = questionsAnswered > 0 ? Math.round((correctAnswers / questionsAnswered) * 100) : 0;
    // Award custom academic badge if won or accuracy high
    const wonBadge = accuracy >= 80 ? 'academic_champ' : undefined;
    onFinishGame(earnedCoins, earnedXP, wonBadge, accuracy >= 90);
  };

  // Format timer
  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // SVG connectors paths builder for winding road map
  const renderSVGConnections = () => {
    let pathD = `M ${BOARD_TILES[0].x} ${BOARD_TILES[0].y}`;
    for (let i = 1; i < BOARD_TILES.length; i++) {
      pathD += ` L ${BOARD_TILES[i].x} ${BOARD_TILES[i].y}`;
    }
    return (
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ minWidth: '950px' }}>
        {/* Underlay glow path */}
        <path
          d={pathD}
          fill="none"
          stroke="rgba(99, 102, 241, 0.15)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Main dashed path */}
        <path
          d={pathD}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth="6"
          strokeDasharray="8 6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Active completed path overlay */}
        {currentPosition > 0 && (
          <path
            d={(() => {
              let activePath = `M ${BOARD_TILES[0].x} ${BOARD_TILES[0].y}`;
              for (let i = 1; i <= currentPosition; i++) {
                activePath += ` L ${BOARD_TILES[i].x} ${BOARD_TILES[i].y}`;
              }
              return activePath;
            })()}
            fill="none"
            stroke="url(#indigo-gradient)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-all duration-300"
          />
        )}
        <defs>
          <linearGradient id="indigo-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4f46e5" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>
      </svg>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between text-left relative overflow-hidden">
      
      {/* Background patterns */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

      {/* ================= HEADER CONTROL BAR ================= */}
      <header className="bg-white shadow-xs border-b border-slate-200 py-2 sm:py-3 px-3 sm:px-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 sm:gap-3">
          
          {/* Title & Back Button */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => setShowExitModal(true)}
              className="p-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 rounded-xl transition-all cursor-pointer shadow-3xs"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div className="text-left">
              <h2 className="font-heading font-black text-slate-800 text-xs sm:text-sm md:text-base flex items-center gap-1.5 sm:gap-2 flex-wrap">
                <span>{game.name}</span>
                <span className="text-[9px] bg-indigo-50 border border-indigo-100 text-indigo-700 font-black px-1.5 sm:px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0">
                  Grade {progress.selectedClass}
                </span>
              </h2>
              <p className="text-[10px] text-slate-400 mt-0.5">Educational board track</p>
            </div>
          </div>

          {/* Current Score Indicators */}
          <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap justify-start sm:justify-end">
            <div className="bg-indigo-600 border border-indigo-700 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg flex items-center gap-1 sm:gap-1.5 text-white shadow-3xs shrink-0">
              <span className="text-[10px] sm:text-xs font-heading font-black">Lvl {currentPosition + 1}</span>
            </div>

            <div className="bg-amber-50 border border-amber-200 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg flex items-center gap-1 sm:gap-1.5 text-slate-800 shadow-3xs shrink-0">
              <Coins className="h-3.5 w-3.5 text-amber-500 shrink-0" />
              <span className="text-[10px] sm:text-xs font-heading font-black">{earnedCoins}</span>
            </div>
            
            <div className="bg-indigo-50 border border-indigo-200 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg flex items-center gap-1 sm:gap-1.5 text-slate-800 shadow-3xs shrink-0">
              <Sparkles className="h-3.5 w-3.5 text-indigo-500 shrink-0" />
              <span className="text-[10px] sm:text-xs font-heading font-black">{earnedXP} XP</span>
            </div>

            <div className="bg-rose-50 border border-rose-200 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg flex items-center gap-1 sm:gap-1.5 text-slate-800 shadow-3xs shrink-0">
              <Star className="h-3.5 w-3.5 text-rose-500 shrink-0" />
              <span className="text-[10px] sm:text-xs font-heading font-black">{earnedStars}</span>
            </div>

            <div className="bg-slate-50 border border-slate-200 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg flex items-center gap-1 sm:gap-1.5 text-slate-600 font-mono text-[10px] sm:text-[11px] font-bold shadow-3xs shrink-0">
              <Clock className="h-3.5 w-3.5 shrink-0" />
              <span>{formatTime(timerSeconds)}</span>
            </div>

            <button
              onClick={() => {
                const nextSound = !soundEnabled;
                setSoundEnabled(nextSound);
                if (!nextSound) {
                  stopMusic();
                }
              }}
              className={`p-1.5 sm:p-2 rounded-lg transition-all shadow-3xs cursor-pointer border shrink-0 ${
                soundEnabled 
                  ? 'bg-indigo-50 border-indigo-100 text-indigo-600 hover:bg-indigo-100' 
                  : 'bg-slate-50 border-slate-200 text-slate-400 hover:bg-slate-100'
              }`}
              title={soundEnabled ? "Mute sound effects" : "Unmute sound effects"}
            >
              {soundEnabled ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
            </button>

            <button
              onClick={toggleMusic}
              className={`p-1.5 sm:p-2 rounded-lg transition-all shadow-3xs cursor-pointer border shrink-0 flex items-center gap-1.5 ${
                musicPlaying 
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-600 hover:bg-emerald-100 animate-pulse' 
                  : 'bg-slate-50 border-slate-200 text-slate-400 hover:bg-slate-100'
              }`}
              title={musicPlaying ? "Pause background music" : "Play background music"}
            >
              <Music className="h-3.5 w-3.5" />
              <span className="text-[10px] font-heading font-black hidden sm:inline">
                {musicPlaying ? 'Music: ON' : 'Music: OFF'}
              </span>
            </button>
          </div>

        </div>
      </header>

      {/* ================= GAME SCREEN LAYOUT ================= */}
      <div className="flex-1 max-w-7xl mx-auto w-full p-2 sm:p-4 grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 items-stretch relative h-[calc(100vh-140px)] sm:h-auto lg:h-[calc(100vh-130px)] lg:max-h-[820px] overflow-hidden">
        
        {/* LEFT COLUMN: THE WINDING SVG BOARD MAP (COL-SPAN-8) - Only visible on desktop/large screens */}
        <div className="hidden lg:flex lg:col-span-8 order-2 lg:order-1 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex-col justify-between relative overflow-hidden transition-all duration-300 lg:h-full" style={{ minHeight: '460px' }}>
          
          <div className="absolute top-4 left-4 bg-slate-50 text-slate-400 text-[10px] font-bold px-3 py-1 rounded-md uppercase tracking-wider select-none z-10">
            Interactive Map Grid
          </div>

          {/* Special tile bonus notifications overlay */}
          {showBonusOverlay && (
            <div className="absolute top-14 left-4 right-4 bg-indigo-900/95 backdrop-blur-md text-white p-3 rounded-xl border border-indigo-700 flex items-center gap-2.5 z-20 animate-bounce">
              <Sparkles className="h-5 w-5 text-amber-400 shrink-0" />
              <p className="text-xs font-heading font-bold">{showBonusOverlay}</p>
            </div>
          )}

          {/* ALWAYS VISIBLE AND EXPANDED BOARD MAP PATH ON PC/LAPTOP */}
          <div className="flex-1 w-full flex flex-col justify-between mt-6">
            {/* The Scrollable Stage container for Board path */}
            <div className="flex-1 w-full overflow-x-auto overflow-y-hidden relative py-8 scrollbar-none flex items-center">
              <div className="relative w-[950px] h-[320px] mx-auto shrink-0">
                
                {/* SVG Connector Lines */}
                {renderSVGConnections()}

                {/* Render Tile Nodes */}
                {BOARD_TILES.map((tile) => {
                  const isCurrent = currentPosition === tile.id;
                  const isPassed = currentPosition > tile.id;
                  
                  return (
                    <div
                      key={tile.id}
                      className="absolute -translate-x-1/2 -translate-y-1/2 group z-10 transition-all duration-300"
                      style={{ left: `${tile.x}px`, top: `${tile.y}px` }}
                    >
                      {/* Circle Node Button representing progress */}
                      <div className={`w-14 h-14 rounded-full flex flex-col items-center justify-center relative cursor-default border-4 shadow-sm transition-all duration-300 ${
                        isCurrent 
                          ? 'border-indigo-600 scale-110 shadow-lg shadow-indigo-100' 
                          : isPassed 
                          ? 'border-emerald-400 bg-emerald-500 scale-95' 
                          : 'border-slate-200 bg-white hover:scale-105'
                      }`}>
                        
                        {/* Node central content */}
                        {tile.type === 'start' ? (
                          <span className="text-[10px] font-black uppercase text-slate-500">Go!</span>
                        ) : tile.type === 'finish' ? (
                          <span className="text-xl">🏁</span>
                        ) : tile.type === 'reward' ? (
                          <span className="text-lg text-amber-500 animate-pulse">⭐</span>
                        ) : tile.type === 'boost' ? (
                          <span className="text-base text-emerald-500">🚀</span>
                        ) : tile.type === 'mystery' ? (
                          <span className="text-base text-cyan-500">🎁</span>
                        ) : tile.type === 'trivia' ? (
                          <span className="text-base text-rose-500">🔥</span>
                        ) : (
                          <span className={`text-xs font-bold font-mono ${isCurrent || isPassed ? 'text-white' : 'text-slate-500'}`}>
                            {tile.id}
                          </span>
                        )}

                        {/* Little tile indicator tag name on hover */}
                        <span className="absolute bottom-[-24px] bg-slate-800 text-white text-[9px] font-medium px-1.5 py-0.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none">
                          {tile.label} {tile.bonus ? `(${tile.bonus})` : ''}
                        </span>
                      </div>

                      {/* Animated Avatar Token */}
                      {isCurrent && (
                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 animate-bounce flex flex-col items-center z-20">
                          {/* Custom visual cartoon chip */}
                          <div className="bg-gradient-to-tr from-indigo-600 to-purple-600 text-white p-2 rounded-2xl shadow-lg border border-white text-xs font-heading font-black">
                            {progress.avatar || '🤠'}
                          </div>
                          <div className="w-2.5 h-2.5 bg-indigo-600 rotate-45 -mt-1.5 border-r border-b border-indigo-600" />
                        </div>
                      )}

                    </div>
                  );
                })}

              </div>
            </div>
          </div>

          {/* Interactive Dice controls and boards guide */}
          <div className="border-t border-slate-100 pt-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            <div className="flex gap-4 text-[10px] md:text-xs font-semibold text-slate-400 flex-wrap justify-center sm:justify-start">
              <div className="flex items-center gap-1.5">
                <span className="inline-block w-2.5 h-2.5 bg-amber-400 rounded-full" />
                <span>Star Tile</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="inline-block w-2.5 h-2.5 bg-emerald-400 rounded-full" />
                <span>Warp Booster</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="inline-block w-2.5 h-2.5 bg-cyan-400 rounded-full" />
                <span>Lucky Box</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="inline-block w-2.5 h-2.5 bg-rose-400 rounded-full" />
                <span>Trivia Gate</span>
              </div>
            </div>

            {/* Interactive DICE Control Center */}
            <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-50 border border-slate-200/60 p-3 rounded-2xl shadow-3xs shrink-0 w-full sm:w-auto">
              
              {/* Select Dice Count Options */}
              <div className="flex flex-col gap-1 pr-0 sm:pr-4 border-b sm:border-b-0 sm:border-r border-slate-200 pb-2 sm:pb-0 w-full sm:w-auto text-left">
                <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wider">{t.diceCountLabel}</span>
                <div className="flex gap-1.5 mt-1 flex-wrap">
                  <button
                    disabled={isMoving || activeQuestion !== null || gameOver}
                    onClick={() => {
                      setDiceCount(1);
                      setRolledDiceValues([1]);
                      setCurrentDiceValue(1);
                    }}
                    className={`px-3 py-1.5 text-[10px] font-heading font-black rounded-lg transition-all cursor-pointer ${
                      diceCount === 1
                        ? 'bg-indigo-600 text-white shadow-2xs'
                        : 'bg-white hover:bg-slate-100 border border-slate-200 text-slate-700'
                    }`}
                  >
                    {t.singleDice}
                  </button>
                  <button
                    disabled={isMoving || activeQuestion !== null || gameOver}
                    onClick={() => {
                      setDiceCount(2);
                      setRolledDiceValues([1, 1]);
                      setCurrentDiceValue(2);
                    }}
                    className={`px-3 py-1.5 text-[10px] font-heading font-black rounded-lg transition-all cursor-pointer ${
                      diceCount === 2
                        ? 'bg-indigo-600 text-white shadow-2xs'
                        : 'bg-white hover:bg-slate-100 border border-slate-200 text-slate-700'
                    }`}
                  >
                    {t.doubleDice}
                  </button>
                  <button
                    disabled={isMoving || activeQuestion !== null || gameOver}
                    onClick={() => {
                      setDiceCount(3);
                      setRolledDiceValues([1, 1, 1]);
                      setCurrentDiceValue(3);
                    }}
                    className={`px-3 py-1.5 text-[10px] font-heading font-black rounded-lg transition-all cursor-pointer ${
                      diceCount === 3
                        ? 'bg-indigo-600 text-white shadow-2xs'
                        : 'bg-white hover:bg-slate-100 border border-slate-200 text-slate-700'
                    }`}
                  >
                    {t.tripleDice}
                  </button>
                </div>
              </div>

              {/* Roll Trigger Action Panel */}
              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
                <div className="text-left shrink-0">
                  <span className="text-[9px] text-slate-400 font-extrabold block uppercase leading-none mb-1">Click to roll</span>
                  <span className="text-xs font-black text-slate-700">Pos: {currentPosition} / 19</span>
                </div>

                {/* Graphical animated dice blocks */}
                <button
                  disabled={isMoving || activeQuestion !== null || gameOver}
                  onClick={rollDice}
                  className={`px-4 py-2 min-h-[56px] rounded-2xl border flex items-center justify-center gap-3 shadow-md transition-all ${
                    isMoving || activeQuestion !== null || gameOver
                      ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                      : 'bg-gradient-to-tr from-amber-400 to-orange-500 text-amber-950 border-amber-300 hover:scale-105 active:scale-95 cursor-pointer hover:shadow-lg hover:shadow-amber-100'
                  }`}
                >
                  {isMoving ? (
                    <div className="flex gap-2 items-center">
                      {Array.from({ length: diceCount }).map((_, idx) => (
                        <span key={idx} className="animate-spin text-2xl inline-block duration-150">🎲</span>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      {rolledDiceValues.map((val, idx) => (
                        <div key={idx} className="w-10 h-10 bg-white text-slate-800 border-2 border-slate-100 rounded-xl flex items-center justify-center text-lg font-black shadow-3xs relative shrink-0">
                          {val}
                        </div>
                      ))}
                      {diceCount > 1 && (
                        <div className="text-xs font-black text-amber-950 bg-amber-200/80 px-2 py-1 rounded-lg shrink-0">
                          = {currentDiceValue}
                        </div>
                      )}
                    </div>
                  )}
                </button>
              </div>

            </div>

          </div>

        </div>

        {/* RIGHT COLUMN: QUIZ AND REWARD CHALLENGE SCREEN (COL-SPAN-4) */}
        <div className="col-span-1 lg:col-span-4 order-1 lg:order-2 bg-white border-2 border-indigo-150 rounded-2xl p-4 sm:p-5 shadow-md shadow-indigo-100/40 flex flex-col justify-between relative overflow-hidden transition-all duration-350 h-full lg:h-auto min-h-[460px] lg:min-h-0">
          
          {/* Top subtle live motion glowing progress bar element to make it attractive */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-400 animate-pulse" />

          <div className="absolute top-4 left-4 bg-indigo-50 text-indigo-700 text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider select-none z-10">
            Active Quest Panel
          </div>

          {/* ACTIVE CHALLENGE PORTAL */}
          {activeQuestion ? (
            <div className="flex-1 flex flex-col justify-between mt-4 overflow-hidden">
              
              {/* Header area - fixed height */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3 shrink-0">
                <span className="text-xs font-heading font-extrabold text-indigo-600 flex items-center gap-1.5 pt-4">
                  <HelpCircle className="h-4 w-4 shrink-0 animate-bounce" /> Question Challenge
                </span>
                
                <div className="flex items-center gap-2 pt-4">
                  <button
                    onClick={() => setIsMapModalOpen(true)}
                    className="lg:hidden px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-heading font-black text-[10px] rounded-lg border border-indigo-100 shadow-3xs flex items-center gap-1 cursor-pointer active:scale-95 transition-all"
                  >
                    <span>🗺️ Map</span>
                  </button>
                  <span className="text-[10px] font-black uppercase text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-md tracking-wider shrink-0">
                    {activeQuestion.difficulty} Diff
                  </span>
                </div>
              </div>

              {/* Scrollable interior content area - perfect for fitting any screen height */}
              <div className="flex-1 overflow-y-auto pr-1 space-y-3.5 scrollbar-none my-1">
                
                {/* Random non-repeat indicator pill */}
                <div className="bg-indigo-50/70 border border-indigo-100/60 px-2.5 py-1.5 rounded-xl flex items-center gap-1.5 text-indigo-700">
                  <Shuffle className="h-3 w-3 text-indigo-600 animate-spin" style={{ animationDuration: '4s' }} />
                  <span className="text-[9px] font-black uppercase tracking-wider text-left">
                    Auto-Set Question Pool • {usedQuestionIds.length} / 500 Used (No Repeats)
                  </span>
                </div>

                {/* The main question text */}
                <div className="bg-slate-50 border border-slate-200/60 p-3 sm:p-4 rounded-xl relative overflow-hidden shadow-3xs">
                  <div className="absolute -right-2 -bottom-2 text-slate-100/70 text-4xl font-black select-none pointer-events-none">?</div>
                  <h4 className="font-heading font-black text-slate-800 text-xs sm:text-sm leading-relaxed text-left relative z-10">
                    {activeQuestion.question}
                  </h4>
                </div>

                {/* Multiple Choice Options list */}
                <div className="space-y-2">
                  {activeQuestion.options.map((option) => {
                    const isSelected = selectedAnswer === option;
                    const isCorrectOption = option === activeQuestion.correctAnswer;
                    
                    let btnStyle = 'border-slate-150 bg-white text-slate-700 hover:bg-slate-50/50 hover:border-slate-350 active:scale-98';
                    if (isSelected && !isAnswerSubmitted) {
                      btnStyle = 'border-indigo-500 bg-indigo-50/50 text-indigo-900 ring-2 ring-indigo-100 hover:bg-indigo-50 active:scale-95';
                    } else if (isAnswerSubmitted) {
                      if (isCorrectOption) {
                        btnStyle = 'border-emerald-500 bg-emerald-50/60 text-emerald-900 font-extrabold scale-101 shadow-xs shadow-emerald-100';
                      } else if (isSelected) {
                        btnStyle = 'border-rose-500 bg-rose-50/60 text-rose-900 font-extrabold';
                      } else {
                        btnStyle = 'border-slate-100 bg-white text-slate-400 opacity-60';
                      }
                    }

                    return (
                      <button
                        key={option}
                        disabled={isAnswerSubmitted}
                        onClick={() => setSelectedAnswer(option)}
                        className={`w-full p-3 sm:p-3.5 text-left rounded-xl border text-xs sm:text-sm font-heading font-black transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                      >
                        <span className="pr-2">{option}</span>
                        {isAnswerSubmitted && isCorrectOption && (
                          <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 shrink-0" />
                        )}
                        {isAnswerSubmitted && isSelected && !isCorrectOption && (
                          <X className="h-4.5 w-4.5 text-rose-500 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Hint System trigger if wrong or stuck */}
                {!isAnswerSubmitted ? (
                  <div className="text-left pt-1.5">
                    {hintUsed ? (
                      <div className="bg-amber-50 border border-amber-100 text-amber-900 text-[11px] p-3 rounded-xl flex gap-1.5 shadow-3xs">
                        <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-amber-500" />
                        <p>{activeQuestion.hint}</p>
                      </div>
                    ) : (
                      <button
                        onClick={() => { setHintUsed(true); setEarnedCoins(p => Math.max(0, p - 5)); }}
                        className="text-xs text-indigo-600 font-heading font-black underline hover:text-indigo-800 flex items-center gap-1 cursor-pointer hover:scale-101 transition-transform"
                      >
                        <HelpCircle className="h-3.5 w-3.5" /> Need a hint? (Costs 5 Coins)
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="text-left space-y-2 pt-1">
                    {isAnswerCorrect ? (
                      <div className="bg-emerald-50 text-emerald-900 text-xs p-3 rounded-xl border border-emerald-100 flex items-center gap-2 shadow-3xs animate-bounce">
                        <Check className="h-5 w-5 text-emerald-600 shrink-0" />
                        <span className="font-heading font-black">Fantastic work! Roll again to advance.</span>
                      </div>
                    ) : (
                      <div className="bg-rose-50 text-rose-900 text-xs p-3 rounded-xl border border-rose-100 space-y-1 shadow-3xs">
                        <div className="flex items-center gap-2">
                          <X className="h-5 w-5 text-rose-600 shrink-0" />
                          <span className="font-heading font-black">Oops! Sliding back 1 step penalty.</span>
                        </div>
                        <p className="text-[11px] text-rose-700 font-medium">Correct answer was: <strong>{activeQuestion.correctAnswer}</strong></p>
                      </div>
                    )}
                  </div>
                )}

              </div>

              {/* Resolution button area - fixed height at bottom */}
              <div className="pt-2 border-t border-slate-100 shrink-0">
                {!isAnswerSubmitted ? (
                  <button
                    disabled={!selectedAnswer}
                    onClick={submitAnswer}
                    className={`w-full py-3 rounded-xl font-heading font-black text-xs shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      selectedAnswer
                        ? 'bg-indigo-600 hover:bg-indigo-700 text-white hover:scale-[1.02] active:scale-95 shadow-md shadow-indigo-100'
                        : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    <span>Submit Choice</span>
                    <CheckCircle2 className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleNextTurn}
                    className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-heading font-black text-xs rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer hover:scale-[1.02] active:scale-95 shadow-md"
                  >
                    <span>Continue Board Quest</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                )}
              </div>

            </div>
          ) : (
            <div className="flex-1 flex flex-col justify-between gap-5 py-4">
              
              {/* Header with View Map option on mobile */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="text-left">
                  <h3 className="font-heading font-black text-slate-800 text-xs sm:text-sm uppercase tracking-wider text-indigo-600">
                    {t.mapLevel} {currentPosition + 1}
                  </h3>
                  <p className="text-[10px] text-slate-400 mt-0.5 font-bold">
                    {currentPosition === 19 ? 'Finish Tile' : `Tile ${currentPosition} / 19`} • {progress.avatar || '🤠'}
                  </p>
                </div>
                <button
                  onClick={() => setIsMapModalOpen(true)}
                  className="lg:hidden px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-heading font-black text-xs rounded-xl border border-indigo-100 shadow-3xs flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
                >
                  <span>🗺️ {t.viewMap}</span>
                </button>
              </div>

              {/* Graphical animated dice blocks */}
              <div className="flex-1 flex flex-col justify-center items-center text-center py-4">
                
                {/* Rolling Indicator or Giant Dice display */}
                <div className="mb-3 relative group">
                  {/* Live motion pulsing background rings to draw attention and give live feel */}
                  {!isMoving && activeQuestion === null && !gameOver && (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-tr from-amber-400 to-orange-500 rounded-[2rem] opacity-35 blur-sm animate-ping pointer-events-none scale-105 duration-1000" />
                      <div className="absolute inset-0 bg-orange-400 rounded-[2rem] opacity-20 blur-md animate-pulse pointer-events-none duration-700" />
                    </>
                  )}
                  
                  <button
                    disabled={isMoving || activeQuestion !== null || gameOver}
                    onClick={() => rollDice()}
                    className={`w-24 h-24 sm:w-28 sm:h-28 aspect-square rounded-[2rem] border-2 flex flex-col items-center justify-center gap-1.5 shadow-md transition-all duration-300 relative overflow-hidden ${
                      isMoving || activeQuestion !== null || gameOver
                        ? 'bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed'
                        : 'bg-gradient-to-tr from-amber-400 to-orange-500 text-amber-950 border-amber-300 hover:scale-110 active:scale-90 hover:rotate-1 cursor-pointer hover:shadow-xl hover:shadow-amber-200/50'
                    }`}
                  >
                    {isMoving ? (
                      <div className="flex gap-1.5 items-center justify-center animate-bounce">
                        {Array.from({ length: diceCount }).map((_, idx) => (
                          <span key={idx} className="animate-spin text-2xl sm:text-3xl inline-block select-none">🎲</span>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center gap-1.5 w-full">
                        <div className="flex items-center justify-center gap-1 flex-nowrap">
                          {rolledDiceValues.map((val, idx) => (
                            <div key={idx} className="w-6 h-6 sm:w-8 sm:h-8 bg-white text-slate-800 border border-slate-200 rounded-lg sm:rounded-xl flex items-center justify-center text-[10px] sm:text-sm font-black shadow-3xs relative shrink-0 transition-transform duration-300 hover:scale-105">
                              {val}
                            </div>
                          ))}
                        </div>
                        <span className="text-[9px] sm:text-[10px] font-heading font-black bg-amber-100 text-amber-950 px-2.5 py-0.5 rounded-full mt-0.5 whitespace-nowrap shadow-3xs">
                          Roll! {diceCount > 1 ? `(= ${currentDiceValue})` : ''}
                        </span>
                      </div>
                    )}
                  </button>
                </div>

                <h3 className="font-heading font-black text-slate-800 text-xs sm:text-sm">Ready to Roll?</h3>
                <p className="text-[10px] sm:text-[11px] text-slate-400 max-w-xs mt-0.5">
                  Roll to move forward. Your grade {progress.selectedClass} character is waiting at tile {currentPosition}!
                </p>
              </div>

              {/* Dice selection row */}
              <div className="bg-slate-50 border border-slate-150 p-2.5 sm:p-3 rounded-2xl">
                <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wider block text-left mb-1.5">
                  {t.diceCountLabel}
                </span>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    disabled={isMoving || activeQuestion !== null || gameOver}
                    onClick={() => {
                      setDiceCount(1);
                      setRolledDiceValues([1]);
                      setCurrentDiceValue(1);
                    }}
                    className={`py-1.5 sm:py-2 text-[10px] font-heading font-black rounded-lg transition-all cursor-pointer ${
                      diceCount === 1
                        ? 'bg-indigo-600 text-white shadow-2xs'
                        : 'bg-white hover:bg-slate-100 border border-slate-200 text-slate-700'
                    }`}
                  >
                    {t.singleDice}
                  </button>
                  <button
                    disabled={isMoving || activeQuestion !== null || gameOver}
                    onClick={() => {
                      setDiceCount(2);
                      setRolledDiceValues([1, 1]);
                      setCurrentDiceValue(2);
                    }}
                    className={`py-1.5 sm:py-2 text-[10px] font-heading font-black rounded-lg transition-all cursor-pointer ${
                      diceCount === 2
                        ? 'bg-indigo-600 text-white shadow-2xs'
                        : 'bg-white hover:bg-slate-100 border border-slate-200 text-slate-700'
                    }`}
                  >
                    {t.doubleDice}
                  </button>
                  <button
                    disabled={isMoving || activeQuestion !== null || gameOver}
                    onClick={() => {
                      setDiceCount(3);
                      setRolledDiceValues([1, 1, 1]);
                      setCurrentDiceValue(3);
                    }}
                    className={`py-1.5 sm:py-2 text-[10px] font-heading font-black rounded-lg transition-all cursor-pointer ${
                      diceCount === 3
                        ? 'bg-indigo-600 text-white shadow-2xs'
                        : 'bg-white hover:bg-slate-100 border border-slate-200 text-slate-700'
                    }`}
                  >
                    {t.tripleDice}
                  </button>
                </div>
              </div>

              {/* Dynamic Question Generator Status */}
              <div className="bg-gradient-to-tr from-indigo-50 to-purple-50 border border-indigo-100/60 p-3 rounded-2xl flex items-start gap-2.5 text-left shrink-0">
                <Shuffle className="h-4 w-4 text-indigo-600 mt-0.5 shrink-0 animate-spin" style={{ animationDuration: '6s' }} />
                <div className="space-y-0.5">
                  <span className="text-[10px] font-extrabold uppercase text-indigo-700 tracking-wider block">
                    Auto-Set Question Engine
                  </span>
                  <p className="text-[10px] text-indigo-600/90 leading-normal font-sans">
                    <strong>500+ Question Bank.</strong> The game automatically randomizes, dynamically sets, and loads questions. Zero repeats guaranteed during play!
                  </p>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>

      {/* ================= WINNING GRAND SCREEN MODAL ================= */}
      {gameOver && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <Confetti />
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 text-center shadow-2xl border border-slate-200 relative overflow-hidden animate-in zoom-in-95 duration-200">
            
            {/* Visual ambient bursts */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-400 via-purple-500 to-rose-500" />
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-40 h-40 bg-amber-400/20 rounded-full blur-2xl" />

            {/* Simulated Confetti streams */}
            <div className="text-6xl my-4 animate-bounce">🏆🎉✨</div>

            <h1 className="font-heading font-black text-2xl text-slate-900 tracking-tight leading-none">
              Board Level Conquered!
            </h1>
            <p className="text-slate-400 text-xs mt-2 max-w-sm mx-auto">
              You completed the educational board track, answered questions accurately, and finished the challenge!
            </p>

            {/* Total Recap Stats Grid */}
            <div className="grid grid-cols-3 gap-3 my-4 bg-slate-50 border border-slate-200 p-3 rounded-xl text-left">
              <div>
                <span className="text-[9px] text-slate-400 font-bold block uppercase">COINS GAINED</span>
                <span className="text-base font-heading font-black text-amber-600 flex items-center gap-1">
                  <Coins className="h-4 w-4 shrink-0" /> +{earnedCoins}
                </span>
              </div>
              <div>
                <span className="text-[9px] text-slate-400 font-bold block uppercase">XP REWARD</span>
                <span className="text-base font-heading font-black text-indigo-600 flex items-center gap-1">
                  <Sparkles className="h-4 w-4 shrink-0" /> +{earnedXP}
                </span>
              </div>
              <div>
                <span className="text-[9px] text-slate-400 font-bold block uppercase">STARS EARNED</span>
                <span className="text-base font-heading font-black text-rose-500 flex items-center gap-1">
                  <Star className="h-4 w-4 shrink-0" /> +{earnedStars}
                </span>
              </div>
            </div>

            {/* Earned Badges and Certificate Preview */}
            <div className="bg-indigo-50 border border-indigo-100/60 p-4 rounded-2xl mb-6 flex items-center gap-4 text-left">
              <div className="p-3.5 bg-gradient-to-tr from-indigo-500 to-purple-600 text-white rounded-xl shadow-md shrink-0">
                <Award className="h-6 w-6 text-amber-300 animate-pulse-soft" />
              </div>
              <div>
                <h4 className="font-heading font-black text-slate-800 text-sm">
                  Educational Certificate Unlocked!
                </h4>
                <p className="text-xs text-slate-500">
                  Congratulations! A printable verification certificate has been saved to your student file.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  setShowShareNotification(true);
                  setTimeout(() => setShowShareNotification(false), 2500);
                }}
                className="flex-1 py-3.5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-heading font-black text-xs rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Share2 className="h-4 w-4" />
                <span>Share Level Score</span>
              </button>

              <button
                onClick={quitAndSubmit}
                className="flex-1 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-heading font-black text-xs rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shadow-indigo-100"
              >
                <span>Save & Continue</span>
                <CheckCircle2 className="h-4 w-4" />
              </button>
            </div>

            {/* Notification alert */}
            {showShareNotification && (
              <div className="mt-4 p-2 bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs font-bold rounded-lg animate-in fade-in slide-in-from-bottom-2 duration-150">
                📋 Score URL link copied to clipboard! Share with your friends.
              </div>
            )}

          </div>
        </div>
      )}

      {/* ================= INTERACTIVE BOARD MAP POPUP MODAL ================= */}
      {isMapModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative flex flex-col p-5 sm:p-6 border border-slate-200">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">🗺️</span>
                <h3 className="font-heading font-black text-slate-800 text-sm sm:text-base">
                  Interactive Board Map Progress
                </h3>
              </div>
              <button
                onClick={() => setIsMapModalOpen(false)}
                className="px-3.5 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-heading font-black text-xs rounded-xl border border-indigo-100 transition-all cursor-pointer"
              >
                Close Map
              </button>
            </div>

            {/* The Scrollable Stage container for Board path */}
            <div className="flex-1 w-full overflow-x-auto relative py-8 scrollbar-none flex items-center justify-center">
              <div className="relative w-[950px] h-[320px] shrink-0">
                
                {/* SVG Connector Lines */}
                {renderSVGConnections()}

                {/* Render Tile Nodes */}
                {BOARD_TILES.map((tile) => {
                  const isCurrent = currentPosition === tile.id;
                  const isPassed = currentPosition > tile.id;
                  
                  return (
                    <div
                      key={tile.id}
                      className="absolute -translate-x-1/2 -translate-y-1/2 group z-10 transition-all duration-300"
                      style={{ left: `${tile.x}px`, top: `${tile.y}px` }}
                    >
                      {/* Circle Node Button representing progress */}
                      <div className={`w-14 h-14 rounded-full flex flex-col items-center justify-center relative cursor-default border-4 shadow-sm transition-all duration-300 ${
                        isCurrent 
                          ? 'border-indigo-600 scale-110 shadow-lg shadow-indigo-100' 
                          : isPassed 
                          ? 'border-emerald-400 bg-emerald-500 scale-95' 
                          : 'border-slate-200 bg-white hover:scale-105'
                      }`}>
                        
                        {/* Central content */}
                        {tile.type === 'start' ? (
                          <span className="text-[10px] font-black uppercase text-slate-500">Go!</span>
                        ) : tile.type === 'finish' ? (
                          <span className="text-xl">🏁</span>
                        ) : tile.type === 'reward' ? (
                          <span className="text-lg text-amber-500 animate-pulse">⭐</span>
                        ) : tile.type === 'boost' ? (
                          <span className="text-base text-emerald-500">🚀</span>
                        ) : tile.type === 'mystery' ? (
                          <span className="text-base text-cyan-500">🎁</span>
                        ) : tile.type === 'trivia' ? (
                          <span className="text-base text-rose-500">🔥</span>
                        ) : (
                          <span className={`text-xs font-bold font-mono ${isCurrent || isPassed ? 'text-white' : 'text-slate-500'}`}>
                            {tile.id}
                          </span>
                        )}

                        {/* Hover tag label */}
                        <span className="absolute bottom-[-24px] bg-slate-800 text-white text-[9px] font-medium px-1.5 py-0.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none z-30">
                          {tile.label} {tile.bonus ? `(${tile.bonus})` : ''}
                        </span>
                      </div>

                      {/* Animated Avatar Token */}
                      {isCurrent && (
                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 animate-bounce flex flex-col items-center z-20">
                          <div className="bg-gradient-to-tr from-indigo-600 to-purple-600 text-white p-2 rounded-2xl shadow-lg border border-white text-xs font-heading font-black">
                            {progress.avatar || '🤠'}
                          </div>
                          <div className="w-2.5 h-2.5 bg-indigo-600 rotate-45 -mt-1.5 border-r border-b border-indigo-600" />
                        </div>
                      )}

                    </div>
                  );
                })}

              </div>
            </div>

            {/* Interactive map legend */}
            <div className="border-t border-slate-100 pt-4 flex gap-4 text-[10px] sm:text-xs font-semibold text-slate-400 flex-wrap justify-center">
              <div className="flex items-center gap-1.5">
                <span className="inline-block w-2.5 h-2.5 bg-amber-400 rounded-full" />
                <span>Star Tile</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="inline-block w-2.5 h-2.5 bg-emerald-400 rounded-full" />
                <span>Warp Booster</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="inline-block w-2.5 h-2.5 bg-cyan-400 rounded-full" />
                <span>Lucky Box</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="inline-block w-2.5 h-2.5 bg-rose-400 rounded-full" />
                <span>Trivia Gate</span>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ================= QUIT CONFIRMATION MODAL ================= */}
      {showExitModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] max-w-sm w-full p-6 text-center shadow-xl border border-slate-100 relative">
            <h3 className="font-poppins font-extrabold text-slate-800 text-lg">Leave Game Session?</h3>
            <p className="text-xs text-slate-400 mt-2">
              Are you sure you want to quit? Any active score points and current board progress will be discarded.
            </p>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowExitModal(false)}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-heading font-bold text-xs rounded-xl transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  stopMusic();
                  onQuit();
                }}
                className="flex-1 py-2.5 bg-rose-500 hover:bg-rose-600 text-white font-heading font-black text-xs rounded-xl transition-all cursor-pointer"
              >
                Yes, Quit
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
