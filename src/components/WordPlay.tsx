import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  HelpCircle, 
  Coins, 
  Sparkles, 
  Star, 
  Check, 
  X, 
  RotateCcw, 
  Play, 
  Pause, 
  Clock, 
  CheckCircle2,
  ChevronRight,
  Sparkle,
  Trophy
} from 'lucide-react';
import { Game, UserProgress } from '../types';

interface WordPlayProps {
  game: Game;
  progress: UserProgress;
  onFinishGame: (earnedCoins: number, earnedXP: number, wonBadgeId?: string, earnedCertificate?: boolean) => void;
  onQuit: () => void;
}

interface WordPuzzle {
  word: string;
  scrambled: string;
  clue: string;
}

const WORD_PUZZLES_POOL: Record<string, WordPuzzle[]> = {
  preschool: [
    { word: 'CAT', scrambled: 'ATC', clue: 'A furry pet that goes "Meow!"' },
    { word: 'SUN', scrambled: 'NSU', clue: 'Bright star in the daytime sky' },
    { word: 'DOG', scrambled: 'GDO', clue: 'Man\'s best friend that barks' },
    { word: 'RED', scrambled: 'EDR', clue: 'The color of a strawberry' }
  ],
  primary: [
    { word: 'SCHOOL', scrambled: 'OSHLCO', clue: 'Where we go to learn and meet teachers' },
    { word: 'ANIMAL', scrambled: 'MLNAAI', clue: 'A living creature like a lion or dog' },
    { word: 'GRAVITY', scrambled: 'VYTIARG', clue: 'The force pulling objects down to Earth' },
    { word: 'FRACTION', scrambled: 'RTCFNAIO', clue: 'Part of a whole number in math' }
  ],
  middle: [
    { word: 'CELLULAR', scrambled: 'LCAELLUR', clue: 'Relating to structural units of organisms' },
    { word: 'ALGEBRA', scrambled: 'GRLAEBA', clue: 'A branch of math using variables like x' },
    { word: 'COMPUTER', scrambled: 'TCOPREUM', clue: 'Electronic processing device we code on' },
    { word: 'OXYGEN', scrambled: 'NGYEXO', clue: 'The gas we breathe to stay alive' }
  ],
  secondary: [
    { word: 'PHOTOSYNTHESIS', scrambled: 'YHPISSOTOSHNTE', clue: 'Process of plants converting light to sugar' },
    { word: 'EQUILIBRIUM', scrambled: 'IQULBERUMII', clue: 'A state of physical or chemical balance' },
    { word: 'ALGORITHM', scrambled: 'LGRHOMTIA', clue: 'Step-by-step instructions in software coding' },
    { word: 'METAPHOR', scrambled: 'TPMERAHO', clue: 'A figure of speech comparing two objects' }
  ]
};

export default function WordPlay({ game, progress, onFinishGame, onQuit }: WordPlayProps) {
  const [puzzles, setPuzzles] = useState<WordPuzzle[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
  const [availableLetters, setAvailableLetters] = useState<string[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  
  // Game stats
  const [earnedCoins, setEarnedCoins] = useState(0);
  const [earnedXP, setEarnedXP] = useState(0);
  const [earnedStars, setEarnedStars] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [hintUsed, setHintUsed] = useState(false);

  // Load puzzles for appropriate class group
  useEffect(() => {
    const group = progress.classGroupId || 'primary';
    const pool = WORD_PUZZLES_POOL[group] || WORD_PUZZLES_POOL['primary'];
    setPuzzles(pool);
    resetPuzzle(pool[0]);
    
    const interval = setInterval(() => {
      if (!isPaused && !gameFinished) {
        setTimerSeconds(prev => prev + 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [progress.classGroupId, gameFinished, isPaused]);

  const resetPuzzle = (puzzle: WordPuzzle) => {
    if (!puzzle) return;
    setSelectedLetters([]);
    setAvailableLetters(puzzle.scrambled.split(''));
    setIsCorrect(null);
    setHintUsed(false);
  };

  const handleLetterClick = (letter: string, index: number) => {
    if (isCorrect !== null) return;
    
    // Add to selected
    setSelectedLetters(prev => [...prev, letter]);
    // Remove from available
    setAvailableLetters(prev => {
      const copy = [...prev];
      copy.splice(index, 1);
      return copy;
    });
  };

  const handleRemoveLetter = (letter: string, index: number) => {
    if (isCorrect !== null) return;

    // Remove from selected
    setSelectedLetters(prev => {
      const copy = [...prev];
      copy.splice(index, 1);
      return copy;
    });
    // Add back to available
    setAvailableLetters(prev => [...prev, letter]);
  };

  const checkAnswer = () => {
    const active = puzzles[currentIdx];
    const answer = selectedLetters.join('');
    
    if (answer === active.word) {
      setIsCorrect(true);
      // Award
      setEarnedCoins(p => p + 30);
      setEarnedXP(p => p + 20);
      setEarnedStars(p => p + 1);
    } else {
      setIsCorrect(false);
    }
  };

  const handleNextWord = () => {
    if (currentIdx + 1 < puzzles.length) {
      setCurrentIdx(prev => prev + 1);
      resetPuzzle(puzzles[currentIdx + 1]);
    } else {
      setGameFinished(true);
    }
  };

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const triggerQuit = () => {
    const acc = Math.round(((currentIdx + (isCorrect ? 1 : 0)) / puzzles.length) * 100);
    const wonBadge = acc >= 75 ? 'linguist' : undefined;
    onFinishGame(earnedCoins, earnedXP, wonBadge, acc >= 85);
  };

  const activePuzzle = puzzles[currentIdx];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between text-left relative overflow-hidden">
      
      {/* Header controls bar */}
      <header className="bg-white shadow-2xs border-b border-slate-200 p-3 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onQuit}
              className="p-1.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 rounded-lg transition-all"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div>
              <h2 className="font-heading font-black text-slate-800 text-sm">
                {game.name}
              </h2>
              <p className="text-[10px] text-slate-400">Word Quest Puzzle</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-lg flex items-center gap-1 text-slate-800">
              <Coins className="h-3.5 w-3.5 text-amber-500" />
              <span className="text-xs font-heading font-black">{earnedCoins}</span>
            </div>
            
            <div className="bg-indigo-50 border border-indigo-200 px-2.5 py-1 rounded-lg flex items-center gap-1 text-slate-800">
              <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
              <span className="text-xs font-heading font-black">{earnedXP} XP</span>
            </div>

            <div className="bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-lg flex items-center gap-1 text-slate-600 font-mono text-[11px] font-bold">
              <Clock className="h-3.5 w-3.5" />
              <span>{formatTime(timerSeconds)}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main playboard */}
      <div className="flex-1 max-w-2xl mx-auto w-full p-4 flex flex-col justify-center">
        
        {activePuzzle && !gameFinished ? (
          <div className="bg-white border border-slate-200 rounded-xl p-4 md:p-6 shadow-2xs space-y-6 relative">
            
            <div className="absolute top-4 right-4 text-[10px] font-bold text-slate-400">
              Puzzle {currentIdx + 1} of {puzzles.length}
            </div>

            {/* Clue Panel */}
            <div className="text-center space-y-1.5">
              <div className="inline-block bg-indigo-50 text-indigo-700 text-[10px] font-heading font-black px-2 py-0.5 rounded-sm uppercase">
                CLUE
              </div>
              <p className="text-base font-heading font-black text-slate-800 max-w-md mx-auto">
                "{activePuzzle.clue}"
              </p>
            </div>

            {/* Selected letters (Built box) */}
            <div className="space-y-3">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider text-center">
                YOUR SPELLING
              </p>
              
              <div className="flex flex-wrap gap-2 justify-center min-h-[56px] border border-dashed border-slate-200 p-2 rounded-xl bg-slate-50/50">
                {selectedLetters.map((letter, idx) => (
                  <button
                    key={`${letter}-${idx}`}
                    onClick={() => handleRemoveLetter(letter, idx)}
                    className="w-12 h-12 rounded-xl bg-indigo-600 hover:bg-rose-500 text-white font-heading font-black text-xl flex items-center justify-center cursor-pointer transition-all hover:scale-105 active:scale-95 shadow-md border-b-4 border-indigo-800 hover:border-rose-700"
                  >
                    {letter}
                  </button>
                ))}
              </div>
            </div>

            {/* Available scrambled letters bank */}
            <div className="space-y-3">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider text-center">
                SCRAMBLED LETTERS (TAP TO SELECT)
              </p>
              
              <div className="flex flex-wrap gap-2.5 justify-center">
                {availableLetters.map((letter, idx) => (
                  <button
                    key={`${letter}-${idx}`}
                    onClick={() => handleLetterClick(letter, idx)}
                    className="w-12 h-12 rounded-xl bg-white hover:bg-indigo-50 border border-slate-200 text-slate-700 font-heading font-black text-xl flex items-center justify-center cursor-pointer transition-all hover:-translate-y-0.5 active:translate-y-0 shadow-sm border-b-4 border-slate-300"
                  >
                    {letter}
                  </button>
                ))}
              </div>
            </div>

            {/* Solution Feedback Box */}
            {isCorrect !== null && (
              <div className="text-center animate-in zoom-in-95 duration-150">
                {isCorrect ? (
                  <div className="bg-emerald-50 border border-emerald-100 text-emerald-900 p-4 rounded-2xl flex flex-col items-center space-y-2">
                    <Check className="h-6 w-6 text-emerald-600 bg-white p-1 rounded-full shadow-sm animate-bounce" />
                    <p className="font-heading font-black text-sm">Excellent Spelling! +30 Coins & +20 XP awarded</p>
                  </div>
                ) : (
                  <div className="bg-rose-50 border border-rose-100 text-rose-900 p-4 rounded-2xl flex flex-col items-center space-y-2">
                    <X className="h-6 w-6 text-rose-600 bg-white p-1 rounded-full shadow-sm animate-shake" />
                    <p className="font-heading font-black text-sm">That spell is incorrect. Let\'s try again or move forward!</p>
                    <p className="text-xs text-rose-700">Correct Answer: <strong>{activePuzzle.word}</strong></p>
                  </div>
                )}
              </div>
            )}

            {/* Help hint system */}
            {!hintUsed && isCorrect === null && (
              <div className="text-center">
                <button
                  onClick={() => { setHintUsed(true); setEarnedCoins(c => Math.max(0, c - 10)); }}
                  className="text-xs font-bold text-slate-400 hover:text-indigo-600 underline flex items-center gap-1 mx-auto cursor-pointer"
                >
                  <HelpCircle className="h-3.5 w-3.5" /> Reveal answer clue (Costs 10 Coins)
                </button>
              </div>
            )}

            {hintUsed && isCorrect === null && (
              <div className="bg-amber-50 border border-amber-100 text-amber-900 text-xs p-3.5 rounded-xl text-center max-w-sm mx-auto">
                💡 The first letter is: <strong>{activePuzzle.word[0]}</strong>, and it ends with: <strong>{activePuzzle.word[activePuzzle.word.length - 1]}</strong>
              </div>
            )}

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-slate-50 flex items-center gap-4">
              <button
                disabled={selectedLetters.length === 0 || isCorrect !== null}
                onClick={() => resetPuzzle(activePuzzle)}
                className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl font-heading font-bold text-xs flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="h-4 w-4" /> Clear Spelling
              </button>

              {isCorrect === null ? (
                <button
                  disabled={selectedLetters.length !== activePuzzle.word.length}
                  onClick={checkAnswer}
                  className={`flex-1 py-3.5 rounded-xl font-heading font-black text-xs transition-all ${
                    selectedLetters.length === activePuzzle.word.length
                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer shadow-md'
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  Check Spelling
                </button>
              ) : (
                <button
                  onClick={handleNextWord}
                  className="flex-1 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-heading font-black text-xs rounded-xl flex items-center justify-center gap-1 cursor-pointer transition-all"
                >
                  <span>{currentIdx + 1 < puzzles.length ? 'Next Word Puzzle' : 'Finish Quest'}</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              )}
            </div>

          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-xl p-6 text-center shadow-2xs max-w-md mx-auto space-y-4">
            <Trophy className="h-10 w-10 text-amber-500 mx-auto animate-bounce" />
            <h3 className="font-heading font-black text-xl text-slate-800">Word Builder Completed!</h3>
            
            <div className="grid grid-cols-2 gap-3 bg-slate-50 border border-slate-200 p-3 rounded-xl text-left">
              <div>
                <span className="text-[10px] text-slate-400 font-bold block uppercase">TOTAL COINS</span>
                <span className="text-sm font-heading font-black text-amber-600 flex items-center gap-1">
                  <Coins className="h-4 w-4" /> +{earnedCoins}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold block uppercase">TOTAL XP</span>
                <span className="text-sm font-heading font-black text-indigo-600 flex items-center gap-1">
                  <Sparkles className="h-4 w-4" /> +{earnedXP}
                </span>
              </div>
            </div>

            <button
              onClick={triggerQuit}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-heading font-black text-xs rounded-xl shadow-md transition-all cursor-pointer"
            >
              Collect Rewards & Quit
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
