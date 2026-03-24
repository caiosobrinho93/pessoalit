import React, { useState } from 'react';
import { motion } from 'framer-motion';
import useStore from '../store/useStore';
import { Plus, Trash2, ArrowUpCircle, ArrowDownCircle, Wallet, History, AlertCircle } from 'lucide-react';

const FinanceView = () => {
  const { finance, addTransaction, deleteTransaction, getFinanceSummary } = useStore();
  const summary = getFinanceSummary();
  const [desc, setDesc] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('out');
  const [category, setCategory] = useState('Geral');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (desc.trim() && amount) {
      addTransaction(desc.trim(), Number(amount), type, category);
      setDesc('');
      setAmount('');
    }
  };

  return (
    <div className="pb-24">
      <header className="mb-8 text-center px-4">
        <h1 className="text-4xl font-black text-white tracking-tight mb-2">
          Gestão <span className="text-accent italic">Financeira</span>
        </h1>
        <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em]">Fluxo de Caixa</p>
      </header>

      {/* Summary Dashboard */}
      <div className="grid grid-cols-1 gap-4 mb-8 px-4">
        <div className="glass p-8 rounded-[2.5rem] flex items-center justify-between overflow-hidden relative">
          <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-primary/20 blur-3xl rounded-full" />
          <div className="flex flex-col">
            <span className="text-slate-500 text-[10px] uppercase font-black tracking-[0.2em] mb-1">Saldo Total</span>
            <span className={`text-4xl font-black ${summary.balance >= 0 ? 'text-accent' : 'text-red-500'}`}>
              R$ {summary.balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </div>
          <Wallet size={48} className="text-slate-700 opacity-20" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="glass p-6 rounded-[2rem] border-l-4 border-l-accent">
            <span className="text-[10px] uppercase font-black text-slate-500 tracking-widest block mb-1">Entradas</span>
            <span className="text-xl font-bold text-slate-100">R$ {summary.income.toLocaleString('pt-BR')}</span>
          </div>
          <div className="glass p-6 rounded-[2rem] border-l-4 border-l-red-500">
            <span className="text-[10px] uppercase font-black text-slate-500 tracking-widest block mb-1">Saídas</span>
            <span className="text-xl font-bold text-slate-100">R$ {summary.expense.toLocaleString('pt-BR')}</span>
          </div>
        </div>
      </div>

      {/* Transaction Form */}
      <form onSubmit={handleSubmit} className="glass m-4 p-8 rounded-[2.5rem] space-y-4">
        <div className="flex gap-2">
          <button 
            type="button" 
            onClick={() => setType('in')}
            className={`flex-1 p-4 rounded-2xl flex items-center justify-center gap-2 text-sm font-black transition-all ${type === 'in' ? 'bg-accent text-dark' : 'bg-white/5 text-slate-500'}`}
          >
            <ArrowUpCircle size={18} /> ENTRADA
          </button>
          <button 
            type="button" 
            onClick={() => setType('out')}
            className={`flex-1 p-4 rounded-2xl flex items-center justify-center gap-2 text-sm font-black transition-all ${type === 'out' ? 'bg-red-500 text-white' : 'bg-white/5 text-slate-500'}`}
          >
            <ArrowDownCircle size={18} /> SAÍDA
          </button>
        </div>
        <input
          type="text"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Descrição (ex: Aluguel, Salário)"
          className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-white"
        />
        <div className="flex gap-4">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Valor"
            className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-white"
          />
          <button type="submit" className="bg-primary text-dark font-black rounded-2xl px-8 flex items-center justify-center transition-all hover:scale-[1.05]">
            <Plus size={24} strokeWidth={3} />
          </button>
        </div>
      </form>

      {/* History */}
      <div className="m-4 mt-12 space-y-4">
        <h3 className="text-slate-400 text-[10px] uppercase font-black tracking-[0.26em] px-4 flex items-center gap-2">
          <History size={14} /> Histórico de Lançamentos
        </h3>
        {finance.length === 0 ? (
          <div className="text-center py-12 opacity-20">Nenhuma transação.</div>
        ) : (
          finance.map((t) => (
            <motion.div
              layout
              key={t.id}
              className="glass p-5 rounded-[2rem] flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-2xl ${t.type === 'in' ? 'bg-accent/10 text-accent' : 'bg-red-500/10 text-red-500'}`}>
                  {t.type === 'in' ? <ArrowUpCircle size={24} /> : <ArrowDownCircle size={24} />}
                </div>
                <div>
                  <span className="text-lg font-bold block text-slate-100">{t.description}</span>
                  <span className="text-[10px] text-slate-500 uppercase font-black">{new Date(t.date).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`text-lg font-black ${t.type === 'in' ? 'text-accent' : 'text-red-500'}`}>
                  {t.type === 'in' ? '+' : '-'} R$ {t.amount.toLocaleString()}
                </span>
                <button onClick={() => deleteTransaction(t.id)} className="text-slate-700 hover:text-red-500 transition-colors">
                  <Trash2 size={18} />
                </button>
              </div>
            </motion.div>
          )).reverse()
        )}
      </div>
    </div>
  );
};

export default FinanceView;
