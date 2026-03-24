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
    <nav className="fixed bottom-0 left-0 right-0 h-20 glass border-t border-white/5 z-50 px-4">
      <div className="max-w-xl mx-auto h-full flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = view === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className="relative flex flex-col items-center justify-center gap-1 group w-16"
            >
              {isActive && (
                <motion.div
                  layoutId="nav-active"
                  className="absolute inset-0 bg-primary/10 rounded-2xl -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <Icon 
                size={24} 
                className={`transition-colors duration-300 ${isActive ? 'text-primary' : 'text-slate-500 group-hover:text-slate-300'}`} 
              />
              <span className={`text-[10px] font-bold uppercase tracking-wider ${isActive ? 'text-primary' : 'text-slate-500'}`}>
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
