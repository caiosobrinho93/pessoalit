import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

const AddTaskForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() && title.length <= 100) {
      onAdd(title);
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8">
      <div className="relative group">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="O que você precisa fazer hoje?"
          maxLength={100}
          className="w-full bg-card border border-white/5 rounded-2xl py-4 pl-5 pr-14 text-white placeholder-gray-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300 shadow-xl"
        />
        
        <button
          type="submit"
          disabled={!title.trim() || title.length > 100}
          className="absolute right-2 top-2 bottom-2 aspect-square bg-primary text-dark rounded-xl flex items-center justify-center font-bold shadow-lg disabled:opacity-30 disabled:grayscale transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <Plus size={24} strokeWidth={3} />
        </button>
      </div>
      
      <div className="flex justify-between mt-2 px-1">
        <p className="text-[10px] text-gray-600 uppercase tracking-widest font-bold">
          Dica: Conclua tudo para ganhar bônus de 100 créditos!
        </p>
        <span className={`text-[10px] font-mono ${title.length > 90 ? 'text-orange-500' : 'text-gray-600'}`}>
          {title.length}/100
        </span>
      </div>
    </form>
  );
};

export default AddTaskForm;
