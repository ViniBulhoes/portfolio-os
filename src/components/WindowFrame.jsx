import React, { useState, useEffect, useRef } from 'react';
import { X, Minus, Plus } from 'lucide-react';

export default function WindowFrame({ 
  title, 
  icon, 
  zIndex, 
  isMaximized, 
  onClose, 
  onMinimize, 
  onMaximize, 
  onClick, 
  children, 
  isDarkMode 
}) {
  const [position, setPosition] = useState({ x: 80, y: 60 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef(null);

  const handleMouseDown = (e) => {
    if (isMaximized) return;
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
    onClick();
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      const windowWidth = windowRef.current ? windowRef.current.offsetWidth : 520;
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      const newX = Math.min(Math.max(0, e.clientX - dragOffset.x), screenWidth - windowWidth);
      const newY = Math.min(Math.max(32, e.clientY - dragOffset.y), screenHeight - 120);

      setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  return (
    <div 
      ref={windowRef}
      onClick={onClick}
      style={{ 
        zIndex, 
        transform: isMaximized ? 'none' : `translate(${position.x}px, ${position.y}px)` 
      }}
      className={`absolute pointer-events-auto flex flex-col shadow-2xl rounded-xl border backdrop-blur-xl overflow-hidden ${
        isMaximized 
          ? 'inset-4 sm:inset-10 rounded-2xl !transform-none' 
          : 'top-0 left-0 w-11/12 sm:w-[520px] max-h-[85vh]'
      } ${isDarkMode ? 'bg-slate-900/95 border-slate-700/80 text-slate-100 shadow-black/50' : 'bg-white/95 border-slate-200 text-slate-800 shadow-xl'}`}
    >
      {/* Barra de Título Estilo macOS */}
      <div 
        onMouseDown={handleMouseDown}
        className="h-11 border-b border-slate-700/30 flex items-center justify-between px-4 cursor-grab active:cursor-grabbing select-none relative"
      >
        {/* Botões do macOS (Esquerda) */}
        <div className="flex items-center space-x-2 z-20">
          <button 
            type="button"
            onClick={(e) => { e.stopPropagation(); onClose(e); }} 
            className="w-3.5 h-3.5 rounded-full bg-rose-500 hover:bg-rose-600 flex items-center justify-center transition-all shadow-sm focus:outline-none group cursor-pointer"
            title="Fechar"
          >
            <X className="w-2.5 h-2.5 text-rose-950 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </button>
          <button 
            type="button"
            onClick={(e) => { e.stopPropagation(); onMinimize(e); }} 
            className="w-3.5 h-3.5 rounded-full bg-amber-500 hover:bg-amber-600 flex items-center justify-center transition-all shadow-sm focus:outline-none group cursor-pointer"
            title="Minimizar"
          >
            <Minus className="w-2.5 h-2.5 text-amber-950 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </button>
          <button 
            type="button"
            onClick={(e) => { e.stopPropagation(); onMaximize(e); }} 
            className="w-3.5 h-3.5 rounded-full bg-emerald-500 hover:bg-emerald-600 flex items-center justify-center transition-all shadow-sm focus:outline-none group cursor-pointer"
            title="Maximizar"
          >
            <Plus className="w-2.5 h-2.5 text-emerald-950 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </button>
        </div>

        {/* Título Centralizado */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none space-x-2">
          {icon}
          <span className="text-xs font-semibold tracking-wide text-slate-300">{title}</span>
        </div>

        <div className="w-16"></div>
      </div>

      {/* Conteúdo da Janela */}
      <div className="p-6 overflow-y-auto flex-1">
        {children}
      </div>
    </div>
  );
}