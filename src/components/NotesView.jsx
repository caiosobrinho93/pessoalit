import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useStore from '../store/useStore';
import Modal from './Modal';
import { Plus, Trash2, StickyNote, FileText } from 'lucide-react';

const NotesView = () => {
  const { notes, addNote, deleteNote } = useStore();
  const [selectedNote, setSelectedNote] = useState(null);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (noteTitle.trim()) {
      addNote(noteTitle.trim(), noteContent.trim());
      setNoteTitle(''); setNoteContent('');
    }
  };

  return (
    <div className="pb-24 px-4 font-sans">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-black text-white tracking-tighter">MEU <span className="text-primary italic">DIÁRIO</span></h1>
        <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mt-1">Notas & Insights</p>
      </header>

      <form onSubmit={handleSubmit} className="bg-card p-8 rounded-[2.5rem] border border-white/5 space-y-4">
        <input
          value={noteTitle}
          onChange={(e) => setNoteTitle(e.target.value)}
          placeholder="Título da nota"
          className="w-full bg-dark border border-white/10 rounded-xl p-4 text-white font-bold placeholder:text-slate-800"
        />
        <textarea
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
          placeholder="Conteúdo..."
          className="w-full bg-dark border border-white/10 rounded-xl p-4 text-white h-24 placeholder:text-slate-800"
        />
        <button type="submit" className="w-full bg-primary text-dark font-black rounded-xl p-4 flex items-center justify-center gap-2 hover:scale-[1.02]">
          <Plus size={20} strokeWidth={3} /> SALVAR NOTA
        </button>
      </form>

      <div className="mt-12 grid grid-cols-1 gap-4">
        {notes.length === 0 ? (
          <div className="text-center py-12 opacity-20"><FileText size={48} className="mx-auto mb-2" /> Vazio</div>
        ) : (
          notes.map((note) => (
            <motion.button
              key={note.id}
              onClick={() => setSelectedNote(note)}
              className="text-left bg-card p-6 rounded-2xl border border-white/5 hover:border-primary/30 transition-all group"
            >
              <div className="flex justify-between items-start mb-2">
                <StickyNote className="text-primary opacity-50" size={18} />
                <span className="text-[9px] text-slate-600 font-black uppercase">{new Date(note.date).toLocaleDateString()}</span>
              </div>
              <h3 className="text-lg font-black text-white mb-2 line-clamp-1 group-hover:text-primary transition-colors tracking-tight">{note.title}</h3>
              <p className="text-slate-500 text-sm line-clamp-2 italic">{note.content}</p>
            </motion.button>
          ))
        )}
      </div>

      <Modal isOpen={!!selectedNote} onClose={() => setSelectedNote(null)} title="Visualizar Nota">
        {selectedNote && (
          <div className="space-y-6">
            <h3 className="text-2xl font-black text-white">{selectedNote.title}</h3>
            <p className="text-slate-400 leading-relaxed bg-dark p-6 rounded-2xl border border-white/5">
              {selectedNote.content}
            </p>
            <button 
              onClick={() => { deleteNote(selectedNote.id); setSelectedNote(null); }}
              className="w-full p-6 rounded-2xl bg-red-500/10 text-red-500 border border-red-500/20 flex flex-col items-center gap-2"
            >
              <Trash2 size={24} />
              <span className="text-[10px] font-black uppercase">Excluir Permanentemente</span>
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default NotesView;
