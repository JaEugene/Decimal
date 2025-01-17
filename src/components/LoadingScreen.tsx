import { FC, useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Logo } from './brand/Logo';

export const LoadingScreen: FC = () => {
  const [show, setShow] = useState(true);
  const location = useLocation();
  const isInitialLoad = useRef(true);

  useEffect(() => {
    if (!isInitialLoad.current) {
      return;
    }

    const timer = setTimeout(() => {
      setShow(false);
      isInitialLoad.current = false;
    }, 800);

    return () => clearTimeout(timer);
  }, [location]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-gradient-to-b from-[#4169E1]/5 to-white flex items-center justify-center">
      <div className="text-center">
        <div className="transform scale-150 animate-fade-in" style={{ animationDuration: '1.5s' }}>
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-stripe-blue via-stripe-blue-light to-stripe-blue-dark animate-spin-slow" />
            <div className="absolute inset-0 rounded-full bg-stripe-blue/30 blur-md transition-all duration-500" />
            <div className="absolute inset-3 rounded-full bg-black flex items-center justify-center backdrop-blur-sm border border-white/10">
              <span className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/80">
                D
              </span>
            </div>
            <div className="absolute inset-[-8px] rounded-full border-2 border-white/10 border-dashed animate-spin-reverse-slow" />
          </div>
        </div>
        <h1 className="mt-8 text-2xl font-bold animate-fade-in" style={{ animationDelay: '0.5s' }}>
          Decimal
        </h1>
      </div>
    </div>
  );
};