import { create } from 'zustand';
import { BookCategory } from '../../types';

export interface FilterState {
  keyword: string;
  category: BookCategory | 'ALL';
  setKeyword: (keyword: string) => void;
  setCategory: (category: BookCategory | 'ALL') => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  keyword: '',
  category: 'ALL',
  setKeyword: (keyword: string) => set({ keyword }),
  setCategory: (category: BookCategory | 'ALL') => set({ category }),
  resetFilters: () => set({ keyword: '', category: 'ALL' }),
}));
