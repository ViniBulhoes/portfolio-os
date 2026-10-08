import React, { useState } from 'react';
import { Lock, X, Terminal, ShieldAlert } from 'lucide-react';

export default function PasswordModal({ isOpen, onClose, onSuccess, projectName }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    // Defina aqui a senha secreta que você quiser para liberar os repositórios privados
    const SECRET_PASSWORD = 'admin'; 

    if (password === SECRET_PASSWORD) {
      setError(false);
      setPassword('');
      onSuccess(); // Libera o acesso/redireciona
    } else {
      setError(true);
      setPassword('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm pointer-events-auto p-4">
      <div className="w-full max-w-sm bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Barra do Modal */}
        <div className="h-10 bg-slate-800/80 border-b border-slate-700 flex items-center justify-between px-4">
          <div className="flex items-center space-x-2 text-slate-300">
            <Terminal className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-mono font-semibold">Acesso Restrito: {projectName}</span>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white/10 rounded text-slate-400 hover:text-white transition">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Corpo do Modal */}
        <form onSubmit={handleLogin} className="p-6 space-y-4">
          <div className="flex items-center space-x-3 text-slate-300">
            <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-400">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-400">Este repositório é privado.</p>
              <p className="text-sm font-semibold text-slate-200">Digite a senha de acesso:</p>
            </div>
          </div>

          <input 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha (dica: 'admin')"
            autoFocus
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono"
          />

          {error && (
            <div className="flex items-center space-x-1.5 text-rose-400 text-xs">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Senha incorreta. Acesso negado.</span>
            </div>
          )}

          <div className="flex space-x-2 pt-2">
            <button 
              type="button" 
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-medium transition"
            >
              Cancelar
            </button>
            <button 
              type="submit"
              className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-medium transition shadow-lg shadow-indigo-600/30"
            >
              Autenticar
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}