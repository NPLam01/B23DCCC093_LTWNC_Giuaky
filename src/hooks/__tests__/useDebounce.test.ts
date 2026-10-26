import { renderHook, act } from '@testing-library/react';
import { useDebounce } from '../useDebounce';

describe('useDebounce hook', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('không cập nhật giá trị trước 300ms và chỉ cập nhật sau khi đủ 300ms', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'React', delay: 300 },
      }
    );

    // Giá trị ban đầu lập tức là 'React'
    expect(result.current).toBe('React');

    // Cập nhật prop value mới
    rerender({ value: 'React TypeScript', delay: 300 });

    // Khi chỉ trôi qua 150ms (< 300ms), giá trị debounced vẫn giữ nguyên giá trị cũ
    act(() => {
      jest.advanceTimersByTime(150);
    });
    expect(result.current).toBe('React');

    // Cho thời gian trôi qua thêm 150ms nữa (tổng 300ms)
    act(() => {
      jest.advanceTimersByTime(150);
    });

    // Lúc này giá trị debounced phải được cập nhật sang giá trị mới
    expect(result.current).toBe('React TypeScript');
  });

  it('reset lại timer nếu giá trị thay đổi liên tục trước khi timeout hoàn tất', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'A', delay: 300 },
      }
    );

    expect(result.current).toBe('A');

    // Đổi sang 'B' sau 100ms
    act(() => {
      jest.advanceTimersByTime(100);
    });
    rerender({ value: 'B', delay: 300 });

    // Đổi tiếp sang 'C' sau 100ms tiếp theo
    act(() => {
      jest.advanceTimersByTime(100);
    });
    rerender({ value: 'C', delay: 300 });

    // Vẫn chưa đủ 300ms kể từ lần đổi sang 'C' -> vẫn là 'A'
    expect(result.current).toBe('A');

    // Sau khi đủ 300ms từ lần đổi cuối cùng
    act(() => {
      jest.advanceTimersByTime(300);
    });
    expect(result.current).toBe('C');
  });
});
