import React, { useState, useEffect } from 'react';

export default function DesktopIcon({ icon, label, onClick, initialX = 20, initialY = 20 }) {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [hasMoved, setHasMoved] = useState(false);

  const handleMouseDown = (e) => {
    if (e.button !== 0) return; // Apenas botão esquerdo
    setIsDragging(true);
    setHasMoved(false);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
    e.stopPropagation();
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      setHasMoved(true);

      // Posição calculada baseada no movimento do rato
      const rawX = e.clientX - dragOffset.x;
      const rawY = e.clientY - dragOffset.y;

      // Dimensões estimadas do ícone (w-20 no Tailwind = 80px) + margens de respiro
      const iconWidth = 90; // 80px de largura + 10px de margem na direita
      const bottomDockMargin = 140; // Ajuste este valor conforme a altura real da sua Dock + altura do ícone

      // Limites Inteligentes (Clamping)
      // Esquerda: máx entre 10 e X. Direita: min entre X e o final da tela - largura do ícone
      const newX = Math.max(10, Math.min(rawX, window.innerWidth - iconWidth));
      
      // Cima: máx entre 45 (TopBar) e Y. Baixo: min entre Y e o final da tela - Dock
      const newY = Math.max(45, Math.min(rawY, window.innerHeight - bottomDockMargin));

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

  const handleClick = (e) => {
    if (!hasMoved && onClick) {
      onClick(e);
    }
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      onClick={handleClick}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        position: 'absolute',
        top: 0,
        left: 0,
      }}
      className={`group flex flex-col items-center justify-center w-20 p-2 rounded-xl cursor-pointer select-none transition-colors ${
        isDragging ? 'bg-white/20 backdrop-blur-sm z-50 shadow-2xl scale-105' : 'hover:bg-white/10 hover:backdrop-blur-sm'
      }`}
    >
      <div className="p-2.5 bg-slate-800/40 border border-slate-700/50 rounded-2xl shadow-md group-hover:scale-105 transition-transform flex items-center justify-center">
        {icon}
      </div>
      <span className="mt-1.5 text-xs font-medium text-slate-100 text-center drop-shadow-md px-1 py-0.5 rounded line-clamp-2 max-w-[76px]">
        {label}
      </span>
    </div>
  );
}