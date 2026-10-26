import { useState, useEffect } from 'react';

/**
 * Custom generic hook: Trì hoãn cập nhật giá trị sau một khoảng thời gian (mặc định 300ms)
 * Giúp tối ưu hiệu năng khi người dùng nhập từ khóa tìm kiếm.
 */
export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
