import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, TrendingUp, Shield, Coins, User, BookOpen, Target } from 'lucide-react';
import { Logo } from '../brand/Logo';

const navigation = [
  { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/performance', icon: TrendingUp, label: 'Performance' },
  { path: '/compliance', icon: Shield, label: 'Compliance' },
  { path: '/marketplace', icon: Coins, label: 'Qoin Exchange' },
  { path: '/athlete/profile', icon: User, label: 'Portal' },
  { path: '/playbook', icon: BookOpen, label: 'Playbook' },
  { path: '/mission', icon: Target, label: 'Mission' }
];

export const FloatingNav: FC = () => {
  const location = useLocation();

  return (
    <div className="relative mx-auto max-w-7xl px-4 py-4">
      <div className="backdrop-blur-md bg-[#4169E1]/10 px-2 py-2 rounded-full border border-[#4169E1]/20 shadow-lg">
        <nav className="flex items-center">
          <Logo />
          <div className="w-px h-6 bg-[#001f3f]/20 mx-2" />
          {navigation.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`
                relative px-4 py-2 rounded-full group transition-all duration-300
                ${location.pathname === item.path 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }
              `}
            >
              <div className="flex items-center gap-2">
                <item.icon 
                  size={18} 
                  className={`
                    transition-transform duration-300 
                    group-hover:scale-110
                    ${location.pathname === item.path ? 'text-blue-500' : ''}
                  `}
                />
                <span className="text-sm font-medium">{item.label}</span>
              </div>
              
              {location.pathname === item.path && (
                <div className="absolute inset-0 bg-stripe-blue/10 rounded-full animate-fadeIn" />
              )}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};