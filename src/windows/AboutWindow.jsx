import React from 'react';
import { User, Code2, GraduationCap, Briefcase, Sparkles } from 'lucide-react';

export default function AboutWindow({ isDarkMode = true }) {
  return (
    <div className={`w-full h-full p-6 overflow-y-auto select-none space-y-6 ${
      isDarkMode ? 'bg-slate-900/90 text-slate-200' : 'bg-slate-50 text-slate-800'
    }`}>
      {/* Cabeçalho de Perfil */}
      <div className={`p-5 rounded-2xl border flex flex-col sm:flex-row items-center gap-5 ${
        isDarkMode ? 'bg-slate-800/40 border-slate-700/60' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-indigo-500 to-sky-400 p-0.5 shadow-lg shrink-0">
          <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center text-white">
            <User className="w-10 h-10 text-indigo-400" />
          </div>
        </div>
        <div className="text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <h2 className="text-xl font-bold tracking-tight">Vinicius Porto</h2>
            <Sparkles className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-xs text-indigo-400 font-medium mt-0.5">
            Desenvolvedor Web & Estudante de ADS
          </p>
          <div className="flex flex-wrap gap-2 mt-3 justify-center sm:justify-start">
            <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-mono">
              React / Vite
            </span>
            <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 font-mono">
              Tailwind CSS
            </span>
            <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
              JavaScript / SQL
            </span>
          </div>
        </div>
      </div>

      {/* Texto de Apresentação */}
      <div className={`p-5 rounded-2xl border space-y-4 text-sm leading-relaxed ${
        isDarkMode ? 'bg-slate-800/20 border-slate-700/40 text-slate-300' : 'bg-white border-slate-200 text-slate-600 shadow-sm'
      }`}>
        <p>
          Sempre fui curioso com tecnologia — tudo começou com computadores e jogos, e com o tempo essa curiosidade evoluiu para uma verdadeira vocação. Hoje sou estudante de <strong className="text-indigo-400 font-semibold">Análise e Desenvolvimento de Sistemas</strong> na Universidade Cruzeiro do Sul, com foco em <strong className="text-indigo-400 font-semibold">desenvolvimento web</strong> e lógica de programação.
        </p>
        <p>
          Atualmente, atuo na área de <strong className="text-indigo-400 font-semibold">TI no setor operacional da ACNSF</strong>, onde tenho a oportunidade de lidar com desafios reais, aprimorar minha visão prática e fortalecer minha base técnica no dia a dia.
        </p>
        <p>
          Busco aplicar meu conhecimento em projetos reais, aprender continuamente e construir uma carreira sólida na área de tecnologia.
        </p>
      </div>

      {/* Destaques Acadêmicos / Profissionais */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className={`p-4 rounded-xl border flex items-start gap-3.5 ${
          isDarkMode ? 'bg-slate-800/30 border-slate-700/40' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 shrink-0">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-200">Formação Acadêmica</h3>
            <p className="text-xs text-slate-400 mt-0.5">Análise e Desenvolvimento de Sistemas</p>
            <p className="text-[11px] text-indigo-400/80 font-mono mt-1">Universidade Cruzeiro do Sul</p>
          </div>
        </div>

        <div className={`p-4 rounded-xl border flex items-start gap-3.5 ${
          isDarkMode ? 'bg-slate-800/30 border-slate-700/40' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-200">Experiência Atual</h3>
            <p className="text-xs text-slate-400 mt-0.5">TI Operacional</p>
            <p className="text-[11px] text-emerald-400/80 font-mono mt-1">ACNSF</p>
          </div>
        </div>
      </div>
    </div>
  );
}