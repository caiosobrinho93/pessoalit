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
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(task)}
      className={`group w-full flex items-center justify-between p-5 mb-4 rounded-3xl glass text-left transition-all ${
        task.completed ? 'opacity-50' : ''
      }`}
    >
      <div className="flex items-center gap-5 flex-1 min-w-0">
        <div className={`flex-shrink-0 ${task.completed ? 'text-primary' : 'text-slate-600'}`}>
          {task.completed ? <CheckCircle size={28} /> : <Circle size={28} strokeWidth={1.5} />}
        </div>
        
        <div className="flex flex-col min-w-0">
          <span 
            className={`text-lg font-semibold truncate ${
              task.completed ? 'line-through text-slate-500' : 'text-slate-100'
            }`}
          >
            {task.title}
          </span>
          <span className="text-xs text-slate-500 flex items-center gap-1.5 mt-1 font-medium italic">
            <Clock size={12} />
            {formattedDate}
          </span>
        </div>
      </div>

      <ChevronRight size={20} className="text-slate-700 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
    </motion.button>
  );
});

TaskCard.displayName = 'TaskCard';

export default TaskCard;
