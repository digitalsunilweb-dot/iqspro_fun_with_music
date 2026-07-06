import React, { useState, useEffect, useRef } from 'react';
import { 
  Trophy, 
  Mail, 
  Lock, 
  User, 
  Sparkles, 
  ArrowRight, 
  GraduationCap, 
  Globe,
  AlertCircle
} from 'lucide-react';
import { UserProgress, ClassGroupId } from '../types';
import { translations } from '../lib/translations';

interface AuthScreenProps {
  onAuthComplete: (updatedProgress: Partial<UserProgress>) => void;
  language: 'en' | 'hi';
  onLanguageChange: (lang: 'en' | 'hi') => void;
  isModal?: boolean;
}

const STORAGE_USERS_KEY = 'iqs_registered_users';

export default function AuthScreen({ onAuthComplete, language, onLanguageChange, isModal = false }: AuthScreenProps) {
  const t = translations[language];

  // Auth form states
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedClass, setSelectedClass] = useState('Class 5');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSimulatingGoogle, setIsSimulatingGoogle] = useState(false);
  const [isGsiLoaded, setIsGsiLoaded] = useState(false);

  // Handle standard credential response from Google OAuth
  const handleCredentialResponse = (response: any) => {
    try {
      const token = response.credential;
      if (!token) return;

      // Safe base64url decoding
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );

      const payload = JSON.parse(jsonPayload);

      if (payload && payload.email) {
        onAuthComplete({
          displayName: payload.name || payload.given_name || 'Google Learner',
          email: payload.email,
          selectedClass: 'Class 5',
          classGroupId: 'primary',
          avatar: payload.picture || '🦄',
          isLoggedIn: true,
          authMethod: 'google'
        });
      }
    } catch (error) {
      console.error("Error decoding Google sign-in response:", error);
      setErrorMsg("Failed to process Google sign-in. Please try again.");
    }
  };

  // Setup Google Identity Services (GSI)
  useEffect(() => {
    let checkInterval: any;
    
    const initGoogleGSI = () => {
      const win = window as any;
      if (win.google && win.google.accounts && win.google.accounts.id) {
        setIsGsiLoaded(true);
        if (checkInterval) clearInterval(checkInterval);
        
        try {
          const clientId = (import.meta as any).env.VITE_GOOGLE_CLIENT_ID || "323048326155-b2osqpvj23ncoviuhj6e8om49man02nn.apps.googleusercontent.com";
          win.google.accounts.id.initialize({
            client_id: clientId,
            callback: handleCredentialResponse,
            cancel_on_tap_outside: true,
          });

          // Try rendering the native Google Button
          const btnElem = document.getElementById("google-signin-btn");
          if (btnElem) {
            win.google.accounts.id.renderButton(
              btnElem,
              { 
                theme: "outline", 
                size: "large", 
                width: 320, 
                text: "signin_with",
                shape: "pill"
              }
            );
          }
        } catch (e) {
          console.warn("Failed to initialize Google GSI:", e);
        }
      }
    };

    // Periodically check if script is loaded
    checkInterval = setInterval(initGoogleGSI, 500);
    initGoogleGSI();

    return () => {
      if (checkInterval) clearInterval(checkInterval);
    };
  }, [isSignUp, isSignUp ? 'signup' : 'signin']);

  // Class list for onboarding
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

  const getRegisteredUsers = (): any[] => {
    try {
      const saved = localStorage.getItem(STORAGE_USERS_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  };

  const saveUserToLocalStorage = (user: any) => {
    const current = getRegisteredUsers();
    current.push(user);
    localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(current));
  };

  const handleEmailAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !password) {
      setErrorMsg('Please enter both email and password.');
      return;
    }

    const users = getRegisteredUsers();

    if (isSignUp) {
      if (!name) {
        setErrorMsg('Please enter your full name.');
        return;
      }

      // Check if user already exists
      const exists = users.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (exists) {
        setErrorMsg('An account with this email already exists.');
        return;
      }

      // Find gradeGroup
      const classGroup = CLASSES_LIST.find(c => c.value === selectedClass)?.group as ClassGroupId || 'primary';

      const newUser = {
        name,
        email,
        password,
        selectedClass,
        classGroup,
        avatar: ['🦁', '🦄', '🤠', '🦊', '🐼', '🐯', '🐨'][Math.floor(Math.random() * 7)]
      };

      saveUserToLocalStorage(newUser);

      // Onboard user
      onAuthComplete({
        displayName: newUser.name,
        email: newUser.email,
        selectedClass: newUser.selectedClass,
        classGroupId: newUser.classGroup,
        avatar: newUser.avatar,
        isLoggedIn: true,
        authMethod: 'email'
      });
    } else {
      // Find matching user
      const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
      if (!user) {
        setErrorMsg('Invalid email or password. Please try again or create an account.');
        return;
      }

      onAuthComplete({
        displayName: user.name,
        email: user.email,
        selectedClass: user.selectedClass,
        classGroupId: user.classGroup,
        avatar: user.avatar || '🤠',
        isLoggedIn: true,
        authMethod: 'email'
      });
    }
  };

  const handleGoogleSignIn = () => {
    setErrorMsg('');
    setIsSimulatingGoogle(true);

    // Simulate standard Google authentication flow in iframe environment beautifully
    setTimeout(() => {
      setIsSimulatingGoogle(false);
      
      const randomGoogleNames = ['Aryan Sharma', 'Priya Patel', 'Sunil Kumar', 'Rahul Singh', 'Neha Verma'];
      const randomName = randomGoogleNames[Math.floor(Math.random() * randomGoogleNames.length)];
      const randomEmail = `${randomName.toLowerCase().replace(' ', '')}@gmail.com`;

      onAuthComplete({
        displayName: randomName,
        email: randomEmail,
        selectedClass: 'Class 5',
        classGroupId: 'primary',
        avatar: '🦄',
        isLoggedIn: true,
        authMethod: 'google'
      });
    }, 1800);
  };

  const handlePlayAsGuest = () => {
    onAuthComplete({
      displayName: language === 'hi' ? 'अतिथि खिलाड़ी' : 'Guest Adventurer',
      email: null,
      selectedClass: null,
      classGroupId: null,
      avatar: '🦊',
      isLoggedIn: false,
      authMethod: 'guest'
    });
  };

  return (
    <div className={isModal ? "w-full text-left" : "min-h-screen bg-slate-50 flex flex-col justify-center py-10 px-4 relative overflow-hidden text-left"}>
      
      {/* Floating ambient shapes */}
      {!isModal && (
        <>
          <div className="absolute top-10 left-10 w-44 h-44 bg-indigo-200/40 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-60 h-60 bg-pink-100/40 rounded-full blur-3xl pointer-events-none" />
        </>
      )}

      {/* Language Switch header inside Auth */}
      {!isModal && (
        <div className="max-w-md w-full mx-auto mb-4 flex justify-end">
          <div className="flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1.5 rounded-full shadow-2xs">
            <Globe className="h-3.5 w-3.5 text-indigo-600" />
            <button 
              onClick={() => onLanguageChange('en')} 
              className={`text-xs font-black px-2 py-0.5 rounded-md ${language === 'en' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:text-slate-900'}`}
            >
              English
            </button>
            <button 
              onClick={() => onLanguageChange('hi')} 
              className={`text-xs font-black px-2 py-0.5 rounded-md ${language === 'hi' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:text-slate-900'}`}
            >
              हिन्दी
            </button>
          </div>
        </div>
      )}

      <div className={isModal ? "w-full bg-white border-2 border-indigo-150 rounded-3xl p-5 sm:p-6 shadow-2xl relative z-10" : "max-w-md w-full mx-auto bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl relative z-10"}>
        
        {/* Brand Logo & Welcome message */}
        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 p-2 rounded-2xl shadow-2xs">
            <Trophy className="h-6 w-6 text-indigo-600" />
            <span className="font-heading font-black text-lg tracking-tight uppercase italic text-indigo-900">
              {t.brandName}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-heading font-black text-slate-800 leading-tight">
            {t.loginTitle}
          </h2>
          <p className="text-xs text-slate-400 leading-normal">
            {t.loginSub}
          </p>
        </div>

        {/* Display Error Message */}
        {errorMsg && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 mb-4 animate-shake">
            <AlertCircle className="h-4 w-4 text-red-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Email & Password Form */}
        <form onSubmit={handleEmailAuth} className="space-y-4">
          
          {isSignUp && (
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 block">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 outline-hidden pl-10 pr-4 py-2.5 rounded-xl text-xs font-semibold text-slate-800 transition-all shadow-3xs"
                  placeholder="e.g. Sunil Kumar"
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 block">{t.email}</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 outline-hidden pl-10 pr-4 py-2.5 rounded-xl text-xs font-semibold text-slate-800 transition-all shadow-3xs"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 block">{t.password}</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 outline-hidden pl-10 pr-4 py-2.5 rounded-xl text-xs font-semibold text-slate-800 transition-all shadow-3xs"
                placeholder="••••••••"
              />
            </div>
          </div>

          {isSignUp && (
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 block">Select Curriculum Class</label>
              <div className="relative">
                <GraduationCap className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 outline-hidden pl-10 pr-4 py-2.5 rounded-xl text-xs font-semibold text-slate-800 transition-all shadow-3xs"
                >
                  {CLASSES_LIST.map(cls => (
                    <option key={cls.value} value={cls.value}>{cls.label}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-heading font-black text-xs py-3 rounded-xl shadow-md shadow-indigo-100 flex items-center justify-center gap-1.5 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
          >
            <span>{isSignUp ? t.signUp : t.signIn}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-100" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-white px-3 text-slate-400 font-bold uppercase tracking-wider text-[9px]">
              {t.orConnectWith}
            </span>
          </div>
        </div>

        {/* Google OAuth & Guest buttons */}
        <div className="space-y-3">
          {/* Native GSI Button Container */}
          <div className="flex flex-col items-center justify-center">
            <div id="google-signin-btn" className="w-full flex justify-center min-h-[40px]"></div>
            <p className="text-[10px] text-slate-400 mt-1 text-center font-medium">
              Google Verified Secure Sign-In
            </p>
          </div>

          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100" />
            </div>
            <div className="relative flex justify-center text-[9px]">
              <span className="bg-white px-2 text-slate-350 font-bold uppercase">
                OR
              </span>
            </div>
          </div>

          <button
            onClick={handleGoogleSignIn}
            disabled={isSimulatingGoogle}
            className={`w-full bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
              isSimulatingGoogle ? 'opacity-70 pointer-events-none' : ''
            }`}
          >
            {isSimulatingGoogle ? (
              <div className="h-4 w-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg className="h-4 w-4" viewBox="0 0 24 24" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
              </svg>
            )}
            <span>{isSimulatingGoogle ? 'Connecting Google Account...' : 'Quick/Offline Sign-In (Simulation)'}</span>
          </button>

          <button
            onClick={handlePlayAsGuest}
            className="w-full bg-slate-100 hover:bg-slate-200 text-indigo-700 font-heading font-black text-xs py-2.5 rounded-xl flex items-center justify-center gap-1 transition-all cursor-pointer"
          >
            <span>{t.playAsGuest}</span>
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
          </button>
        </div>

        {/* Toggle Mode */}
        <div className="mt-6 text-center text-xs">
          <span className="text-slate-400">{isSignUp ? t.hasAccount : t.noAccount} </span>
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setErrorMsg('');
            }}
            className="text-indigo-600 font-bold hover:underline cursor-pointer"
          >
            {isSignUp ? t.signIn : t.signUp}
          </button>
        </div>

      </div>

    </div>
  );
}
