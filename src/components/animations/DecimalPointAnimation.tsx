import { FC, useEffect, useRef } from 'react';

export const DecimalPointAnimation: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const point = document.createElement('div');
    point.className = 'absolute w-4 h-4 bg-stripe-blue/30 rounded-full blur-sm transition-all duration-300';
    container.appendChild(point);
    
    let position = 0;
    let direction = 1;
    let animationTimeout: number;
    
    const animate = () => {
      if (!container) return;
      
      position += direction * 2;
      
      if (position >= container.offsetWidth - 20) {
        direction = -1;
        // Hold at the end for 1 second
        clearTimeout(animationTimeout);
        animationTimeout = window.setTimeout(() => {
          requestAnimationFrame(animate);
        }, 1000);
        return;
      } else if (position <= 0) {
        direction = 1;
        // Hold at the start for 1 second
        clearTimeout(animationTimeout);
        animationTimeout = window.setTimeout(() => {
          requestAnimationFrame(animate);
        }, 1000);
        return;
      }
      
      point.style.transform = `translateX(${position}px)`;
      point.style.boxShadow = `0 0 20px 5px rgba(49, 46, 129, 0.3)`;
      
      requestAnimationFrame(animate);
    };
    
    const animation = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(animation);
      clearTimeout(animationTimeout);
    };
  }, []);

  return (
    <div className="relative w-full h-32" ref={containerRef} />
  );
};