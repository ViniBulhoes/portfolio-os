import React from 'react';
import { Sparkles } from 'lucide-react';
import MusicPlayer from './MusicPlayer';

export default function TopBar({ 
  startMenuOpen, 
  setStartMenuOpen, 
  activeWindow,
  windows,
  musicProps,
  isDarkMode
}) {
  const isWindowActive = activeWindow && windows[activeWindow]?.isOpen && !windows[activeWindow]?.isMinimized;
  
  const windowTitles = {
    about: 'Sobre Mim',
    projects: 'Projetos',
    notes: 'Bio.txt',
    calculator: 'Calculadora',
    contact: 'Contato',
    music: 'Música'
  };

  return (
    <div className="relative z-50 h-8 bg-slate-900/60 backdrop-blur-md border-b border-slate-700/50 flex items-center justify-between px-4 text-xs text-slate-200">
      <div className="flex items-center space-x-4">
        <button 
          onClick={() => setStartMenuOpen(!startMenuOpen)}
          className="flex items-center space-x-1.5 hover:bg-white/10 px-2 py-1 rounded transition"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span className="font-medium hidden sm:inline">Portfólio OS</span>
        </button>
        <span className="hidden sm:inline text-slate-400">|</span>
        <span className="hidden sm:inline font-medium text-slate-300">
          {isWindowActive ? `${windowTitles[activeWindow] || 'App'} Ativo` : 'Nenhuma janela ativa'}
        </span>
      </div>

      <div className="flex items-center gap-4">
        <MusicPlayer {...musicProps} isDarkMode={isDarkMode} />
        <div className="hidden lg:block text-[11px] text-slate-400 font-medium">
          Vinicius Porto • Portfólio Interativo
        </div>
      </div>
    </div>
  );
}