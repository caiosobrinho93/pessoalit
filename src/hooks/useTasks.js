import { useCallback, useMemo } from 'react';
import useStore from '../store/useStore';

/**
 * Hook para interagir com as tarefas de forma performática.
 */
export function useTasks() {
  const { tasks, addTask, toggleTask, deleteTask, getStats } = useStore();

  const handleAdd = useCallback((title) => {
    if (title.trim().length > 0 && title.length <= 100) {
      addTask(title.trim());
    }
  }, [addTask]);

  const stats = useMemo(() => getStats(), [tasks, getStats]);

  return {
    tasks,
    handleAdd,
    handleToggle: toggleTask,
    handleDelete: deleteTask,
    stats
  };
}
