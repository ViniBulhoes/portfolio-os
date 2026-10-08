import React, { useState, useEffect } from 'react';

export default function DecryptText({ text, className = "" }) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovered, setIsHovered] = useState(false);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*-_<>[]/";

  useEffect(() => {
    let interval;

    if (isHovered) {
      // Quando passa o mouse: decodifica gradualmente até o texto real
      let iteration = 0;
      interval = setInterval(() => {
        setDisplayText(
          text
            .split("")
            .map((letter, index) => {
              if (letter === " ") return " ";
              if (index < iteration) {
                return text[index];
              }
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("")
        );

        if (iteration >= text.length) {
          clearInterval(interval);
        }
        iteration += 1 / 2;
      }, 40);
    } else {
      // Quando o mouse sai: fica em looping infinito embaralhando os caracteres (estilo arquivo secreto)
      interval = setInterval(() => {
        setDisplayText(
          text
            .split("")
            .map((letter) => {
              if (letter === " ") return " ";
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("")
        );
      }, 80);
    }

    return () => clearInterval(interval);
  }, [isHovered, text]);

  return (
    <span 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`inline-block cursor-pointer ${className}`}
    >
      {displayText}
    </span>
  );
}