import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Trash2, CheckCircle, Circle, Clock } from 'lucide-react';

const TaskCard = memo(({ task, onToggle, onDelete }) => {
  const formattedDate = new Date(task.createdAt).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ 
        opacity: task.completed ? 0.6 : 1, 
        y: 0 
      }}
      exit={{ opacity: 0, x: -20 }}
      className={`group flex items-center justify-between p-4 mb-3 rounded-2xl bg-card border border-white/5 shadow-lg transition-all ${
        task.completed ? 'bg-white/5' : 'hover:border-primary/20'
      }`}
    >
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <motion.button
          whileTap={{ scale: 0.8 }}
          onClick={() => onToggle(task.id)}
          className={`flex-shrink-0 ${task.completed ? 'text-primary' : 'text-gray-500'}`}
        >
          {task.completed ? <CheckCircle size={24} /> : <Circle size={24} />}
        </motion.button>
        
        <div className="flex flex-col min-w-0">
          <span 
            className={`text-base font-medium truncate ${
              task.completed ? 'line-through text-gray-500' : 'text-white'
            }`}
          >
            {task.title}
          </span>
          <span className="text-[10px] text-gray-600 flex items-center gap-1 mt-0.5">
            <Clock size={10} />
            {formattedDate}
          </span>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.1, color: '#ef4444' }}
        whileTap={{ scale: 0.9 }}
        onClick={() => onDelete(task.id)}
        className="ml-4 p-2 text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Trash2 size={18} />
      </motion.button>
    </motion.div>
  );
});

TaskCard.displayName = 'TaskCard';

export default TaskCard;
