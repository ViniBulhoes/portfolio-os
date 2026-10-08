import React from 'react';
import { Cpu, User, FolderGit2, FileText, Calculator as CalcIcon, Mail } from 'lucide-react';

export default function StartMenu({ isOpen, toggleWindow, setStartMenuOpen }) {
  if (!isOpen) return null;

  const menuItems = [
    { key: 'about', label: 'Sobre Mim', icon: <User className="w-4 h-4 text-indigo-400" /> },
    { key: 'projects', label: 'Projetos', icon: <FolderGit2 className="w-4 h-4 text-amber-400" /> },
    { key: 'notes', label: 'Bio.txt', icon: <FileText className="w-4 h-4 text-emerald-400" /> },
    { key: 'calculator', label: 'Calculadora', icon: <CalcIcon className="w-4 h-4 text-blue-400" /> },
    { key: 'contact', label: 'Contato', icon: <Mail className="w-4 h-4 text-rose-400" /> },
  ];

  return (
    <div className="absolute bottom-16 left-4 z-50 w-64 bg-slate-900/90 backdrop-blur-xl border border-slate-700 rounded-xl shadow-2xl p-3 text-slate-200 animate-in fade-in slide-in-from-bottom-2">
      <div className="px-3 py-2 border-b border-slate-700/60 mb-2 flex items-center space-x-2">
        <Cpu className="w-4 h-4 text-indigo-400" />
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Atalhos do Sistema</span>
      </div>
      <div className="space-y-1">
        {menuItems.map((item) => (
          <button 
            key={item.key}
            onClick={() => {
              toggleWindow(item.key);
              setStartMenuOpen(false);
            }} 
            className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-white/15 transition text-sm"
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}