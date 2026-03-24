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
    <div className="min-h-screen bg-dark overflow-x-hidden p-0 m-0 font-sans selection:bg-primary/30">
      <main className="max-w-2xl mx-auto pt-8 pb-32">
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
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
