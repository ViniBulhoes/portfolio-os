import React, { useState, useEffect, useRef } from 'react';
import { 
  User, FolderGit2, Mail, Calculator as CalcIcon, FileText,
  RefreshCw, Image as ImageIcon, Settings, FolderPlus, Headphones
} from 'lucide-react';

import DesktopIcon from './components/DesktopIcon';
import TopBar from './components/TopBar';
import Dock from './components/Dock';
import StartMenu from './components/StartMenu';
import WindowFrame from './components/WindowFrame';

import AboutWindow from './windows/AboutWindow';
import ProjectsWindow from './windows/ProjectsWindow';
import NotesWindow from './windows/NotesWindow';
import CalcWindow from './windows/CalcWindow';
import ContactWindow from './windows/ContactWindow';
import MusicWindow from './windows/MusicWindow';

export default function App() {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  // Estado Global do Áudio (YouTube)
  const [tracks, setTracks] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5); // 0 a 1
  
  const ytPlayerRef = useRef(null);
  const currentTrack = currentTrackIndex !== null && tracks.length > 0 ? tracks[currentTrackIndex] : null;

  // Carrega a API de Iframe do YouTube nativa uma única vez
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    window.onYouTubeIframeAPIReady = () => {
      ytPlayerRef.current = new window.YT.Player('yt-hidden-player', {
        height: '1',
        width: '1',
        playerVars: {
          autoplay: 1,
          controls: 0,
          disablekb: 1,
        },
        events: {
          onStateChange: (event) => {
            // 1 = PLAYING, 2 = PAUSED, 0 = ENDED
            if (event.data === 1) setIsPlaying(true);
            if (event.data === 2) setIsPlaying(false);
            if (event.data === 0) nextTrack();
          }
        }
      });
    };
  }, []);

  // Atualização contínua do progresso do áudio
  useEffect(() => {
    const timer = setInterval(() => {
      if (ytPlayerRef.current && typeof ytPlayerRef.current.getCurrentTime === 'function' && isPlaying) {
        setCurrentTime(ytPlayerRef.current.getCurrentTime());
        setDuration(ytPlayerRef.current.getDuration() || 0);
      }
    }, 500);
    return () => clearInterval(timer);
  }, [isPlaying]);

  // Sincroniza o volume real
  useEffect(() => {
    if (ytPlayerRef.current && typeof ytPlayerRef.current.setVolume === 'function') {
      ytPlayerRef.current.setVolume(volume * 100);
    }
  }, [volume]);

  // Controles Globais de Reprodução
  const togglePlay = () => {
    if (!ytPlayerRef.current || !currentTrack) return;
    if (isPlaying) {
      ytPlayerRef.current.pauseVideo();
    } else {
      ytPlayerRef.current.playVideo();
    }
  };

  const nextTrack = () => {
    if (tracks.length === 0) return;
    const nextIdx = (currentTrackIndex + 1) % tracks.length;
    setCurrentTrackIndex(nextIdx);
    playVideoId(tracks[nextIdx].videoId);
  };

  const prevTrack = () => {
    if (tracks.length === 0) return;
    const prevIdx = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    setCurrentTrackIndex(prevIdx);
    playVideoId(tracks[prevIdx].videoId);
  };

  const playVideoId = (videoId) => {
    if (ytPlayerRef.current && typeof ytPlayerRef.current.loadVideoById === 'function') {
      ytPlayerRef.current.loadVideoById(videoId);
      setIsPlaying(true);
    }
  };

  const selectTrack = (track) => {
    const index = tracks.findIndex(t => t.id === track.id);
    if (index !== -1) {
      setCurrentTrackIndex(index);
      playVideoId(track.videoId);
    }
  };

  const addTrackByYoutube = (newTrack) => {
    setTracks(prev => [...prev, newTrack]);
    setCurrentTrackIndex(tracks.length);
    playVideoId(newTrack.videoId);
  };

  const seekAudio = (timeValue) => {
    if (ytPlayerRef.current && typeof ytPlayerRef.current.seekTo === 'function') {
      ytPlayerRef.current.seekTo(timeValue, true);
      setCurrentTime(timeValue);
    }
  };

  // Gerenciamento de Janelas
  const [windows, setWindows] = useState({
    about: { isOpen: false, isMinimized: false, isMaximized: true, zIndex: 10 },
    projects: { isOpen: false, isMinimized: false, isMaximized: true, zIndex: 5 },
    contact: { isOpen: false, isMinimized: false, isMaximized: true, zIndex: 1 },
    notes: { isOpen: false, isMinimized: false, isMaximized: false, zIndex: 2 },
    calculator: { isOpen: false, isMinimized: false, isMaximized: false, zIndex: 3 },
    music: { isOpen: false, isMinimized: false, isMaximized: false, zIndex: 4 },
  });
  
  const [activeWindow, setActiveWindow] = useState(null);
  const [highestZ, setHighestZ] = useState(10);
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0 });

  const apps = [
    { key: 'about', label: 'Sobre', icon: <User className="w-5 h-5 text-indigo-400" /> },
    { key: 'projects', label: 'Projetos', icon: <FolderGit2 className="w-5 h-5 text-amber-400" /> },
    { key: 'notes', label: 'Notas', icon: <FileText className="w-5 h-5 text-emerald-400" /> },
    { key: 'calculator', label: 'Calc', icon: <CalcIcon className="w-5 h-5 text-blue-400" /> },
    { key: 'music', label: 'Música', icon: <Headphones className="w-5 h-5 text-green-500" /> },
    { key: 'contact', label: 'Contato', icon: <Mail className="w-5 h-5 text-rose-400" /> },
  ];

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setDate(now.toLocaleDateString([], { day: '2-digit', month: '2-digit', year: 'numeric' }));
    };
    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const bringToFront = (windowKey) => {
    const newZ = highestZ + 1;
    setHighestZ(newZ);
    setWindows(prev => ({
      ...prev,
      [windowKey]: { ...prev[windowKey], isMinimized: false, zIndex: newZ }
    }));
    setActiveWindow(windowKey);
    setStartMenuOpen(false);
  };

  const toggleWindow = (windowKey) => {
    if (!windows[windowKey].isOpen) {
      setWindows(prev => ({ ...prev, [windowKey]: { ...prev[windowKey], isOpen: true } }));
      bringToFront(windowKey);
    } else if (windows[windowKey].isMinimized) {
      bringToFront(windowKey);
    } else if (activeWindow === windowKey) {
      setWindows(prev => ({ ...prev, [windowKey]: { ...prev[windowKey], isMinimized: true } }));
    } else {
      bringToFront(windowKey);
    }
  };

  const closeWindow = (windowKey, e) => {
    e.stopPropagation();
    setWindows(prev => ({ ...prev, [windowKey]: { ...prev[windowKey], isOpen: false } }));
  };

  const toggleMaximize = (windowKey, e) => {
    e.stopPropagation();
    setWindows(prev => ({
      ...prev,
      [windowKey]: { ...prev[windowKey], isMaximized: !prev[windowKey].isMaximized }
    }));
  };

  const updateWindow = (key, props) => {
    setWindows(prev => ({ ...prev, [key]: { ...prev[key], ...props } }));
  };

  // Menu de Contexto
  useEffect(() => {
    const handleClickOutside = () => {
      if (contextMenu.visible) setContextMenu(prev => ({ ...prev, visible: false }));
    };
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, [contextMenu.visible]);

  const handleContextMenu = (e) => {
    e.preventDefault();
    if (startMenuOpen) setStartMenuOpen(false);

    const menuWidth = 192;
    const menuHeight = 160; 
    let posX = e.pageX;
    let posY = e.pageY;

    if (posX + menuWidth > window.innerWidth) posX = window.innerWidth - menuWidth - 5;
    if (posY + menuHeight > window.innerHeight) posY = window.innerHeight - menuHeight - 5;

    setContextMenu({ visible: true, x: posX, y: posY });
  };

  const musicProps = {
    currentTrack,
    isPlaying,
    togglePlay,
    nextTrack,
    prevTrack,
    currentTime,
    duration,
    seekAudio
  };

  return (
    <div 
      className={`h-screen w-screen overflow-hidden select-none flex flex-col font-sans transition-colors duration-300 relative ${isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-sky-100 text-slate-800'}`}
      onContextMenu={handleContextMenu}
    >
      {/* Player do YouTube Oculto em Background (só toca o áudio) */}
      <div className="absolute top-0 left-0 w-1 h-1 pointer-events-none opacity-0 overflow-hidden">
        <div id="yt-hidden-player"></div>
      </div>

      {/* Desktop */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center overflow-hidden flex flex-col justify-between"
        style={{
          backgroundImage: isDarkMode 
            ? 'radial-gradient(circle at 50% 50%, #1e1b4b 0%, #09090b 100%)' 
            : 'radial-gradient(circle at 50% 50%, #bae6fd 0%, #38bdf8 100%)'
        }}
      >
        <div className="relative w-full h-full pointer-events-auto">
          {/* Coluna 1 (4 ícones) */}
          <DesktopIcon 
            icon={<User className="w-8 h-8 text-indigo-400" />} 
            label="Sobre Mim" 
            initialX={30} 
            initialY={60} 
            onClick={() => toggleWindow('about')} 
          />
          <DesktopIcon 
            icon={<FolderGit2 className="w-8 h-8 text-amber-400" />} 
            label="Projetos" 
            initialX={30} 
            initialY={170} 
            onClick={() => toggleWindow('projects')} 
          />
          <DesktopIcon 
            icon={<FileText className="w-8 h-8 text-emerald-400" />} 
            label="Bio.txt" 
            initialX={30} 
            initialY={280} 
            onClick={() => toggleWindow('notes')} 
          />
          <DesktopIcon 
            icon={<CalcIcon className="w-8 h-8 text-blue-400" />} 
            label="Calculadora" 
            initialX={30} 
            initialY={390} 
            onClick={() => toggleWindow('calculator')} 
          />

          {/* Coluna 2 (2 ícones) */}
          <DesktopIcon 
            icon={<Headphones className="w-8 h-8 text-green-500" />} 
            label="Música" 
            initialX={130} 
            initialY={60} 
            onClick={() => toggleWindow('music')} 
          />
          <DesktopIcon 
            icon={<Mail className="w-8 h-8 text-rose-400" />} 
            label="Contato" 
            initialX={130} 
            initialY={170} 
            onClick={() => toggleWindow('contact')} 
          />
        </div>
      </div>

      <TopBar 
        startMenuOpen={startMenuOpen}
        setStartMenuOpen={setStartMenuOpen}
        activeWindow={activeWindow}
        windows={windows}
        musicProps={musicProps}
        isDarkMode={isDarkMode}
      />

      <div className="relative flex-1 z-25 pointer-events-none overflow-hidden">
        {windows.about.isOpen && !windows.about.isMinimized && (
          <WindowFrame 
            title="Sobre Mim - Perfil Profissional" 
            icon={<User className="w-4 h-4 text-indigo-400" />}
            zIndex={windows.about.zIndex}
            isMaximized={windows.about.isMaximized}
            onClose={(e) => closeWindow('about', e)}
            onMinimize={() => updateWindow('about', { isMinimized: true })}
            onMaximize={(e) => toggleMaximize('about', e)}
            onClick={() => bringToFront('about')}
            isDarkMode={isDarkMode}
          >
            <AboutWindow />
          </WindowFrame>
        )}

        {windows.projects.isOpen && !windows.projects.isMinimized && (
          <WindowFrame 
            title="Projetos em Destaque" 
            icon={<FolderGit2 className="w-4 h-4 text-amber-400" />}
            zIndex={windows.projects.zIndex}
            isMaximized={windows.projects.isMaximized}
            onClose={(e) => closeWindow('projects', e)}
            onMinimize={() => updateWindow('projects', { isMinimized: true })}
            onMaximize={(e) => toggleMaximize('projects', e)}
            onClick={() => bringToFront('projects')}
            isDarkMode={isDarkMode}
          >
            <ProjectsWindow />
          </WindowFrame>
        )}

        {windows.notes.isOpen && !windows.notes.isMinimized && (
          <WindowFrame 
            title="Bio.txt - Bloco de Notas" 
            icon={<FileText className="w-4 h-4 text-emerald-400" />}
            zIndex={windows.notes.zIndex}
            isMaximized={windows.notes.isMaximized}
            onClose={(e) => closeWindow('notes', e)}
            onMinimize={() => updateWindow('notes', { isMinimized: true })}
            onMaximize={(e) => toggleMaximize('notes', e)}
            onClick={() => bringToFront('notes')}
            isDarkMode={isDarkMode}
          >
            <NotesWindow />
          </WindowFrame>
        )}

        {windows.calculator.isOpen && !windows.calculator.isMinimized && (
          <WindowFrame 
            title="Calculadora" 
            icon={<CalcIcon className="w-4 h-4 text-blue-400" />}
            zIndex={windows.calculator.zIndex}
            isMaximized={windows.calculator.isMaximized}
            onClose={(e) => closeWindow('calculator', e)}
            onMinimize={() => updateWindow('calculator', { isMinimized: true })}
            onMaximize={(e) => toggleMaximize('calculator', e)}
            onClick={() => bringToFront('calculator')}
            isDarkMode={isDarkMode}
          >
            <CalcWindow />
          </WindowFrame>
        )}

        {windows.music.isOpen && !windows.music.isMinimized && (
          <WindowFrame 
            title="Reprodutor de Música" 
            icon={<Headphones className="w-4 h-4 text-green-500" />}
            zIndex={windows.music.zIndex}
            isMaximized={windows.music.isMaximized}
            onClose={(e) => closeWindow('music', e)}
            onMinimize={() => updateWindow('music', { isMinimized: true })}
            onMaximize={(e) => toggleMaximize('music', e)}
            onClick={() => bringToFront('music')}
            isDarkMode={isDarkMode}
          >
            <MusicWindow 
              tracks={tracks}
              currentTrack={currentTrack}
              isPlaying={isPlaying}
              selectTrack={selectTrack}
              togglePlay={togglePlay}
              addTrackByYoutube={addTrackByYoutube}
              isDarkMode={isDarkMode}
            />
          </WindowFrame>
        )}

        {windows.contact.isOpen && !windows.contact.isMinimized && (
          <WindowFrame 
            title="Contato / Redes" 
            icon={<Mail className="w-4 h-4 text-rose-400" />}
            zIndex={windows.contact.zIndex}
            isMaximized={windows.contact.isMaximized}
            onClose={(e) => closeWindow('contact', e)}
            onMinimize={() => updateWindow('contact', { isMinimized: true })}
            onMaximize={(e) => toggleMaximize('contact', e)}
            onClick={() => bringToFront('contact')}
            isDarkMode={isDarkMode}
          >
            <ContactWindow />
          </WindowFrame>
        )}
      </div>

      <StartMenu 
        isOpen={startMenuOpen}
        toggleWindow={toggleWindow}
        setStartMenuOpen={setStartMenuOpen}
      />

      <Dock 
        apps={apps}
        windows={windows}
        toggleWindow={toggleWindow}
        time={time}
        date={date}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        volume={volume}
        setVolume={setVolume}
      />

      {contextMenu.visible && (
        <div 
          className={`absolute z-[9999] w-48 backdrop-blur-xl border rounded-xl shadow-2xl py-1.5 text-sm ${
            isDarkMode 
              ? 'bg-slate-800/95 border-slate-600/50 text-slate-200 shadow-black/50' 
              : 'bg-white/95 border-slate-300 text-slate-700 shadow-slate-300/50'
          } animate-in fade-in zoom-in-95 duration-100`}
          style={{ top: contextMenu.y, left: contextMenu.x }}
          onClick={(e) => e.stopPropagation()}
        >
          <button 
            className={`w-full text-left px-4 py-2 flex items-center gap-2.5 transition-colors ${
              isDarkMode ? 'hover:bg-blue-600/80 hover:text-white' : 'hover:bg-blue-100 hover:text-blue-900'
            }`}
          >
            <FolderPlus className="w-4 h-4" /> Nova Pasta
          </button>
          
          <button 
            onClick={() => window.location.reload()}
            className={`w-full text-left px-4 py-2 flex items-center gap-2.5 transition-colors ${
              isDarkMode ? 'hover:bg-blue-600/80 hover:text-white' : 'hover:bg-blue-100 hover:text-blue-900'
            }`}
          >
            <RefreshCw className="w-4 h-4" /> Atualizar
          </button>
          
          <div className={`h-px my-1 mx-2 ${isDarkMode ? 'bg-slate-600/50' : 'bg-slate-200'}`}></div>
          
          <button 
            onClick={() => {
              setIsDarkMode(!isDarkMode);
              setContextMenu(prev => ({ ...prev, visible: false }));
            }}
            className={`w-full text-left px-4 py-2 flex items-center gap-2.5 transition-colors ${
              isDarkMode ? 'hover:bg-blue-600/80 hover:text-white' : 'hover:bg-blue-100 hover:text-blue-900'
            }`}
          >
            <ImageIcon className="w-4 h-4" /> Alternar Tema
          </button>
          
          <button 
            className={`w-full text-left px-4 py-2 flex items-center gap-2.5 transition-colors ${
              isDarkMode ? 'hover:bg-blue-600/80 hover:text-white' : 'hover:bg-blue-100 hover:text-blue-900'
            }`}
          >
            <Settings className="w-4 h-4" /> Definições
          </button>
        </div>
      )}
    </div>
  );
}