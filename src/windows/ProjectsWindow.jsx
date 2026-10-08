import React, { useState } from 'react';
import { ExternalLink, Lock, Folder, FileCode2, ArrowLeft, Terminal, Layout, ShieldAlert } from 'lucide-react';
import PasswordModal from '../components/PasswordModal';
import DecryptText from '../components/DecryptText';

export default function ProjectsWindow() {
  const [modalOpen, setModalOpen] = useState(false);
  const [projectToUnlock, setProjectToUnlock] = useState(null);
  
  // Estados do Explorador de Arquivos
  const [currentFolder, setCurrentFolder] = useState('root');
  const [selectedItem, setSelectedItem] = useState(null);

  const projects = [
    // Repositórios Públicos
    { title: "YouTube Downloader", desc: "Ferramenta para download de vídeos e conteúdos do YouTube de forma rápida e prática.", tags: ["Python", "Automation"], link: "https://github.com/ViniBulhoes/YouTube-Downloader", isPrivate: false },
    { title: "Todoist Clone", desc: "Aplicativo de gerenciamento de tarefas e produtividade inspirado no Todoist.", tags: ["React", "JavaScript", "Tailwind"], link: "https://github.com/ViniBulhoes/todoist", isPrivate: false },
    { title: "CIDA", desc: "Projeto colaborativo de aplicativo mobile com foco em experiência de usuário.", tags: ["React", "UI/UX", "Mobile"], link: "https://github.com/Vitaum42/CIDA", isPrivate: false },
    { title: "SARA", desc: "Sistema automatizado para regras de negócios e processamento de dados.", tags: ["JavaScript", "Fullstack"], link: "https://github.com/Vitaum42/SARA", isPrivate: false },
    // Repositórios Privados
    { title: "Hefesto", desc: "Aplicação web moderna desenvolvida com React, Tailwind CSS e Firebase.", tags: ["React", "Tailwind", "Firebase"], link: "https://github.com/ViniBulhoes/Hefesto", isPrivate: true },
    { title: "03-11-2025", desc: "Repositório de código com rotinas, scripts e automações em desenvolvimento.", tags: ["JavaScript", "Python"], link: "https://github.com/ViniBulhoes/03-11-2025", isPrivate: true },
    { title: "Amor", desc: "Projeto especial com páginas interativas e estilização avançada.", tags: ["React", "UI Design"], link: "https://github.com/ViniBulhoes/Amor", isPrivate: true }
  ];

  // Construção do Sistema de Ficheiros Virtual a partir do seu array
  const folders = {
    root: {
      name: 'C:\\Projetos',
      parentId: null,
      items: [
        { id: 'public', type: 'folder', title: 'Repositórios Públicos', desc: 'Projetos open-source e ferramentas acessíveis.', isPrivate: false },
        { id: 'private', type: 'folder', title: 'Arquivos Confidenciais', desc: 'Repositórios protegidos por senha e projetos em desenvolvimento fechado.', isPrivate: true }
      ]
    },
    public: {
      name: 'C:\\Projetos\\Públicos',
      parentId: 'root',
      items: projects.filter(p => !p.isPrivate).map(p => ({ ...p, type: 'file', id: p.title }))
    },
    private: {
      name: 'C:\\Projetos\\Confidenciais',
      parentId: 'root',
      items: projects.filter(p => p.isPrivate).map(p => ({ ...p, type: 'file', id: p.title }))
    }
  };

  const currentView = folders[currentFolder];

  // Lógica de Interação
  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleItemDoubleClick = (item) => {
    if (item.type === 'folder') {
      setCurrentFolder(item.id);
      setSelectedItem(null);
    } else {
      executeFile(item);
    }
  };

  const executeFile = (file) => {
    if (file.isPrivate) {
      setProjectToUnlock(file);
      setModalOpen(true);
    } else {
      window.open(file.link, '_blank', 'noopener,noreferrer');
    }
  };

  const handleGoBack = () => {
    if (currentView.parentId) {
      setCurrentFolder(currentView.parentId);
      setSelectedItem(null);
    }
  };

  const handleSuccess = () => {
    setModalOpen(false);
    if (projectToUnlock) {
      window.open(projectToUnlock.link, '_blank', 'noopener,noreferrer');
    }
  };

  // Funções de auxílio visual
  const getIcon = (item) => {
    if (item.type === 'folder') {
      return item.isPrivate 
        ? <Folder className="w-10 h-10 text-amber-500 fill-amber-500/20" /> 
        : <Folder className="w-10 h-10 text-indigo-400 fill-indigo-400/20" />;
    }
    if (item.tags?.includes('Python')) return <Terminal className="w-10 h-10 text-yellow-400" />;
    if (item.tags?.includes('React')) return <Layout className="w-10 h-10 text-blue-400" />;
    return <FileCode2 className="w-10 h-10 text-emerald-400" />;
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 text-slate-200 font-sans">
      
      {/* Barra de Navegação */}
      <div className="flex items-center gap-2 p-2 bg-slate-800 border-b border-slate-700">
        <button 
          onClick={handleGoBack}
          disabled={!currentView.parentId}
          className={`p-1.5 rounded-md transition-colors ${
            currentView.parentId ? 'hover:bg-slate-700 text-slate-200' : 'text-slate-600 cursor-not-allowed'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div className="flex-1 flex items-center bg-slate-900/50 border border-slate-700 rounded px-3 py-1.5 text-sm font-mono text-slate-300">
          {currentView.name}
        </div>
      </div>

      {/* Área Principal */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Grid de Ícones */}
        <div className="flex-1 p-4 overflow-y-auto grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 content-start">
          {currentView.items.map((item) => {
            const isSelected = selectedItem?.id === item.id;
            
            return (
              <div 
                key={item.id}
                onClick={() => handleItemClick(item)}
                onDoubleClick={() => handleItemDoubleClick(item)}
                className={`flex flex-col items-center gap-2 p-2 rounded-lg cursor-pointer transition-all border border-transparent ${
                  isSelected 
                    ? item.isPrivate ? 'bg-amber-500/20 border-amber-500/50' : 'bg-blue-500/20 border-blue-500/50'
                    : 'hover:bg-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="relative">
                  {getIcon(item)}
                  {item.isPrivate && item.type === 'file' && (
                    <Lock className="w-4 h-4 text-amber-400 absolute -bottom-1 -right-1 bg-slate-900 rounded-full p-0.5" />
                  )}
                </div>
                <span className="text-xs text-center line-clamp-2 break-all px-1 font-medium mt-1">
                  {item.isPrivate && item.type === 'file' ? <DecryptText text={item.title} /> : item.title}
                </span>
              </div>
            );
          })}
        </div>

        {/* Painel de Detalhes (Sidebar Lateral) */}
        {selectedItem && (
          <div className="w-64 bg-slate-800/50 border-l border-slate-700 p-4 flex flex-col gap-4 overflow-y-auto">
            <div className={`flex justify-center py-6 rounded-xl border ${
              selectedItem.isPrivate ? 'bg-amber-950/20 border-amber-500/30' : 'bg-slate-900/50 border-slate-700'
            }`}>
              {getIcon(selectedItem)}
            </div>
            
            <div>
              <h3 className={`font-semibold text-lg break-words ${selectedItem.isPrivate ? 'text-amber-400 font-mono' : 'text-slate-100'}`}>
                {selectedItem.isPrivate ? <DecryptText text={selectedItem.title} /> : selectedItem.title}
              </h3>
              <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-medium flex items-center gap-1">
                {selectedItem.type === 'folder' ? 'Pasta de Ficheiros' : 'Ficheiro Executável'}
                {selectedItem.isPrivate && <Lock className="w-3 h-3 text-amber-500" />}
              </p>
            </div>

            <div className="h-px bg-slate-700 w-full"></div>

            <p className="text-sm text-slate-300 leading-relaxed">
              {selectedItem.desc}
            </p>

            {/* Tags (Apenas para ficheiros) */}
            {selectedItem.type === 'file' && (
              <div className="flex flex-wrap gap-1.5 pt-2">
                {selectedItem.tags.map(t => (
                  <span key={t} className={`px-2 py-0.5 rounded text-[10px] font-medium border ${
                    selectedItem.isPrivate 
                      ? 'bg-amber-500/10 text-amber-300 border-amber-500/20 font-mono' 
                      : 'bg-slate-900 text-indigo-300 border-slate-700'
                  }`}>
                    {t}
                  </span>
                ))}
              </div>
            )}

            {/* Botão de Ação */}
            {selectedItem.type === 'file' && (
              <button 
                onClick={() => executeFile(selectedItem)}
                className={`mt-auto flex items-center justify-center gap-2 w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                  selectedItem.isPrivate 
                    ? 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border border-amber-500/50' 
                    : 'bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/50'
                }`}
              >
                {selectedItem.isPrivate ? <ShieldAlert className="w-4 h-4" /> : <ExternalLink className="w-4 h-4" />}
                {selectedItem.isPrivate ? 'Descriptografar' : 'Abrir Repositório'}
              </button>
            )}
          </div>
        )}
      </div>

      <PasswordModal 
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={handleSuccess}
        projectName={projectToUnlock?.title}
      />
      
    </div>
  );
}