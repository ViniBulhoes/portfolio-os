import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Music, SkipBack, SkipForward } from 'lucide-react';

export default function MusicPlayer({ 
  currentTrack, 
  isPlaying, 
  togglePlay, 
  nextTrack, 
  prevTrack, 
  currentTime, 
  duration, 
  seekAudio, 
  isDarkMode = true 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const formatTime = (time) => {
    if (isNaN(time) || !time) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative flex items-center" ref={containerRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`p-1.5 rounded flex items-center justify-center transition-colors ${
          isOpen ? (isDarkMode ? 'bg-slate-800' : 'bg-slate-300') : 'hover:bg-white/10'
        }`}
        title="Reprodutor de Áudio"
      >
        <Music className={`w-3.5 h-3.5 ${isPlaying ? 'text-blue-400 animate-spin-slow' : 'text-slate-300'}`} />
      </button>

      {isOpen && (
        <div className={`absolute top-full right-0 mt-2 w-72 rounded-xl shadow-2xl border p-4 z-[9999] animate-in fade-in zoom-in-95 duration-100 ${
          isDarkMode 
            ? 'bg-slate-800/95 border-slate-700/50 text-slate-200 backdrop-blur-xl' 
            : 'bg-white/95 border-slate-300 text-slate-700 backdrop-blur-xl'
        }`}>
          {!currentTrack ? (
            <div className="py-6 flex flex-col items-center justify-center text-xs text-slate-400 gap-2">
              <Music className="w-8 h-8 opacity-30 text-slate-400" />
              <span>Nenhuma música selecionada</span>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-blue-500/20 text-blue-400 shrink-0 ${isPlaying ? 'animate-spin-slow' : ''}`}>
                  <Music className="w-6 h-6" />
                </div>
                <div className="flex flex-col flex-1 overflow-hidden">
                  <span className="text-sm font-bold truncate tracking-tight text-slate-100">
                    {currentTrack.title}
                  </span>
                  <span className="text-xs opacity-70 truncate mt-0.5 text-slate-400 font-medium">
                    {currentTrack.artist}
                  </span>
                </div>
              </div>

              <div className="mb-4 flex flex-col gap-1.5" onClick={(e) => e.stopPropagation()}>
                <input 
                  type="range" 
                  min="0" 
                  max={duration || 100} 
                  value={currentTime} 
                  onChange={(e) => seekAudio(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <div className="flex justify-between text-[10px] font-medium text-slate-400">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              <div className={`h-px w-full mb-4 ${isDarkMode ? 'bg-slate-700' : 'bg-slate-200'}`}></div>

              <div className="flex justify-center items-center gap-4">
                <button 
                  onClick={(e) => { e.stopPropagation(); prevTrack(); }}
                  className={`p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-slate-700 text-slate-300' : 'hover:bg-slate-200 text-slate-600'}`}
                >
                  <SkipBack className="w-4 h-4 fill-current" />
                </button>

                <button 
                  onClick={(e) => { e.stopPropagation(); togglePlay(); }}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-transform hover:scale-105 active:scale-95 ${
                    isDarkMode 
                      ? 'bg-slate-100 text-slate-900 hover:bg-white' 
                      : 'bg-slate-900 text-white hover:bg-slate-800'
                  }`}
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 fill-current" />
                  ) : (
                    <Play className="w-5 h-5 fill-current ml-1" />
                  )}
                </button>

                <button 
                  onClick={(e) => { e.stopPropagation(); nextTrack(); }}
                  className={`p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-slate-700 text-slate-300' : 'hover:bg-slate-200 text-slate-600'}`}
                >
                  <SkipForward className="w-4 h-4 fill-current" />
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}