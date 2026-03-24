import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useStore from '../store/useStore';
import Modal from './Modal';
import { Plus, Trash2, ArrowUpCircle, ArrowDownCircle, Wallet, User, CheckCircle2, Clock, DollarSign } from 'lucide-react';

const FinanceView = () => {
  const { finance, addTransaction, deleteTransaction, addReceivable, toggleReceivablePaid, deleteReceivable, getFinanceSummary } = useStore();
  const summary = getFinanceSummary();
  const [activeTab, setActiveTab] = useState('summary');
  const [desc, setDesc] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('out');
  const [debtor, setDebtor] = useState('');

  const handleAddTx = (e) => {
    e.preventDefault();
    if (desc.trim() && amount) {
      addTransaction(desc.trim(), Number(amount), type);
      setDesc(''); setAmount('');
    }
  };

  const handleAddDebtor = (e) => {
    e.preventDefault();
    if (debtor.trim() && amount) {
      addReceivable(debtor.trim(), Number(amount));
      setDebtor(''); setAmount('');
    }
  };

  return (
    <div className="pb-24 px-4 font-sans">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-black text-white tracking-tighter">BANKING <span className="text-primary italic">HUB</span></h1>
        {/* Navigation Tabs */}
        <div className="flex gap-2 mt-6 bg-card p-1.5 rounded-2xl border border-white/5">
          <button onClick={() => setActiveTab('summary')} className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest ${activeTab === 'summary' ? 'bg-primary text-dark' : 'text-slate-500'}`}>Visão Geral</button>
          <button onClick={() => setActiveTab('receivables')} className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest ${activeTab === 'receivables' ? 'bg-primary text-dark' : 'text-slate-500'}`}>Recebíveis</button>
        </div>
      </header>

      {activeTab === 'summary' ? (
        <div className="space-y-6">
          {/* Main Card */}
          <div className="bg-primary p-8 rounded-[2rem] text-dark shadow-[0_20px_50px_rgba(244,115,33,0.3)]">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80 mb-2 block">Saldo em Conta</span>
            <span className="text-4xl font-black block">R$ {summary.balance.toLocaleString()}</span>
            <div className="mt-8 flex justify-between items-center opacity-90">
              <span className="text-[10px] font-black uppercase">Pendentes: R$ {summary.toReceive.toLocaleString()}</span>
              <Wallet size={24} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-card p-6 rounded-[2rem] border border-white/5">
              <ArrowUpCircle size={20} className="text-success mb-2" />
              <span className="text-[10px] font-black uppercase text-slate-500 block mb-1">Entradas</span>
              <span className="text-lg font-black text-slate-100">R$ {summary.income.toLocaleString()}</span>
            </div>
            <div className="bg-card p-6 rounded-[2rem] border border-white/5">
              <ArrowDownCircle size={20} className="text-primary mb-2" />
              <span className="text-[10px] font-black uppercase text-slate-500 block mb-1">Saídas</span>
              <span className="text-lg font-black text-slate-100">R$ {summary.expense.toLocaleString()}</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleAddTx} className="bg-card p-8 rounded-[2.5rem] border border-white/5 space-y-4">
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-2">Novo Lançamento</h3>
            <div className="flex gap-2">
              <button type="button" onClick={() => setType('in')} className={`flex-1 p-4 rounded-xl text-[10px] font-black ${type === 'in' ? 'bg-success text-dark' : 'bg-dark text-slate-500'}`}>ENTRADA</button>
              <button type="button" onClick={() => setType('out')} className={`flex-1 p-4 rounded-xl text-[10px] font-black ${type === 'out' ? 'bg-primary text-dark' : 'bg-dark text-slate-500'}`}>SAÍDA</button>
            </div>
            <input value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="O que é?" className="w-full bg-dark border border-white/10 p-4 rounded-xl" />
            <div className="flex gap-4">
              <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" type="number" className="w-full bg-dark border border-white/10 p-4 rounded-xl" />
              <button type="submit" className="bg-primary text-dark font-black px-6 rounded-xl"><Plus /></button>
            </div>
          </form>

          {/* List */}
          <div className="space-y-4">
            {finance.transactions.map(t => (
              <div key={t.id} className="bg-card p-5 rounded-2xl flex items-center justify-between border border-white/5">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${t.type === 'in' ? 'bg-success/10 text-success' : 'bg-primary/10 text-primary'}`}>
                    {t.type === 'in' ? <ArrowUpCircle size={20} /> : <ArrowDownCircle size={20} />}
                  </div>
                  <div>
                    <span className="font-bold text-slate-200 block">{t.description}</span>
                    <span className="text-[10px] text-slate-600 font-bold uppercase">{new Date(t.date).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`font-black ${t.type === 'in' ? 'text-success' : 'text-primary'}`}>R$ {t.amount}</span>
                  <button onClick={() => deleteTransaction(t.id)}><Trash2 size={16} className="text-slate-800" /></button>
                </div>
              </div>
            )).reverse()}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <form onSubmit={handleAddDebtor} className="bg-card p-8 rounded-[2.5rem] border border-white/5 space-y-4">
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-2">Novo Devedor</h3>
            <input value={debtor} onChange={(e) => setDebtor(e.target.value)} placeholder="Nome do Cliente (ex: João)" className="w-full bg-dark border border-white/10 p-4 rounded-xl" />
            <div className="flex gap-4">
              <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="R$ 0.00" type="number" className="w-full bg-dark border border-white/10 p-4 rounded-xl" />
              <button type="submit" className="bg-primary text-dark font-black px-6 rounded-xl"><Plus /></button>
            </div>
          </form>

          <div className="space-y-4">
            {finance.receivables.map(r => (
              <div key={r.id} className={`bg-card p-6 rounded-[2rem] border border-white/5 transition-all ${r.paid ? 'opacity-40 grayscale-[0.8]' : ''}`}>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <User className="text-primary" size={24} />
                    <span className="text-xl font-black text-white">{r.debtor}</span>
                  </div>
                  <span className={`text-xl font-black ${r.paid ? 'text-success' : 'text-primary'}`}>R$ {r.amount}</span>
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={() => toggleReceivablePaid(r.id)}
                    className={`flex-1 py-4 rounded-xl text-[10px] font-black border transition-all ${r.paid ? 'bg-success/20 text-success border-success/30' : 'bg-white/5 text-slate-400 border-white/10'}`}
                  >
                    {r.paid ? 'RECEBIDO' : 'MARCAR COMO PAGO'}
                  </button>
                  <button onClick={() => deleteReceivable(r.id)} className="p-4 rounded-xl text-slate-700 hover:text-red-500"><Trash2 size={24} /></button>
                </div>
              </div>
            )).reverse()}
          </div>
        </div>
      )}
    </div>
  );
};

export default FinanceView;
