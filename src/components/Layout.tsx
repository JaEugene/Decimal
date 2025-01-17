import { FC, ReactNode } from 'react';
import { FloatingNav } from './navigation/FloatingNav';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen text-gray-900">
      <div className="fixed top-0 left-0 right-0 z-50">
        <FloatingNav />
      </div>
      <main className="px-4 max-w-7xl mx-auto pt-24 min-h-screen">
        {children}
      </main>
    </div>
  );
};