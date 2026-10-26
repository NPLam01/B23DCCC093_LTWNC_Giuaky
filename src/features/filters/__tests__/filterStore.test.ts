import { act } from '@testing-library/react';
import { useFilterStore } from '../filterStore';

describe('useFilterStore (Zustand)', () => {
  beforeEach(() => {
    act(() => {
      useFilterStore.getState().resetFilters();
    });
  });

  it('khởi tạo với keyword rỗng và category là ALL', () => {
    const state = useFilterStore.getState();
    expect(state.keyword).toBe('');
    expect(state.category).toBe('ALL');
  });

  it('cập nhật từ khóa tìm kiếm chính xác qua setKeyword', () => {
    act(() => {
      useFilterStore.getState().setKeyword('Microservices');
    });

    expect(useFilterStore.getState().keyword).toBe('Microservices');
  });

  it('cập nhật thể loại chính xác qua setCategory', () => {
    act(() => {
      useFilterStore.getState().setCategory('CNTT');
    });

    expect(useFilterStore.getState().category).toBe('CNTT');
  });

  it('đưa toàn bộ bộ lọc về mặc định khi gọi resetFilters', () => {
    act(() => {
      useFilterStore.getState().setKeyword('Kinh tế');
      useFilterStore.getState().setCategory('Kinh tế');
    });

    act(() => {
      useFilterStore.getState().resetFilters();
    });

    const state = useFilterStore.getState();
    expect(state.keyword).toBe('');
    expect(state.category).toBe('ALL');
  });
});
