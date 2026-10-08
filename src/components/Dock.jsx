import React, { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Wifi, Volume2, VolumeX, BatteryFull } from 'lucide-react';

export default function Dock({ 
  apps, 
  windows, 
  toggleWindow, 
  time, 
  date, 
  isDarkMode, 
  setIsDarkMode,
  volume = 0.5,
  setVolume
}) {
  const [showVolume, setShowVolume] = useState(false);
  const [isDraggingVolume, setIsDraggingVolume] = useState(false);
  const volumeRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (volumeRef.current && !volumeRef.current.contains(event.target)) {
        setShowVolume(false);
      }
    };
    if (showVolume) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showVolume]);

  const volumePercent = Math.round(volume * 100);

  return (
    <div className="relative z-40 h-16 bg-slate-900/70 backdrop-blur-md border-t border-slate-700/50 flex items-center justify-between px-4">
      
      <div className="hidden sm:flex items-center w-32">
        <span className="text-[11px] text-slate-400 font-mono">v1.0.0</span>
      </div>

      <div className="flex items-center space-x-3 mx-auto">
        {apps.map((app) => {
          const isOpen = windows[app.key]?.isOpen && !windows[app.key]?.isMinimized;
          const isExists = windows[app.key]?.isOpen;
          return (
            <button 
              key={app.key}
              onClick={() => toggleWindow(app.key)} 
              className="relative group p-2 bg-slate-800/40 hover:bg-slate-800/80 border border-slate-700/50 rounded-2xl transition hover:scale-110 shadow-lg cursor-pointer flex items-center justify-center"
            >
              <div className="w-[22px] h-[22px] flex items-center justify-center [&>svg]:w-full [&>svg]:h-full">
                {app.icon.props.children ? app.icon : React.cloneElement(app.icon, { className: "w-[22px] h-[22px]" })}
              </div>
              
              {isExists && (
                <span className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full ${isOpen ? 'bg-indigo-400' : 'bg-slate-500'}`}></span>
              )}
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-slate-200 text-[10px] px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap shadow border border-slate-700">
                {app.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex items-center space-x-2 text-slate-200 text-xs">
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-1.5 hover:bg-white/10 rounded-xl transition flex items-center justify-center cursor-pointer"
          title="Alternar Tema"
        >
          {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
        </button>
        
        <div className="hidden md:flex items-center space-x-1 text-slate-400 border-l border-slate-700 pl-2">
          <div className="p-1.5 rounded-md cursor-default">
            <Wifi className="w-4 h-4" title="Wi-Fi Conectado" />
          </div>

          <div className="relative flex items-center justify-center" ref={volumeRef}>
            <button 
              onClick={() => setShowVolume(!showVolume)}
              className={`p-1.5 rounded-md transition cursor-pointer ${showVolume ? 'bg-white/10 text-slate-200' : 'hover:bg-white/10'}`}
            >
              {volumePercent === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {showVolume && (
              <div className={`absolute bottom-full mb-3 left-1/2 -translate-x-1/2 p-3 rounded-xl shadow-2xl border flex items-center gap-3 animate-in fade-in zoom-in-95 duration-100 ${
                isDarkMode ? 'bg-slate-800/95 border-slate-600/50' : 'bg-white/95 border-slate-300'
              }`}>
                {volumePercent === 0 ? <VolumeX className="w-4 h-4 text-slate-400 shrink-0" /> : <Volume2 className="w-4 h-4 text-slate-300 shrink-0" />}
                
                <div className="relative flex items-center justify-center w-24">
                  <span className={`absolute -top-7 text-[10px] font-bold px-1.5 py-0.5 rounded transition-opacity duration-200 ${
                    isDarkMode ? 'bg-slate-900/90 text-slate-200' : 'bg-slate-800 text-white'
                  } ${isDraggingVolume ? 'opacity-100' : 'opacity-0'}`}>
                    {volumePercent}%
                  </span>
                  
                  <input 
                    type="range" 
                    min="0" 
                    max="1" 
                    step="0.01"
                    value={volume}
                    onChange={(e) => setVolume && setVolume(parseFloat(e.target.value))}
                    onMouseDown={() => setIsDraggingVolume(true)}
                    onMouseUp={() => setIsDraggingVolume(false)}
                    onMouseLeave={() => setIsDraggingVolume(false)}
                    onTouchStart={() => setIsDraggingVolume(true)}
                    onTouchEnd={() => setIsDraggingVolume(false)}
                    className="w-full h-1.5 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-indigo-400"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="p-1.5 rounded-md cursor-default">
            <BatteryFull className="w-4 h-4 text-emerald-400" title="Bateria Cheia" />
          </div>
        </div>

        <div className="flex flex-col items-end px-2.5 py-1 ml-1 bg-slate-800/50 rounded-lg border border-slate-700/40 font-mono shadow-inner">
          <span className="font-semibold text-[13px] text-slate-200 leading-tight">{time}</span>
          <span className="text-[11px] text-slate-400 leading-tight">{date}</span>
        </div>
      </div>

    </div>
  );
}