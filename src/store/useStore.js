import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useStore = create(
  persist(
    (set, get) => ({
      // State
      view: 'tasks', // current active tab
      tasks: [],
      shopping: [],
      notes: [],
      finance: [],
      
      // Navigation
      setView: (view) => set({ view }),

      // Tasks Actions
      addTask: (title) => set((state) => ({
        tasks: [...state.tasks, { id: crypto.randomUUID(), title, completed: false, createdAt: new Date().toISOString() }]
      })),
      toggleTask: (id) => set((state) => ({
        tasks: state.tasks.map((t) => t.id === id ? { ...t, completed: !t.completed } : t)
      })),
      deleteTask: (id) => set((state) => ({
        tasks: state.tasks.filter((t) => t.id !== id)
      })),
      updateTask: (id, updates) => set((state) => ({
        tasks: state.tasks.map((t) => t.id === id ? { ...t, ...updates } : t)
      })),

      // Shopping Actions
      addShoppingItem: (name, quantity = 1) => set((state) => ({
        shopping: [...state.shopping, { id: crypto.randomUUID(), name, quantity, completed: false }]
      })),
      toggleShoppingItem: (id) => set((state) => ({
        shopping: state.shopping.map((item) => item.id === id ? { ...item, completed: !item.completed } : item)
      })),
      deleteShoppingItem: (id) => set((state) => ({
        shopping: state.shopping.filter((item) => item.id !== id)
      })),
      updateShoppingItem: (id, updates) => set((state) => ({
        shopping: state.shopping.map((item) => item.id === id ? { ...item, ...updates } : item)
      })),

      // Notes Actions
      addNote: (title, content) => set((state) => ({
        notes: [...state.notes, { id: crypto.randomUUID(), title, content, date: new Date().toISOString() }]
      })),
      deleteNote: (id) => set((state) => ({
        notes: state.notes.filter((note) => note.id !== id)
      })),
      updateNote: (id, updates) => set((state) => ({
        notes: state.notes.map((note) => note.id === id ? { ...note, ...updates } : note)
      })),

      // Finance Actions
      addTransaction: (description, amount, type, category) => set((state) => ({
        finance: [...state.finance, { id: crypto.randomUUID(), description, amount, type, category, date: new Date().toISOString() }]
      })),
      deleteTransaction: (id) => set((state) => ({
        finance: state.finance.filter((t) => t.id !== id)
      })),
      
      // Finance Helpers
      getFinanceSummary: () => {
        const finance = get().finance;
        const income = finance.filter(t => t.type === 'in').reduce((acc, t) => acc + Number(t.amount), 0);
        const expense = finance.filter(t => t.type === 'out').reduce((acc, t) => acc + Number(t.amount), 0);
        return { income, expense, balance: income - expense };
      }
    }),
    {
      name: 'personal-manager-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useStore;
