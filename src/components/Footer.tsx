import React from 'react';
import { Trophy, ShieldAlert, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 py-12 px-4 border-t border-slate-900">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 text-left text-xs">
        
        {/* Brand */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 text-white p-2 rounded-lg">
              <Trophy className="h-4 w-4" />
            </div>
            <span className="font-heading font-black italic tracking-tight text-lg text-white">IQS PRO</span>
          </div>
          <p className="text-slate-400 leading-normal max-w-xs">
            Play • Learn • Grow. Empowering kids with high-impact, curriculum-focused board game pathways that inspire critical thinking and cognitive speed.
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-3">
          <h4 className="font-heading font-black text-white text-xs uppercase tracking-wider">Playground Games</h4>
          <ul className="space-y-2">
            <li><a href="#math" className="hover:text-white transition-colors">Mathematics Race Track</a></li>
            <li><a href="#english" className="hover:text-white transition-colors">Grammar Hero Quests</a></li>
            <li><a href="#coding" className="hover:text-white transition-colors">Coding Logic Paths</a></li>
            <li><a href="#science" className="hover:text-white transition-colors">General Science Mysteries</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div className="space-y-3">
          <h4 className="font-heading font-black text-white text-xs uppercase tracking-wider">Help & Resources</h4>
          <ul className="space-y-2">
            <li><a href="https://edu.iqspropro.com" target="_blank" className="hover:text-white transition-colors">Parent Portal</a></li>
            <li><a href="#rules" className="hover:text-white transition-colors">Board Game Rules</a></li>
            <li><a href="#support" className="hover:text-white transition-colors">Syllabus Mapping</a></li>
            <li><a href="#accessibility" className="hover:text-white transition-colors">Accessibility Guidelines</a></li>
          </ul>
        </div>

        {/* Pedagogy Quote */}
        <div className="space-y-3 bg-slate-900 p-4 rounded-xl border border-slate-800">
          <h4 className="font-heading font-black text-white text-xs uppercase tracking-wider flex items-center gap-1">
            <span>💡</span> Pedagogy Focus
          </h4>
          <p className="text-slate-400 leading-normal italic">
            "Gamified learning has been proven to increase long-term cognitive recall by up to 83% over standard passive instruction."
          </p>
          <span className="text-[10px] text-indigo-400 font-bold block mt-1">- IQS Research Institute, 2026</span>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
        <p>© 2026 IQS Pro - IQS Fun Board Games. All rights reserved.</p>
        
        <p className="flex items-center gap-1 font-medium">
          Crafted with <Heart className="h-3 w-3 text-rose-500 fill-rose-500" /> for kids, parents, and teachers globally.
        </p>
      </div>

    </footer>
  );
}
