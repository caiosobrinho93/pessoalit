import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useStore = create(
  persist(
    (set, get) => ({
      // State
      view: 'tasks',
      tasks: [],
      shoppingLists: [], // Array de { id, name, items: [] }
      notes: [],
      finance: {
        transactions: [],
        receivables: [] // Array de { id, debtor, amount, date, paid: boolean }
      },
      
      setView: (view) => set({ view }),

      // Tasks
      addTask: (title) => set((state) => ({
        tasks: [...state.tasks, { id: crypto.randomUUID(), title, completed: false, createdAt: new Date().toISOString() }]
      })),
      toggleTask: (id) => set((state) => ({
        tasks: state.tasks.map((t) => t.id === id ? { ...t, completed: !t.completed } : t)
      })),
      deleteTask: (id) => set((state) => ({
        tasks: state.tasks.filter((t) => t.id !== id)
      })),

      // Shopping Lists
      addShoppingList: (name) => set((state) => ({
        shoppingLists: [...state.shoppingLists, { id: crypto.randomUUID(), name, items: [] }]
      })),
      deleteShoppingList: (id) => set((state) => ({
        shoppingLists: state.shoppingLists.filter(l => l.id !== id)
      })),
      addShoppingItem: (listId, name, quantity = 1, price = 0) => set((state) => ({
        shoppingLists: state.shoppingLists.map(list => 
          list.id === listId 
          ? { ...list, items: [...list.items, { id: crypto.randomUUID(), name, quantity, price, completed: false }] }
          : list
        )
      })),
      toggleShoppingItem: (listId, itemId) => set((state) => ({
        shoppingLists: state.shoppingLists.map(list => 
          list.id === listId 
          ? { ...list, items: list.items.map(item => item.id === itemId ? { ...item, completed: !item.completed } : item) }
          : list
        )
      })),
      deleteShoppingItem: (listId, itemId) => set((state) => ({
        shoppingLists: state.shoppingLists.map(list => 
          list.id === listId 
          ? { ...list, items: list.items.filter(item => item.id !== itemId) }
          : list
        )
      })),

      // Notes
      addNote: (title, content) => set((state) => ({
        notes: [...state.notes, { id: crypto.randomUUID(), title, content, date: new Date().toISOString() }]
      })),
      deleteNote: (id) => set((state) => ({
        notes: state.notes.filter((note) => note.id !== id)
      })),

      // Finance
      addTransaction: (description, amount, type) => set((state) => ({
        finance: {
          ...state.finance,
          transactions: [...state.finance.transactions, { id: crypto.randomUUID(), description, amount, type, date: new Date().toISOString() }]
        }
      })),
      deleteTransaction: (id) => set((state) => ({
        finance: { ...state.finance, transactions: state.finance.transactions.filter(t => t.id !== id) }
      })),
      addReceivable: (debtor, amount) => set((state) => ({
        finance: {
          ...state.finance,
          receivables: [...state.finance.receivables, { id: crypto.randomUUID(), debtor, amount, paid: false, date: new Date().toISOString() }]
        }
      })),
      toggleReceivablePaid: (id) => set((state) => ({
        finance: {
          ...state.finance,
          receivables: state.finance.receivables.map(r => r.id === id ? { ...r, paid: !r.paid } : r)
        }
      })),
      deleteReceivable: (id) => set((state) => ({
        finance: { ...state.finance, receivables: state.finance.receivables.filter(r => r.id !== id) }
      })),

      getFinanceSummary: () => {
        const { transactions, receivables } = get().finance;
        const income = transactions.filter(t => t.type === 'in').reduce((acc, t) => acc + Number(t.amount), 0);
        const expense = transactions.filter(t => t.type === 'out').reduce((acc, t) => acc + Number(t.amount), 0);
        const toReceive = receivables.filter(r => !r.paid).reduce((acc, r) => acc + Number(r.amount), 0);
        return { income, expense, balance: income - expense, toReceive };
      }
    }),
    {
      name: 'betano-manager-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useStore;
