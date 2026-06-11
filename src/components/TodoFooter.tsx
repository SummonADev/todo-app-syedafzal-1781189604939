import { FilterType } from '@/types';
import clsx from 'clsx';

type TodoFooterProps = {
  filter: FilterType;
  setFilter: (f: FilterType) => void;
  activeCount: number;
  completedCount: number;
  onClearCompleted: () => void;
};

const filters: { value: FilterType; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
];

export default function TodoFooter({
  filter,
  setFilter,
  activeCount,
  completedCount,
  onClearCompleted,
}: TodoFooterProps) {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-t border-gray-100">
      <span className="text-xs text-gray-500">
        {activeCount} item{activeCount !== 1 ? 's' : ''} left
      </span>

      <div className="flex gap-1">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={clsx(
              'px-3 py-1 rounded-lg text-xs font-medium transition',
              filter === f.value
                ? 'bg-indigo-100 text-indigo-700'
                : 'text-gray-500 hover:bg-gray-200'
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <button
        onClick={onClearCompleted}
        disabled={completedCount === 0}
        className="text-xs text-gray-400 hover:text-red-500 disabled:opacity-30 disabled:cursor-not-allowed transition"
      >
        Clear done
      </button>
    </div>
  );
}
