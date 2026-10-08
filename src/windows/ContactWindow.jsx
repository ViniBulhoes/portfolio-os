import React, { useState } from 'react';
import { Mail, MapPin, Copy, Check, ExternalLink } from 'lucide-react';

export default function ContactWindow({ isDarkMode = true }) {
  const [copied, setCopied] = useState(false);

  const contactInfo = {
    email: "vinibulhoesporto@gmail.com",
    github: "https://github.com/ViniBulhoes",
    linkedin: "https://www.linkedin.com/in/viniciusbulhoesporto/",
    instagram: "https://www.instagram.com/bulhoes_vini",
    location: "São Paulo - SP, Brasil"
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`w-full h-full p-6 overflow-y-auto select-none space-y-5 ${
      isDarkMode ? 'bg-slate-900/90 text-slate-200' : 'bg-slate-50 text-slate-800'
    }`}>
      {/* Cabeçalho */}
      <div>
        <h2 className="text-lg font-bold tracking-tight">Vamos Conectar?</h2>
        <p className="text-xs text-slate-400 mt-1">
          Sinta-se à vontade para entrar em contacto para oportunidades, networking ou colaborações em projetos.
        </p>
      </div>

      {/* Cartão de E-mail Direto */}
      <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-3 ${
        isDarkMode ? 'bg-slate-800/40 border-slate-700/60' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div className="flex items-center gap-3 overflow-hidden w-full sm:w-auto">
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center shrink-0">
            <Mail className="w-5 h-5" />
          </div>
          <div className="overflow-hidden">
            <p className="text-[11px] text-slate-400 font-medium">E-mail Principal</p>
            <p className="text-xs font-semibold truncate text-slate-200 font-mono mt-0.5">
              {contactInfo.email}
            </p>
          </div>
        </div>

        <button 
          onClick={handleCopyEmail}
          className={`w-full sm:w-auto px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer shrink-0 ${
            copied
              ? 'bg-emerald-600 text-white'
              : isDarkMode 
                ? 'bg-slate-700/80 hover:bg-slate-700 text-slate-200' 
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? 'Copiado!' : 'Copiar'}
        </button>
      </div>

      {/* Redes e Links Externos */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* GitHub */}
        <a 
          href={contactInfo.github} 
          target="_blank" 
          rel="noopener noreferrer"
          className={`p-4 rounded-xl border flex items-center justify-between transition group cursor-pointer ${
            isDarkMode 
              ? 'bg-slate-800/20 border-slate-700/40 hover:bg-slate-800/50 hover:border-slate-600' 
              : 'bg-white border-slate-200 hover:bg-slate-50 shadow-sm'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-slate-800 text-slate-200 border border-slate-700 flex items-center justify-center">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-200">GitHub</p>
              <p className="text-[10px] text-slate-400">Ver projetos</p>
            </div>
          </div>
          <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-indigo-400 transition" />
        </a>

        {/* LinkedIn */}
        <a 
          href={contactInfo.linkedin} 
          target="_blank" 
          rel="noopener noreferrer"
          className={`p-4 rounded-xl border flex items-center justify-between transition group cursor-pointer ${
            isDarkMode 
              ? 'bg-slate-800/20 border-slate-700/40 hover:bg-slate-800/50 hover:border-slate-600' 
              : 'bg-white border-slate-200 hover:bg-slate-50 shadow-sm'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20 flex items-center justify-center">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.65 1.65 0 1 0 0-3.3 1.65 1.65 0 0 0 0 3.3m1.4 9.74V9.92H5.06v8.58h2.8z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-200">LinkedIn</p>
              <p className="text-[10px] text-slate-400">Perfil profissional</p>
            </div>
          </div>
          <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-sky-400 transition" />
        </a>

        {/* Instagram */}
        <a 
          href={contactInfo.instagram} 
          target="_blank" 
          rel="noopener noreferrer"
          className={`p-4 rounded-xl border flex items-center justify-between transition group cursor-pointer ${
            isDarkMode 
              ? 'bg-slate-800/20 border-slate-700/40 hover:bg-slate-800/50 hover:border-slate-600' 
              : 'bg-white border-slate-200 hover:bg-slate-50 shadow-sm'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-pink-500/10 text-pink-400 border border-pink-500/20 flex items-center justify-center">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-200">Instagram</p>
              <p className="text-[10px] text-slate-400">@bulhoes_vini</p>
            </div>
          </div>
          <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-pink-400 transition" />
        </a>
      </div>

      {/* Localização */}
      <div className={`p-3.5 rounded-xl border flex items-center gap-2.5 text-xs text-slate-400 ${
        isDarkMode ? 'bg-slate-800/10 border-slate-800' : 'bg-slate-100/50 border-slate-200'
      }`}>
        <MapPin className="w-4 h-4 text-rose-400 shrink-0" />
        <span>Localização: <strong className="text-slate-300 font-medium">{contactInfo.location}</strong></span>
      </div>
    </div>
  );
}