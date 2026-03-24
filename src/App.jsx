import React from 'react';
import { motion } from 'framer-motion';
import useStore from './store/useStore';
import TaskList from './components/TaskList';
import AddTaskForm from './components/AddTaskForm';
import { ListTodo } from 'lucide-react';

function App() {
  const { tasks, addTask, toggleTask, deleteTask } = useStore();

  return (
    <div className="min-h-screen pb-20 px-4">
      <header className="max-w-xl mx-auto pt-16 mb-12 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-flex p-3 bg-primary/10 text-primary rounded-2xl mb-6"
        >
          <ListTodo size={32} />
        </motion.div>
        
        <h1 className="text-4xl font-black text-white tracking-tight">
          Minhas <span className="text-primary">Tarefas</span>
        </h1>
        <p className="text-gray-500 mt-2 text-sm uppercase tracking-widest font-semibold">
          Persistência Permanente
        </p>
      </header>

      <main className="max-w-xl mx-auto">
        <div className="bg-[#111111]/50 backdrop-blur-xl border border-white/5 rounded-[2rem] p-6 md:p-8 shadow-2xl">
          <div className="mb-8">
            <AddTaskForm onAdd={addTask} />
          </div>

          <div className="min-h-[400px]">
            <TaskList 
              tasks={tasks} 
              onToggle={toggleTask} 
              onDelete={deleteTask} 
            />
          </div>
        </div>
      </main>

      <footer className="mt-20 text-center opacity-20 text-[10px] uppercase tracking-widest font-bold">
        Personal Task Manager &copy; 2026
      </footer>
    </div>
  );
}

export default App;
