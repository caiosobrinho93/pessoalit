import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useStore from '../store/useStore';
import Modal from './Modal';
import { Plus, Trash2, ShoppingCart, CheckCircle, Circle, Tag } from 'lucide-react';

const ShoppingView = () => {
  const { shopping, addShoppingItem, toggleShoppingItem, deleteShoppingItem } = useStore();
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemName, setItemName] = useState('');
  const [itemQty, setItemQty] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (itemName.trim()) {
      addShoppingItem(itemName.trim(), itemQty);
      setItemName('');
      setItemQty(1);
    }
  };

  return (
    <div className="pb-24">
      <header className="mb-10 text-center px-4">
        <h1 className="text-4xl font-black text-white tracking-tight mb-2">
          Lista de <span className="text-primary italic">Compras</span>
        </h1>
        <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em]">Essentials</p>
      </header>

      <form onSubmit={handleSubmit} className="glass p-8 rounded-[2.5rem] space-y-4">
        <input
          type="text"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          placeholder="O que comprar?"
          className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-white focus:border-primary/50"
        />
        <div className="flex gap-4">
          <input
            type="number"
            value={itemQty}
            onChange={(e) => setItemQty(Number(e.target.value))}
            min="1"
            className="w-24 bg-white/5 border border-white/5 rounded-2xl p-4 text-white text-center"
          />
          <button type="submit" className="flex-1 bg-primary text-dark font-black rounded-2xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]">
            <Plus size={20} strokeWidth={3} /> ADICIONAR
          </button>
        </div>
      </form>

      <div className="mt-12 space-y-3">
        {shopping.map((item) => (
          <motion.button
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className={`w-full flex items-center justify-between p-5 rounded-3xl glass text-left ${item.completed ? 'opacity-40' : ''}`}
          >
            <div className="flex items-center gap-4">
              <div className={item.completed ? 'text-primary' : 'text-slate-600'}>
                {item.completed ? <CheckCircle size={24} /> : <ShoppingCart size={24} />}
              </div>
              <div>
                <span className={`text-lg font-bold block ${item.completed ? 'line-through' : ''}`}>{item.name}</span>
                <span className="text-xs text-slate-500 font-bold uppercase tracking-tighter">Qtd: {item.quantity}</span>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      <Modal isOpen={!!selectedItem} onClose={() => setSelectedItem(null)} title="Gerenciar Item">
        {selectedItem && (
          <div className="space-y-6">
            <h3 className="text-2xl font-black text-white">{selectedItem.name}</h3>
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => { toggleShoppingItem(selectedItem.id); setSelectedItem(null); }}
                className="p-6 rounded-3xl bg-primary/20 text-primary border border-primary/30 flex flex-col items-center"
              >
                {selectedItem.completed ? <Circle size={32} /> : <CheckCircle size={32} />}
                <span className="mt-3 text-[10px] font-black uppercase">Status</span>
              </button>
              <button 
                onClick={() => { deleteShoppingItem(selectedItem.id); setSelectedItem(null); }}
                className="p-6 rounded-3xl bg-red-500/10 text-red-500 border border-red-500/20 flex flex-col items-center"
              >
                <Trash2 size={32} />
                <span className="mt-3 text-[10px] font-black uppercase">Excluir</span>
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ShoppingView;
