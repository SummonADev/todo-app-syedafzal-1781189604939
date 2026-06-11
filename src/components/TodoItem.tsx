import { useState, useRef, useEffect } from 'react';
import { Trash2, Pencil, Check, X } from 'lucide-react';
import { Todo } from '@/types';
import clsx from 'clsx';

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
};

const priorityDot: Record<string, string> = {
  low: 'bg-green-400',
  medium: 'bg-yellow-400',
  high: 'bg-red-400',
};

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  function handleEditSubmit() {
    if (editText.trim()) {
      onEdit(todo.id, editText);
    }
    setEditing(false);
  }

  function handleEditCancel() {
    setEditText(todo.text);
    setEditing(false);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') handleEditSubmit();
    if (e.key === 'Escape') handleEditCancel();
  }

  return (
    <li className={clsx(
      'flex items-center gap-3 px-4 py-3 group transition-colors',
      todo.completed ? 'bg-gray-50' : 'bg-white hover:bg-indigo-50/40'
    )}>
      {/* Checkbox */}
      <button
        onClick={() => onToggle(todo.id)}
        className={clsx(
          'flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors',
          todo.completed
            ? 'bg-indigo-500 border-indigo-500'
            : 'border-gray-300 hover:border-indigo-400'
        )}
        aria-label={todo.completed ? 'Mark incomplete' : 'Mark complete'}
      >
        {todo.completed && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
      </button>

      {/* Priority dot */}
      <span className={clsx('flex-shrink-0 w-2 h-2 rounded-full', priorityDot[todo.priority])} />

      {/* Text or Edit input */}
      <div className="flex-1 min-w-0">
        {editing ? (
          <input
            ref={inputRef}
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full px-2 py-1 text-sm rounded border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-800"
          />
        ) : (
          <span
            className={clsx(
              'block text-sm truncate',
              todo.completed ? 'line-through text-gray-400' : 'text-gray-800'
            )}
          >
            {todo.text}
          </span>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 flex-shrink-0">
        {editing ? (
          <>
            <button
              onClick={handleEditSubmit}
              className="p-1.5 rounded-lg text-green-600 hover:bg-green-50 transition"
              aria-label="Save"
            >
              <Check className="w-4 h-4" />
            </button>
            <button
              onClick={handleEditCancel}
              className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 transition"
              aria-label="Cancel"
            >
              <X className="w-4 h-4" />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => { setEditing(true); setEditText(todo.text); }}
              className="p-1.5 rounded-lg text-gray-300 hover:text-indigo-500 hover:bg-indigo-50 transition opacity-0 group-hover:opacity-100"
              aria-label="Edit"
            >
              <Pencil className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="p-1.5 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 transition opacity-0 group-hover:opacity-100"
              aria-label="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </>
        )}
      </div>
    </li>
  );
}
