import React, { useState, useRef } from 'react';
import { 
  Settings, 
  Users, 
  BookOpen, 
  Gamepad2, 
  Upload, 
  Plus, 
  Trash, 
  BarChart2, 
  Sparkles, 
  Coins, 
  CheckCircle2, 
  FileText, 
  CloudLightning,
  AlertCircle
} from 'lucide-react';
import { QuizQuestion, ClassGroupId, SubjectId } from '../types';

interface AdminPanelProps {
  questions: QuizQuestion[];
  onAddQuestion: (newQ: QuizQuestion) => void;
  onDeleteQuestion: (qId: string) => void;
}

export default function AdminPanel({ questions, onAddQuestion, onDeleteQuestion }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<'analytics' | 'questions' | 'upload' | 'students'>('analytics');
  
  // New question form state
  const [newQuestionText, setNewQuestionText] = useState('');
  const [options, setOptions] = useState<string[]>(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<SubjectId>('math');
  const [selectedGroup, setSelectedGroup] = useState<ClassGroupId>('primary');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Medium');
  const [hint, setHint] = useState('');
  const [successBanner, setSuccessBanner] = useState(false);

  // File upload state
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; size: string; progress: number }[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock Students roster
  const [students, setStudents] = useState([
    { id: 's1', name: 'Kabir Sharma', level: 8, coins: 450, accuracy: 88, lastActive: '2 hours ago' },
    { id: 's2', name: 'Ananya Iyer', level: 7, coins: 320, accuracy: 85, lastActive: '1 day ago' },
    { id: 's3', name: 'Rohan Mehta', level: 7, coins: 610, accuracy: 82, lastActive: 'Just now' },
    { id: 's4', name: 'Zoya Khan', level: 12, coins: 1450, accuracy: 92, lastActive: '3 mins ago' }
  ]);

  // Form submit handler
  const handleAddQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText || !correctAnswer || options.some(o => !o)) {
      alert("Please fill in all details and choices!");
      return;
    }

    const newQ: QuizQuestion = {
      id: `custom_${Date.now()}`,
      subjectId: selectedSubject,
      gradeGroup: selectedGroup,
      question: newQuestionText,
      options: [...options],
      correctAnswer: correctAnswer,
      difficulty: selectedDifficulty,
      hint: hint || 'Try looking at the question variables closely.'
    };

    onAddQuestion(newQ);
    
    // Reset Form
    setNewQuestionText('');
    setOptions(['', '', '', '']);
    setCorrectAnswer('');
    setHint('');
    
    // Trigger Success
    setSuccessBanner(true);
    setTimeout(() => setSuccessBanner(false), 3000);
  };

  const handleOptionChange = (idx: number, val: string) => {
    setOptions(prev => {
      const copy = [...prev];
      copy[idx] = val;
      return copy;
    });
  };

  // Drag-and-drop file upload handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUploadedFiles(e.dataTransfer.files);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleUploadedFiles(e.target.files);
    }
  };

  const handleUploadedFiles = (files: FileList) => {
    Array.from(files).forEach((file) => {
      const formattedSize = (file.size / (1024 * 1024)).toFixed(2) + ' MB';
      const fileObj = { name: file.name, size: formattedSize, progress: 0 };
      
      setUploadedFiles(prev => [...prev, fileObj]);

      // Simulate network upload progress bars
      let currentProg = 0;
      const interval = setInterval(() => {
        currentProg += 10;
        setUploadedFiles(prev => 
          prev.map(f => f.name === file.name ? { ...f, progress: currentProg } : f)
        );
        if (currentProg >= 100) {
          clearInterval(interval);
        }
      }, 200);
    });
  };

  // Student reward trigger
  const rewardStudentBonus = (studentId: string) => {
    setStudents(prev => 
      prev.map(s => s.id === studentId ? { ...s, coins: s.coins + 100 } : s)
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 text-left relative overflow-hidden">
      
      {/* Header details */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-sm text-[10px] font-bold text-indigo-700 uppercase">
            <Settings className="h-3.5 w-3.5 text-indigo-600 animate-spin-slow" />
            <span>IQS ADM DECK</span>
          </div>
          <h1 className="font-heading font-black text-xl md:text-2xl text-slate-900 tracking-tight leading-none mt-1.5">
            Admin Management Console
          </h1>
          <p className="text-slate-400 text-xs mt-0.5">
            Configure subjects, review live quiz questions, inspect uploaded assets, and audit game activity metrics.
          </p>
        </div>

        {/* Tab Switching Menu */}
        <div className="flex bg-slate-100 p-1 rounded-xl shrink-0">
          {[
            { id: 'analytics', label: 'Analytics' },
            { id: 'questions', label: 'Manage Questions' },
            { id: 'upload', label: 'Assets Upload' },
            { id: 'students', label: 'Student Roster' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 text-xs font-heading font-black rounded-lg transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-white text-slate-800 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ================= SECTION 1: ANALYTICS & CHARTS ================= */}
      {activeTab === 'analytics' && (
        <div className="space-y-8 animate-in fade-in duration-150">
          {/* Analytics Summary Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-3 shadow-2xs">
              <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-lg">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <span className="text-slate-400 text-[8px] font-bold block uppercase leading-none">TOTAL LEARNERS</span>
                <span className="font-heading font-black text-lg text-slate-800">125,480</span>
                <span className="text-[8px] text-emerald-500 font-bold block mt-0.5">+12% this month</span>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-3 shadow-2xs">
              <div className="p-2.5 bg-purple-50 text-purple-600 rounded-lg">
                <Gamepad2 className="h-5 w-5" />
              </div>
              <div>
                <span className="text-slate-400 text-[8px] font-bold block uppercase leading-none">SESSIONS COMPLETED</span>
                <span className="font-heading font-black text-lg text-slate-800">1.28M</span>
                <span className="text-[8px] text-emerald-500 font-bold block mt-0.5">+4.2% daily active</span>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-3 shadow-2xs">
              <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-lg">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <span className="text-slate-400 text-[8px] font-bold block uppercase leading-none">QUESTION ACCURACY</span>
                <span className="font-heading font-black text-lg text-slate-800">78.4%</span>
                <span className="text-[8px] text-indigo-500 font-bold block mt-0.5">Excellent syllabus range</span>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-3 shadow-2xs">
              <div className="p-2.5 bg-amber-50 text-amber-600 rounded-lg">
                <Coins className="h-5 w-5" />
              </div>
              <div>
                <span className="text-slate-400 text-[8px] font-bold block uppercase leading-none">SPINS TRIGGERED</span>
                <span className="font-heading font-black text-lg text-slate-800">328,540</span>
                <span className="text-[8px] text-amber-500 font-bold block mt-0.5">92% rewards claimed</span>
              </div>
            </div>

          </div>

          {/* SVG usage reports charts */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-heading font-black text-slate-800 text-sm">Monthly Active Matches</h3>
                <p className="text-slate-400 text-[11px] font-sans">Visualizing total concurrent board games played by students across the country.</p>
              </div>
              <span className="bg-indigo-50 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded-sm">Yearly View</span>
            </div>

            <div className="w-full h-56 relative pt-4 flex items-end justify-between">
              
              <div className="absolute inset-x-0 top-1/4 border-t border-slate-100" />
              <div className="absolute inset-x-0 top-2/4 border-t border-slate-100" />
              <div className="absolute inset-x-0 top-3/4 border-t border-slate-100" />

              {[
                { label: 'Jan', count: '14K', h: 'h-[30%]' },
                { label: 'Feb', count: '19K', h: 'h-[45%]' },
                { label: 'Mar', count: '28K', h: 'h-[65%]' },
                { label: 'Apr', count: '42K', h: 'h-[85%]' },
                { label: 'May', count: '55K', h: 'h-[95%]' },
                { label: 'Jun', count: '48K', h: 'h-[80%]' }
              ].map((m) => (
                <div key={m.label} className="flex-1 flex flex-col items-center gap-2 z-10">
                  <span className="text-[10px] text-slate-400 font-bold">{m.count}</span>
                  <div className={`w-12 ${m.h} bg-indigo-600 rounded-t-xl transition-all duration-300 shadow-sm shadow-indigo-100`} />
                  <span className="text-xs font-bold text-slate-500">{m.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= SECTION 2: MANAGE QUESTIONS ================= */}
      {activeTab === 'questions' && (
        <div className="grid lg:grid-cols-12 gap-8 items-start animate-in fade-in duration-150">
          
          {/* New Question creation Form (COL-SPAN-5) */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-4 md:p-6 shadow-2xs space-y-4">
            <div>
              <h3 className="font-heading font-black text-slate-800 text-sm">Add New Curriculum Quest</h3>
              <p className="text-slate-400 text-xs">Fill options; questions become live instantly inside board game tiles.</p>
            </div>

            {successBanner && (
              <div className="bg-emerald-50 border border-emerald-100 text-emerald-800 p-3 rounded-xl flex items-center gap-2 text-xs">
                <CheckCircle2 className="h-4.5 w-4.5 text-emerald-600 shrink-0" />
                <span>Question saved successfully! Test on the playground.</span>
              </div>
            )}

            <form onSubmit={handleAddQuestionSubmit} className="space-y-3.5 text-xs font-medium">
              
              {/* Question */}
              <div className="space-y-1">
                <label className="text-slate-400 uppercase font-bold text-[8px] block">QUESTION TEXT</label>
                <input
                  type="text"
                  placeholder="e.g., What is 12 multiplied by 4?"
                  value={newQuestionText}
                  onChange={(e) => setNewQuestionText(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 outline-hidden px-3 py-2 rounded-lg text-slate-700 focus:bg-white text-xs focus:border-indigo-500"
                />
              </div>

              {/* Options list */}
              <div className="space-y-1.5">
                <label className="text-slate-400 uppercase font-bold text-[8px] block">OPTIONS (PROVIDE 4 CHOICES)</label>
                {options.map((opt, idx) => (
                  <input
                    key={idx}
                    type="text"
                    placeholder={`Choice ${String.fromCharCode(65 + idx)}`}
                    value={opt}
                    onChange={(e) => handleOptionChange(idx, e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 outline-hidden px-3 py-1.5 rounded-lg text-slate-700 focus:bg-white text-xs focus:border-indigo-500"
                  />
                ))}
              </div>

              {/* Correct Answer */}
              <div className="space-y-1">
                <label className="text-slate-400 uppercase font-bold text-[8px] block">CORRECT OPTION (MATCH MUST BE EXACT)</label>
                <input
                  type="text"
                  placeholder="e.g., 48"
                  value={correctAnswer}
                  onChange={(e) => setCorrectAnswer(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 outline-hidden px-3 py-2 rounded-lg text-slate-700 focus:bg-white text-xs focus:border-indigo-500"
                />
              </div>

              {/* Scope & Difficulty */}
              <div className="grid grid-cols-2 gap-2.5">
                <div className="space-y-1">
                  <label className="text-slate-400 uppercase font-bold text-[8px] block">SUBJECT</label>
                  <select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 p-1.5 rounded-lg focus:bg-white text-slate-700 text-xs focus:border-indigo-500"
                  >
                    <option value="math">Mathematics</option>
                    <option value="english">English Grammar</option>
                    <option value="science">General Science</option>
                    <option value="computer">Computer Sci</option>
                    <option value="coding">Coding Logic</option>
                    <option value="gk">GK Trivia</option>
                    <option value="reasoning">Logical Reasoning</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 uppercase font-bold text-[8px] block">GRADE SCOPE</label>
                  <select
                    value={selectedGroup}
                    onChange={(e) => setSelectedGroup(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 p-1.5 rounded-lg focus:bg-white text-slate-700 text-xs focus:border-indigo-500"
                  >
                    <option value="preschool">Preschool</option>
                    <option value="primary">Primary (1-5)</option>
                    <option value="middle">Middle (6-8)</option>
                    <option value="secondary">Secondary (9-10)</option>
                    <option value="senior_secondary">Senior Sec (11-12)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div className="space-y-1">
                  <label className="text-slate-400 uppercase font-bold text-[8px] block">DIFFICULTY</label>
                  <select
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 p-1.5 rounded-lg focus:bg-white text-slate-700 text-xs focus:border-indigo-500"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 uppercase font-bold text-[8px] block">HINT CLUE</label>
                  <input
                    type="text"
                    placeholder="e.g. 10 * 4 + 2 * 4"
                    value={hint}
                    onChange={(e) => setHint(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 outline-hidden p-1.5 rounded-lg text-slate-700 focus:bg-white text-xs focus:border-indigo-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-heading font-black text-xs rounded-lg flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-all"
              >
                <Plus className="h-4 w-4" /> Save Question
              </button>

            </form>
          </div>

          {/* Active Questions pool display (COL-SPAN-7) */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-4 md:p-6 shadow-2xs space-y-4">
            <div>
              <h3 className="font-heading font-black text-slate-800 text-sm">Active Question Bank ({questions.length})</h3>
              <p className="text-slate-400 text-xs">Verify current questions lists or purge legacy records.</p>
            </div>

            <div className="divide-y divide-slate-100 max-h-[500px] overflow-y-auto pr-2 space-y-3">
              {questions.map((q) => (
                <div key={q.id} className="pt-3 first:pt-0 flex items-start justify-between gap-4 text-left">
                  <div className="space-y-1">
                    <span className="text-[9px] font-black bg-indigo-50 border border-indigo-100 text-indigo-700 px-2 py-0.5 rounded-md uppercase mr-2 inline-block">
                      {q.subjectId}
                    </span>
                    <span className="text-[9px] font-black bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md uppercase inline-block">
                      {q.gradeGroup}
                    </span>
                    <p className="font-heading font-black text-slate-800 text-xs mt-1.5">
                      {q.question}
                    </p>
                    <p className="text-[10px] text-emerald-600 font-bold">✓ Correct Option: {q.correctAnswer}</p>
                  </div>

                  <button
                    onClick={() => onDeleteQuestion(q.id)}
                    className="p-1.5 bg-rose-50 text-rose-500 hover:bg-rose-100 rounded-lg transition-colors cursor-pointer shrink-0"
                  >
                    <Trash className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

          </div>

        </div>
      )}      {/* ================= SECTION 3: DRAG & DROP FILE UPLOAD ================= */}
      {activeTab === 'upload' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="bg-white border border-slate-200 rounded-xl p-5 md:p-6 shadow-2xs">
            
            <div className="text-center max-w-sm mx-auto space-y-1.5 mb-6">
              <h3 className="font-heading font-black text-lg text-slate-900">Media Assets Upload</h3>
              <p className="text-xs text-slate-400">
                Drag and drop game maps, illustration graphics, SVGs, or voice chime audio tracks to the repository.
              </p>
            </div>

            {/* Drag & Drop Visual Box */}
            <div
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer flex flex-col justify-center items-center space-y-3 ${
                dragActive 
                  ? 'border-indigo-600 bg-indigo-50/50 scale-98' 
                  : 'border-slate-200 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                className="hidden"
                onChange={handleFileInputChange}
              />
              <div className="p-4 bg-indigo-100 text-indigo-700 rounded-full animate-bounce">
                <Upload className="h-6 w-6" />
              </div>
              <div>
                <p className="font-heading font-black text-slate-700 text-sm">Drag files here or click to choose</p>
                <p className="text-[10px] text-slate-400 mt-1">PNG, JPG, SVG, MP3 up to 10MB each</p>
              </div>
            </div>

            {/* Active uploading progress list */}
            {uploadedFiles.length > 0 && (
              <div className="mt-8 space-y-3 max-w-md mx-auto text-left">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-2">
                  UPLOAD PROGRESS QUEUE
                </p>
                {uploadedFiles.map((file, idx) => (
                  <div key={idx} className="bg-slate-50 border border-slate-100 p-3 rounded-xl space-y-2">
                    <div className="flex justify-between text-xs font-bold text-slate-700">
                      <span className="truncate">{file.name}</span>
                      <span className="shrink-0 text-slate-400">{file.size}</span>
                    </div>
                    
                    {/* Progress bar */}
                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-indigo-600 rounded-full transition-all duration-150"
                        style={{ width: `${file.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
      )}

      {/* ================= SECTION 4: STUDENT ROSTER DB ================= */}
      {activeTab === 'students' && (
        <div className="bg-white border border-slate-200 rounded-xl p-4 md:p-6 shadow-2xs animate-in fade-in duration-150">
          <div>
            <h3 className="font-heading font-black text-slate-800 text-sm">Active Student Accounts Database</h3>
            <p className="text-slate-400 text-xs">Review active student scores, answers accuracy, and issue bonus currency rewards.</p>
          </div>

          <div className="overflow-x-auto mt-6">
            <table className="w-full text-left border-collapse min-w-[500px]">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-bold text-[10px] uppercase">
                  <th className="py-3 px-4">Student Name</th>
                  <th className="py-3 px-4">Level</th>
                  <th className="py-3 px-4">Wallet Balance</th>
                  <th className="py-3 px-4">Quiz Accuracy</th>
                  <th className="py-3 px-4">Recent Connection</th>
                  <th className="py-3 px-4 text-right">Administrative</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-xs font-medium text-slate-600">
                {students.map((st) => (
                  <tr key={st.id} className="hover:bg-slate-50/50">
                    <td className="py-4 px-4 font-heading font-black text-slate-800">{st.name}</td>
                    <td className="py-4 px-4 font-bold">Lvl {st.level}</td>
                    <td className="py-4 px-4 text-amber-600 font-bold flex items-center gap-1">
                      <Coins className="h-4 w-4" /> {st.coins} Coins
                    </td>
                    <td className="py-4 px-4 text-emerald-600 font-bold">{st.accuracy}% Correct</td>
                    <td className="py-4 px-4 text-slate-400">{st.lastActive}</td>
                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={() => rewardStudentBonus(st.id)}
                        className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-[10px] font-heading font-black rounded-lg transition-colors cursor-pointer"
                      >
                        Gift +100 Coins
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      )}

    </div>
  );
}
