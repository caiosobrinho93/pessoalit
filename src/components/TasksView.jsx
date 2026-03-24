import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useStore from '../store/useStore';
import TaskCard from './TaskCard';
import Modal from './Modal';
import AddTaskForm from './AddTaskForm';
import { Trash2, CheckCircle, Circle, ClipboardList } from 'lucide-react';

const TasksView = () => {
  const { tasks, addTask, toggleTask, deleteTask } = useStore();
  const [selectedTask, setSelectedTask] = useState(null);

  const handleCardClick = (task) => setSelectedTask(task);
  const handleClose = () => setSelectedTask(null);

  return (
    <div className="pb-24 px-4 font-sans">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-black text-white tracking-tighter">TASK <span className="text-primary italic">MASTER</span></h1>
        <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mt-1">Produtividade Máxima</p>
      </header>

      <AddTaskForm onAdd={addTask} />

      <div className="mt-12 space-y-2">
        {tasks.length === 0 ? (
          <div className="text-center py-20 opacity-20 flex flex-col items-center">
            <ClipboardList size={48} className="mb-4" />
            <span className="font-black uppercase tracking-widest text-xs">Sem tarefas hoje</span>
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard key={task.id} task={task} onClick={handleCardClick} />
          ))
        )}
      </div>

      <Modal isOpen={!!selectedTask} onClose={handleClose} title="Ações da Tarefa">
        {selectedTask && (
          <div className="space-y-6">
            <div className="bg-dark p-6 rounded-2xl border border-white/5">
              <h3 className={`text-2xl font-black tracking-tight ${selectedTask.completed ? 'text-slate-500 line-through' : 'text-white'}`}>
                {selectedTask.title}
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => { toggleTask(selectedTask.id); handleClose(); }}
                className={`p-6 rounded-2xl flex flex-col items-center border transition-all ${
                  selectedTask.completed ? 'bg-white/5 text-slate-500 border-white/10' : 'bg-primary/20 text-primary border-primary/30'
                }`}
              >
                {selectedTask.completed ? <Circle size={28} /> : <CheckCircle size={28} />}
                <span className="mt-2 text-[10px] font-black uppercase tracking-widest">{selectedTask.completed ? 'Reabrir' : 'Concluir'}</span>
              </button>
              <button
                onClick={() => { deleteTask(selectedTask.id); handleClose(); }}
                className="p-6 rounded-2xl bg-red-500/10 text-red-500 border border-red-500/20 flex flex-col items-center"
              >
                <Trash2 size={28} />
                <span className="mt-2 text-[10px] font-black uppercase tracking-widest">Excluir</span>
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default TasksView;
