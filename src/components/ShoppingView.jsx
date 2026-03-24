import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useStore from '../store/useStore';
import Modal from './Modal';
import { Plus, Trash2, ShoppingBag, CheckCircle, Circle, ArrowLeft, Tag, DollarSign } from 'lucide-react';

const ShoppingView = () => {
  const { shoppingLists, addShoppingList, deleteShoppingList, addShoppingItem, toggleShoppingItem, deleteShoppingItem } = useStore();
  const [activeListId, setActiveListId] = useState(null);
  const [newListName, setNewListName] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');

  const activeList = shoppingLists.find(l => l.id === activeListId);

  const handleAddList = (e) => {
    e.preventDefault();
    if (newListName.trim()) {
      addShoppingList(newListName.trim());
      setNewListName('');
    }
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (itemName.trim()) {
      addShoppingItem(activeListId, itemName.trim(), 1, Number(itemPrice) || 0);
      setItemName('');
      setItemPrice('');
    }
  };

  if (activeListId && activeList) {
    return (
      <div className="pb-24 px-4">
        <button onClick={() => setActiveListId(null)} className="flex items-center gap-2 text-primary font-bold mb-8 hover:opacity-80">
          <ArrowLeft size={20} /> VOLTAR PARA LISTAS
        </button>
        
        <header className="mb-10">
          <h1 className="text-3xl font-black text-white">{activeList.name}</h1>
          <p className="text-slate-500 text-xs font-bold uppercase mt-1 tracking-widest">
            {activeList.items.length} Itens • Total: R$ {activeList.items.reduce((acc, it) => acc + (it.price || 0), 0).toLocaleString()}
          </p>
        </header>

        <form onSubmit={handleAddItem} className="bg-card p-6 rounded-2xl border border-white/5 space-y-4 mb-10">
          <input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            placeholder="Nome do item"
            className="w-full bg-dark border border-white/10 rounded-xl p-4 text-white focus:border-primary"
          />
          <div className="flex gap-4">
            <input
              type="number"
              value={itemPrice}
              onChange={(e) => setItemPrice(e.target.value)}
              placeholder="Preço R$"
              className="w-full bg-dark border border-white/10 rounded-xl p-4 text-white"
            />
            <button type="submit" className="bg-primary text-dark font-black px-6 rounded-xl hover:scale-105">
              <Plus size={24} />
            </button>
          </div>
        </form>

        <div className="space-y-3">
          {activeList.items.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className={`w-full flex items-center justify-between p-5 rounded-2xl bg-card border border-white/5 text-left ${item.completed ? 'opacity-40' : ''}`}
            >
              <div className="flex items-center gap-4">
                <div className={item.completed ? 'text-primary' : 'text-slate-700'}>
                  {item.completed ? <CheckCircle size={22} /> : <Circle size={22} />}
                </div>
                <div>
                  <span className={`text-lg font-bold block ${item.completed ? 'line-through' : ''}`}>{item.name}</span>
                  <span className="text-xs text-primary font-black uppercase italic">R$ {item.price.toLocaleString()}</span>
                </div>
              </div>
            </button>
          ))}
        </div>

        <Modal isOpen={!!selectedItem} onClose={() => setSelectedItem(null)} title="Gerenciar Item">
          {selectedItem && (
            <div className="space-y-6">
              <div className="bg-dark p-6 rounded-2xl">
                <h3 className="text-2xl font-black text-white mb-1">{selectedItem.name}</h3>
                <span className="text-primary font-bold">R$ {selectedItem.price.toLocaleString()}</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => { toggleShoppingItem(activeListId, selectedItem.id); setSelectedItem(null); }}
                  className="p-6 rounded-2xl bg-white/5 text-slate-300 border border-white/10 flex flex-col items-center"
                >
                  {selectedItem.completed ? <Circle size={28} /> : <CheckCircle size={28} />}
                  <span className="mt-2 text-[10px] font-black uppercase">Status</span>
                </button>
                <button 
                  onClick={() => { deleteShoppingItem(activeListId, selectedItem.id); setSelectedItem(null); }}
                  className="p-6 rounded-2xl bg-red-500/10 text-red-500 border border-red-500/20 flex flex-col items-center"
                >
                  <Trash2 size={28} />
                  <span className="mt-2 text-[10px] font-black uppercase">Excluir</span>
                </button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    );
  }

  return (
    <div className="pb-24 px-4">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-black text-white tracking-tight">Listas de <span className="text-primary">Compras</span></h1>
        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-2">Escolha uma lista para começar</p>
      </header>

      <form onSubmit={handleAddList} className="flex gap-4 mb-12">
        <input
          type="text"
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
          placeholder="Nome da lista (ex: Porecatu)"
          className="flex-1 bg-card border border-white/10 rounded-2xl p-4 text-white focus:border-primary outline-none"
        />
        <button type="submit" className="bg-primary text-dark font-black px-8 rounded-2xl hover:scale-105">
          CRIAR
        </button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {shoppingLists.length === 0 ? (
          <p className="text-slate-700 text-center col-span-2 py-10">Crie sua primeira lista!</p>
        ) : (
          shoppingLists.map((list) => (
            <div key={list.id} className="relative group">
              <button
                onClick={() => setActiveListId(list.id)}
                className="w-full glass p-8 rounded-3xl text-left hover:border-primary/50 transition-all active:scale-95"
              >
                <ShoppingBag className="text-primary mb-4" size={32} />
                <h3 className="text-2xl font-black text-white tracking-tight leading-tight mb-1">{list.name}</h3>
                <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{list.items.length} Itens</span>
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); deleteShoppingList(list.id); }}
                className="absolute top-4 right-4 p-2 text-slate-700 hover:text-red-500 bg-dark/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ShoppingView;
