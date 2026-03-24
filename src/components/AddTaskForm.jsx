import React, { useState } from 'react';
import { Plus } from 'lucide-react';

const AddTaskForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title.trim());
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="px-4">
      <div className="relative group">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="O que precisa ser feito hoje?"
          className="w-full bg-card border border-white/5 rounded-2xl p-5 pl-6 pr-16 text-white text-lg font-semibold placeholder:text-slate-700 focus:border-primary/50 focus:shadow-[0_0_30px_rgba(244,115,33,0.1)] outline-none transition-all"
        />
        <button
          type="submit"
          disabled={!title.trim()}
          className="absolute right-2 top-2 bottom-2 bg-primary text-dark rounded-xl px-4 flex items-center justify-center hover:scale-105 active:scale-95 disabled:opacity-30 disabled:hover:scale-100 transition-all shadow-lg"
        >
          <Plus size={24} strokeWidth={3} />
        </button>
      </div>
    </form>
  );
};

export default AddTaskForm;
