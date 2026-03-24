import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Circle, Clock, ChevronRight } from 'lucide-react';

const TaskCard = memo(({ task, onClick }) => {
  const formattedDate = new Date(task.createdAt).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <motion.button
      layout
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(task)}
      className="group w-full flex items-center justify-between p-5 mb-4 rounded-xl bg-card border border-white/5 text-left hover:border-primary/40 transition-all shadow-sm"
    >
      <div className="flex items-center gap-5 flex-1 min-w-0">
        <div className={`flex-shrink-0 ${task.completed ? 'text-primary' : 'text-slate-700'}`}>
          {task.completed ? <CheckCircle size={24} strokeWidth={2.5} /> : <Circle size={24} strokeWidth={1.5} />}
        </div>
        
        <div className="flex flex-col min-w-0">
          <span 
            className={`text-lg font-semibold tracking-tight ${
              task.completed ? 'line-through decoration-primary/50 text-slate-500' : 'text-slate-100'
            }`}
          >
            {task.title}
          </span>
          <span className="text-[10px] text-slate-600 font-bold uppercase tracking-widest flex items-center gap-1.5 mt-0.5">
            <Clock size={10} /> {formattedDate}
          </span>
        </div>
      </div>

      <ChevronRight size={18} className="text-slate-800 group-hover:text-primary transition-colors" />
    </motion.button>
  );
});

TaskCard.displayName = 'TaskCard';

export default TaskCard;
