import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Priority } from '@/types';
import clsx from 'clsx';

type TodoInputProps = {
  onAdd: (text: string, priority: Priority) => void;
};

const priorityOptions: { value: Priority; label: string; color: string }[] = [
  { value: 'low', label: 'Low', color: 'bg-green-100 text-green-700 border-green-300' },
  { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-700 border-yellow-300' },
  { value: 'high', label: 'High', color: 'bg-red-100 text-red-700 border-red-300' },
];

export default function TodoInput({ onAdd }: TodoInputProps) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text, priority);
    setText('');
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What needs to be done?"
          className="flex-1 px-4 py-3 rounded-xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 text-gray-800 placeholder-gray-400 bg-white text-sm transition"
        />
        <button
          type="submit"
          disabled={!text.trim()}
          className="flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white shadow-sm transition"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
      <div className="flex gap-2">
        {priorityOptions.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => setPriority(opt.value)}
            className={clsx(
              'flex-1 py-1.5 rounded-lg text-xs font-medium border transition',
              opt.color,
              priority === opt.value ? 'ring-2 ring-offset-1 ring-indigo-400 font-semibold' : 'opacity-60 hover:opacity-90'
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </form>
  );
}
