import { useTodos } from '@/hooks/useTodos';
import TodoInput from '@/components/TodoInput';
import TodoList from '@/components/TodoList';
import TodoFooter from '@/components/TodoFooter';
import { CheckSquare } from 'lucide-react';

export default function TodoPage() {
  const {
    todos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    activeCount,
    completedCount,
  } = useTodos();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col items-center px-4 py-12">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 rounded-xl bg-indigo-600 shadow-lg">
            <CheckSquare className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 leading-tight">My Todos</h1>
            <p className="text-sm text-gray-500">{activeCount} task{activeCount !== 1 ? 's' : ''} remaining</p>
          </div>
        </div>

        {/* Input */}
        <TodoInput onAdd={addTodo} />

        {/* List */}
        <div className="mt-6 rounded-2xl shadow-xl overflow-hidden bg-white border border-gray-100">
          <TodoList
            todos={todos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
          />
          <TodoFooter
            filter={filter}
            setFilter={setFilter}
            activeCount={activeCount}
            completedCount={completedCount}
            onClearCompleted={clearCompleted}
          />
        </div>
      </div>
    </div>
  );
}
