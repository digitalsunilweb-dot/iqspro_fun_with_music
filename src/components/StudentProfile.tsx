import React, { useState } from 'react';
import { 
  User, 
  Coins, 
  Sparkles, 
  Award, 
  BookOpen, 
  CheckCircle, 
  Clock, 
  Camera, 
  FileText, 
  Download, 
  Printer, 
  ArrowRight,
  TrendingUp,
  Bookmark,
  CheckCircle2,
  Calendar,
  Languages,
  LogOut,
  MapPin,
  Save,
  Check,
  Share2
} from 'lucide-react';
import { UserProgress, Badge, Certificate, Game, ClassGroupId } from '../types';
import { translations } from '../lib/translations';

interface StudentProfileProps {
  progress: UserProgress;
  badges: Badge[];
  recommendedGames: Game[];
  onUpdateAvatar: (avatar: string) => void;
  onUpdateName: (name: string) => void;
  onUpdateProfile: (updatedFields: Partial<UserProgress>) => void;
  onSelectGame: (gameId: string) => void;
  onLogout: () => void;
}

const AVATAR_POOL = ['🦁', '🦄', '🤠', '🦊', '🐼', '🐯', '🐨', '🦉', '🐸', '🐰', '🐙', '🦖', '🐝', '🦸', '🐱', '🐶'];

const CLASSES_LIST = [
  { value: 'Nursery', label: 'Nursery', group: 'preschool' },
  { value: 'LKG', label: 'LKG', group: 'preschool' },
  { value: 'UKG', label: 'UKG', group: 'preschool' },
  { value: 'Class 1', label: 'Class 1', group: 'primary' },
  { value: 'Class 2', label: 'Class 2', group: 'primary' },
  { value: 'Class 3', label: 'Class 3', group: 'primary' },
  { value: 'Class 4', label: 'Class 4', group: 'primary' },
  { value: 'Class 5', label: 'Class 5', group: 'primary' },
  { value: 'Class 6', label: 'Class 6', group: 'middle' },
  { value: 'Class 7', label: 'Class 7', group: 'middle' },
  { value: 'Class 8', label: 'Class 8', group: 'middle' },
  { value: 'Class 9', label: 'Class 9', group: 'secondary' },
  { value: 'Class 10', label: 'Class 10', group: 'secondary' },
  { value: 'Class 11', label: 'Class 11', group: 'senior_secondary' },
  { value: 'Class 12', label: 'Class 12', group: 'senior_secondary' }
];

const STATES_LIST = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", 
  "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", 
  "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", 
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", 
  "Uttarakhand", "West Bengal", "Delhi"
];

export default function StudentProfile({ 
  progress, 
  badges, 
  recommendedGames, 
  onUpdateAvatar, 
  onUpdateName, 
  onUpdateProfile,
  onSelectGame,
  onLogout
}: StudentProfileProps) {
  
  const lang = progress.language || 'en';
  const t = translations[lang];

  // Forms state
  const [displayName, setDisplayName] = useState(progress.displayName);
  const [selectedClass, setSelectedClass] = useState(progress.selectedClass || 'Class 5');
  const [gender, setGender] = useState(progress.gender || '');
  const [state, setState] = useState(progress.state || '');
  const [district, setDistrict] = useState(progress.district || '');
  const [city, setCity] = useState(progress.city || '');
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'hi'>(lang);
  
  const [isSavedSuccessfully, setIsSavedSuccessfully] = useState(false);
  const [showCertificateModal, setShowCertificateModal] = useState<Certificate | null>(null);

  const [shareActiveCert, setShareActiveCert] = useState<Certificate | null>(null);
  const [copiedIndicator, setCopiedIndicator] = useState(false);
  const [showShareNotification, setShowShareNotification] = useState<string | null>(null);

  const handleSaveAndShare = (cert: Certificate) => {
    // 1. Auto Save: Trigger a download of a beautiful certificate HTML file
    try {
      const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>IQS Board Game Certificate - ${progress.displayName}</title>
  <style>
    body { font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f8fafc; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
    .cert-card { background: white; border: 12px double #e2e8f0; border-radius: 20px; padding: 40px; text-align: center; max-width: 600px; box-shadow: 0 10px 25px rgba(0,0,0,0.05); position: relative; border-color: #4f46e5; }
    .title { font-size: 28px; font-weight: 900; color: #1e1b4b; text-transform: uppercase; margin: 10px 0; }
    .name { font-size: 32px; font-weight: 900; color: #4f46e5; margin: 20px 0; text-decoration: underline wavy #a5b4fc; }
    .details { font-size: 14px; color: #475569; line-height: 1.6; max-width: 500px; margin: 0 auto; }
    .footer { display: flex; justify-content: space-between; margin-top: 40px; border-top: 1px solid #f1f5f9; padding-top: 20px; font-size: 12px; color: #64748b; }
    .badge { font-size: 48px; margin: 10px 0; }
  </style>
</head>
<body>
  <div class="cert-card">
    <div style="font-weight: 900; color: #4f46e5; font-size: 14px;">IQS PRO ACADEMY</div>
    <div class="badge">🏆</div>
    <div class="title">Certificate of Honor</div>
    <div style="font-style: italic; color: #94a3b8; font-size: 14px; margin-top: 10px;">This academic award is officially presented to</div>
    <div class="name">${progress.displayName || 'Champion'}</div>
    <p class="details">
      for outstanding intellectual accuracy of <strong>${cert.score}%</strong> in completing the educational game board challenge:
      <strong>${cert.title}</strong> of <strong>${cert.grade}</strong> ${cert.subject} curriculum.
    </p>
    <div class="footer">
      <div style="text-align: left;">
        <strong>AWARD DATE</strong><br/>
        ${cert.dateEarned}
      </div>
      <div style="text-align: right;">
        <strong>VERIFICATION CODE</strong><br/>
        CODE: ${cert.verificationCode}
      </div>
    </div>
  </div>
</body>
</html>`;
      
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `IQS_Certificate_${cert.title.replace(/\\s+/g, '_')}.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      // Show save notification
      setShowShareNotification("Certificate saved automatically to device!");
      setTimeout(() => setShowShareNotification(null), 3000);
    } catch (e) {
      console.error("Error downloading certificate file", e);
    }

    // 2. Open Share Modal
    setShareActiveCert(cert);
  };

  // Hardcoded certificates list
  const certificates: Certificate[] = [
    {
      id: 'cert_1',
      title: lang === 'hi' ? 'गणित रेस अधिपति' : 'Math Race Overlord',
      subject: lang === 'hi' ? 'गणित (Mathematics)' : 'Mathematics',
      grade: progress.selectedClass || 'Class 5',
      dateEarned: '2026-07-02',
      verificationCode: 'IQS-MATH-9923',
      score: 95
    },
    {
      id: 'cert_2',
      title: lang === 'hi' ? 'शब्दावली हीरो मास्टर' : 'Vocabulary Hero Master',
      subject: lang === 'hi' ? 'अंग्रेजी व्याकरण (English)' : 'English Grammar',
      grade: progress.selectedClass || 'Class 5',
      dateEarned: '2026-06-28',
      verificationCode: 'IQS-LANG-4112',
      score: 88
    }
  ];

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Find the class group matching the selected class
    const foundClassObj = CLASSES_LIST.find(c => c.value === selectedClass);
    const classGroupId = foundClassObj ? (foundClassObj.group as ClassGroupId) : 'primary';

    onUpdateProfile({
      displayName,
      selectedClass,
      classGroupId,
      gender,
      state,
      district,
      city,
      language: currentLanguage
    });

    setIsSavedSuccessfully(true);
    setTimeout(() => {
      setIsSavedSuccessfully(false);
    }, 4000);
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8 text-left relative overflow-hidden">
      
      {/* Decorative patterns */}
      <div className="absolute top-12 left-10 w-44 h-44 bg-indigo-100/40 rounded-full blur-3xl pointer-events-none" />

      {/* ================= PROFILE STATUS & INTRO ================= */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-slate-50 border border-slate-200 rounded-2xl p-4 shadow-3xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🎓</span>
            <h2 className="font-heading font-black text-slate-800 text-base">
              {progress.isLoggedIn ? `${t.welcomeBack}, ${progress.displayName}!` : t.guestUser}
            </h2>
          </div>
          <p className="text-slate-400 text-xs mt-1">
            {progress.isLoggedIn 
              ? `${t.brandName} Registered Account (Email: ${progress.email || 'Google User'})` 
              : t.guestModeActive}
          </p>
        </div>
        
        <div className="flex items-center gap-2 w-full md:w-auto">
          {/* Quick Language Toggle inside Profile */}
          <div className="flex items-center gap-1.5 bg-white border border-slate-200 px-2.5 py-1 rounded-xl shadow-3xs w-full justify-between md:w-auto">
            <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
              <Languages className="h-3.5 w-3.5 text-indigo-600" />
              <span>Language:</span>
            </span>
            <div className="flex gap-1">
              <button
                onClick={() => {
                  setCurrentLanguage('en');
                  onUpdateProfile({ language: 'en' });
                }}
                className={`px-2 py-0.5 text-xs font-heading font-black rounded-lg transition-all ${
                  lang === 'en' ? 'bg-indigo-600 text-white shadow-3xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => {
                  setCurrentLanguage('hi');
                  onUpdateProfile({ language: 'hi' });
                }}
                className={`px-2 py-0.5 text-xs font-heading font-black rounded-lg transition-all ${
                  lang === 'hi' ? 'bg-indigo-600 text-white shadow-3xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                हिन्दी
              </button>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="flex items-center justify-center gap-1 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>{t.logout}</span>
          </button>
        </div>
      </div>

      {/* ================= EDIT PROFILE & AVATAR BANNER ================= */}
      <div className="grid lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left: Interactive Editor Card (col-span-8) */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-2xs space-y-6 relative">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-heading font-black text-slate-800 text-base flex items-center gap-2">
                <span>👤 {t.editProfile}</span>
              </h3>
              <p className="text-slate-400 text-xs">Configure your curriculum class, demographics, and regional school location.</p>
            </div>
            <span className="bg-indigo-50 border border-indigo-200 text-indigo-700 text-[10px] font-heading font-black px-2.5 py-1 rounded-full uppercase">
              {progress.selectedClass || 'Class 5'}
            </span>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            {/* Display Name & Class */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-1 text-left">
                <label className="text-xs font-bold text-slate-500 block">{t.displayName}</label>
                <input
                  type="text"
                  required
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 outline-hidden px-3 py-2 rounded-xl text-xs font-semibold text-slate-800 transition-all shadow-3xs"
                  placeholder="Enter display name"
                />
              </div>

              <div className="space-y-1 text-left">
                <label className="text-xs font-bold text-slate-500 block">{t.selectedClass}</label>
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 outline-hidden px-3 py-2 rounded-xl text-xs font-semibold text-slate-800 transition-all shadow-3xs"
                >
                  {CLASSES_LIST.map((cls) => (
                    <option key={cls.value} value={cls.value}>
                      {cls.label} ({cls.group.toUpperCase()})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Gender & State */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-1 text-left">
                <label className="text-xs font-bold text-slate-500 block">{t.gender}</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 outline-hidden px-3 py-2 rounded-xl text-xs font-semibold text-slate-800 transition-all shadow-3xs"
                >
                  <option value="">-- Select Gender --</option>
                  <option value="Male">{t.male}</option>
                  <option value="Female">{t.female}</option>
                  <option value="Other">{t.other}</option>
                  <option value="Not Specified">{t.notSpecified}</option>
                </select>
              </div>

              <div className="space-y-1 text-left">
                <label className="text-xs font-bold text-slate-500 block">{t.state}</label>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 outline-hidden px-3 py-2 rounded-xl text-xs font-semibold text-slate-800 transition-all shadow-3xs"
                >
                  <option value="">-- Select State --</option>
                  {STATES_LIST.map((st) => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* District & City */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-1 text-left">
                <label className="text-xs font-bold text-slate-500 block">{t.district}</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
                  <input
                    type="text"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 outline-hidden pl-9 pr-3 py-2 rounded-xl text-xs font-semibold text-slate-800 transition-all shadow-3xs"
                    placeholder="e.g. Alwar, Patna, Jaipur"
                  />
                </div>
              </div>

              <div className="space-y-1 text-left">
                <label className="text-xs font-bold text-slate-500 block">{t.city}</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 outline-hidden px-3 py-2 rounded-xl text-xs font-semibold text-slate-800 transition-all shadow-3xs"
                  placeholder="e.g. Behror, Noida, City Center"
                />
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-2 flex items-center justify-between gap-4 flex-wrap">
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-heading font-black text-xs px-5 py-2.5 rounded-xl shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Save className="h-4 w-4" />
                <span>{t.saveChanges}</span>
              </button>

              {isSavedSuccessfully && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 animate-bounce">
                  <Check className="h-4 w-4 text-emerald-600" />
                  <span>{t.saveSuccess}</span>
                </div>
              )}
            </div>
          </form>
        </div>

        {/* Right: Avatar Hero Selector Card (col-span-4) */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-2xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">⚡</span>
              <h3 className="font-heading font-black text-slate-800 text-sm">{t.selectAvatar}</h3>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">{t.avatarSub}</p>
          </div>

          {/* Current Avatar Frame */}
          <div className="flex flex-col items-center justify-center py-2">
            <div className="w-24 h-24 bg-gradient-to-tr from-indigo-500 to-purple-600 text-white rounded-full flex items-center justify-center text-5xl shadow-md border-4 border-white ring-4 ring-indigo-50 relative group">
              <span>{progress.avatar}</span>
              <div className="absolute inset-0 bg-black/40 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer text-xs font-heading font-black uppercase">
                Change
              </div>
            </div>
            <span className="text-[10px] text-slate-400 font-bold mt-2 uppercase tracking-wider">Active Hero Logo</span>
          </div>

          {/* Grid list of avatars */}
          <div className="grid grid-cols-4 gap-2 max-h-[140px] overflow-y-auto pr-1">
            {AVATAR_POOL.map((char) => {
              const isSelected = progress.avatar === char;
              return (
                <button
                  key={char}
                  type="button"
                  onClick={() => onUpdateAvatar(char)}
                  className={`aspect-square rounded-xl border flex items-center justify-center text-xl transition-all hover:scale-105 active:scale-95 cursor-pointer ${
                    isSelected 
                      ? 'bg-indigo-600 border-indigo-600 shadow-md scale-105' 
                      : 'bg-slate-50 border-slate-200 hover:border-indigo-300'
                  }`}
                >
                  {char}
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* ================= STATS OVERVIEW CARDS (Mobile-friendly Grid) ================= */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        
        <div className="bg-white p-3 sm:p-4 rounded-xl border border-slate-200 flex items-center gap-2.5 sm:gap-3">
          <span className="text-2xl sm:text-3xl">🎮</span>
          <div className="text-left leading-tight">
            <span className="text-slate-400 text-[9px] font-bold block uppercase tracking-wider">GAMES PLAYED</span>
            <span className="font-heading font-black text-xs sm:text-sm text-slate-800">{progress.totalGamesPlayed} sessions</span>
          </div>
        </div>

        <div className="bg-white p-3 sm:p-4 rounded-xl border border-slate-200 flex items-center gap-2.5 sm:gap-3">
          <span className="text-2xl sm:text-3xl">🎯</span>
          <div className="text-left leading-tight">
            <span className="text-slate-400 text-[9px] font-bold block uppercase tracking-wider">ACCURACY</span>
            <span className="font-heading font-black text-xs sm:text-sm text-emerald-600">{progress.accuracy}% Solved</span>
          </div>
        </div>

        <div className="bg-white p-3 sm:p-4 rounded-xl border border-slate-200 flex items-center gap-2.5 sm:gap-3">
          <span className="text-2xl sm:text-3xl">⭐</span>
          <div className="text-left leading-tight">
            <span className="text-slate-400 text-[9px] font-bold block uppercase tracking-wider">EARNED STARS</span>
            <span className="font-heading font-black text-xs sm:text-sm text-slate-800">{progress.stars} stars</span>
          </div>
        </div>

        <div className="bg-white p-3 sm:p-4 rounded-xl border border-slate-200 flex items-center gap-2.5 sm:gap-3">
          <span className="text-2xl sm:text-3xl">🪙</span>
          <div className="text-left leading-tight">
            <span className="text-slate-400 text-[9px] font-bold block uppercase tracking-wider">COINS</span>
            <span className="font-heading font-black text-xs sm:text-sm text-amber-600">{progress.coins} Coins</span>
          </div>
        </div>

      </div>

      {/* ================= LEARNING ANALYTICS (SVG GROWTH CHART) & ACHIEVEMENT Cabinet ================= */}
      <div className="grid md:grid-cols-12 gap-6 items-stretch">
        
        {/* STATS CHART (COL-SPAN-7) */}
        <div className="md:col-span-7 bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-heading font-black text-slate-800 text-sm">{t.weeklyStudyMins}</h3>
              <p className="text-slate-400 text-xs">{t.weeklyStudySub}</p>
            </div>
            
            <div className="flex items-center gap-1 text-xs text-indigo-600 font-bold">
              <TrendingUp className="h-3.5 w-3.5" /> +15% vs Last Week
            </div>
          </div>

          {/* Graphical Responsive Bar chart using pure SVG */}
          <div className="w-full h-44 relative pt-4 flex items-end justify-between">
            {/* Background grid line vectors */}
            <div className="absolute inset-x-0 top-1/4 border-t border-slate-100" />
            <div className="absolute inset-x-0 top-2/4 border-t border-slate-100" />
            <div className="absolute inset-x-0 top-3/4 border-t border-slate-100" />

            {/* Simulated bars */}
            {[
              { day: 'Mon', mins: 15, h: 'h-[30%]', color: 'from-indigo-400 to-indigo-500' },
              { day: 'Tue', mins: 30, h: 'h-[60%]', color: 'from-purple-400 to-purple-500' },
              { day: 'Wed', mins: 12, h: 'h-[25%]', color: 'from-pink-400 to-pink-500' },
              { day: 'Thu', mins: 45, h: 'h-[90%]', color: 'from-amber-400 to-amber-500' },
              { day: 'Fri', mins: 25, h: 'h-[50%]', color: 'from-emerald-400 to-emerald-500' },
              { day: 'Sat', mins: 40, h: 'h-[80%]', color: 'from-indigo-500 to-purple-600' },
              { day: 'Sun', mins: 10, h: 'h-[20%]', color: 'from-slate-400 to-slate-500' }
            ].map((bar) => (
              <div key={bar.day} className="flex-1 flex flex-col items-center gap-2 z-10">
                <span className="text-[9px] text-slate-400 font-bold">{bar.mins}m</span>
                <div className={`w-6 sm:w-8 ${bar.h} bg-gradient-to-t ${bar.color} rounded-t-lg transition-all duration-300 shadow-3xs`} />
                <span className="text-[10px] font-bold text-slate-500 font-heading">{bar.day}</span>
              </div>
            ))}
          </div>

        </div>

        {/* RECENT REWARDS & MILESTONES (COL-SPAN-5) */}
        <div className="md:col-span-5 bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-2xs flex flex-col justify-between">
          <div>
            <h3 className="font-heading font-black text-slate-800 text-sm">{t.yourMilestones}</h3>
            <p className="text-slate-400 text-xs">{t.milestoneSub}</p>
          </div>

          <div className="space-y-3 my-4">
            {badges.filter(b => b.isUnlocked).slice(0, 3).map((badge) => (
              <div key={badge.id} className="flex items-center gap-3 bg-slate-50/50 p-2.5 rounded-xl border border-slate-200">
                <span className="text-3xl">{badge.iconName}</span>
                <div className="text-left">
                  <h4 className="font-heading font-black text-xs sm:text-sm text-slate-800 leading-none">{badge.name}</h4>
                  <p className="text-[10px] text-slate-400 mt-1">{badge.description}</p>
                </div>
              </div>
            ))}
            {badges.filter(b => b.isUnlocked).length === 0 && (
              <div className="bg-slate-50 border border-slate-200 border-dashed rounded-xl p-4 text-center text-xs text-slate-400 font-bold">
                🔒 Lock badges by completing game tracks!
              </div>
            )}
          </div>

          <div className="text-xs text-indigo-600 font-bold flex items-center gap-1 hover:underline cursor-pointer">
            {t.viewBadges} <ArrowRight className="h-3.5 w-3.5" />
          </div>
        </div>

      </div>

      {/* ================= CERTIFICATES ARCHIVE ================= */}
      <div>
        <h2 className="text-lg font-heading font-black text-slate-900 mb-4">
          {t.academicCertificates}
        </h2>

        <div className="grid sm:grid-cols-2 gap-4">
          {certificates.map((cert) => (
            <div 
              key={cert.id}
              className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col justify-between items-start space-y-3 hover:shadow-3xs transition-all text-left"
            >
              <div className="flex justify-between items-start w-full">
                <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-sm">
                  <Award className="h-3.5 w-3.5 text-amber-500" />
                  <span className="text-[9px] font-heading font-black uppercase text-amber-800">{t.certified}</span>
                </div>
                <span className="text-xs text-slate-400 font-bold">{cert.dateEarned}</span>
              </div>

              <div className="space-y-1">
                <h4 className="font-heading font-black text-slate-800 text-sm leading-none">
                  {cert.title}
                </h4>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Awarded for scoring <strong className="text-indigo-600">{cert.score}%</strong> in {cert.subject} board tracks.
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex justify-between items-center w-full text-xs gap-2">
                <span className="text-[8px] sm:text-[9px] font-mono text-slate-400 font-bold truncate">CODE: {cert.verificationCode}</span>
                
                <div className="flex gap-1.5 shrink-0">
                  <button
                    onClick={() => handleSaveAndShare(cert)}
                    className="px-2.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-heading font-black text-[10px] rounded-lg flex items-center gap-1 shadow-sm cursor-pointer transition-all hover:scale-105 active:scale-95"
                    title="Save and Share"
                  >
                    <Share2 className="h-3 w-3" />
                    <span>Share</span>
                  </button>

                  <button
                    onClick={() => setShowCertificateModal(cert)}
                    className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-heading font-black text-[10px] rounded-lg flex items-center gap-1 shadow-sm cursor-pointer transition-all hover:scale-105 active:scale-95"
                  >
                    <FileText className="h-3 w-3" />
                    <span>{t.viewCertificate}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= RECOMMENDED PLAYGROUND GAMES ================= */}
      <div>
        <h2 className="text-lg font-heading font-black text-slate-900 mb-4">
          {t.recommendedGames}
        </h2>

        <div className="grid sm:grid-cols-3 gap-4">
          {recommendedGames.slice(0, 3).map((game) => (
            <div 
              key={game.id}
              className="bg-white border border-slate-200 hover:border-indigo-200 rounded-2xl p-4 flex flex-col justify-between items-start space-y-3 hover:shadow-3xs transition-all"
            >
              <div className="text-4xl">{game.image}</div>
              
              <div className="space-y-1 text-left">
                <h4 className="font-heading font-black text-slate-800 text-sm leading-none">{game.name}</h4>
                <p className="text-xs text-slate-400 leading-normal">{game.description}</p>
              </div>

              <div className="w-full flex items-center justify-between pt-2.5 border-t border-slate-100">
                <span className="text-xs font-heading font-extrabold text-amber-600">+{game.coinsReward} Coins</span>
                
                <button
                  onClick={() => onSelectGame(game.id)}
                  className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-heading font-black rounded-lg cursor-pointer"
                >
                  {t.playNow}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= CERTIFICATE VISUAL MODAL OVERLAY ================= */}
      {showCertificateModal && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-4 sm:p-6 md:p-8 shadow-2xl relative overflow-hidden text-center border border-slate-200 my-8">
            
            {/* Visual credential background watermark */}
            <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="absolute -top-16 -left-16 w-44 h-44 bg-indigo-100 rounded-full blur-3xl" />
            <div className="absolute -bottom-16 -right-16 w-44 h-44 bg-purple-100 rounded-full blur-3xl" />

            {/* IQS Pro Certificate template design details */}
            <div className="border border-double border-slate-200 p-4 sm:p-6 space-y-4 relative">
              
              <div className="flex justify-between items-center mb-4">
                <span className="font-heading font-black text-base bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  IQS Pro Academy
                </span>
                <span className="text-[9px] text-slate-400 font-mono">ID: {showCertificateModal.verificationCode}</span>
              </div>

              <div className="text-4xl">🏆</div>

              <div className="space-y-1">
                <h1 className="font-heading font-black text-lg sm:text-xl text-slate-950 uppercase tracking-tight">
                  Certificate of Honor
                </h1>
                <p className="text-slate-400 text-[9px] font-mono">IQS BOARD GAME EXCELLENCE PATHWAY</p>
              </div>

              <p className="text-slate-500 font-sans italic text-xs">
                This academic award is officially presented to
              </p>

              <h2 className="text-xl sm:text-2xl font-heading font-black text-indigo-600 underline decoration-indigo-300 decoration-wavy py-1.5">
                {progress.displayName || 'Champion'}
              </h2>

              <p className="text-slate-600 text-xs max-w-lg mx-auto font-sans leading-relaxed">
                for outstanding intellectual accuracy of <strong className="text-slate-900 font-bold">{showCertificateModal.score}%</strong> in completing the 
                educational game board challenge: <strong>{showCertificateModal.title}</strong> of <strong>{showCertificateModal.grade}</strong> {showCertificateModal.subject} curriculum.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-100 text-left text-[10px]">
                <div>
                  <span className="text-[9px] text-slate-400 font-bold block uppercase leading-none">AWARD DATE</span>
                  <span className="font-bold text-slate-700">{showCertificateModal.dateEarned}</span>
                </div>
                <div className="text-right">
                  <span className="text-[9px] text-slate-400 font-bold block uppercase leading-none">AUTHORIZED SIGNATORY</span>
                  <span className="font-bold text-slate-700">IQS Educational Pedagogy Board</span>
                </div>
              </div>

            </div>

            {/* Certificate modal controls */}
            <div className="flex gap-3 mt-6 justify-center relative z-10 print:hidden flex-wrap">
              <button
                onClick={() => setShowCertificateModal(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-heading font-bold rounded-xl transition-all"
              >
                Close View
              </button>

              <button
                onClick={() => handleSaveAndShare(showCertificateModal)}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-heading font-black rounded-xl flex items-center gap-1.5 transition-all shadow-md shadow-amber-100"
              >
                <Share2 className="h-4 w-4" />
                <span>Save & Share Anywhere</span>
              </button>

              <button
                onClick={handlePrintCertificate}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-heading font-black rounded-xl flex items-center gap-1.5 transition-all shadow-md shadow-indigo-100"
              >
                <Printer className="h-4 w-4" />
                <span>Print Certificate</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ================= SOCIAL SHARE DRAWER OVERLAY ================= */}
      {shareActiveCert && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-200">
            <h3 className="font-heading font-black text-slate-800 text-base mb-1">
              Share Certificate Anywhere 🎓
            </h3>
            <p className="text-slate-400 text-xs mb-4">
              Your certificate has been downloaded! Choose where to share your achievement:
            </p>
            
            <div className="grid grid-cols-2 gap-3 mb-4">
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                  `🎓 I just earned the "${shareActiveCert.title}" Certificate with a score of ${shareActiveCert.score}% on IQS Pro Games! 🏆 Verification Code: ${shareActiveCert.verificationCode}. You can learn and play too at: ${window.location.origin}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-100 transition-all cursor-pointer text-decoration-none"
              >
                <span className="text-2xl">💬</span>
                <span className="text-[10px] font-bold text-emerald-800">WhatsApp</span>
              </a>
              
              <a
                href={`https://t.me/share/url?url=${encodeURIComponent(window.location.origin)}&text=${encodeURIComponent(
                  `🎓 I just earned the "${shareActiveCert.title}" Certificate with a score of ${shareActiveCert.score}% on IQS Pro Games! 🏆 Verification Code: ${shareActiveCert.verificationCode}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-sky-50 hover:bg-sky-100 border border-sky-100 transition-all cursor-pointer text-decoration-none"
              >
                <span className="text-2xl">✈️</span>
                <span className="text-[10px] font-bold text-sky-800">Telegram</span>
              </a>

              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  `🎓 I just earned the "${shareActiveCert.title}" Certificate with a score of ${shareActiveCert.score}% on IQS Pro Games! 🏆 Verification Code: ${shareActiveCert.verificationCode}. @IQSProGames ${window.location.origin}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-150 transition-all cursor-pointer text-decoration-none"
              >
                <span className="text-2xl">🐦</span>
                <span className="text-[10px] font-bold text-slate-800">Twitter / X</span>
              </a>

              <button
                onClick={() => {
                  const msg = `🎓 I just earned the "${shareActiveCert.title}" Certificate with a score of ${shareActiveCert.score}% on IQS Pro Games! 🏆 Verification Code: ${shareActiveCert.verificationCode}. Check it out at: ${window.location.origin}`;
                  navigator.clipboard.writeText(msg);
                  setCopiedIndicator(true);
                  setTimeout(() => setCopiedIndicator(false), 2000);
                }}
                className="flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-indigo-50 hover:bg-indigo-100 border border-indigo-100 transition-all cursor-pointer"
              >
                <span className="text-2xl">🔗</span>
                <span className="text-[10px] font-bold text-indigo-800">
                  {copiedIndicator ? "Copied! ✓" : "Copy Message"}
                </span>
              </button>
            </div>

            <button
              onClick={() => setShareActiveCert(null)}
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-heading font-bold rounded-xl transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Floating Auto-Save Notification */}
      {showShareNotification && (
        <div className="fixed bottom-6 right-6 bg-slate-900 border border-slate-800 text-white px-4 py-3 rounded-2xl text-xs font-heading font-black shadow-2xl flex items-center gap-2 animate-in slide-in-from-bottom-5 duration-200 z-[99]">
          <span className="text-emerald-400">💾</span>
          <span>{showShareNotification}</span>
        </div>
      )}

    </div>
  );
}
