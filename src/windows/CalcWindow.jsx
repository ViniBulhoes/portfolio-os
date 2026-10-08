import React, { useState, useEffect } from 'react';
import { Delete } from 'lucide-react';

export default function CalcWindow() {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [isCalculated, setIsCalculated] = useState(false);

  const calculateResult = (expr) => {
    try {
      // Validação de segurança: apenas números, operadores aritméticos, parênteses e pontos
      if (!/^[0-9+\-*/.() ]+$/.test(expr)) {
        return 'Erro';
      }

      // Função segura de avaliação aritmética sem acesso ao escopo global
      const result = new Function(`'use strict'; return (${expr})`)();

      if (!isFinite(result) || isNaN(result)) {
        return 'Erro';
      }

      // Arredonda para evitar dízimas longas de ponto flutuante (ex: 0.1 + 0.2)
      return String(Math.round(result * 100000000) / 100000000);
    } catch {
      return 'Erro';
    }
  };

  const handleInput = (val) => {
    if (val === 'C') {
      setDisplay('0');
      setEquation('');
      setIsCalculated(false);
      return;
    }

    if (val === 'DEL') {
      if (isCalculated || display === 'Erro') {
        setDisplay('0');
        setEquation('');
        setIsCalculated(false);
      } else {
        setDisplay(prev => (prev.length > 1 ? prev.slice(0, -1) : '0'));
      }
      return;
    }

    if (val === '=') {
      if (display === 'Erro') return;
      const res = calculateResult(display);
      setEquation(display + ' =');
      setDisplay(res);
      setIsCalculated(true);
      return;
    }

    const operators = ['+', '-', '*', '/'];

    if (isCalculated) {
      if (operators.includes(val)) {
        // Continua calculando a partir do resultado anterior
        setDisplay(display + val);
        setEquation('');
      } else {
        // Novo número digitado inicia novo cálculo
        setDisplay(val);
        setEquation('');
      }
      setIsCalculated(false);
      return;
    }

    setDisplay(prev => {
      if (prev === '0' && !operators.includes(val) && val !== '.') {
        return val;
      }
      if (prev === 'Erro') {
        return val;
      }
      // Evita operadores repetidos consecutivos (ex: "++", "*/")
      const lastChar = prev.slice(-1);
      if (operators.includes(lastChar) && operators.includes(val)) {
        return prev.slice(0, -1) + val;
      }
      return prev + val;
    });
  };

  // Suporte a teclado físico quando a janela estiver ativa
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.key >= '0' && e.key <= '9') || ['+', '-', '*', '/', '.', '(', ')'].includes(e.key)) {
        handleInput(e.key);
      } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        handleInput('=');
      } else if (e.key === 'Backspace') {
        handleInput('DEL');
      } else if (e.key === 'Escape') {
        handleInput('C');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [display, isCalculated]);

  const buttonLayout = [
    { label: 'C', value: 'C', style: 'bg-rose-500/20 text-rose-300 hover:bg-rose-500/30' },
    { label: '(', value: '(', style: 'bg-slate-800 text-slate-300 hover:bg-slate-700' },
    { label: ')', value: ')', style: 'bg-slate-800 text-slate-300 hover:bg-slate-700' },
    { label: '⌫', value: 'DEL', style: 'bg-slate-800 text-amber-400 hover:bg-slate-700' },

    { label: '7', value: '7' },
    { label: '8', value: '8' },
    { label: '9', value: '9' },
    { label: '÷', value: '/', style: 'bg-indigo-600/30 text-indigo-300 hover:bg-indigo-600/50' },

    { label: '4', value: '4' },
    { label: '5', value: '5' },
    { label: '6', value: '6' },
    { label: '×', value: '*', style: 'bg-indigo-600/30 text-indigo-300 hover:bg-indigo-600/50' },

    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '-', value: '-', style: 'bg-indigo-600/30 text-indigo-300 hover:bg-indigo-600/50' },

    { label: '0', value: '0' },
    { label: '.', value: '.' },
    { label: '+', value: '+', style: 'bg-indigo-600/30 text-indigo-300 hover:bg-indigo-600/50' },
    { label: '=', value: '=', style: 'bg-indigo-600 hover:bg-indigo-500 text-white font-bold' },
  ];

  return (
    <div className="w-full h-full p-4 flex flex-col justify-between bg-slate-950/80 select-none">
      {/* Display da Calculadora */}
      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex flex-col justify-end text-right min-h-[72px] mb-3 shadow-inner">
        <span className="text-[11px] font-mono text-slate-400 h-4 truncate">
          {equation}
        </span>
        <span className="text-2xl font-mono font-bold tracking-tight text-emerald-400 truncate">
          {display}
        </span>
      </div>

      {/* Grid de Teclas */}
      <div className="grid grid-cols-4 gap-2 flex-1">
        {buttonLayout.map((btn, i) => (
          <button 
            key={i}
            onClick={() => handleInput(btn.value)}
            className={`flex items-center justify-center rounded-xl text-sm font-semibold transition active:scale-95 cursor-pointer shadow-sm ${
              btn.style || 'bg-slate-800/80 text-slate-200 hover:bg-slate-700'
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}