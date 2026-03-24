import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { getTodayDateString } from '../utils/dateUtils';

const useStore = create(
  persist(
    (set, get) => ({
      tasks: [],

      // Ações de Tarefas
      addTask: (title) => set((state) => ({
        tasks: [
          ...state.tasks, 
          { 
            id: crypto.randomUUID(), 
            title, 
            completed: false,
            createdAt: new Date().toISOString() // Data interna ISO
          }
        ]
      })),

      toggleTask: (id) => set((state) => ({
        tasks: state.tasks.map((t) => 
          t.id === id ? { ...t, completed: !t.completed } : t
        )
      })),

      deleteTask: (id) => set((state) => ({
        tasks: state.tasks.filter((t) => t.id !== id)
      })),
    }),
    {
      name: 'pessoal-tasks-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useStore;
