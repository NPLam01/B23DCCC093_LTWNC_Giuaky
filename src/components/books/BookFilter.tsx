import React from 'react';
import { BookCategory } from '../../types';
import { useFilterStore } from '../../features/filters/filterStore';

const CATEGORIES: Array<{ label: string; value: BookCategory | 'ALL' }> = [
  { label: 'All', value: 'ALL' },
  { label: 'CNTT', value: 'CNTT' },
  { label: 'Kinh tế', value: 'Kinh tế' },
  { label: 'Ngoại ngữ', value: 'Ngoại ngữ' },
];

export const BookFilter: React.FC = () => {
  const selectedCategory = useFilterStore((state) => state.category);
  const setCategory = useFilterStore((state) => state.setCategory);

  return (
    <div className="turing-pills-row" role="radiogroup" aria-label="Lọc theo thể loại">
      {CATEGORIES.map((cat) => {
        const isActive = selectedCategory === cat.value;
        return (
          <button
            key={cat.value}
            type="button"
            role="radio"
            aria-checked={isActive}
            className={`turing-category-pill ${isActive ? 'active' : ''}`}
            onClick={() => setCategory(cat.value)}
            data-testid={`category-btn-${cat.value}`}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
};
