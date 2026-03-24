import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useStore from './store/useStore';
import Navigation from './components/Navigation';
import TasksView from './components/TasksView';
import ShoppingView from './components/ShoppingView';
import NotesView from './components/NotesView';
import FinanceView from './components/FinanceView';

function App() {
  const { view } = useStore();

  const renderView = () => {
    switch (view) {
      case 'tasks': return <TasksView />;
      case 'shopping': return <ShoppingView />;
      case 'notes': return <NotesView />;
      case 'finance': return <FinanceView />;
      default: return <TasksView />;
    }
  };

  return (
    <div className="min-h-screen bg-dark overflow-x-hidden selection:bg-primary/30">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/5 blur-[120px] rounded-full animate-float" />
        <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] bg-secondary/5 blur-[100px] rounded-full" />
      </div>

      <main className="max-w-2xl mx-auto px-4 pt-8 md:pt-16 min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>

      <Navigation />
    </div>
  );
}

export default App;
