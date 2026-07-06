import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  Award, 
  CheckCircle,
  TrendingUp,
  Smile,
  Zap,
  Flame,
  Gamepad2
} from 'lucide-react';
import { ClassGroup, ClassGroupId } from '../types';
import { translations } from '../lib/translations';

interface ClassSelectorProps {
  onSelectClass: (groupId: ClassGroupId, selectedClass: string) => void;
  language: 'en' | 'hi';
}

export default function ClassSelector({ onSelectClass, language }: ClassSelectorProps) {
  const t = translations[language];
  const [hoveredCard, setHoveredCard] = useState<ClassGroupId | null>(null);
  
  // Grade groups as specified in prompt
  const classGroups: ClassGroup[] = [
    {
      id: 'preschool',
      name: t.preschool,
      ageRange: language === 'hi' ? 'उम्र 3–5' : 'Age 3–5',
      classes: ['Nursery', 'LKG', 'UKG'],
      colorTheme: 'from-pink-400 to-amber-300',
      studentCount: 14250,
      illustration: '🎨'
    },
    {
      id: 'primary',
      name: t.primary,
      ageRange: language === 'hi' ? 'कक्षा 1 से 5' : 'Class 1 to 5',
      classes: ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'],
      colorTheme: 'from-blue-500 to-cyan-400',
      studentCount: 48920,
      illustration: '🚀'
    },
    {
      id: 'middle',
      name: t.middle,
      ageRange: language === 'hi' ? 'कक्षा 6 से 8' : 'Class 6 to 8',
      classes: ['Class 6', 'Class 7', 'Class 8'],
      colorTheme: 'from-emerald-500 to-teal-400',
      studentCount: 36200,
      illustration: '🧬'
    },
    {
      id: 'secondary',
      name: t.secondary,
      ageRange: language === 'hi' ? 'कक्षा 9 और 10' : 'Class 9 & 10',
      classes: ['Class 9', 'Class 10'],
      colorTheme: 'from-orange-500 to-amber-400',
      studentCount: 29140,
      illustration: '🧠'
    },
    {
      id: 'senior_secondary',
      name: t.senior_secondary,
      ageRange: language === 'hi' ? 'कक्षा 11 और 12' : 'Class 11 & 12',
      classes: ['Class 11', 'Class 12'],
      colorTheme: 'from-purple-600 to-pink-500',
      studentCount: 21850,
      illustration: '🎓'
    }
  ];

  const handleStartPlaying = () => {
    const element = document.getElementById('class-select-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative overflow-hidden pb-12">
      
      {/* Decorative Floating Background Shapes */}
      <div className="absolute top-10 left-10 w-44 h-44 bg-pink-100/30 rounded-full blur-3xl animate-float-slow -z-10" />
      <div className="absolute top-40 right-20 w-60 h-60 bg-blue-100/30 rounded-full blur-3xl animate-float-reverse -z-10" />
      <div className="absolute bottom-10 left-1/4 w-52 h-52 bg-purple-100/20 rounded-full blur-3xl animate-float-slow -z-10" />

      {/* ================= HERO SECTION ================= */}
      <section className="max-w-7xl mx-auto px-6 py-10 md:py-12 mt-6 grid md:grid-cols-12 gap-8 items-center bg-white border border-slate-200 rounded-2xl shadow-xs">
        <div className="md:col-span-7 space-y-4 text-left">
          
          <div className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-full shadow-2xs">
            <span className="flex h-1.5 w-1.5 rounded-full bg-indigo-600 animate-pulse" />
            <span className="text-[10px] font-heading font-black text-indigo-800 tracking-wider uppercase">
              {t.brandName} {language === 'hi' ? 'लर्निंग बोर्ड गेम्स' : 'Learning Board Games'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-slate-900 leading-tight">
            {language === 'hi' ? 'रोमांचक खेल के' : 'Learn Through'} <br />
            <span className="bg-gradient-to-r from-indigo-600 via-indigo-800 to-indigo-950 bg-clip-text text-transparent relative">
              {language === 'hi' ? 'साथ सीखें!' : 'Exciting Play!'}
            </span>
          </h1>

          <p className="text-sm text-slate-500 font-sans max-w-lg leading-relaxed">
            {t.classSelectorSub}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={handleStartPlaying}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-heading font-black text-xs rounded-xl flex items-center gap-1.5 transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer shadow-sm shadow-indigo-100"
            >
              <Gamepad2 className="h-4 w-4" />
              <span>{t.startPlaying}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={handleStartPlaying}
              className="px-5 py-2.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-heading font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all duration-200"
            >
              <BookOpen className="h-4 w-4" />
              <span>{t.exploreGames}</span>
            </button>
          </div>

          {/* Core App Features Banner */}
          <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-200">
            <div className="flex items-center gap-1.5">
              <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
              <span className="text-[11px] font-bold text-slate-600">{t.curriculumAligned}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
              <span className="text-[11px] font-bold text-slate-600">{t.realPlay}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
              <span className="text-[11px] font-bold text-slate-600">{t.freeBadges}</span>
            </div>
          </div>

        </div>

        {/* Hero Interactive Illustration Box */}
        <div className="md:col-span-5 relative flex justify-center">
          <div className="relative w-full max-w-sm aspect-square bg-slate-50 rounded-2xl p-4 border border-slate-200 shadow-2xs flex flex-col justify-between overflow-hidden">
            
            {/* Visual Board Game Background Pattern */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:12px_12px]" />
            
            {/* Float badges */}
            <div className="absolute top-4 left-4 bg-white p-2 rounded-xl shadow-xs border border-slate-200 animate-float-slow flex items-center gap-1.5">
              <span className="text-lg">🏆</span>
              <div className="text-left leading-none">
                <p className="text-[8px] text-slate-400 font-bold uppercase">{language === 'hi' ? 'विजेता' : 'Winner'}</p>
                <p className="text-[10px] font-heading font-black text-slate-800">1,250 XP</p>
              </div>
            </div>

            <div className="absolute bottom-8 right-4 bg-white p-2 rounded-xl shadow-xs border border-slate-200 animate-float-reverse flex items-center gap-1.5">
              <span className="text-lg">⭐</span>
              <div className="text-left leading-none">
                <p className="text-[8px] text-slate-400 font-bold uppercase">{language === 'hi' ? 'सितारे' : 'Stars'}</p>
                <p className="text-[10px] font-heading font-black text-slate-800">{language === 'hi' ? 'सक्रिय' : 'Streak Active'}</p>
              </div>
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-16 h-16 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-md animate-pulse-soft border border-indigo-700">
              <Gamepad2 className="h-8 w-8" />
            </div>

            {/* Simulated Game Loop illustration */}
            <div className="w-full h-full border-2 border-dashed border-slate-300 rounded-xl p-3 flex flex-col justify-between">
              <div className="flex justify-between">
                <div className="w-8 h-8 bg-pink-400 text-white rounded-full flex items-center justify-center font-bold text-xs shadow-2xs">1</div>
                <div className="w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center font-bold text-xs shadow-2xs">2</div>
                <div className="w-8 h-8 bg-blue-400 text-white rounded-full flex items-center justify-center font-bold text-xs shadow-2xs">3</div>
              </div>
              <div className="flex justify-between mt-auto">
                <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-xs shadow-2xs">6</div>
                <div className="w-8 h-8 bg-orange-400 text-white rounded-full flex items-center justify-center font-bold text-xs shadow-2xs">5</div>
                <div className="w-8 h-8 bg-emerald-400 text-white rounded-full flex items-center justify-center font-bold text-xs shadow-2xs">4</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= STEP 1: CLASS SELECTION ================= */}
      <section id="class-select-section" className="max-w-7xl mx-auto px-4 py-8 scroll-mt-16">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-block bg-slate-900 text-white text-[9px] font-heading font-black uppercase px-2.5 py-1 rounded-full mb-2">
            {language === 'hi' ? 'चरण 1' : 'STEP 1'}
          </div>
          <h2 className="text-2xl md:text-3xl font-heading font-black text-slate-900 tracking-tight">
            {t.step1Title}
          </h2>
          <p className="text-slate-500 text-xs mt-1 leading-relaxed">
            {t.step1Sub}
          </p>
        </div>

        {/* Dynamic Class Group Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {classGroups.map((group) => {
            return (
              <div
                key={group.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col justify-between group"
              >
                {/* Header Banner representing thematic color */}
                <div className={`bg-gradient-to-r ${group.colorTheme} p-4 text-white text-center relative`}>
                  <div className="absolute top-2 right-2 bg-white/25 backdrop-blur-md text-[8px] font-bold px-1.5 py-0.5 rounded-full">
                    {group.ageRange}
                  </div>
                  <div className="text-4xl my-2 transform group-hover:scale-105 transition-transform duration-200">
                    {group.illustration}
                  </div>
                  <h3 className="font-heading font-black text-sm tracking-tight leading-snug">
                    {group.name}
                  </h3>
                </div>

                {/* Class options and content */}
                <div className="p-4 flex-1 flex flex-col justify-between bg-white">
                  
                  <div className="space-y-3">
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">
                      {t.chooseGrade}
                    </p>
                    
                    <div className="flex flex-wrap gap-1 justify-center">
                      {group.classes.map((cls) => (
                        <button
                          key={cls}
                          onClick={() => onSelectClass(group.id, cls)}
                          className="px-2.5 py-1 bg-slate-50 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 border border-slate-200 text-[11px] font-heading font-black text-slate-700 rounded-lg transition-all"
                        >
                          {cls}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-left">
                    <div>
                      <span className="text-[8px] text-slate-400 font-bold block uppercase leading-none">{t.activePlayers}</span>
                      <span className="text-[10px] font-bold text-slate-700">
                        {group.studentCount.toLocaleString()}+ {t.kids}
                      </span>
                    </div>
                    
                    <div className={`p-1.5 bg-slate-900 text-white rounded-lg shadow-sm group-hover:bg-indigo-600 transition-colors`}>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Brand values / stats bar */}
      <section className="max-w-7xl mx-auto px-4 mt-8">
        <div className="bg-slate-950 text-white rounded-[2rem] p-8 md:p-12 relative overflow-hidden shadow-xl text-left">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
          
          <div className="relative z-10 grid md:grid-cols-4 gap-8 items-center">
            <div className="space-y-2">
              <h4 className="font-poppins font-extrabold text-2xl text-amber-400">{t.whyIqs}</h4>
              <p className="text-slate-400 text-sm">{t.whyIqsSub}</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/10 rounded-2xl">
                <Smile className="h-6 w-6 text-indigo-400" />
              </div>
              <div>
                <span className="font-poppins font-extrabold text-xl block">150K+</span>
                <span className="text-xs text-slate-400">{t.happyLearners}</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/10 rounded-2xl">
                <Flame className="h-6 w-6 text-orange-400" />
              </div>
              <div>
                <span className="font-poppins font-extrabold text-xl block">2.4M+</span>
                <span className="text-xs text-slate-400">{t.questsSolved}</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/10 rounded-2xl">
                <Award className="h-6 w-6 text-amber-400" />
              </div>
              <div>
                <span className="font-poppins font-extrabold text-xl block">500+</span>
                <span className="text-xs text-slate-400">{t.certifiedBadges}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
