import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useStore from '../store/useStore';
import TaskCard from './TaskCard';
import Modal from './Modal';
import AddTaskForm from './AddTaskForm';
import { Trash2, CheckCircle, Circle, AlertCircle } from 'lucide-react';

const TasksView = () => {
  const { tasks, addTask, toggleTask, deleteTask, updateTask } = useStore();
  const [selectedTask, setSelectedTask] = useState(null);

  const handleCardClick = (task) => setSelectedTask(task);
  const handleClose = () => setSelectedTask(null);

  const handleToggleStatus = () => {
    toggleTask(selectedTask.id);
    handleClose();
  };

  const handleDelete = () => {
    deleteTask(selectedTask.id);
    handleClose();
  };

  return (
    <div className="pb-24">
      <header className="mb-10 text-center px-4">
        <h1 className="text-4xl font-black text-white tracking-tight mb-2">
          Suas <span className="text-primary italic">Atividades</span>
        </h1>
        <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em]">Foco & Simplicidade</p>
      </header>

      <AddTaskForm onAdd={addTask} />

      <div className="mt-12 space-y-4">
        <AnimatePresence mode="popLayout">
          {tasks.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 text-slate-600">
              <AlertCircle className="mx-auto mb-4 opacity-20" size={48} />
              Nenhuma tarefa registrada.
            </motion.div>
          ) : (
            tasks.map((task) => (
              <TaskCard key={task.id} task={task} onClick={handleCardClick} />
            ))
          )}
        </AnimatePresence>
      </div>

      <Modal 
        isOpen={!!selectedTask} 
        onClose={handleClose} 
        title="Detalhes da Tarefa"
      >
        {selectedTask && (
          <div className="space-y-8">
            <div className="bg-white/5 p-6 rounded-[2rem] border border-white/5">
              <p className="text-slate-400 text-xs uppercase font-black mb-2 tracking-widest">Título</p>
              <h3 className={`text-2xl font-bold ${selectedTask.completed ? 'line-through text-slate-500' : 'text-white'}`}>
                {selectedTask.title}
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={handleToggleStatus}
                className={`flex flex-col items-center justify-center p-6 rounded-3xl transition-all ${
                  selectedTask.completed 
                  ? 'bg-slate-800 text-slate-400' 
                  : 'bg-primary/20 text-primary border border-primary/30'
                }`}
              >
                {selectedTask.completed ? <Circle size={32} /> : <CheckCircle size={32} />}
                <span className="mt-3 font-black text-[10px] uppercase tracking-widest">
                  {selectedTask.completed ? 'Reabrir' : 'Concluir'}
                </span>
              </button>

              <button
                onClick={handleDelete}
                className="flex flex-col items-center justify-center p-6 rounded-3xl bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20"
              >
                <Trash2 size={32} />
                <span className="mt-3 font-black text-[10px] uppercase tracking-widest">Excluir</span>
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default TasksView;
