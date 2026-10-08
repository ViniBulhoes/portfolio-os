import React from 'react';

export default function NotesWindow() {
  return (
    <textarea 
      className="w-full h-48 bg-transparent resize-none outline-none font-mono text-xs text-slate-300"
      defaultValue="// Notas do Desenvolvedor&#10;&#10;Status: Disponível para novos projetos e desafios.&#10;Foco atual: Aperfeiçoamento em UI/UX e Arquitetura Front-End.&#10;&#10;Obrigado por visitar meu portfólio interativo!"
    />
  );
}