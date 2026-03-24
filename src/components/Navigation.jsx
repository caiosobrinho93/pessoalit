import React from 'react';
import { motion } from 'framer-motion';
import { CheckSquare, ShoppingCart, FileText, Wallet } from 'lucide-react';
import useStore from '../store/useStore';

const Navigation = () => {
  const { view, setView } = useStore();

  const navItems = [
    { id: 'tasks', label: 'Tarefas', icon: CheckSquare },
    { id: 'shopping', label: 'Compras', icon: ShoppingCart },
    { id: 'notes', label: 'Notas', icon: FileText },
    { id: 'finance', label: 'Financeiro', icon: Wallet },
  ];

  return (
    <nav className="fixed bottom-4 left-4 right-4 h-20 bg-card/80 backdrop-blur-lg border border-white/5 rounded-[2rem] z-50 px-4 shadow-2xl">
      <div className="max-w-xl mx-auto h-full flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = view === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className="relative flex flex-col items-center justify-center gap-1 group w-16 min-h-[50px]"
            >
              {isActive && (
                <motion.div
                  layoutId="nav-active"
                  className="absolute inset-x-0 -top-1 h-1 bg-primary rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <Icon 
                size={22} 
                className={`transition-colors duration-300 ${isActive ? 'text-primary' : 'text-slate-600 group-hover:text-slate-400'}`} 
              />
              <span className={`text-[9px] font-black uppercase tracking-widest ${isActive ? 'text-primary' : 'text-slate-600'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;
