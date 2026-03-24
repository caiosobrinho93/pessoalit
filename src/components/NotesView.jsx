import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useStore from '../store/useStore';
import Modal from './Modal';
import { Plus, Trash2, StickyNote, FileEdit } from 'lucide-react';

const NotesView = () => {
  const { notes, addNote, deleteNote, updateNote } = useStore();
  const [selectedNote, setSelectedNote] = useState(null);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (noteTitle.trim()) {
      addNote(noteTitle.trim(), noteContent.trim());
      setNoteTitle('');
      setNoteContent('');
    }
  };

  return (
    <div className="pb-24">
      <header className="mb-10 text-center px-4">
        <h1 className="text-4xl font-black text-white tracking-tight mb-2">
          Suas <span className="text-primary italic">Notas</span>
        </h1>
        <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em]">Memórias & Ideias</p>
      </header>

      <form onSubmit={handleSubmit} className="glass p-8 rounded-[2.5rem] space-y-4">
        <input
          type="text"
          value={noteTitle}
          onChange={(e) => setNoteTitle(e.target.value)}
          placeholder="Título da nota"
          className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-white font-bold"
        />
        <textarea
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
          placeholder="Escreva algo..."
          className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-white h-24"
        />
        <button type="submit" className="w-full bg-primary text-dark font-black rounded-2xl p-4 flex items-center justify-center gap-2">
          <Plus size={20} strokeWidth={3} /> SALVAR NOTA
        </button>
      </form>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {notes.map((note) => (
          <motion.button
            key={note.id}
            onClick={() => setSelectedNote(note)}
            className="text-left glass p-6 rounded-3xl group"
          >
            <div className="flex justify-between items-start mb-2">
              <StickyNote className="text-primary opacity-50" size={20} />
              <span className="text-[10px] text-slate-500 font-bold uppercase">{new Date(note.date).toLocaleDateString()}</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">{note.title}</h3>
            <p className="text-slate-400 text-sm line-clamp-2 italic">{note.content}</p>
          </motion.button>
        ))}
      </div>

      <Modal isOpen={!!selectedNote} onClose={() => setSelectedNote(null)} title="Ver Nota">
        {selectedNote && (
          <div className="space-y-6">
            <h3 className="text-2xl font-black text-white">{selectedNote.title}</h3>
            <p className="text-slate-300 leading-relaxed bg-white/5 p-6 rounded-[2rem] border border-white/5 italic">
              {selectedNote.content}
            </p>
            <button 
              onClick={() => { deleteNote(selectedNote.id); setSelectedNote(null); }}
              className="w-full p-6 rounded-3xl bg-red-500/10 text-red-500 border border-red-500/20 flex flex-col items-center gap-2"
            >
              <Trash2 size={24} />
              <span className="text-[10px] font-black uppercase">Excluir Nota</span>
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default NotesView;
